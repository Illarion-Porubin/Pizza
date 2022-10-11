import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { PizzaTypes } from "../../types/types";
import axios from "../../axios";

// export const fetchAddPizzas: any = createAsyncThunk('pizzas/fetchAddPizzas', async (value: object) => {
//   const {data} = await axios.post('/add', value={value})
//   return data;
// });

type CartState = {
  totalPrice: number;
  totalCount: number;
  items: any;
  isLoading: boolean;
  status: string;
};

const initialState: CartState = {
  totalPrice: 0,
  totalCount: 0,
  status: 'loading',
  items: [],
  isLoading: false,
};

// localStorage.setItem("state", JSON.stringify(initialState))

// let stateCart = JSON.parse(localStorage.getItem("state") || "");

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: any) {
      state.items.push(action.payload);
      state.totalCount = state.items.length;
      state.totalPrice = state.items.reduce((sum: number, obj: any) => {
        return +obj.price + +sum
      }, 0);
    },
    removeItem(state, action) {
      state.items = state.items.filter((obj: any) => obj.id !== action.payload);
    },
    clearItems(state) {
      state.items = [];
    },
  },
  extraReducers: {
    // [fetchAddPizzas.pending]: (state) => {
    //   state.items = [];
    //   state.status = "loading";
    // },
    // [fetchAddPizzas.fulfilled]: (state, action) => {
    //   state.items = action.payload;
    //   state.status = "loaded";
    // },
    // [fetchAddPizzas.rejected]: (state) => {
    //   state.items = [];
    //   state.status = "error";
    // },
  },
});

export default cartSlice.reducer;























 // {
      //   category: "1",
      //   imageUrl: "https://cdn.dodostatic.net/static/Img/Products/a02280d5dd9342f7925538752be9b521_292x292.jpeg",
      //   name: "Четыре сезона",
      //   price: "525",
      //   rating: "8",
      //   sizes: '26',
      //   types: 'традиционное',
      //   count: 2,
      //   _id: '630df0304af71ef7546de9d7'
      // },
      // {
      //   category: "1",
      //   imageUrl: "https://cdn.dodostatic.net/static/Img/Products/a02280d5dd9342f7925538752be9b521_292x292.jpeg",
      //   name: "Четыре сезона",
      //   price: "525",
      //   rating: "8",
      //   sizes: '40',
      //   types: 'тонкое',
      //   count: 1,
      //   _id: '630df0304af71ef7546de9d6'
      // },
      // {
      //   category: "1",
      //   imageUrl: "https://cdn.dodostatic.net/static/Img/Products/5630c6ed3f394c7ba25e1ef79a67b7ee_292x292.jpeg",
      //   name: "Ветчина и Сыр",
      //   price: "480",
      //   rating: "7",
      //   sizes: '26',
      //   types: 'традиционное',
      //   count: 1,
      //   _id: '630df04a4af71ef7546de9d9'
      // },
      // {
      //   category: "1",
      //   imageUrl: "https://cdn.dodostatic.net/static/Img/Products/5630c6ed3f394c7ba25e1ef79a67b7ee_292x292.jpeg",
      //   name: "Ветчина и Сыр",
      //   price: "480",
      //   rating: "7",
      //   sizes: '40',
      //   types: 'тонкое',
      //   count: 2,
      //   _id: '630df04a4af71ef7546de9d8'
      // },