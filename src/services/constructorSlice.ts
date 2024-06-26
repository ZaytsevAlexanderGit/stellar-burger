import { TConstructorIngredient, TIngredient } from '../utils/types';
import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';

export const emptyIngredient: TIngredient = {
  _id: '',
  name: '',
  type: '',
  proteins: 0,
  fat: 0,
  carbohydrates: 0,
  calories: 0,
  price: 0,
  image: '',
  image_large: '',
  image_mobile: ''
};

type TOrderType = {
  bun: TIngredient;
  ingredients: TConstructorIngredient[];
};

type TConstructorState = {
  constructorItems: TOrderType;
};

const initialState: TConstructorState = {
  constructorItems: {
    bun: emptyIngredient,
    ingredients: []
  }
};

const swapElements = (
  arr: TConstructorIngredient[],
  i1: number,
  i2: number
) => {
  [arr[i1], arr[i2]] = [arr[i2], arr[i1]];
};

export const constructorSlice = createSlice({
  name: 'constructorData',
  initialState,
  reducers: {
    setConstructor: (state, action: PayloadAction<TOrderType>) => {
      state.constructorItems = action.payload;
    },
    setBun: (state, action: PayloadAction<TIngredient>) => {
      state.constructorItems.bun = action.payload;
    },
    setIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        console.log(action.payload);
        state.constructorItems.ingredients.push(action.payload);
      },
      prepare: (ingredient) => {
        const id = nanoid();
        return { payload: { ...ingredient, id } };
      }
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (ingredient) => ingredient.id !== action.payload
        );
    },
    swapIngredient: (
      state,
      action: PayloadAction<{ id: string; direction: string }>
    ) => {
      let dir = 1;
      if (action.payload.direction === 'Up') dir = -1;
      const index = state.constructorItems.ingredients.findIndex(
        (el) => el.id === action.payload.id
      );
      swapElements(state.constructorItems.ingredients, index, index + dir);
    }
  },
  selectors: {
    getOrder: (state) => state.constructorItems
  }
});

export const { getOrder } = constructorSlice.selectors;
export const {
  setConstructor,
  setBun,
  setIngredient,
  removeIngredient,
  swapIngredient
} = constructorSlice.actions;
