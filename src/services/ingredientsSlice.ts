import { TIngredient } from '../utils/types';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getIngredientsApi } from '../utils/burger-api';

type TIngredInitialState = {
  isIngredientsLoading: boolean;
  ingredients: TIngredient[];
  error: string;
};

export const initialState: TIngredInitialState = {
  isIngredientsLoading: false,
  ingredients: [],
  error: ''
};

export const getIngredientsFromServer = createAsyncThunk(
  'data/getIngredients',
  async () => getIngredientsApi()
);

export const ingredientsSlice = createSlice({
  name: 'ingredientsData',
  initialState,
  reducers: {
    setIngredients: (state, action: PayloadAction<TIngredient[]>) => {
      state.ingredients = action.payload;
    },
    setIsIngredientsLoading: (state, action: PayloadAction<boolean>) => {
      state.isIngredientsLoading = action.payload;
    }
  },
  selectors: {
    getIsIngredientsLoading: (state) => state.isIngredientsLoading,
    getIngredients: (state) => state.ingredients
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredientsFromServer.pending, (state) => {
        state.isIngredientsLoading = true;
        state.error = '';
      })
      .addCase(getIngredientsFromServer.fulfilled, (state, action) => {
        state.ingredients = action.payload;
        state.isIngredientsLoading = false;
        state.error = '';
      })
      .addCase(getIngredientsFromServer.rejected, (state, action) => {
        state.isIngredientsLoading = false;
        state.error = action.error.message!;
        console.error(action.error.message);
      });
  }
});

export const { getIsIngredientsLoading, getIngredients } =
  ingredientsSlice.selectors;
export const { setIngredients, setIsIngredientsLoading } =
  ingredientsSlice.actions;
