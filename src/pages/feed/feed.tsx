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
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector(getFeeds);
  const isLoaded = useSelector(getIsFeedsLoading);

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
