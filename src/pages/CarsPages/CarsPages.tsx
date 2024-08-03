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
  const [currentPage, setCurrentPage] = useState<number>(1);

  const isLogged = useAppSelector(isLoggedUser);
  const cars = useAppSelector((state) => state.cars.items);

  const {
    carsRespons: { total_items, limit }
  } = useAppSelector((state) => state.cars);

  console.log("total_items  ", total_items);

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

  const onPageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    dispatch(getOwnCars({ page: pageNumber }));
  };

  useEffect(() => {
    dispatch(getOwnCars({ page: currentPage }));
  }, []);

  if (!cars) return <div>Loading...</div>;

  return (
    <div className={s.wrapper}>
      <button className={s.addedCarsButton} onClick={toggleAddedCarsForm}>
        Продати авто
      </button>
      {isAddedCarsForm && (
        <AddedCarsForm toggleAddedCarsForm={toggleAddedCarsForm} />
      )}
      <CarsList cars={cars} />
      <Pagination
        totalItems={total_items}
        itemsPerPage={limit}
        onPageChange={onPageChange}
      />
    </div>
  );
}
