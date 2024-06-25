import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getOrdersApi, orderBurgerApi } from '@api';
import { TOrder } from '@utils-types';

type TOrderInitialState = {
  ingredients: string[];
  orderRequest: boolean;
  orderModalData: TOrder | null;
  orders: { orders: TOrder[]; total: number; totalToday: number };
  isOrdersReceived: boolean;
};

const initialState: TOrderInitialState = {
  orders: { orders: [], total: 0, totalToday: 0 },
  ingredients: [],
  orderRequest: false,
  orderModalData: null,
  isOrdersReceived: false
};

export const orderBurger = createAsyncThunk(
  'order/makeOrder',
  async (orderData: string[]) => orderBurgerApi(orderData)
);

export const getOrdersFromServer = createAsyncThunk(
  'order/getUserOrders',
  async () => getOrdersApi()
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
    getUserOrders: (state) => state.orders,
    getOrderRequest: (state) => state.orderRequest,
    getOrderModalData: (state) => state.orderModalData
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
      state.isOrdersReceived = true;
    });
    builder.addCase(getOrdersFromServer.rejected, (state, action) => {
      state.isOrdersReceived = false;
      alert(action.payload);
    });
    builder.addCase(getOrdersFromServer.fulfilled, (state, action) => {
      state.isOrdersReceived = false;
      state.orders.orders = action.payload;
    });
  }
});

export const { getUserOrders, getOrderRequest, getOrderModalData } =
  orderSlice.selectors;
export const { setOrderRequest, setOrderModalData } = orderSlice.actions;
