import { LoginForm } from "../../components/LoginForm/LoginForm";

import s from "./AuthPage.module.css";

const AuthPage = () => {
  return (
    <div className={s.container}>
      <LoginForm />
    </div>
  );
};

export default AuthPage;
