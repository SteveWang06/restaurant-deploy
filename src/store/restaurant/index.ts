import { combineReducers } from "@reduxjs/toolkit";
import { authSlice } from "./auth";
import { foodSlice } from "./food";
import { orderSlice } from "./order";
import { calendarWorkStateSlice } from "./calendarWork";
import { staffSlice } from "./staff";

const createReducer = combineReducers({
  /** Add extra reducers */
  auth: authSlice.reducer,
  food: foodSlice.reducer,
  order: orderSlice.reducer,
  calendarWork: calendarWorkStateSlice.reducer,
  staff: staffSlice.reducer,
});

export default createReducer;