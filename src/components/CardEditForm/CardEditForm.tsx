import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import s from "./CardEditForm.module.css";
import { API } from "../../API";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { getOwnCars } from "../../store/Slices/CarsSlice";

type CardFormData = {
  _id?: string | undefined;
  year: string;
  brand: string;
  price: number;
  photo?: string;
};

type CardFormProps = {
  cardId: string | undefined;
  setIsShowEditCard: (value: boolean) => void;
};

export const CardEditForm: FC<CardFormProps> = ({
  cardId,
  setIsShowEditCard
}) => {
  const [card, setCard] = useState<CardFormData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const {} = useAppSelector((state) => state.cars);

  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<CardFormData>();

  const getCardById = async () => {
    try {
      setIsLoading(true);
      const response = await API.get(`cars/detail/${cardId}`);
      setCard(response.data);
      reset(response.data);
    } catch (error) {
      console.log("Error while fetching cars");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (cardId) {
      getCardById();
    }
  }, [cardId]);

  const handleEditCar = async (data: CardFormData) => {
    try {
      await API.post(`cars/update/${cardId}`, data);
      setIsShowEditCard(false);
      dispatch(getOwnCars());
      reset();
    } catch (error) {
      console.log("Error while editing car");
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <section className={s.formWrapper}>
      <form className={s.form} onSubmit={handleSubmit(handleEditCar)}>
        <div className={s.inputWrapper}>
          <input
            type="text"
            defaultValue={card?.brand}
            placeholder="Brand"
            {...register("brand", { required: "Brand is required" })}
          />
          {errors.brand && <p>{errors.brand.message}</p>}
        </div>
        <div className={s.inputWrapper}>
          <input
            type="text"
            defaultValue={card?.year}
            placeholder="Year"
            {...register("year", { required: "Year is required" })}
          />
          {errors.year && <p>{errors.year.message}</p>}
        </div>
        <div className={s.inputWrapper}>
          <input
            type="text"
            defaultValue={card?.photo}
            placeholder="Photo"
            {...register("photo")}
          />
          {errors.photo && <p>{errors.photo.message}</p>}
        </div>
        <div className={s.inputWrapper}>
          <input
            type="number"
            defaultValue={card?.price}
            placeholder="Price"
            {...register("price", { required: "Price is required" })}
          />
          {errors.price && <p>{errors.price.message}</p>}
        </div>
        <button>Submit</button>
      </form>
    </section>
  );
};
