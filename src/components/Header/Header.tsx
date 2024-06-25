import s from "./Header.module.css";

export const Header = () => {
  return (
    <header className={s.header}>
      <nav className={s.nav}>
        <a href="/" className={s.link}>
          admin
        </a>
        <a href="/" className={s.link}>
          home
        </a>
        <a href="/" className={s.link}>
          Auth
        </a>
      </nav>
    </header>
  );
};
