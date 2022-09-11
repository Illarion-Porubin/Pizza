import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchRegister: any = createAsyncThunk("auth/fetchRegister", async (params) => {
    const { data } = await axios.post("/auth/register", params);
    return data;
  }
);

type authState = {
    data: null,
    status: string,
    auth: any
}


const initialState: authState = {
    auth: Object,
    data: null,
    status: "loading",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state: authState) => {
      state.data = null;
    },
  },
  extraReducers: {
    [fetchRegister.pending]: (state: authState) => {
      state.status = "loading";
      state.data = null;
    },
    [fetchRegister.pending]: (state: authState, action) => {
      state.status = "loaded";
      state.data = action.payload;
    },
    [fetchRegister.pending]: (state: authState) => {
      state.status = "error";
      state.data = null;
    },
  },
});

export const selectIsAuth = (state: authState) => Boolean(state.auth.data);

export const { logout } = authSlice.actions;

export default authSlice.reducer;