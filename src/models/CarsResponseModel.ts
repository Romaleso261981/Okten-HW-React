import { CarsModel } from "./CarsModel";

export type CarsResponse = {
  carsRespons: {
    limit: number;
    page: number;
    data: CarsModel[];
  };
};
