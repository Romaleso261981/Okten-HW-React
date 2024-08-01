import { RootState } from "../store";

export const getUsers = (state: RootState) => state.user;
export const isLoggedUser = (state: RootState) => state.user.isLogged;
