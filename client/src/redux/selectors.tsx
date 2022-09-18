import { AppState } from './store';
export const selectCurrentData = (state: AppState) => state.pizzaSliceReducer;
export const selectCartData = (state: AppState) => state.cartSliceReducer;
export const selectAuthData = (state: AppState) => state.authSliceReducer;

