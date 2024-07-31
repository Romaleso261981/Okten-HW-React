import { CarsModel } from "./CarsModel";

export type CarsResponse = {
  items: CarsModel[];
  carsRespons: {
    limit: number;
    page: number;
    data: CarsModel[];
  };
};
