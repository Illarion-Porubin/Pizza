import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { CartTypes } from "../../types/types";
import axios from "../../axios";


export const fetchOrder = createAsyncThunk<CartState, CartState, {rejectValue: string | unknown}>("cart/fetchOrder", async (params, { rejectWithValue }) => {
  const { data }: DataType = await axios.post("/api/order", params);
  if (!data) {
    return rejectWithValue("Server Error!");
  }
  return data;
});

type DataType = {
  data: {
    phone: string,
    items: CartTypes[],
    totolCount?: number,
    totolPrice?: number,
  }
}

export type CartState = {
  items: CartTypes[];
};

export const initialState: CartState = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addOrder(state, action: PayloadAction<CartTypes> ) {
      if (!state.items?.length) {
        state.items?.push(action.payload);
      } else {
        const check = state.items.find((item: CartTypes) => {
          if (action.payload.identity === item.identity) {
            return item;
          }
          return false;
        });
        check ? (check.pizzasCount = check.pizzasCount += action.payload.pizzasCount) : state.items.push(action.payload);
      }
    },
    plusOrder(state, action: PayloadAction<string>) {
      const check = state.items?.find((item: CartTypes) => {
        if (item.identity === action.payload) {
          return item;
        } else {
          return false;
        }
      });
      if (check) check.pizzasCount++;
    },
    minusOrder(state, action: PayloadAction<string>) {
      const check = state.items?.find((item: CartTypes) => {
        if (item.identity === action.payload) {
          return item;
        } else {
          return false;
        }
      });
      if (check) check!.pizzasCount--;
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items?.filter(
        (item: CartTypes) => item.identity !== action.payload
      );
    },
    clearItems(state) {
      state.items = [];
    },
  },
});

export default cartSlice.reducer;