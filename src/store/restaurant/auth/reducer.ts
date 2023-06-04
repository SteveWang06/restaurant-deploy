import { LoginPayload } from "./../../../types/AuthType";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AuthStatus } from "../../../constants/authConst";

import { UserType } from "../../../types/AuthType";
import userRequester from "../../../services/requester/userRequester";
import { AxiosResponse } from "axios";

interface AuthState {
  isLoading: boolean;
  status: AuthStatus.Auth | AuthStatus.UnAuth;
  profile?: any;

}

const initialState: AuthState = {
  isLoading: false,
  status: AuthStatus.UnAuth,
  profile: undefined,
};

export const userLogin = createAsyncThunk(
  "/user/Login",
  async (_, thunkApi) => {
      const profile = await userRequester.userFetchProfile();
      return profile.data.data; 
  }
);


export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state, { payload }) => {
      state.isLoading = false;
      state.status = AuthStatus.UnAuth;
      state.profile = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userLogin.fulfilled, (state, {payload}) => {
        state.profile = payload
    })
  },
});

export const {logout} = authSlice.actions;

export default authSlice.reducer;


