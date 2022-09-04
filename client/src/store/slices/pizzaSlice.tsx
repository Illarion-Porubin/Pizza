import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { PizzaTypes } from "../../types/types";
import axios from "../../services/axios";

export const fetchPizzas: any = createAsyncThunk('pizzas/fetchPizzas', async (categoryId: any) => {
  const {data} = categoryId ? await axios.get('/pizzas/' + categoryId) : await axios.get('/pizzas')
  return data;
});

export const fetchSortPizzas: any = createAsyncThunk('pizzas/fetchSortPizzas', async (value: string) => {
  const {data} = await axios.get('/sort/' + value)
  return data;
});

export const fetchSearchPizzas: any = createAsyncThunk('pizzas/fetchSearchPizzas', async (value: string) => {
  const {data} = await axios.get('/search/' + value)
  return data;
});





type PizzaState = {
  pizza: {
    items: PizzaTypes[],
    status: string
  };
  isLoading: boolean;
  response: Response;
};

type Response = {
  status: number;
  message: string;
};

//popular new

const initialState: PizzaState = {
  pizza: {
    items: [],
    status: "loading"
  },
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
    [fetchSortPizzas.pending]: (state) => {
      state.pizza.items = [];
      state.pizza.status = 'loading'
    },
    [fetchSortPizzas.fulfilled]: (state, action) => {
      state.pizza.items = action.payload;
      state.pizza.status = 'loaded'
    },
    [fetchSortPizzas.rejected]: (state) => {
      state.pizza.items = [];
      state.pizza.status = 'error'
    },
    [fetchSearchPizzas.pending]: (state) => {
      state.pizza.items = [];
      state.pizza.status = 'loading'
    },
    [fetchSearchPizzas.fulfilled]: (state, action) => {
      state.pizza.items = action.payload;
      state.pizza.status = 'loaded'
    },
    [fetchSearchPizzas.rejected]: (state) => {
      state.pizza.items = [];
      state.pizza.status = 'error'
    },
  },
});

export default pizzaSlice.reducer;