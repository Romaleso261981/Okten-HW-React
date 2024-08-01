import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../../API";
import { apiCarsPath } from "../../shared/types/enums";
import { CarsResponse } from "../../models/CarsResponseModel";
import { CarsState } from "../../shared/types/Types";

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
      let { data } = await API.get<CarsResponse>(apiCarsPath.GETOWNCARS);
      return data;
    } catch (error) {
      throw new Error("Error while fetching cars");
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
      state.carsRespons.limit = payload.carsRespons.limit;
      state.carsRespons.page = payload.carsRespons.page;
      state.carsRespons.data = payload.carsRespons.data;
    });
    builder.addCase(getOwnCars.rejected, () => {});
  }
});

export default CarsSlice.reducer;
