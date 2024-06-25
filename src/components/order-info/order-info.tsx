import { FC, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useSelector } from '../../services/store';
import { getIngredients } from '../../services/ingredientsSlice';
import { useParams } from 'react-router-dom';
import { getFeeds } from '../../services/feedSlice';

export const OrderInfo: FC = () => {
  const { number } = useParams();

  /** TODO: взять переменные orderData и ingredients из стора */
  // const orderData = {
  //   _id: '',
  //   status: '',
  //   name: '',
  //   createdAt: '',
  //   updatedAt: 'string',
  //   number: 0,
  //   ingredients: []
  // };
  const orderData = useSelector(getFeeds).find(
    (order) => order.number === Number(number)
  );

  // const ingredients: TIngredient[] = [];
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