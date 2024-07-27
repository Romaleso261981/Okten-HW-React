import { Link } from "react-router-dom";
import s from "./Header.module.css";
import { RoutersPaths } from "../../shared/types/enums";

export const Header = () => {
  return (
    <header className={s.header}>
      <nav className={s.nav}>
        <Link to={RoutersPaths.ADMIN} className={s.link}>
          admin
        </Link>
        <Link to={RoutersPaths.MAIN} className={s.link}>
          home
        </Link>
        <Link to={RoutersPaths.TODO} className={s.link}>
          Todo
        </Link>
        <Link to={RoutersPaths.AUTH} className={s.link}>
          Auth
        </Link>
        <Link to={RoutersPaths.CARS} className={s.link}>
          Cars
        </Link>
      </nav>
    </header>
  );
};
