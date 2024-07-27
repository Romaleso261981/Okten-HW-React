import { useEffect, useState } from "react";
import { API } from "../../API";
import { CarsResponse } from "../../models/CarsResponseModel";
import { CarsModel } from "../../models/CarsModel";

export default function CarsPages() {
  const [cars, setCars] = useState<CarsModel[]>([]); // Встановлюємо тип як CarsModel[]

  const getCarsData = async () => {
    try {
      const response = await API.get<CarsResponse>("cars");
      console.log(response.data.carsRespons);
      setCars(response.data.carsRespons.data); // Встановлюємо масив CarsModel[]
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCarsData();
  }, []);

  if (!cars) return <div>Loading...</div>;

  return (
    <ul>
      {cars.map((car) => {
        return (
          <li key={car._id}>
            <span>
              {car.name} - {car.model} - {car.price} - {car.owner}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
