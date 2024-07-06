import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import { RoutersPaths } from "../shared/types/enums";
import MainPage from "../pages/MainPage/MainPage";
import { Spiner } from "../components/Spiner/Spiner";
import { Layout } from "./Layout";

const AuthPage = lazy(() => import("../pages/AuthPage/AuthPage"));

export default function RootRouter() {
  return (
    <Suspense fallback={<Spiner />}>
      <Routes>
        <Route path={RoutersPaths.LOGIN} element={<AuthPage />} />
        <Route element={<Layout />}>
          <Route path={RoutersPaths.MAIN} element={<MainPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
