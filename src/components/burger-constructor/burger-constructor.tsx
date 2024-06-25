import React, { FC, useMemo } from 'react';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  emptyIngredient,
  getOrder,
  setConstructor
} from '../../services/constructorSlice';
import { TConstructorIngredient } from '@utils-types';
import {
  getOrderModalData,
  getOrderRequest,
  getOrdersFromServer,
  orderBurger,
  setOrderModalData
} from '../../services/orderSlice';
import { getFeedsFromServer } from '../../services/feedSlice';
import { getIsAuthChecked } from '../../services/authSlice';
import { useLocation, useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  // const constructorItems = {
  //   bun: {
  //     price: 0
  //   },
  //   ingredients: []
  // };

  const constructorItems = useSelector(getOrder);

  // const orderRequest = false;
  const orderRequest = useSelector(getOrderRequest);

  // const orderModalData = null;
  const orderModalData = useSelector(getOrderModalData);

  const isAuth = useSelector(getIsAuthChecked);

  const onOrderClick = () => {
    // if (!constructorItems.bun._id || orderRequest) return;
    if (isAuth) {
      if (constructorItems.bun._id !== '') {
        let orderIngredients: string[] = [];
        orderIngredients.push(constructorItems.bun._id);
        constructorItems.ingredients.forEach((ingr) =>
          orderIngredients.push(ingr._id)
        );
        orderIngredients.push(constructorItems.bun._id);
        dispatch(orderBurger(orderIngredients)).then(() => {
          dispatch(getFeedsFromServer());
          dispatch(getOrdersFromServer());
          dispatch(
            setConstructor({
              bun: emptyIngredient,
              ingredients: []
            })
          );
        });
      } else {
        alert('Burger require buns');
      }
    } else {
      navigate('/login');
    }
  };
  const closeOrderModal = () => {
    dispatch(setOrderModalData(null));
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  // return null;

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
