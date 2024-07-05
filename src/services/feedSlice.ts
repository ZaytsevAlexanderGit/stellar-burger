import { TOrder } from '@utils-types';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getFeedsApi } from '../utils/burger-api';

type TFeedInitialState = {
  isFeedsLoading: boolean;
  feeds: TOrder[];
  totalInfo: { total: number; totalToday: number };
  error: string;
};

export const initialState: TFeedInitialState = {
  isFeedsLoading: false,
  feeds: [],
  totalInfo: { total: 0, totalToday: 0 },
  error: ''
};

export const getFeedsFromServer = createAsyncThunk('data/getFeeds', async () =>
  getFeedsApi()
);

export const feedsSlice = createSlice({
  name: 'feedData',
  initialState,
  reducers: {
    setFeed: (state, action: PayloadAction<TOrder[]>) => {
      state.feeds = action.payload;
    },
    setIsFeedsLoading: (state, action: PayloadAction<boolean>) => {
      state.isFeedsLoading = action.payload;
    }
  },
  selectors: {
    getIsFeedsLoading: (state) => state.isFeedsLoading,
    getFeeds: (state) => state.feeds,
    getTotals: (state) => state.totalInfo
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeedsFromServer.pending, (state) => {
        state.isFeedsLoading = true;
        state.error = '';
      })
      .addCase(getFeedsFromServer.fulfilled, (state, action) => {
        state.feeds = action.payload.orders;
        state.totalInfo = {
          total: action.payload.total,
          totalToday: action.payload.totalToday
        };
        state.isFeedsLoading = false;
        state.error = '';
      })
      .addCase(getFeedsFromServer.rejected, (state, action) => {
        state.isFeedsLoading = false;
        state.error = action.error.message!;
        console.error(action.error.message);
      });
  }
});

export const { getIsFeedsLoading, getFeeds, getTotals } = feedsSlice.selectors;
export const { setFeed, setIsFeedsLoading } = feedsSlice.actions;
