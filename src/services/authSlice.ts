import { TUser } from '@utils-types';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  getUserApi,
  loginUserApi,
  logoutApi,
  refreshToken,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { deleteCookie, setCookie } from '../utils/cookie';

type TUserInitialState = {
  user: TUser | null;
  authDataLoading: boolean;
  isAuthChecked: boolean;
};

const initialState: TUserInitialState = {
  user: null,
  authDataLoading: false,
  isAuthChecked: false
};

export const getUserFromServer = createAsyncThunk('auth/getUser', async () =>
  getUserApi()
);

export const refreshTokensFromServer = createAsyncThunk(
  'auth/refreshToken',
  async () => refreshToken()
);

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (regData: TRegisterData) => registerUserApi(regData)
);
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (regData: TLoginData) => loginUserApi(regData)
);

export const updateUser = createAsyncThunk(
  'auth/updataUser',
  async (userData: Partial<TRegisterData>) => updateUserApi(userData)
);

export const logoutUser = createAsyncThunk('auth/logoutUser', async () =>
  logoutApi()
);

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
    builder.addCase(refreshTokensFromServer.pending, (state) => {
      state.authDataLoading = true;
    });
    builder.addCase(refreshTokensFromServer.rejected, (state) => {
      state.authDataLoading = false;
      alert('Unable to login');
    });
    builder.addCase(refreshTokensFromServer.fulfilled, (state, action) => {
      state.authDataLoading = false;
      state.isAuthChecked = true;
      setCookie('accessToken', action.payload.accessToken);
      localStorage.setItem('refreshToken', action.payload.refreshToken);
    });
    builder.addCase(getUserFromServer.pending, (state) => {
      state.authDataLoading = true;
    });
    builder.addCase(getUserFromServer.rejected, (state) => {
      state.authDataLoading = false;
      alert('Unable to login');
    });
    builder.addCase(getUserFromServer.fulfilled, (state, action) => {
      state.authDataLoading = false;
      state.isAuthChecked = true;
      state.user = action.payload.user;
    });
    builder.addCase(registerUser.pending, (state) => {
      state.authDataLoading = true;
    });
    builder.addCase(registerUser.rejected, (state) => {
      state.authDataLoading = false;
      alert('Unable to register');
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.authDataLoading = false;
      state.isAuthChecked = true;
      state.user = action.payload.user;
      setCookie('accessToken', action.payload.accessToken);
      localStorage.setItem('refreshToken', action.payload.refreshToken);
    });
    builder.addCase(loginUser.pending, (state) => {
      state.authDataLoading = true;
    });
    builder.addCase(loginUser.rejected, (state) => {
      state.authDataLoading = false;
      alert('Unable to login');
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.authDataLoading = false;
      state.isAuthChecked = true;
      state.user = action.payload.user;
      setCookie('accessToken', action.payload.accessToken);
      localStorage.setItem('refreshToken', action.payload.refreshToken);
    });
    builder.addCase(updateUser.pending, (state) => {
      state.authDataLoading = true;
    });
    builder.addCase(updateUser.rejected, (state) => {
      state.authDataLoading = false;
      alert('Unable to update user data');
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.authDataLoading = false;
      state.user = action.payload.user;
    });
    builder.addCase(logoutUser.pending, (state) => {
      state.authDataLoading = true;
    });
    builder.addCase(logoutUser.rejected, (state) => {
      state.authDataLoading = false;
      alert('Unable to logout');
    });
    builder.addCase(logoutUser.fulfilled, (state, action) => {
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
