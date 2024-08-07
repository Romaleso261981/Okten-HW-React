import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import CarsSlice from "./Slices/CarsSlice";
import AuthSlice from "./Slices/AuthSlice";
import UsersSlice from "./Slices/UsersSlice";

export const store = configureStore({
  reducer: {
    auth: AuthSlice,
    cars: CarsSlice,
    users: UsersSlice
  }
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
