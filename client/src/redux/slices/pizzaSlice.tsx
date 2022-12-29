import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { PizzaTypes } from "../../types/types";
import axios from "../../axios";


export const fetchPizzas = createAsyncThunk<FetchPizzasTypes, number | undefined, {rejectValue: string}>('pizzas/fetchPizzas', async (categoryId, { rejectWithValue }) => {
  const {data}: any = categoryId ? await axios.get('/api/pizzas/' + categoryId) : await axios.get('/api/pizzas')
  if (!data) {
    return rejectWithValue('Server Error!');
  }
  return data;
});

export const fetchSortPizzas: any = createAsyncThunk('pizzas/fetchSortPizzas', async (value: string) => {
  const {data} = await axios.get('/api/sort/' + value)
  return data;
});

export const fetchSearchPizzas: any = createAsyncThunk('pizzas/fetchSearchPizzas', async (value: string) => {
  const {data} = value ? await axios.get('/api/search/' + value) : await axios.get('/api/pizzas')
  return data;
});

export const fetchPaginationPizzas: any = createAsyncThunk('pizzas/fetchPaginationPizzas', async (page: number) => {
  const {data} = await axios.get('/api/pizzas?p=' + page)
  return data;
});

type FetchPizzasTypes = {
  pages: number,
  pizzas: PizzaTypes[],  //ожидаем массив
}

export type PizzaState = {
  pages : number,
  pizzas: PizzaTypes[] | [], // принимаем массив
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
    .addCase(fetchPaginationPizzas.fulfilled, (state, action) => { /// <-----
      state.pages = action.payload.pages;
      state.pizzas = action.payload.pizzas; 
      state.isLoading = 'loaded';
    })
    .addCase(fetchPaginationPizzas.rejected, (state) => {
      state.pages = 0;
      state.isLoading = 'error';
    })
  }
});


export default pizzaSlice.reducer;









 // extraReducers: {
  //   [fetchPizzas.pending]: (state: any) => {
  //     state.pizza.items.pizzas = [];
  //     state.pizza.status = 'loading'
  //   },
  //   [fetchPizzas.fulfilled]: (state, action) => {
  //     state.pizza.items = action.payload;
  //     state.pizza.status = 'loaded'
  //   },
  //   [fetchPizzas.rejected]: (state) => {
  //     state.pizza.items.pizzas = [];
  //     state.pizza.status = 'error'
  //   },
    // [fetchSortPizzas.pending]: (state) => {
    //   state.pizza.items.pizzas = [];
    //   state.pizza.status = 'loading'
    // },
    // [fetchSortPizzas.fulfilled]: (state, action) => {
    //   state.pizza.items = action.payload;
    //   state.pizza.status = 'loaded'
    // },
    // [fetchSortPizzas.rejected]: (state) => {
    //   state.pizza.items.pizzas = [];
    //   state.pizza.status = 'error'
    // },
  //   [fetchSearchPizzas.pending]: (state) => {
  //     state.pizza.items.pizzas = [];
  //     state.pizza.status = 'loading'
  //   },
  //   [fetchSearchPizzas.fulfilled]: (state, action) => {
  //     state.pizza.items = action.payload;
  //     state.pizza.status = 'loaded'
  //   },
  //   [fetchSearchPizzas.rejected]: (state) => {
  //     state.pizza.items.pizzas = [];
  //     state.pizza.status = 'error'
  //   },
  //   [fetchPaginationPizzas.pending]: (state) => {
  //     state.pizza.items.pizzas = [];
  //     state.pizza.status = 'loading'
  //   },
  //   [fetchPaginationPizzas.fulfilled]: (state, action) => {
  //     state.pizza.items = action.payload;
  //     state.pizza.status = 'loaded'
  //   },
  //   [fetchPaginationPizzas.rejected]: (state) => {
  //     state.pizza.items.pizzas = [];
  //     state.pizza.status = 'error'
  //   },
  // },