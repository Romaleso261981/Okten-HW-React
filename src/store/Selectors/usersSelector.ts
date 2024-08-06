import { RootState } from "../store";

export const getAllUsers = (state: RootState) => state.users.items;
