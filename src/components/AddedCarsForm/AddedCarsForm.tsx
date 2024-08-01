import { SubmitHandler, useForm } from "react-hook-form";
import { CarsModel } from "../../models/CarsModel";
import { useAppDispatch } from "../../store/store";
import { addedCar } from "../../store/Slices/CarsSlice";

export const AddedCarsForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<CarsModel>();

  const dispatch = useAppDispatch();

  const handleAddCar: SubmitHandler<CarsModel> = (data) => {
    const formData: CarsModel = {
      brand: data.brand,
      year: data.year,
      price: data.price
    };
    dispatch(addedCar(formData));
    reset();
  };

  return (
    <section>
      <form onSubmit={handleSubmit(handleAddCar)}>
        <div>
          <input
            type="text"
            placeholder="Brand"
            {...register("brand", {
              required: "Brand is required!"
            })}
          />
          {errors.brand && <p>{errors.brand.message}</p>}
        </div>
        <div>
          <input
            type="text"
            placeholder="Year"
            {...register("year", {
              required: "Year is required!"
            })}
          />
          {errors.year && <p>{errors.year.message}</p>}
        </div>
        <div>
          <input
            type="text"
            placeholder="Price"
            {...register("price", {
              required: "Price is required!"
            })}
          />
          {errors.price && <p>{errors.price.message}</p>}
        </div>
        <button type="submit">Add</button>
      </form>
    </section>
  );
};
