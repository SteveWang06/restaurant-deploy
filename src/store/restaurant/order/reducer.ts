
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FoodType } from "../../../types/FoodType";
import { adminRequester } from "../../../services";
import  {OrderListType}  from "../../../types/orderType";

interface OrderState {
  isLoading: boolean;
  order?: OrderListType[];
}

const initialState: OrderState = {
  isLoading: false,
  order: undefined,
};

export const fetchAllOrder = createAsyncThunk(
  "order/fetchOrderList",
  async (data: string, thunkApi) => {
    try {
      const res = await adminRequester.getOrderList(data);
    console.log(res.data)
    return res.data;
    } catch (err) {
      console.log(err)
    }
  }
);

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllOrder.fulfilled, (state, action) => {
      state.order = action.payload.data;
    });
  },
});

export const selectCartTotalQuantity = (state: any) => {
  const cartList = state.food.cartList;
  return cartList.reduce((total: any, item: any) => total + item.quantity, 0);
};

// export const {  } = orderSlice.actions;
export default orderSlice.reducer;
