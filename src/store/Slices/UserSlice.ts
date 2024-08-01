import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiPath } from "../../shared/types/enums";
import { API } from "../../API";
import { TokenRefresh } from "../../models/TokenRefresh";

export const registerUser = createAsyncThunk<{}, {}>(
  "user/registerUser",
  async (data) => {
    let response = await API.post<TokenRefresh>(apiPath.REGISTER, data);
    return response.data;
  }
);

export const loginUser = createAsyncThunk<{}, {}>(
  "user/loginUser",
  async (data) => {
    const response = await API.post<TokenRefresh>(apiPath.LOGIN, data);
    return response.data;
  }
);

export const aboutUser = createAsyncThunk("user/aboutUser", async () => {
  const response = await API.get(apiPath.ABOUTUSER);
  return response.data;
});

export const refreshUser = createAsyncThunk("user/refreshUser", async () => {
  const response = await API.get(apiPath.REFRESH);
  return response.data;
});

const initialUserField = {
  username: ""
};

const UserSlice = createSlice({
  name: "user",
  initialState: {
    isLogged: false,
    is_active: true,
    is_staff: false,
    is_superuser: false,
    last_login: null,
    userField: initialUserField
  },
  reducers: {
    toggleModal() {}
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.fulfilled, () => {});
    builder.addCase(registerUser.rejected, () => {});
    builder.addCase(loginUser.fulfilled, (state) => {
      state.isLogged = true;
    });
    builder.addCase(loginUser.rejected, () => {});
  }
});

export const { toggleModal } = UserSlice.actions;
export default UserSlice;
