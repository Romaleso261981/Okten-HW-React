export enum RoutersPaths {
  MAIN = "/",
  ADMIN = "/admin",
  AUTH = "/auth",
  CARS = "/cars",
  TODO = "/todos",
  TODOBYID = "/todos/:id",
  NOFOUND = "*"
}

export enum AuthSteps {
  Register = "register",
  Login = "login"
}

export enum apiPath {
  REGISTER = "/users",
  LOGIN = "/auth",
  ABOUTUSER = "/auth/me",
  REFRESH = "/auth/refresh"
}
