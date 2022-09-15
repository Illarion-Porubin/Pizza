import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { PizzaTypes } from "../../types/types";
import axios from "../../axios";

export const fetchPizzas: any = createAsyncThunk('pizzas/fetchPizzas', async (categoryId: string) => {
  const {data} = categoryId ? await axios.get('/pizzas/' + categoryId) : await axios.get('/pizzas')
  return data;
});

export const fetchSortPizzas: any = createAsyncThunk('pizzas/fetchSortPizzas', async (value: string) => {
  const {data} = await axios.get('/sort/' + value)
  return data;
});

export const fetchSearchPizzas: any = createAsyncThunk('pizzas/fetchSearchPizzas', async (value: string) => {
  const {data} = value ? await axios.get('/search/' + value) : await axios.get('/pizzas')
  return data;
});

export const fetchPaginationPizzas: any = createAsyncThunk('pizzas/fetchPaginationPizzas', async (page: number) => {
  const {data} = await axios.get('/pizzas?p='+page)
  return data;
});

export const fetchAddPizzas: any = createAsyncThunk('pizzas/fetchAddPizzas', async (value: object) => {
  const {data} = await axios.post('/add', value={value})
  return data;
});


type PizzaState = {
  pizza: {
    items: {
      pages: number,
      pizzas: PizzaTypes[],
    }
    status: string
  };
  isLoading: boolean;
};


//popular new

const initialState: PizzaState = {
  pizza: {
    items: {
      pages: Number(),
      pizzas: []
    },
    status: "loading"
  },
  isLoading: false,
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
      state.pizza.items.pizzas = [];
      state.pizza.status = 'loading'
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.pizza.items = action.payload;
      state.pizza.status = 'loaded'
    },
    [fetchPizzas.rejected]: (state) => {
      state.pizza.items.pizzas = [];
      state.pizza.status = 'error'
    },
    [fetchSortPizzas.pending]: (state) => {
      state.pizza.items.pizzas = [];
      state.pizza.status = 'loading'
    },
    [fetchSortPizzas.fulfilled]: (state, action) => {
      state.pizza.items = action.payload;
      state.pizza.status = 'loaded'
    },
    [fetchSortPizzas.rejected]: (state) => {
      state.pizza.items.pizzas = [];
      state.pizza.status = 'error'
    },
    [fetchSearchPizzas.pending]: (state) => {
      state.pizza.items.pizzas = [];
      state.pizza.status = 'loading'
    },
    [fetchSearchPizzas.fulfilled]: (state, action) => {
      state.pizza.items = action.payload;
      state.pizza.status = 'loaded'
    },
    [fetchSearchPizzas.rejected]: (state) => {
      state.pizza.items.pizzas = [];
      state.pizza.status = 'error'
    },
    [fetchPaginationPizzas.pending]: (state) => {
      state.pizza.items.pizzas = [];
      state.pizza.status = 'loading'
    },
    [fetchPaginationPizzas.fulfilled]: (state, action) => {
      state.pizza.items = action.payload;
      state.pizza.status = 'loaded'
    },
    [fetchPaginationPizzas.rejected]: (state) => {
      state.pizza.items.pizzas = [];
      state.pizza.status = 'error'
    },
  },
});



export default pizzaSlice.reducer;