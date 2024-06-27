import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { getOrdersFromServer, getUserOrders } from '../../services/orderSlice';
import { useDispatch, useSelector } from '../../services/store';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrdersFromServer());
  }, []);
  const orders = useSelector(getUserOrders);

  return <ProfileOrdersUI orders={orders} />;
};
