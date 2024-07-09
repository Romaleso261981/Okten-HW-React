import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Layout } from "./App/Layout";
import { RoutersPaths } from "./shared/types/enums";
import { Suspense, lazy } from "react";
import { Spiner } from "./components/Spiner/Spiner";

const AuthPage = lazy(() => import("./pages/AuthPage/AuthPage"));
const MainPage = lazy(() => import("./pages/MainPage/MainPage"));
const Admin = lazy(() => import("./pages/Admin/Admin"));

const router = createBrowserRouter([
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
        path: RoutersPaths.AUTH,
        element: (
          <Suspense fallback={<AuthPage />}>
            <MainPage />
          </Suspense>
        )
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
