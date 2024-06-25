import { combineReducers, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { ingredientsSlice } from './ingredientsSlice';
import { authSlice } from './authSlice';
import { feedsSlice } from './feedSlice';
import { constructorSlice } from './constructorSlice';
import { orderSlice } from './orderSlice';

// const rootReducer = () => {}; // Заменить на импорт настоящего редьюсера
//}); // Заменить на импорт настоящего редьюсера

const rootReducer = combineReducers({
  [ingredientsSlice.reducerPath]: ingredientsSlice.reducer,
  [feedsSlice.reducerPath]: feedsSlice.reducer,
  [authSlice.reducerPath]: authSlice.reducer,
  [constructorSlice.reducerPath]: constructorSlice.reducer,
  [orderSlice.reducerPath]: orderSlice.reducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
