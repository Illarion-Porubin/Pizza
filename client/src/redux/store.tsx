import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./slices/authSlice";
import pizzaSliceReducer from "./slices/pizzaSlice";
import cartSliceReducer from "./slices/cartSlice"

const rootReducer = combineReducers({
    pizzaSliceReducer, 
    authSliceReducer,
    cartSliceReducer
});

export const store = configureStore({
    reducer: rootReducer,
})

export type AppState = ReturnType<typeof rootReducer>;
export type AppStore = typeof store;
export type AppDispath = AppStore['dispatch'];
 

