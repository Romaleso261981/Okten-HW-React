import { useEffect, useState } from "react";
import { AddedCarsForm, CarsList } from "../../components";

import s from "./CarsPages.module.css";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { isLoggedUser } from "../../store/Selectors/userSelectors";
import { useNavigate } from "react-router-dom";
import { getOwnCars, setCurrentPage } from "../../store/Slices/CarsSlice";
import { Pagination } from "../../components/Pagination/Pagination";
import { CardEditForm } from "../../components/CardEditForm/CardEditForm";

export default function CarsPages() {
  const [isAddedCarsForm, setIsAddedCarsForm] = useState(false);
  const [cardId, setCardId] = useState<string | undefined>("");
  const [isShowEditCard, setIsShowEditCard] = useState<boolean>(false);

  const isLogged = useAppSelector(isLoggedUser);
  const cars = useAppSelector((state) => state.cars.items);
  const {
    currentPages,
    carsRespons: { total_items }
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

  const toggleEditCardForm = (id: string | undefined) => {
    setCardId(id);
    setIsShowEditCard(!isShowEditCard);
  };

  const onPageChange = (pageNumber: number) => {
    dispatch(getOwnCars(pageNumber));
  };

  useEffect(() => {
    dispatch(getOwnCars(1));
  }, [currentPages, dispatch]);

  if (!cars) return <div>Loading...</div>;

  return (
    <div className={s.wrapper}>
      <button className={s.addedCarsButton} onClick={toggleAddedCarsForm}>
        Продати авто
      </button>
      {isAddedCarsForm && (
        <AddedCarsForm toggleAddedCarsForm={toggleAddedCarsForm} />
      )}
      <CarsList cars={cars} toggleEditCardForm={toggleEditCardForm} />
      {isShowEditCard && (
        <CardEditForm cardId={cardId} setIsShowEditCard={setIsShowEditCard} />
      )}
      <Pagination
        totalItems={total_items}
        itemsPerPage={6}
        onPageChange={onPageChange}
      />
    </div>
  );
}
