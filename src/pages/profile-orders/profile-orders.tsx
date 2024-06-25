import { ProfileOrdersUI } from '@ui-pages';
import { FC } from 'react';
import { getUserOrders } from '../../services/orderSlice';
import { useSelector } from '../../services/store';

export const ProfileOrders: FC = () => {
  const orders = useSelector(getUserOrders);

  return <ProfileOrdersUI orders={orders} />;
};
