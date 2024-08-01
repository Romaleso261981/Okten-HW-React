import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../../API";
import { TokenRefresh, UserState } from "../../shared/types/Types";
import { apiUsersPath } from "../../shared/types/enums";

const initialState: UserState = {
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

export const registerUser = createAsyncThunk<TokenRefresh, object>(
  "user/registerUser",
  async (data) => {
    const response = await API.post<TokenRefresh>(apiUsersPath.REGISTER, data);
    return response.data;
  }
);

export const loginUser = createAsyncThunk<TokenRefresh, object>(
  "user/loginUser",
  async (data) => {
    const response = await API.post<TokenRefresh>(apiUsersPath.LOGIN, data);
    return response.data;
  }
);

export const aboutUser = createAsyncThunk<string, void>(
  "user/aboutUser",
  async () => {
    try {
      const response = await API.get(apiUsersPath.ABOUTUSER);
      return response.data;
    } catch (error) {
      throw new Error("Error while fetching user");
    }
  }
);

export const currentUser = createAsyncThunk<string, void>(
  "user/currentUser",
  async () => {
    try {
      const response = await API.get(apiUsersPath.ABOUTUSER);
      return response.data;
    } catch (error) {
      throw new Error("Error while fetching user");
    }
  }
);

export const refreshAccessTocken = createAsyncThunk<TokenRefresh>(
  "user/refreshAccessTocken",
  async () => {
    try {
      const response = await API.post(
        apiUsersPath.REFRESHTOKEN,
        localStorage.get("refreshToken")
      );
      return response.data;
    } catch (error) {}
  }
);

const UserSlice = createSlice({
  name: "user",
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
    builder.addCase(refreshAccessTocken.pending, () => {});
    builder.addCase(refreshAccessTocken.fulfilled, (_, { payload }) => {
      localStorage.setItem("accessToken", payload.access);
      localStorage.setItem("refreshToken", payload.refresh);
    });
    builder.addCase(refreshAccessTocken.rejected, () => {});
  }
});

export const { logOut } = UserSlice.actions;

export default UserSlice.reducer;
