import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  getFeeds,
  getFeedsFromServer,
  getIsFeedsLoading
} from '../../services/feedSlice';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  // const orders: TOrder[] = [];
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector(getFeeds);
  const isLoaded = useSelector(getIsFeedsLoading);

  // if (!orders.length) {
  if (isLoaded) {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        dispatch(getFeedsFromServer());
      }}
    />
  );
};
