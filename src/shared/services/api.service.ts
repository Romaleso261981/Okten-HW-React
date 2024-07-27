import { API } from "../../API";
import { CarsModel } from "../../models/CarsModel";
import { CarsResponse } from "../../models/CarsResponseModel";
import { TokenRefresh } from "../../models/TokenRefresh";
import { UserModel } from "../../models/UserModel";
import { UserResponse } from "../../models/UserResponseModel";

const userService = {
  saveUser: async (data: UserModel): Promise<boolean> => {
    let response = await API.post<UserResponse>("/users", data);
    console.log(response.status === 201);
    return !!response.data.id || false;
  }
};

const carsService = {
  getCars: async (): Promise<CarsResponse> => {
    let response = await API.post<CarsResponse>("/cars");
    return response.data || [];
  },

  saveCars: async (data: CarsModel): Promise<boolean> => {
    let response = await API.post<UserResponse>("/users", data);
    return !!response.data.id || false;
  },

  removeCars: async (id: number): Promise<CarsModel> => {
    let response = await API.delete<CarsModel>("/cars/remove/" + id);
    return response.data;
  }
};

const authService = {
  login: async (data: UserModel): Promise<void> => {
    let response = await API.post<TokenRefresh>("/auth/login", data);
    console.log("response", response);
    localStorage.setItem("accessToken", response.data.accessToken);
    localStorage.setItem("refreshToken", response.data.refreshToken);
  },
  logOut: async (): Promise<void> => {
    let response = await API.post<TokenRefresh>("/auth/logout");
    console.log("response", response);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  },
  register: async (data: UserModel): Promise<void> => {
    let response = await API.post<TokenRefresh>("/auth/signup", data);
    console.log("response", response);
    localStorage.setItem("accessToken", response.data.accessToken);
    localStorage.setItem("refreshToken", response.data.refreshToken);
  },
  refreshAccessTocken: async (): Promise<TokenRefresh> => {
    const localrefreshToken = localStorage.getItem("refreshToken");
    let response = await API.post<TokenRefresh>(
      "/auth/refresh",
      localrefreshToken
    );
    console.log("response", response);
    localStorage.setItem("accessToken", response.data.accessToken);
    localStorage.setItem("refreshToken", response.data.refreshToken);
    return response.data;
  }
};

export { userService, authService, carsService };
