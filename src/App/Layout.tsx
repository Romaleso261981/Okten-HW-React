import { Outlet } from "react-router-dom";

import { Header } from "../components";
import { useEffect } from "react";
import { useAppDispatch } from "../store/store";
import { currentUser } from "../store/Slices/UserSlice";

export function Layout() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(currentUser());
  }, []);
  return (
    <div>
      <Header />
      <Outlet />
      {/* <Footer /> */}
    </div>
  );
}
