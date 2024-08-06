import { Outlet } from "react-router-dom";

import { Footer, Header } from "../components";
import { useEffect } from "react";
import { useAppDispatch } from "../store/store";
import { currentUser } from "../store/Slices/AuthSlice";

export function Layout() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(currentUser());
  }, []);
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
