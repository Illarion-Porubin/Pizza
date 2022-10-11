import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
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

export const fetchLogin: any = createAsyncThunk("api/fetchLogin",
  async (params: any) =>
  {
    const { data } = await axios.post("/api/login", params);
    return data;
  }
);

export const fetchGoogle: any = createAsyncThunk(
  "api/fetchGoogle",
  async () => {
    const { data } = await axios.post("/api/google");
    return data;
  }
);

// export const AuthLogin = async (params: any) => {
//   try {
//       const response = await AuthService.login(params.email, params.password);
//       console.log(response)
//       localStorage.setItem('token', response.data.accessToken);
//       console.log(response.data.user)
//   } catch (e: any) {
//       console.log(e.response?.data?.message);
//   }
// }

// export const fetchAuthMe: any = createAsyncThunk(
//   "auth/fetchAuthMe",
//   async (value: any) => {
//     const { data } = await axios.get("/auth/me/" + value);
//     return data;
//   }
// );

export const fetchAuthMe: any = createAsyncThunk(
  "api/fetchAuthMe",
  async () => {
    const { data } = await axios.get("/api/me");
    return data;
  }
);

type DataType = {
  admin: false;
  cart: [];
  email: null | string;
  name: null | string;
  token: null | string;
  _id: null | string;
  isActivated: boolean
  user: any // data.user потом поправлю login\regist
};

type AuthState = {
  data?: null | DataType;
  status: string;
};

//popular new

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
  extraReducers: {
    [fetchRegister.pending]: (state) => {
      state.data = null;
      state.status = "loading";
    },
    [fetchRegister.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
    },
    [fetchRegister.rejected]: (state) => {
      state.data = null;
      state.status = "error";
    },
    /////
    [fetchLogin.pending]: (state) => {
      state.data = null;
      state.status = "loading";
    },
    [fetchLogin.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
    },
    [fetchLogin.rejected]: (state) => {
      state.data = null;
      state.status = "error";
    },
    //////
    [fetchAuthMe.pending]: (state) => {
      state.data = null;
      state.status = "loading";
    },
    [fetchAuthMe.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
    },
    [fetchAuthMe.rejected]: (state) => {
      state.data = null;
      state.status = "error";
    },
    //////
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
