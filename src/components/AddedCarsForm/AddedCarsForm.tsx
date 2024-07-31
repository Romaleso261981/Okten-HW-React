import { SubmitHandler, useForm } from "react-hook-form";
import { carsService } from "../../shared/services/api.service";
import { CarsModel } from "../../models/CarsModel";

export const AddedCarsForm = () => {
  const { register, handleSubmit, reset } = useForm<CarsModel>();

  const addedCars: SubmitHandler<CarsModel> = (data) => {
    let formData: CarsModel = {
      _id: "0",
      brand: data.brand,
      year: data.year,
      price: data.price
    };

    carsService.addedCars(formData);
    reset();
  };

  return (
    <section>
      <form onSubmit={handleSubmit(addedCars)}>
        <input
          type="text"
          placeholder="brand"
          {...register("brand", {
            required: "Password is required!"
          })}
        />
        <input
          type="text"
          placeholder="Year"
          {...register("year", {
            required: "Password is required!"
          })}
        />
        <input
          type="text"
          placeholder="Price"
          {...register("price", {
            required: "Password is required!"
          })}
        />
        <button>Add</button>
      </form>
    </section>
  );
};
