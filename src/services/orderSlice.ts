import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getOrderByNumberApi, getOrdersApi, orderBurgerApi } from '@api';
import { TOrder } from '@utils-types';

type TOrderInitialState = {
  ingredients: string[];
  orderRequest: boolean;
  orderModalData: TOrder | null;
  orders: { orders: TOrder[]; total: number; totalToday: number };
  isOrdersReceiving: boolean;
};

const initialState: TOrderInitialState = {
  orders: { orders: [], total: 0, totalToday: 0 },
  ingredients: [],
  orderRequest: false,
  orderModalData: null,
  isOrdersReceiving: false
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
    });
    builder.addCase(orderBurger.rejected, (state, action) => {
      state.orderRequest = false;
      alert(action.payload);
    });
    builder.addCase(orderBurger.fulfilled, (state, action) => {
      state.orderRequest = false;
      state.ingredients = [];
      state.orderModalData = action.payload.order;
    });
    builder.addCase(getOrdersFromServer.pending, (state) => {
      state.isOrdersReceiving = true;
    });
    builder.addCase(getOrdersFromServer.rejected, (state, action) => {
      state.isOrdersReceiving = false;
      alert(action.payload);
    });
    builder.addCase(getOrdersFromServer.fulfilled, (state, action) => {
      state.isOrdersReceiving = false;
      state.orders.orders = action.payload;
    });
    builder.addCase(getOrderByNumberFromServer.pending, (state) => {
      state.isOrdersReceiving = true;
    });
    builder.addCase(getOrderByNumberFromServer.rejected, (state, action) => {
      state.isOrdersReceiving = false;
      alert(action.payload);
    });
    builder.addCase(getOrderByNumberFromServer.fulfilled, (state, action) => {
      state.isOrdersReceiving = false;
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
