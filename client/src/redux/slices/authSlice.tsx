import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RegisterTypes } from "../../types/types";
import axios from "../../axios";
// import AuthService from "../../services/AuthService";
// import { IUser } from "../../models/IUser";

export const fetchRegister = createAsyncThunk<RegisterTypes, RegisterTypes, { rejectValue: string }>(
  "api/fetchRegister", async (params, { rejectWithValue }) => {
  const { data }: {data: RegisterTypes} = await axios.post("/api/register", params); 
  if (!data) {
    return rejectWithValue("Server Error!");
  }
  return data;
});

export const fetchLogin = createAsyncThunk<RegisterTypes, RegisterTypes, { rejectValue: string }>(
  "api/fetchLogin", async (params, { rejectWithValue }) => {
    const { data }: {data: RegisterTypes} = await axios.post("/api/login", params);
    if (!data) {
      return rejectWithValue("Server Error!");
    }
    return data;
  }
);

// type LoginTypes = {
//   data: {
//     accessToken:  string;
//     refreshToken: string;
//     user: {
//       email: string;
//       id: string;
//       isActivated: boolean;
//       name: string;
//       phone: string;
//     }
//   }
// }

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
  data: RegisterTypes | null;
  isLoading: "idle" | "loading" | "loaded" | "error";
}

const initialState: AuthState  = {
  data: null,
  isLoading: "idle",
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
        state.isLoading = "loading";
      })
      .addCase(fetchRegister.fulfilled, (state, action) => {
        console.log(action.payload, `fetchRegister`)
        state.data = action.payload;
        state.isLoading = "loaded";
      })
      .addCase(fetchRegister.rejected, (state) => {
        state.data = null;
        state.isLoading = "error";
      })
      ///fetchLogin
      .addCase(fetchLogin.pending, (state) => {
        state.data = null;
        state.isLoading = "loading";
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        console.log(action.payload, `fetchLogin`)
        state.data = action.payload;
        state.isLoading = "loaded";
      })
      .addCase(fetchLogin.rejected, (state) => {
        state.data = null;
        state.isLoading = "error";
      })
      ///fetchAuthMe
      .addCase(fetchAuthMe.pending, (state) => {
        state.data = null;
        state.isLoading = "loading";
      })
      .addCase(fetchAuthMe.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isLoading = "loaded";
      })
      .addCase(fetchAuthMe.rejected, (state) => {
        state.data = null;
        state.isLoading = "error";
      });
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
