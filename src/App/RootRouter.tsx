import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../App/Layout";
import { RoutersPaths } from "../shared/types/enums";
import { Suspense, lazy } from "react";
import { Spiner } from "../components/Spiner/Spiner";

const AuthPage = lazy(() => import("../pages/AuthPage/AuthPage"));
// const MainPage = lazy(() => import("../pages/MainPage/MainPage"));
const Admin = lazy(() => import("../pages/Admin/Admin"));
const UsersPage = lazy(() => import("../pages/UsersPage/UsersPage"));
const TodoPage = lazy(() => import("../pages/TodoDetailPage/TodoDetailPage"));
const CarsPages = lazy(() => import("../pages/CarsPages/CarsPages"));

export const router = createBrowserRouter([
  {
    path: RoutersPaths.MAIN,
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Spiner />}>
            {/* <MainPage /> */}
            <h1>Main</h1>
          </Suspense>
        )
      },
      {
        path: RoutersPaths.ADMIN,
        element: (
          <Suspense fallback={<Spiner />}>
            <Admin />
          </Suspense>
        )
      },
      {
        path: RoutersPaths.USERS,
        element: (
          <Suspense fallback={<Spiner />}>
            <UsersPage />
          </Suspense>
        ),
        children: []
      },
      {
        path: RoutersPaths.CARS,
        element: (
          <Suspense fallback={<Spiner />}>
            <CarsPages />
          </Suspense>
        ),
        children: []
      },
      {
        path: RoutersPaths.TODOBYID,
        element: (
          <Suspense fallback={<Spiner />}>
            <TodoPage />
          </Suspense>
        )
      }
    ]
  },
  {
    path: RoutersPaths.AUTH,
    element: (
      <Suspense fallback={<Spiner />}>
        <AuthPage />
      </Suspense>
    )
  }
]);
