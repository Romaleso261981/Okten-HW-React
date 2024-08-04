import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../../API";
import { apiCarsPath } from "../../shared/types/enums";
import { CarsResponse } from "../../models/CarsResponseModel";
import { CarsState } from "../../shared/types/Types";
import { CarsModel } from "../../models/CarsModel";

type RequestGetOwnCar = {
  page: number;
};

const initialState: CarsState = {
  isLogged: false,
  items: [],
  carsRespons: {
    total_pages: 0,
    total_items: 0,
    limit: 0,
    page: 0,
    data: []
  }
};

export const getOwnCars = createAsyncThunk<CarsResponse, RequestGetOwnCar>(
  "cars/getOwnCars",
  async (params: RequestGetOwnCar, { rejectWithValue }) => {
    try {
      const response = await API.get<CarsResponse>(apiCarsPath.CARS, {
        params
      });
      return response.data;
    } catch (error) {
      return rejectWithValue("Error while fetching cars");
    }
  }
);

export const addedCar = createAsyncThunk<CarsResponse, Omit<CarsModel, "id">>(
  "cars/addedCar",
  async (data, { rejectWithValue }) => {
    try {
      const response = await API.post(apiCarsPath.CARS, data);
      return response.data;
    } catch (error) {
      return rejectWithValue("Error while fetching cars");
    }
  }
);

export const deleteCar = createAsyncThunk<CarsResponse, string | undefined>(
  "cars/deleteCar",
  async (id, { rejectWithValue }) => {
    try {
      const response = await API.delete(`cars/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue("Error while fetching cars");
    }
  }
);

export const edditCar = createAsyncThunk<
  CarsResponse,
  { id: string } | undefined
>("cars/deleteCar", async (data, { rejectWithValue }) => {
  if (!data) return rejectWithValue("Error while fetching cars");
  try {
    const response = await API.put(`cars/edit/${data.id}`, data);
    return response.data;
  } catch (error) {
    return rejectWithValue("Error while fetching cars");
  }
});

const CarsSlice = createSlice({
  name: "cars",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOwnCars.pending, (state) => {
      state.isLogged = true;
    });
    builder.addCase(getOwnCars.fulfilled, (state, { payload }) => {
      state.carsRespons.total_items = payload.carsRespons.total_items;
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
