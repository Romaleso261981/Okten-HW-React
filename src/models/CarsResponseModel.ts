import { CarsModel } from "./CarsModel";

export type CarsResponse = {
  items: CarsModel[];
  carsRespons: {
    total_pages: number;
    total_items: number;
    prev: number;
    next: number;
  };
};
