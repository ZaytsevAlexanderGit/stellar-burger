import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  getOrderByNumberApi,
  getOrdersApi,
  orderBurgerApi
} from '../utils/burger-api';
import { TOrder } from '@utils-types';

type TOrderInitialState = {
  ingredients: string[];
  orderRequest: boolean;
  orderModalData: TOrder | null;
  orders: { orders: TOrder[]; total: number; totalToday: number };
  isOrdersReceiving: boolean;
  error: string;
};

export const initialState: TOrderInitialState = {
  orders: { orders: [], total: 0, totalToday: 0 },
  ingredients: [],
  orderRequest: false,
  orderModalData: null,
  isOrdersReceiving: false,
  error: ''
};

export const orderBurger = createAsyncThunk(
  'order/makeOrder',
  async (orderData: string[]) => orderBurgerApi(orderData)
);

export const getOrdersFromServer = createAsyncThunk(
  'order/getUserOrders',
  async () => getOrdersApi()
);

export const getOrderByNumberFromServer = createAsyncThunk(
  'order/getOrderByNumber',
  async (number: number) => getOrderByNumberApi(number)
);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrderRequest: (state, action: PayloadAction<boolean>) => {
      state.orderRequest = action.payload;
    },
    setOrderModalData: (state, action: PayloadAction<TOrder | null>) => {
      state.orderModalData = action.payload;
    }
  },
  selectors: {
    getUserOrders: (state) => state.orders.orders,
    getOrderRequest: (state) => state.orderRequest,
    getOrderModalData: (state) => state.orderModalData,
    getIsOrderReceiving: (state) => state.isOrdersReceiving
  },
  extraReducers: (builder) => {
    builder.addCase(orderBurger.pending, (state) => {
      state.orderRequest = true;
      state.error = '';
    });
    builder.addCase(orderBurger.rejected, (state, action) => {
      state.orderRequest = false;
      state.error = action.error.message!;
      console.error(action.error.message);
    });
    builder.addCase(orderBurger.fulfilled, (state, action) => {
      state.orderRequest = false;
      state.ingredients = [];
      state.error = '';
      state.orderModalData = action.payload.order;
    });
    builder.addCase(getOrdersFromServer.pending, (state) => {
      state.isOrdersReceiving = true;
      state.error = '';
    });
    builder.addCase(getOrdersFromServer.rejected, (state, action) => {
      state.isOrdersReceiving = false;
      state.error = action.error.message!;
      console.error(action.error.message);
    });
    builder.addCase(getOrdersFromServer.fulfilled, (state, action) => {
      state.isOrdersReceiving = false;
      state.error = '';
      state.orders.orders = action.payload.orders;
      state.orders.total = action.payload.total;
      state.orders.totalToday = action.payload.totalToday;
    });
    builder.addCase(getOrderByNumberFromServer.pending, (state) => {
      state.isOrdersReceiving = true;
      state.error = '';
    });
    builder.addCase(getOrderByNumberFromServer.rejected, (state, action) => {
      state.isOrdersReceiving = false;
      state.error = action.error.message!;
      console.error(action.error.message);
    });
    builder.addCase(getOrderByNumberFromServer.fulfilled, (state, action) => {
      state.isOrdersReceiving = false;
      state.error = '';
      state.orderModalData = action.payload.orders[0];
    });
  }
});

export const {
  getUserOrders,
  getOrderRequest,
  getOrderModalData,
  getIsOrderReceiving
} = orderSlice.selectors;

export const { setOrderRequest, setOrderModalData } = orderSlice.actions;
