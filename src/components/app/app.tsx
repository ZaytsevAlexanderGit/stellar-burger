import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from '../../services/store';
import React, { useEffect } from 'react';
import { getIngredientsFromServer } from '../../services/ingredientsSlice';
import { OnlyAuth, OnlyUnAuth } from '../../utils/protected-route';
import { checkUserAuth } from '../../services/authSlice';
import { setOrderModalData } from '../../services/orderSlice';

const App = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  let location = useLocation();

  const onClose = () => navigate(-1);

  useEffect(() => {
    dispatch(getIngredientsFromServer());
    dispatch(checkUserAuth());
  }, [dispatch]);

  let state = location.state as { background?: Location; fromOrder?: Location };

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={state?.background || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/login' element={<OnlyUnAuth component={<Login />} />} />
        <Route
          path='/register'
          element={<OnlyUnAuth component={<Register />} />}
        />
        <Route
          path='/forgot-password'
          element={<OnlyUnAuth component={<ForgotPassword />} />}
        />
        <Route
          path='/reset-password'
          element={<OnlyUnAuth component={<ResetPassword />} />}
        />
        <Route path='/profile' element={<OnlyAuth component={<Profile />} />} />
        <Route
          path='/profile/orders'
          element={<OnlyAuth component={<ProfileOrders />} />}
        />
        <Route path='*' element={<NotFound404 />} />
        <Route
          path='/feed/:number'
          element={
            <Modal
              title='Детали Заказа'
              onClose={() => {
                navigate('/feed');
                dispatch(setOrderModalData(null));
              }}
            >
              <OrderInfo />
            </Modal>
          }
        />
        <Route
          path='/ingredients/:id'
          element={
            <Modal
              title='Детали ингредиента'
              onClose={() => {
                navigate('/');
              }}
            >
              <IngredientDetails />
            </Modal>
          }
        />
        <Route
          path='/profile/orders/:number'
          element={
            <OnlyAuth
              component={
                <Modal
                  title='Детали Заказа'
                  onClose={() => {
                    navigate('/profile/orders');
                    dispatch(setOrderModalData(null));
                  }}
                >
                  <OrderInfo />
                </Modal>
              }
            />
          }
        />
      </Routes>
      {state?.background && (
        <Routes location={state?.fromOrder || location}>
          <Route
            path='/feed/:number'
            element={
              <Modal title='Детали Заказа' onClose={onClose}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal title='Детали ингредиента' onClose={onClose}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <OnlyAuth
                component={
                  <Modal title='Детали Заказа' onClose={onClose}>
                    <OrderInfo />
                  </Modal>
                }
              />
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
