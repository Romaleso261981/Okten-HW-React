import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./Slices/UserSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import CarsSlice from "./Slices/CarsSlice";

export const store = configureStore({
  reducer: {
    user: UserSlice,
    cars: CarsSlice
  }
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
