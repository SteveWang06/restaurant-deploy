import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { adminRequester } from "../../../services";
import { CalendarWorkListType, OrderListType } from "../../../types/orderType";

interface calendarWorkState {
  calendarWorkList: CalendarWorkListType[];
}

const initialState: calendarWorkState = {
  calendarWorkList: [],
};

export const fetchAllCalendarWork = createAsyncThunk(
  "calenderWork/calenderWorkFetchAll",
  async (_, thunkApi) => {
    try {
      const res = await adminRequester.getAllCalendarWork();
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const calendarWorkStateSlice = createSlice({
  name: "calenderWork",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.
    addCase(fetchAllCalendarWork.fulfilled, (state, {payload}) => {
      state.calendarWorkList = payload.data;
    })
  },
});



// export const {  } = orderSlice.actions;
export default calendarWorkStateSlice.reducer;
