import { API } from "../../API";
import { CarsModel } from "../../models/CarsModel";
import { CarsResponse } from "../../models/CarsResponseModel";
import { UserModel } from "../../models/UserModel";
import { UserResponse } from "../../models/UserResponseModel";
import { TokenRefresh } from "../types/Types";

const userService = {
  saveUser: async (data: UserModel): Promise<boolean> => {
    let response = await API.post<UserResponse>("/users", data);
    return !!response.data.id || false;
  }
};

const carsService = {
  getCars: async (): Promise<CarsResponse> => {
    let cars = [] as unknown as CarsResponse;
    try {
      let response = await API.get<CarsResponse>("/cars");
      cars = response.data || [];
    } catch (error) {
      throw new Error("Error while fetching cars");
    }
    return cars;
  },

  addedCars: async (data: CarsModel): Promise<void> => {
    try {
      let response = await API.post<UserResponse>("/cars", data);
    } catch (error) {}
  },

  removeCars: async (id: number): Promise<CarsModel> => {
    let data = {} as CarsModel;
    try {
      let response = await API.delete<CarsModel>("/cars/remove/" + id);
      data = response.data;
    } catch (error) {}
    return data;
  }
};

const authService = {
  login: async (data: UserModel): Promise<void> => {
    try {
      let response = await API.post<TokenRefresh>("/auth", data);
      localStorage.setItem("accessToken", response.data.access);
      localStorage.setItem("refreshToken", response.data.refresh);
    } catch (error) {
      console.log("error", error);
    }
  },
  logOut: async (): Promise<void> => {
    try {
      await API.post<TokenRefresh>("/auth/logout");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    } catch (error) {}
  },
  register: async (data: UserModel): Promise<void> => {
    try {
      let response = await API.post<TokenRefresh>("/users", data);
      localStorage.setItem("accessToken", response.data.access);
      localStorage.setItem("refreshToken", response.data.refresh);
    } catch (error) {
      console.log("error", error);
    }
  },
  refreshAccessTocken: async (): Promise<void> => {
    try {
      const localrefreshToken = localStorage.getItem("refreshToken");
      let response = await API.post<TokenRefresh>("/auth/refresh", {
        refresh: localrefreshToken
      });
      localStorage.setItem("accessToken", response.data.access);
      localStorage.setItem("refreshToken", response.data.refresh);
    } catch (error) {
      window.location.href = "/auth";
    }
  }
};

export { userService, authService, carsService };
