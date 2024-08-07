import { RootState } from "../store";

export const getAllUsersSelector = (state: RootState) => state.users.items;

export const itemsPerPageSelector = (state: RootState) =>
  state.users.itemsPerPage;
