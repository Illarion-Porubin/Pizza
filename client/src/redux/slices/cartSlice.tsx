import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { PizzaTypes } from "../../types/types";
import axios from "../../axios";

export const fetchOrder: any = createAsyncThunk(
  "api/fetchOrder",
  async (params: PizzaTypes) => {
    const { data } = await axios.post("/api/order", params);
    return data;
  }
);

interface ItemsTypes extends PizzaTypes {
  push: any;
  find: (value: object) => PizzaTypes | false;
  filter: any;
  map: any;
  reduce: any;
  length: number;
}

export type CartState = {
  items: [] | ItemsTypes;
  isLoading: boolean;
  status: string;
};

export const initialState: CartState = {
  items: [],
  status: "loading",
  isLoading: false,
};

type AddActionType = {
  payload: PizzaTypes;
  type: string;
};

type CountActionType = {
  payload: string;
  type: string;
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addOrder(state, action: AddActionType) {
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
          : state.items.push(action.payload);
      }
    },
    plusOrder(state, action: CountActionType) {
      const check = state.items.find((item: PizzaTypes) => {
        if (item.identity === action.payload) {
          return item;
        } else {
          return false;
        }
      });
      if (check) check.pizzasCount++;
    },
    minusOrder(state, action: CountActionType) {
      const check = state.items.find((item: PizzaTypes) => {
        if (item.identity === action.payload) {
          return item;
        } else {
          return false;
        }
      });
      if (check) check!.pizzasCount--;
    },
    removeItem(state, action: CountActionType) {
      state.items = state.items.filter(
        (item: PizzaTypes) => item.identity !== action.payload
      );
    },
    clearItems(state) {
      state.items = [];
    },
  },
});

export default cartSlice.reducer;
