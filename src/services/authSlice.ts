import { TUser } from '@utils-types';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  updateUserApi
} from '../utils/burger-api';
import { deleteCookie, getCookie, setCookie } from '../utils/cookie';

type TUserInitialState = {
  user: TUser | null;
  authDataLoading: boolean;
  isAuthChecked: boolean;
  error: string;
};

export const initialState: TUserInitialState = {
  user: null,
  authDataLoading: false,
  isAuthChecked: false,
  error: ''
};

export const getUserFromServer = createAsyncThunk('auth/getUser', async () =>
  getUserApi()
);

export const checkUserAuth = createAsyncThunk(
  'auth/checkUserAuth',
  async (_, { dispatch }) => {
    if (getCookie('accessToken')) {
      getUserApi()
        .then((res) => {
          dispatch(setUser(res.user));
          dispatch(setIsAuthChecked(true));
        })
        .catch(() => {
          deleteCookie('accessToken');
          localStorage.removeItem('refreshToken');
        });
    } else {
      dispatch(setIsAuthChecked(false));
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  registerUserApi
);
export const loginUser = createAsyncThunk('auth/loginUser', loginUserApi);

export const updateUser = createAsyncThunk('auth/updateUser', updateUserApi);

export const logoutUser = createAsyncThunk('auth/logoutUser', logoutApi);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<TUser | null>) => {
      state.user = action.payload;
    },
    setIsAuthChecked: (state, action: PayloadAction<boolean>) => {
      state.isAuthChecked = action.payload;
    }
  },
  selectors: {
    getUser: (state) => state.user,
    getIsAuthChecked: (state) => state.isAuthChecked
  },
  extraReducers: (builder) => {
    builder.addCase(getUserFromServer.pending, (state) => {
      state.authDataLoading = true;
      state.error = '';
    });
    builder.addCase(getUserFromServer.rejected, (state, action) => {
      state.authDataLoading = false;
      state.isAuthChecked = false;
      state.error = action.error.message!;
      console.error(action.error.message);
    });
    builder.addCase(getUserFromServer.fulfilled, (state, action) => {
      state.authDataLoading = false;
      state.isAuthChecked = true;
      state.user = action.payload.user;
      state.error = '';
    });
    builder.addCase(registerUser.pending, (state) => {
      state.authDataLoading = true;
      state.error = '';
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.authDataLoading = false;
      state.error = action.error.message!;
      console.error(action.error.message);
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.error = '';
      state.authDataLoading = false;
      state.isAuthChecked = true;
      state.user = action.payload.user;
      setCookie('accessToken', action.payload.accessToken);
      localStorage.setItem('refreshToken', action.payload.refreshToken);
    });
    builder.addCase(loginUser.pending, (state) => {
      state.authDataLoading = true;
      state.error = '';
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.authDataLoading = false;
      state.error = action.error.message!;
      console.error(action.error.message);
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.authDataLoading = false;
      state.isAuthChecked = true;
      state.error = '';
      state.user = action.payload.user;
      setCookie('accessToken', action.payload.accessToken);
      localStorage.setItem('refreshToken', action.payload.refreshToken);
    });
    builder.addCase(updateUser.pending, (state) => {
      state.authDataLoading = true;
      state.error = '';
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.authDataLoading = false;
      state.error = action.error.message!;
      console.error(action.error.message);
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.authDataLoading = false;
      state.user = action.payload.user;
      state.error = '';
    });
    builder.addCase(logoutUser.pending, (state) => {
      state.authDataLoading = true;
      state.error = '';
    });
    builder.addCase(logoutUser.rejected, (state, action) => {
      state.authDataLoading = false;
      state.error = action.error.message!;
      console.error(action.error.message);
    });
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.error = '';
      state.authDataLoading = false;
      state.isAuthChecked = false;
      state.user = null;
      deleteCookie('accessToken');
      localStorage.removeItem('refreshToken');
    });
  }
});

export const { getUser, getIsAuthChecked } = authSlice.selectors;
export const { setUser, setIsAuthChecked } = authSlice.actions;
