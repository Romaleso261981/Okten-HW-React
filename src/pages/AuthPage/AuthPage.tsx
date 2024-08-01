import { useEffect, useState } from "react";
import { LoginForm } from "../../components/LoginForm/LoginForm";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import NotFound from "../NotFound/NotFound";

import s from "./AuthPage.module.css";
import { AuthSteps } from "../../shared/types/enums";
import { useAppSelector } from "../../store/store";
import { isLoggedUser } from "../../store/Selectors/userSelectors";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const [currentStep, setCurrentStep] = useState<AuthSteps>(AuthSteps.Login);

  const isLogged = useAppSelector(isLoggedUser);
  const navigate = useNavigate();

  console.log("isLogged", isLogged);

  useEffect(() => {
    if (isLogged) {
      navigate("/cars");
    }
  }, [isLogged, navigate]);

  const getCurrentStep = (currentStep: AuthSteps) => {
    switch (currentStep) {
      case AuthSteps.Register:
        return <RegisterForm setCurrentStep={setCurrentStep} />;
      case AuthSteps.Login:
        return <LoginForm setCurrentStep={setCurrentStep} />;
      default:
        return <NotFound />;
    }
  };

  return <div className={s.container}>{getCurrentStep(currentStep)}</div>;
};

export default AuthPage;
