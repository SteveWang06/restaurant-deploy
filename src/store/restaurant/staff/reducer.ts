import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { StaffType } from "../../../types/StaffType";
import staffRequester from "../../../services/requester/staffRequester";

interface StaffState {
  staffList: StaffType[];
}

const initialState: StaffState = {
  staffList: [],
};

export const fetchAllStaff= createAsyncThunk(
  "staff/staffkFetchAll",
  async (keyWord: string, thunkApi) => {
    try {
      const res = await staffRequester.getAllStaff(keyWord);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const staffSlice = createSlice({
  name: "staff",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.
    addCase(fetchAllStaff.fulfilled, (state, {payload}) => {
      state.staffList = payload.data;
    })
  },
});



// export const {  } = orderSlice.actions;
export default staffSlice.reducer;
