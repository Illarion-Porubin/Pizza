import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";
// import { PizzaTypes } from "../../types/types";

export const fetchOrder: any = createAsyncThunk(
  "api/fetchOrder",
  async (params: any) =>
  {
    const { data } = await axios.post("/api/order", params);
    return data;
  }
);

type CartState = {
  totalPrice: number;
  totalCount: number;
  items: any;
  isLoading: boolean;
  status: string;
};

// const stateLocal: any = localStorage.getItem("persist:root")
// const mainState = JSON.parse(stateLocal).cartSliceReducer;

const initialState: CartState = {
  items: [],
  totalPrice: 0,
  totalCount: 0, /////////////////////////////////////////////////////////////////////////////////////
  status: 'loading',
  isLoading: false,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addOrder(state, action: any) { 
      if(!state.items.length) {
         state.items.push(action.payload)
      }
      else {
        const check = state.items.find((item: any) => {
          if(item.identity === action.payload.identity) {
            return item 
          }
          return false
        }) 
        check ? check.count = check.count += action.payload.count : state.items.push(action.payload)
      }
    },
    plusOrder(state, action: any) {
      const check = state.items.find((item: any) => {
        if(item.identity === action.payload) {
          return item 
        }
        else {
          return false
        }
      }) 
      check.count++ 
    },
    minusOrder(state, action: any) {
      const check = state.items.find((item: any) => {
        if(item.identity === action.payload) {
          return item 
        }
        else {
          return false
        }
      }) 
      check.count-- 
    },
    removeItem(state, action) {
      state.items = state.items.filter((item: any) => item.identity !== action.payload); 
    },
    clearItems(state) {
      state.items = [];
    },
  },
});


export default cartSlice.reducer;