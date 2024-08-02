import { useEffect, useState } from "react";
import { AddedCarsForm, CarsList } from "../../components";

import s from "./CarsPages.module.css";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { isLoggedUser } from "../../store/Selectors/userSelectors";
import { useNavigate } from "react-router-dom";
import { getOwnCars } from "../../store/Slices/CarsSlice";
import { Pagination } from "../../components/Pagination/Pagination";

export default function CarsPages() {
  const [isAddedCarsForm, setIsAddedCarsForm] = useState(false);

  const isLogged = useAppSelector(isLoggedUser);
  const cars = useAppSelector((state) => state.cars.items);

  const {
    carsRespons: { data, limit, page }
  } = useAppSelector((state) => state.cars);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isLogged) {
      navigate("/auth");
    }
  }, [isLogged, navigate]);

  const toggleAddedCarsForm = () => {
    setIsAddedCarsForm(!isAddedCarsForm);
  };

  useEffect(() => {
    dispatch(getOwnCars());
  }, []);

  if (!cars) return <div>Loading...</div>;

  return (
    <div>
      <button className={s.addedCarsButton} onClick={toggleAddedCarsForm}>
        Продати авто
      </button>
      {isAddedCarsForm && (
        <AddedCarsForm toggleAddedCarsForm={toggleAddedCarsForm} />
      )}
      <h1>Cars</h1>
      <CarsList cars={cars} />
      <Pagination
        totalItems={data.length}
        itemsPerPage={10}
        onPageChange={() => {}}
      />
    </div>
  );
}
