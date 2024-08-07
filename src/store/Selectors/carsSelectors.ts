import { RootState } from "../store";

export const getOwnCars = (state: RootState) => state.cars.items;
