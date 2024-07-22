import { FC } from 'react';

import styles from './profile-orders.module.css';

import { ProfileOrdersUIProps } from './type';
import { OrdersList, ProfileMenu } from '@components';
import { Preloader } from '@ui';
import { useSelector } from '../../../../services/store';
import { getIsOrderReceiving } from '../../../../services/orderSlice';

export const ProfileOrdersUI: FC<ProfileOrdersUIProps> = ({ orders }) => {
  const isLoading = useSelector(getIsOrderReceiving);

  if (isLoading)
    return (
      <main className={`${styles.main}`}>
        <div className={`mt-30 mr-15 ${styles.menu}`}>
          <ProfileMenu />
        </div>
        <Preloader />
      </main>
    );
  return (
    <main className={`${styles.main}`}>
      <div className={`mt-30 mr-15 ${styles.menu}`}>
        <ProfileMenu />
      </div>
      <div className={`mt-10 ${styles.orders}`}>
        <OrdersList orders={orders} />
      </div>
    </main>
  );
};
