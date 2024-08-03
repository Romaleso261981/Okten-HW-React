import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../../API";
import { apiCarsPath } from "../../shared/types/enums";
import { CarsResponse } from "../../models/CarsResponseModel";
import { CarsState } from "../../shared/types/Types";
import { CarsModel } from "../../models/CarsModel";

const initialState: CarsState = {
  isLogged: false,
  items: [],
  carsRespons: {
    limit: 0,
    page: 0,
    data: []
  }
};

export const getOwnCars = createAsyncThunk<CarsResponse>(
  "cars/getOwnCars",
  async () => {
    try {
      let { data } = await API.get<CarsResponse>(apiCarsPath.CARS);
      return data;
    } catch (error) {
      throw new Error("Error while fetching cars");
    }
  }
);

export const addedCar = createAsyncThunk<CarsResponse, Omit<CarsModel, "id">>(
  "cars/addedCar",
  async (data, thunkAPI) => {
    try {
      const response = await API.post(apiCarsPath.CARS, data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Error while fetching cars");
    }
  }
);

export const deleteCar = createAsyncThunk<CarsResponse, string | undefined>(
  "cars/deleteCar",
  async (id, thunkAPI) => {
    try {
      const response = await API.delete(`cars/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Error while fetching cars");
    }
  }
);

const CarsSlice = createSlice({
  name: "cars",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOwnCars.pending, (state) => {
      state.isLogged = true;
    });
    builder.addCase(getOwnCars.fulfilled, (state, { payload }) => {
      state.isLogged = false;
      state.items = payload.items;
    });
    builder.addCase(getOwnCars.rejected, () => {});
    builder.addCase(addedCar.pending, () => {});
    builder.addCase(addedCar.fulfilled, (state, { payload }) => {
      state.items = payload.items;
    });
    builder.addCase(addedCar.rejected, () => {});
    builder.addCase(deleteCar.pending, () => {});
    builder.addCase(deleteCar.fulfilled, (state, { payload }) => {
      state.items = payload.items;
    });
    builder.addCase(deleteCar.rejected, () => {});
  }
});

export default CarsSlice.reducer;
