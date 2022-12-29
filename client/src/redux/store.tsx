import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./slices/authSlice";
import pizzaSliceReducer from "./slices/pizzaSlice";
import cartSliceReducer from "./slices/cartSlice";
import storage from 'redux-persist/lib/storage';

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'


const rootReducer = combineReducers({
    pizzaSliceReducer, 
    authSliceReducer,
    cartSliceReducer
});

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cartSliceReducer'],
  }

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)

export type AppState = ReturnType<typeof rootReducer>;
export type AppStore = typeof store;
export type AppDispath = AppStore['dispatch'];
 

