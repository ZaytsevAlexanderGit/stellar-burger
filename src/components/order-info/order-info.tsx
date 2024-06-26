import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useDispatch, useSelector } from '../../services/store';
import { getIngredients } from '../../services/ingredientsSlice';
import { useLocation, useParams } from 'react-router-dom';
import { getOrderByNumberFromServer } from '../../services/orderSlice';

export const OrderInfo: FC = () => {
  const dispatch = useDispatch();
  const { number } = useParams();
  const location = useLocation();

  let state = location.state as { background?: Location };
  useEffect(() => {
    if (!location.state) {
      dispatch(getOrderByNumberFromServer(Number(number)));
    }
  }, []);

  const orderData = useSelector((state) => {
    if (!location.state) {
      return state.order.orderModalData;
    } else {
      if (location.pathname.includes('profile')) {
        return state.order.orders.orders.find(
          (order) => order.number === Number(number)
        );
      } else {
        return state.feedData.feeds.find(
          (order) => order.number === Number(number)
        );
      }
    }
  });

  const ingredients: TIngredient[] = useSelector(getIngredients);

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
