import { Link } from "react-router-dom";
import s from "./Header.module.css";
import { RoutersPaths } from "../../shared/types/enums";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { isLoggedUser } from "../../store/Selectors/userSelectors";
import { logOut } from "../../store/Slices/AuthSlice";

export const Header = () => {
  const isLogged = useAppSelector(isLoggedUser);

  const dispatch = useAppDispatch();

  const handleLogOut = () => {
    dispatch(logOut());
  };

  return (
    <header className={s.header}>
      <nav className={s.nav}>
        <Link to={RoutersPaths.ADMIN} className={s.link}>
          admin
        </Link>
        <Link to={RoutersPaths.MAIN} className={s.link}>
          home
        </Link>
        <Link to={RoutersPaths.USERS} className={s.link}>
          users
        </Link>
        {!isLogged && (
          <Link to={RoutersPaths.AUTH} className={s.link}>
            Auth
          </Link>
        )}
        {isLogged && (
          <button className={s.logOutButton} onClick={handleLogOut}>
            logOut
          </button>
        )}
        <Link to={RoutersPaths.CARS} className={s.link}>
          Cars
        </Link>
      </nav>
    </header>
  );
};
