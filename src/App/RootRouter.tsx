import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../App/Layout";
import { RoutersPaths } from "../shared/types/enums";
import { Suspense, lazy } from "react";
import { Spiner } from "../components/Spiner/Spiner";

const AuthPage = lazy(() => import("../pages/AuthPage/AuthPage"));
const MainPage = lazy(() => import("../pages/MainPage/MainPage"));
const Admin = lazy(() => import("../pages/Admin/Admin"));
const TodosPages = lazy(() => import("../pages/TodosPages/TodosPages"));
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
            <MainPage />
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
        path: RoutersPaths.TODO,
        element: (
          <Suspense fallback={<Spiner />}>
            <TodosPages />
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
      },
      {
        path: RoutersPaths.AUTH,
        element: (
          <Suspense fallback={<Spiner />}>
            <AuthPage />
          </Suspense>
        )
      }
    ]
  }
]);
