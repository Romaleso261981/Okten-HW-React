import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import { RoutersPaths } from "../shared/types/enums";
import { Spiner } from "../components/Spiner/Spiner";
import { Layout } from "./Layout";

const AuthPage = lazy(() => import("../pages/AuthPage/AuthPage"));
const MainPage = lazy(() => import("../pages/MainPage/MainPage"));
const Admin = lazy(() => import("../pages/Admin/Admin"));

export default function RootRouter() {
  return (
    <Suspense fallback={<Spiner />}>
      <Routes>
        <Route path={RoutersPaths.AUTH} element={<AuthPage />} />
        <Route element={<Layout />}>
          <Route path={RoutersPaths.MAIN} element={<MainPage />} />
          <Route path={RoutersPaths.ADMIN} element={<Admin />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
