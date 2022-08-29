import { AppDispath, AppState } from './../store/store';
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const useCustomDispatch = () => useDispatch<AppDispath>();
export const useCustomSelector: TypedUseSelectorHook<AppState> = useSelector;