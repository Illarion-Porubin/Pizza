import { AppState } from './store';
export const selectCurrentData = (state: AppState) => state.pizzaSliceReducer;