import { createAsyncThunk, createSlice, isRejected } from "@reduxjs/toolkit";
import { UsersState } from "../../shared/types/Types";
import { API, apiBasePath, createFullUrl } from "../../API";

const initialState: UsersState = {
  isLogged: false,
  items: [],
  error: ""
};

export const getUsers = createAsyncThunk(
  "users/getUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get(
        createFullUrl(apiBasePath.JSONPLACEHOLDER, "/users")
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(`Error while fetching doc: ${error}`);
    }
  }
);

const UsersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUsers.pending, (state) => {
      state.isLogged = true;
    });
    builder.addCase(getUsers.fulfilled, (state, { payload }) => {
      console.log("payload", payload);
      state.isLogged = false;
      state.items = payload;
    });

    builder.addMatcher(isRejected(getUsers), (state, { payload }) => {
      state.error = payload as string;
    });
  }
});

export const {} = UsersSlice.actions;

export default UsersSlice.reducer;
