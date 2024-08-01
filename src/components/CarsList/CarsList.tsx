import { FC } from "react";
import { CarsModel } from "../../models/CarsModel";

type CarsListProps = {
  cars: CarsModel[];
};

export const CarsList: FC<CarsListProps> = ({ cars }) => {
  return (
    <ul>
      {cars.map((car) => {
        return (
          <li key={car.id}>
            <span>
              {car.brand} - {car.year} - {car.price}
            </span>
            <button>Remove</button>
          </li>
        );
      })}
    </ul>
  );
};
