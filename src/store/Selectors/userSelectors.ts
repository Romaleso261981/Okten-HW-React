import { RootState } from "../store";

export const getUsers = (state: RootState) => state.auth;
export const isLoggedUser = (state: RootState) => state.auth.isLogged;
