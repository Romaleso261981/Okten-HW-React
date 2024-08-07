import { createAsyncThunk, createSlice, isRejected } from "@reduxjs/toolkit";
import { Post, UsersState } from "../../shared/types/Types";
import { API, apiBasePath, createFullUrl } from "../../API";

const initialState: UsersState = {
  itemsPerPage: 5,
  isLogged: false,
  items: [],
  error: "",
  userPosts: [],
  currentPages: 1
};

export const getUsers = createAsyncThunk(
  "users/getUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get(
        createFullUrl(apiBasePath.JSONPLACEHOLDER, "/users?")
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(`Error while fetching doc: ${error}`);
    }
  }
);

export const getUserPosts = createAsyncThunk<Post[], number>(
  "users/getUserPosts",
  async (id, { rejectWithValue }) => {
    try {
      const response = await API.get(
        createFullUrl(apiBasePath.JSONPLACEHOLDER, `/users/${id}/posts`)
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
      state.isLogged = false;
      state.items = payload;
    });
    builder.addCase(getUserPosts.fulfilled, (state, { payload }) => {
      state.isLogged = false;
      state.userPosts = payload;
    });

    builder.addMatcher(isRejected(getUsers), (state, { payload }) => {
      state.error = payload as string;
    });
  }
});

export default UsersSlice.reducer;
