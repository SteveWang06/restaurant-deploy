import { combineReducers } from "@reduxjs/toolkit";
import { authSlice } from "./auth";
import { foodSlice } from "./food";
import { orderSlice } from "./order";

const createReducer = combineReducers({
  /** Add extra reducers */
  auth: authSlice.reducer,
  food: foodSlice.reducer,
  order: orderSlice.reducer,
});

export default createReducer;