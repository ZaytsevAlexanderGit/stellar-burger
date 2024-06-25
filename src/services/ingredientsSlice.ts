import { TIngredient } from '../utils/types';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getIngredientsApi } from '@api';

type TIngredInitialState = {
  isIngredientsLoading: boolean;
  ingredients: TIngredient[];
};

const initialState: TIngredInitialState = {
  isIngredientsLoading: false,
  ingredients: []
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
      })
      .addCase(getIngredientsFromServer.fulfilled, (state, action) => {
        state.ingredients = action.payload;
        state.isIngredientsLoading = false;
      })
      .addCase(getIngredientsFromServer.rejected, (state) => {
        state.isIngredientsLoading = false;
      });
  }
});

export const { getIsIngredientsLoading, getIngredients } =
  ingredientsSlice.selectors;
export const { setIngredients, setIsIngredientsLoading } =
  ingredientsSlice.actions;
