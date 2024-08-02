import { SubmitHandler, useForm } from "react-hook-form";
import { CarsModel } from "../../models/CarsModel";
import { useAppDispatch } from "../../store/store";
import { addedCar } from "../../store/Slices/CarsSlice";

import s from "./AddedCarsForm.module.css";
import { FC } from "react";

type AddedCarsFormProps = {
  toggleAddedCarsForm: () => void;
};

export const AddedCarsForm: FC<AddedCarsFormProps> = ({
  toggleAddedCarsForm
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<Omit<CarsModel, "id">>();

  const dispatch = useAppDispatch();

  const handleAddCar: SubmitHandler<Omit<CarsModel, "id">> = (data) => {
    const formData: Omit<CarsModel, "id"> = {
      brand: data.brand,
      year: data.year,
      price: data.price,
      photo: data.photo
    };
    dispatch(addedCar(formData));
    reset();
  };

  return (
    <section className={s.formWrapper}>
      <div className={s.close} onClick={toggleAddedCarsForm}>
        X
      </div>
      <form onSubmit={handleSubmit(handleAddCar)}>
        <div className={s.inputWrapper}>
          <input
            type="text"
            placeholder="Brand"
            {...register("brand", {
              required: "Brand is required!"
            })}
          />
          {errors.brand && <p>{errors.brand.message}</p>}
        </div>
        <div className={s.inputWrapper}>
          <input
            type="text"
            placeholder="Year"
            {...register("year", {
              required: "Year is required!"
            })}
          />
          {errors.year && <p>{errors.year.message}</p>}
        </div>
        <div className={s.inputWrapper}>
          <input type="text" placeholder="Photo" {...register("photo")} />
          {errors.price && <p>{errors.price.message}</p>}
        </div>
        <div className={s.inputWrapper}>
          <input
            type="text"
            placeholder="Price"
            {...register("price", {
              required: "Price is required!"
            })}
          />
          {errors.price && <p>{errors.price.message}</p>}
        </div>
        <button type="submit" className={s.formBtn}>
          Add
        </button>
      </form>
    </section>
  );
};
