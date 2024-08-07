export enum RoutersPaths {
  MAIN = "/",
  ADMIN = "/admin",
  AUTH = "/auth",
  CARS = "/cars",
  USERS = "/users",
  TODOBYID = "/todos/:id",
  NOFOUND = "*"
}

export enum AuthSteps {
  Register = "register",
  Login = "login"
}

export enum apiUsersPath {
  REGISTER = "/users",
  LOGIN = "/auth",
  ABOUTUSER = "/auth/me",
  REFRESHTOKEN = "/auth/refresh",
  CURRENTUSER = "/auth/currentuser"
}

export enum apiCarsPath {
  CARS = "/cars",
  DOCS = "/cars/docs"
}
