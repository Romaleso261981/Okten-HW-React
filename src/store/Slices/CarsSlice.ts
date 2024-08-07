import { createAsyncThunk, createSlice, isRejected } from "@reduxjs/toolkit";
import { API, apiBasePath, createFullUrl } from "../../API";
import { apiCarsPath } from "../../shared/types/enums";
import { CarsResponse } from "../../models/CarsResponseModel";
import { CarsState } from "../../shared/types/Types";
import { CarsModel } from "../../models/CarsModel";
import { RootState } from "../store";

type ApiDoc = {
  id: string;
};

const initialState: CarsState = {
  isLogged: false,
  items: [],
  error: null,
  currentPages: 1,
  carsRespons: {
    total_pages: 0,
    total_items: 0,
    limit: 0,
    page: 0,
    data: []
  }
};

export const getOwnCars = createAsyncThunk<CarsResponse>(
  "cars/getOwnCars",
  async (_, { rejectWithValue, getState }) => {
    try {
      const { cars } = getState() as RootState;
      console.log("cars.currentpage", cars.currentPages);
      const response = await API.get<CarsResponse>(
        createFullUrl(apiBasePath.RAILWAY, apiCarsPath.CARS),
        {
          params: {
            page: cars.currentPages,
            limit: cars.carsRespons.limit
          }
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(`Error while fetching cars${error}`);
    }
  }
);

export const getDoc = createAsyncThunk<ApiDoc>(
  "cars/getDoc",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get<ApiDoc>(apiCarsPath.DOCS);
      return response.data;
    } catch (error) {
      return rejectWithValue(`Error while fetching doc: ${error}`);
    }
  }
);

export const addedCar = createAsyncThunk<CarsResponse, Omit<CarsModel, "id">>(
  "cars/addedCar",
  async (data, { rejectWithValue }) => {
    try {
      const response = await API.post(
        createFullUrl(apiBasePath.RAILWAY, apiCarsPath.CARS),
        data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(`Error while fetching user${error}`);
    }
  }
);

export const deleteCar = createAsyncThunk<CarsResponse, string>(
  "cars/deleteCar",
  async (id, { rejectWithValue }) => {
    try {
      const response = await API.delete(`${apiBasePath.RAILWAY}/cars/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(`Error while fetching user${error}`);
    }
  }
);

export const edditCar = createAsyncThunk<CarsResponse, { id: string }>(
  "cars/edditCar",
  async (data, { rejectWithValue }) => {
    try {
      const response = await API.put(`cars/edit/${data.id}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(`Error while fetching user${error}`);
    }
  }
);

const CarsSlice = createSlice({
  name: "cars",
  initialState,
  reducers: {
    setCurrentPage: (state, { payload }) => {
      state.currentPages = payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getOwnCars.pending, (state) => {
      state.isLogged = true;
    });
    builder.addCase(getOwnCars.fulfilled, (state, { payload }) => {
      state.carsRespons.total_items = payload.carsRespons.total_items;
      state.isLogged = false;
      state.items = payload.items;
      state.carsRespons.limit = 6;
    });
    builder.addCase(addedCar.fulfilled, (state, { payload }) => {
      state.items = payload.items;
    });
    builder.addCase(deleteCar.fulfilled, (state, { payload }) => {
      state.items = payload.items;
    });
    builder.addCase(deleteCar.rejected, () => {});
    builder.addMatcher(
      isRejected(edditCar, addedCar, deleteCar, getOwnCars),
      (state, { payload }) => {
        state.error = payload as string;
      }
    );
  }
});

export const { setCurrentPage } = CarsSlice.actions;

export default CarsSlice.reducer;
