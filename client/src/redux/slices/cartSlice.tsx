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
      !state.items.length 
      ?state.items.push(action.payload) 
      :state.items.find((item: any) => (item._id === action.payload._id && item.types === action.payload.types && item.sizes === action.payload.sizes)
        ? item.count = item.count += action.payload.count 
        : state.items.push(action.payload))
    },
    plusOrder(state, action: any) {
      console.log(action.payload)
      state.items.find((item: any) => item._id === action.payload
      ? item.count += 1 
      : null)
    },
    minusOrder(state, action: any) {
      state.items.find((item: any) => item._id === action.payload
      ? item.count -= 1 
      : null)
    },

    removeItem(state, action) {
      state.items = state.items.filter((obj: any) => obj._id !== action.payload);  
    },
    clearItems(state) {
      state.items = [];
    },
  },
});



export default cartSlice.reducer;