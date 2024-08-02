import { FC } from "react";
import { CarsModel } from "../../models/CarsModel";

import s from "./CarsList.module.css";

type CarsListProps = {
  cars: CarsModel[];
};

export const CarsList: FC<CarsListProps> = ({ cars }) => {
  return (
    <ul className={s.carsList}>
      {cars.map((car) => {
        return (
          <li key={car.id} className={s.carItem}>
            <span>
              {car.brand} - {car.year} - {car.price}
            </span>
            <img
              src={
                car.photo ??
                "https://img.goodfon.ru/original/2360x1640/7/8a/bnw-f82-m44-series-coupe.jpg"
              }
              alt={car.brand}
            />
            <div className={s.buttonWrapper}>
              <button className={s.carButtonEdit}>Edit</button>
              <button className={s.carButtonRemove}>Remove</button>
            </div>
          </li>
        );
      })}
    </ul>
  );
};
