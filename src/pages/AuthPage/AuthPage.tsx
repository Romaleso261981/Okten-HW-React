import { useState } from "react";
import { LoginForm } from "../../components/LoginForm/LoginForm";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import NotFound from "../NotFound/NotFound";

import s from "./AuthPage.module.css";
import { AuthSteps } from "../../shared/types/enums";

const AuthPage = () => {
  const [currentStep, setCurrentStep] = useState<AuthSteps>(AuthSteps.Login);

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
