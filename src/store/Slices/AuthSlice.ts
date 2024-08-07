import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API, apiBasePath, createFullUrl } from "../../API";
import { AuthState, TokenRefresh, User } from "../../shared/types/Types";
import { apiUsersPath } from "../../shared/types/enums";

const initialState: AuthState = {
  access: "",
  refresh: "",
  isLogged: false,
  is_active: true,
  is_staff: false,
  is_superuser: false,
  last_login: null,
  userField: {
    username: ""
  }
};

export const registerUser = createAsyncThunk<TokenRefresh, User>(
  "auth/registerUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await API.post<TokenRefresh>(
        createFullUrl(apiBasePath.RAILWAY, apiUsersPath.REGISTER),
        data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(`Error while fetching user${error}`);
    }
  }
);

export const loginUser = createAsyncThunk<TokenRefresh, User>(
  "auth/loginUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await API.post<TokenRefresh>(
        createFullUrl(apiBasePath.RAILWAY, apiUsersPath.LOGIN),
        data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(`Error while fetching user${error}`);
    }
  }
);

export const aboutUser = createAsyncThunk<string, void>(
  "auth/aboutUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get(
        createFullUrl(apiBasePath.RAILWAY, apiUsersPath.ABOUTUSER)
      );
      return response.data;
    } catch (error) {
      rejectWithValue("Error while fetching user");
    }
  }
);

export const currentUser = createAsyncThunk<string, void>(
  "auth/currentUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.post(
        createFullUrl(apiBasePath.RAILWAY, apiUsersPath.CURRENTUSER)
      );
      return response.data;
    } catch (error) {
      rejectWithValue("Error while fetching user");
    }
  }
);

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut(state) {
      state.isLogged = false;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    }
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.fulfilled, () => {});
    builder.addCase(registerUser.rejected, () => {});
    builder.addCase(
      loginUser.fulfilled,
      (state, { payload }: PayloadAction<TokenRefresh>) => {
        localStorage.setItem("accessToken", payload.access);
        localStorage.setItem("refreshToken", payload.refresh);
        state.isLogged = true;
      }
    );
    builder.addCase(loginUser.rejected, (state) => {
      state.isLogged = false;
    });
    builder.addCase(currentUser.pending, () => {});
    builder.addCase(currentUser.fulfilled, (state) => {
      state.isLogged = true;
    });
    builder.addCase(currentUser.rejected, (state) => {
      state.isLogged = false;
    });
  }
});

export const { logOut } = AuthSlice.actions;

export default AuthSlice.reducer;
