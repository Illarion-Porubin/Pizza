import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { PizzaTypes } from "../../types/types";
import axios from "../../services/axios";

export const fetchPizzas: any = createAsyncThunk('pizzas/fetchPizzas', async () => {
  const { data } = await axios.get('/pizzas');
  return data;
});

type PizzaState = {
  pizza: {
    items: PizzaTypes[],
    status: string
  };
  isLoading: boolean;
  response: Response;
  filterMenu: string;
};

type Response = {
  status: number;
  message: string;
};

//popular new
// 2:24:34
const initialState: PizzaState = {
  pizza: {
    items: [],
    status: "loading"
  },
  filterMenu: 'Все',
  isLoading: false,
  response: {
    status: 0,
    message: "",
  },
};

export const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    changeIsLoading(state) {
      state.isLoading = true;
    },
    filterMenu(state, action) { 
      console.log(action)   
      state.filterMenu = action.payload.menu
    },
    pizzaSort(state, action) {
      console.log(action.payload.sort)
    }
  },
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.pizza.items = [];
      state.pizza.status = 'loading'
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.pizza.items = action.payload;
      state.pizza.status = 'loaded'
    },
    [fetchPizzas.rejected]: (state) => {
      state.pizza.items = [];
      state.pizza.status = 'error'
    },
  },
});

export default pizzaSlice.reducer;