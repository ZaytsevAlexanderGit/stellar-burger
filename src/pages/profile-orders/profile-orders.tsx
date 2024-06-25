import { ProfileOrdersUI } from '@ui-pages';
import { FC } from 'react';
import { getUserOrders } from '../../services/orderSlice';
import { useSelector } from '../../services/store';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  // const orders: TOrder[] = [];
  const orders = useSelector(getUserOrders).orders;

  return <ProfileOrdersUI orders={orders} />;
};
