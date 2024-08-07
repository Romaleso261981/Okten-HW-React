import { Outlet } from "react-router-dom";

import { Footer, Header } from "../components";
import { useEffect } from "react";
import { useAppDispatch } from "../store/store";
import { currentUser } from "../store/Slices/AuthSlice";

import s from "./Layout.module.css";

export function Layout() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(currentUser());
  }, []);
  return (
    <div className={s.wrapper}>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
