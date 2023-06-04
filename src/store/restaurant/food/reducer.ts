
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FoodType } from "../../../types/FoodType";
import { foodRequester } from "../../../services";

interface FoodState {
  isLoading: boolean;
  food: FoodType[];
  cartList: {
    food: FoodType;
    quantity: number;
  }[];
}

const initialState: FoodState = {
  isLoading: false,
  food: [],
  cartList: [],
};

export const fetchAllFood = createAsyncThunk(
  "food/fetchAllFood",
  async (data: string, thunkApi) => {
    const res = await foodRequester.getAllFood(data);
    return res.data;
  }
);

export const foodSlice = createSlice({
  name: "food",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { food, quantity } = action.payload;
      const existingCartItem = state.cartList.find(
        (item) => item.food.id === food.id
      );

      if (existingCartItem) {
        existingCartItem.quantity += 1;
      } else {
        state.cartList.push({ food, quantity });
      }
    },
    removeCart: (state, {payload}) => {
      state.cartList = [];
    },
    incrementCartItemQuantity: (state, action) => {
      const foodId = action.payload;
      const cartItem = state.cartList.find((item) => item.food.id === foodId);

      if (cartItem) {
        cartItem.quantity += 1;
      }
    },
    decrementCartItemQuantity: (state, action) => {
      const foodId = action.payload;
      const cartItem = state.cartList.find((item) => item.food.id === foodId);

      if (cartItem) {
        cartItem.quantity -= 1;
        if (cartItem.quantity <= 0) {
          // Xóa món ăn khỏi giỏ hàng nếu số lượng là 0 hoặc nhỏ hơn
          state.cartList = state.cartList.filter(
            (item) => item.food.id !== foodId
          );
        }
      }
    },
    removeItemFormCart: (state,{payload}) => {
      state.cartList = state.cartList.filter(ele => ele.food.id !== payload)
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllFood.fulfilled, (state, action) => {
      state.food = action.payload.data;
    });
  },
});

export const selectCartTotalQuantity = (state: any) => {
  const cartList = state.food.cartList;
  return cartList.reduce((total: any, item: any) => total + item.quantity, 0);
};

export const { addToCart,removeCart , decrementCartItemQuantity, removeItemFormCart } = foodSlice.actions;
export default foodSlice.reducer;
