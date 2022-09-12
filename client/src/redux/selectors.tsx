import { AppState } from './store';
export const selectCurrentData = (state: AppState) => state.pizzaSliceReducer;
export const selectAuthData = (state: AppState) => state.authSliceReducer;
