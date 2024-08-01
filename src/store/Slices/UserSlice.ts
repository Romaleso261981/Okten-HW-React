import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../../API";
import { TokenRefresh } from "../../models/TokenRefresh";
import { UserState } from "../../shared/types/Types";
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
    const response = await API.get(apiUsersPath.ABOUTUSER);
    return response.data;
  }
);

export const refreshUser = createAsyncThunk<string, void>(
  "user/refreshUser",
  async () => {
    const response = await API.get(apiUsersPath.REFRESH);
    return response.data;
  }
);

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    toggleModal() {}
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
  }
});

export const { toggleModal } = UserSlice.actions;
export default UserSlice.reducer;
