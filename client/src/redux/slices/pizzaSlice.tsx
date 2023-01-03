import { createSlice, createAsyncThunk, AnyAction, PayloadAction } from "@reduxjs/toolkit";
import { PizzaTypes } from "../../types/types";
import axios from "../../axios";


export const fetchPizzas = createAsyncThunk<FetchPizzasTypes, number | undefined, {rejectValue: string}>('pizzas/fetchPizzas', async (categoryId, { rejectWithValue }) => {
  const {data}: DataType = categoryId ? await axios.get('/api/pizzas/' + categoryId) : await axios.get('/api/pizzas')
  if (!data) {
    return rejectWithValue('Server Error!');
  }
  return data;
});

export const fetchSortPizzas = createAsyncThunk<FetchPizzasTypes, string, {rejectValue: string}>('pizzas/fetchSortPizzas', async (value: string, { rejectWithValue }) => {
  const {data}: DataType = await axios.get('/api/sort/' + value)
  if (!data) {
    return rejectWithValue('Server Error!');
  }
  return data;
});

export const fetchSearchPizzas = createAsyncThunk<FetchPizzasTypes, string, {rejectValue: string}>('pizzas/fetchSearchPizzas', async (value: string, { rejectWithValue }) => {
  const {data}: DataType = value ? await axios.get('/api/search/' + value) : await axios.get('/api/pizzas')
  if (!data) {
    return rejectWithValue('Server Error!');
  }
  return data;
});

export const fetchPaginationPizzas = createAsyncThunk<FetchPizzasTypes, number, {rejectValue: string}>('pizzas/fetchPaginationPizzas', async (page: number, { rejectWithValue }) => {
  const {data}: DataType = await axios.get('/api/pizzas?p=' + page)
  if (!data) {
    return rejectWithValue('Server Error!');
  }
  return data;
});

type DataType = {
  data: {
    pages: number,
    pizzas: PizzaTypes[],
  }
}

type FetchPizzasTypes = {
  pages: number,
  pizzas: PizzaTypes[],
}

export type PizzaState = {
  pages : number,
  pizzas: PizzaTypes[] | [],
  isLoading: 'idle' | 'loading' | 'loaded' | 'error',
  error: null | string,
};

const initialState: PizzaState = {
  pages: 1,
  pizzas: [],
  isLoading: 'idle',
  error: null,
};

export const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    ///fetchPizzas
    .addCase(fetchPizzas.pending, (state) => {
      state.pizzas = [];
      state.isLoading = 'loading';
    })
    .addCase(fetchPizzas.fulfilled, (state, action) => {
      state.pages = action.payload.pages;
      state.pizzas = action.payload.pizzas; 
      state.isLoading = 'loaded';
    })
    .addCase(fetchPizzas.rejected, (state) => {
      state.pizzas = [];
      state.isLoading = 'error';
    })
    ///fetchSortPizzas
    .addCase(fetchSortPizzas.pending, (state) => {
      state.pizzas = [];
      state.isLoading = 'loading';
    })
    .addCase(fetchSortPizzas.fulfilled, (state, action) => {
      state.pages = action.payload.pages;
      state.pizzas = action.payload.pizzas; 
      state.isLoading = 'loaded';
    })
    .addCase(fetchSortPizzas.rejected, (state) => {
      state.pizzas = [];
      state.isLoading = "error";
    })
    ///fetchSearchPizzas
    .addCase(fetchSearchPizzas.pending, (state) => {
      state.pizzas = [];
      state.isLoading = 'loading';
    })
    .addCase(fetchSearchPizzas.fulfilled, (state, action) => {  
      state.pages = action.payload.pages;
      state.pizzas = action.payload.pizzas; 
      state.isLoading = 'loaded';
    })
    .addCase(fetchSearchPizzas.rejected, (state) => {
      state.pizzas = [];  
      state.isLoading = 'error';
    })
    ///fetchPaginationPizzas
    .addCase(fetchPaginationPizzas.pending, (state) => {
      state.pages = 0;
      state.isLoading = 'loading';
    })
    .addCase(fetchPaginationPizzas.fulfilled, (state, action) => {
      state.pages = action.payload.pages;
      state.pizzas = action.payload.pizzas; 
      state.isLoading = 'loaded';
    })
    .addCase(fetchPaginationPizzas.rejected, (state) => {
      state.pages = 0;
      state.isLoading = 'error';
    })
    ///Проверка на ошибки
    .addMatcher(isError, (state, action: PayloadAction<string>) => {
      state.error = action.type;
      state.isLoading = "error"
    })
  }
});


export default pizzaSlice.reducer;

function isError(action: AnyAction) {
  return action.type.endsWith('rejected');
}


