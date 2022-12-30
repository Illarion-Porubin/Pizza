import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { UserTypes } from "../../types/types";
import axios from "../../axios";
// import AuthService from "../../services/AuthService";
// import { IUser } from "../../models/IUser";

export const fetchRegister: any = createAsyncThunk(
  "api/fetchRegister",
  async (params: any) => {
    const { data } = await axios.post("/api/register", params);
    return data;
  }
);

export const fetchLogin: any = createAsyncThunk(
  "api/fetchLogin",
  async (params: any) => {
    const { data } = await axios.post("/api/login", params);
    return data;
  }
);

export const fetchAuthMe: any = createAsyncThunk(
  "api/fetchAuthMe",
  async () => {
    const { data } = await axios.get("/api/me");
    return data;
  }
);

export const fetchUpdate: any = createAsyncThunk(
  "api/update",
  async (params: any) => {
    const { data } = await axios.put("/api/update", params);
    return data;
  }
);

export const fetchAvatar: any = createAsyncThunk(
  "api/avatar",
  async (params: any) => {
    console.log(params, "params");
    const { data } = await axios.put("/api/avatar", params);
    return data;
  }
);

// export const fetchGoogle: any = createAsyncThunk(
//   "api/fetchGoogle",
//   async () => {
//     const { data } = await axios.post("/api/google");
//     return data;
//   }
// );



export type AuthState = {
  data: null | UserTypes;
  status: string;
};

const initialState: AuthState = {
  data: null,
  status: "loading",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
    ///fetchRegister
    .addCase(fetchRegister.pending, (state) => {
      state.data = null;
      state.status = "loading";
    })
    .addCase(fetchRegister.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
    })
    .addCase(fetchRegister.rejected, (state) => {
      state.data = null;
      state.status = "error";
    })
    ///fetchLogin
    .addCase(fetchLogin.pending, (state) => {
      state.data = null;
      state.status = "loading";
    })
    .addCase(fetchLogin.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
    })
    .addCase(fetchLogin.rejected, (state) => {
      state.data = null;
      state.status = "error";
    })
    ///fetchAuthMe
    .addCase(fetchAuthMe.pending, (state) => {
      state.data = null;
      state.status = "loading";
    })
    .addCase(fetchAuthMe.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
    })
    .addCase(fetchAuthMe.rejected, (state) => {
      state.data = null;
      state.status = "error";
    })
    /////////////////
    // [fetchGoogle.pending]: (state) => {
    //   state.data = null;
    //   state.status = "loading";
    // },
    // [fetchGoogle.fulfilled]: (state, action) => {
    //   state.data = action.payload;
    //   state.status = "loaded";
    // },
    // [fetchGoogle.rejected]: (state) => {
    //   state.data = null;
    //   state.status = "error";
    // },
  },
});

export default authSlice.reducer;

export const { logout } = authSlice.actions;
