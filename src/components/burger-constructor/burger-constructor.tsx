import React, { FC, useMemo } from 'react';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  emptyIngredient,
  getOrder,
  setConstructor
} from '../../services/constructorSlice';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import {
  getOrderModalData,
  getOrderRequest,
  orderBurger,
  setOrderModalData
} from '../../services/orderSlice';
import { getIsAuthChecked } from '../../services/authSlice';
import { useNavigate } from 'react-router-dom';

const createOrderData = (burgerIngredients: {
  bun: TIngredient;
  ingredients: TIngredient[];
}) => {
  let orderIngredients: string[] = [];
  orderIngredients.push(burgerIngredients.bun._id);
  burgerIngredients.ingredients.forEach((ingr) =>
    orderIngredients.push(ingr._id)
  );
  orderIngredients.push(burgerIngredients.bun._id);
  return orderIngredients;
};

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const constructorItems = useSelector(getOrder);

  const orderRequest = useSelector(getOrderRequest);
  const orderModalData = useSelector(getOrderModalData);

  const isAuth = useSelector(getIsAuthChecked);

  const onOrderClick = () => {
    if (isAuth) {
      if (constructorItems.bun._id !== '') {
        dispatch(orderBurger(createOrderData(constructorItems))).then(() => {
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
