import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { PizzaTypes } from "../../types/types";
import axios from "../../axios";


export const fetchOrder: any = createAsyncThunk<any | void, CartState, { rejectValue: string } // пофиксить
>("cart/fetchOrder", async (params, { rejectWithValue }) => {
    console.log(params, 'params')
  const { data } = await axios.post("/api/order", params);
  if (!data) {
    return rejectWithValue("Server Error!");
  }
  return data;
});

export type CartState = {
  items: PizzaTypes[] | null | undefined;
  number: string | null;
};

export const initialState: CartState = {
  items: null,
  number: null,
};

// type OrderType = {
//   _id: number;
//   imageUrl: string;
//   name: string;
//   types: string;
//   sizes: number;
//   price: number;
//   pizzasPrice: number;
//   pizzasCount: number;
//   rating: number;
//   category: number;
//   identity: string;
// }

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addOrder(state, action: PayloadAction<PizzaTypes> ) {
      console.log(action.payload, "action.payload");
      if (!state.items?.length) {
        state.items?.push(action.payload);
      } else {
        const check = state.items.find((item: PizzaTypes) => {
          if (item.identity === action.payload.identity) {
            return item;
          }
          return false;
        });
        check
          ? (check.pizzasCount = check.pizzasCount +=
              action.payload.pizzasCount)
          : state.items.push();
      }
    },
    plusOrder(state, action: PayloadAction<string>) {
      const check = state.items?.find((item: PizzaTypes) => {
        if (item.identity === action.payload) {
          return item;
        } else {
          return false;
        }
      });
      if (check) check.pizzasCount++;
    },
    minusOrder(state, action: PayloadAction<string>) {
      const check = state.items?.find((item: PizzaTypes) => {
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
        (item: PizzaTypes) => item.identity !== action.payload
      );
    },
    clearItems(state) {
      state.items = [];
    },
  },
});

export default cartSlice.reducer;
