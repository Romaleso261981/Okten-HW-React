import { useEffect, useState } from "react";
import { CarsModel } from "../../models/CarsModel";
import { AddedCarsForm, CarsList } from "../../components";

import s from "./CarsPages.module.css";
import { authService, carsService } from "../../shared/services/api.service";

export default function CarsPages() {
  const [cars, setCars] = useState<CarsModel[]>([]);
  const [isAddedCarsForm, setIsAddedCarsForm] = useState(false);

  const toggleAddedCarsForm = () => {
    setIsAddedCarsForm(!isAddedCarsForm);
  };

  const getCarsData = async () => {
    try {
      const response = await carsService.getCars();
      console.log(response);
      setCars(response.items);
    } catch (error) {
      authService.refreshAccessTocken();
      console.log(error);
    }
  };

  useEffect(() => {
    getCarsData();
  }, []);

  if (!cars) return <div>Loading...</div>;

  return (
    <div>
      <button className={s.addedCarsButton} onClick={toggleAddedCarsForm}>
        Added cars
      </button>
      {isAddedCarsForm && <AddedCarsForm />}
      <h1>Cars</h1>
      <CarsList cars={cars} />
    </div>
  );
}
