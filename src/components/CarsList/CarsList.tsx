import { FC } from "react";
import { CarsModel } from "../../models/CarsModel";

import s from "./CarsList.module.css";
import { useAppDispatch } from "../../store/store";
import { deleteCar } from "../../store/Slices/CarsSlice";

type CarsListProps = {
  cars: CarsModel[];
};

export const CarsList: FC<CarsListProps> = ({ cars }) => {
  const dispatch = useAppDispatch();

  const handleRemoveElement = (id: string | undefined) => {
    console.log("id", id);

    dispatch(deleteCar(id));
  };
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
              <button
                className={s.carButtonRemove}
                onClick={() => handleRemoveElement(car._id)}
              >
                Remove
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
};
