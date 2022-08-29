import { combineReducers, configureStore } from "@reduxjs/toolkit";
import pizzaSliceReducer from "./slices/pizzaSlice";

const rootReducer = combineReducers({
    pizzaSliceReducer, // название слайса где все данные
});

export const store = configureStore({
    reducer: rootReducer
})

export type AppState = ReturnType<typeof rootReducer>;
export type AppStore = typeof store;
export type AppDispath = AppStore['dispatch'];
 

