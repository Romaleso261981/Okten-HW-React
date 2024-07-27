import { FC } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { ToastContainer, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import s from "./LoginForm.module.css";
import { AuthSteps } from "../../shared/types/enums";
import { authService } from "../../shared/services/api.service";

type LoginFormProps = {
  setCurrentStep: React.Dispatch<React.SetStateAction<AuthSteps>>;
};

type FormData = {
  email: string;
  password: string;
};

export const LoginForm: FC<LoginFormProps> = ({
  setCurrentStep
}): JSX.Element => {
  const { register, handleSubmit, reset } = useForm<FormData>();

  const login: SubmitHandler<FormData> = (data) => {
    let formData = {
      email: data.email,
      password: data.password
    };

    authService.login(formData);
    reset();
  };

  return (
    <>
      <div className={s.container}>
        <div className={s.wrapper}>
          <div className={s.cardBody}>
            <h3 className="card-title text-center text-secondary mt-3">
              Login Form
            </h3>
            <form
              className={s.form}
              autoComplete="off"
              onSubmit={handleSubmit(login)}
            >
              <div className={s.inputWrapper}>
                <label className="form-label">Email</label>
                <input
                  type="email"
                  {...register("email", { required: "Email is required!" })}
                />
                {/* {errors.email && (
                  <p className="text-danger" style={{ fontSize: 14 }}>
                    {errors.email.message}
                  </p>
                )} */}
              </div>
              <div className={s.inputWrapper}>
                <label>Password</label>
                <input
                  type="password"
                  {...register("password", {
                    required: "Password is required!"
                  })}
                />
              </div>
              <div className={s.controllWrapper}>
                <button type="submit">Login</button>
                <p>
                  don't have an account?{" "}
                  <button
                    onClick={() => {
                      setCurrentStep(AuthSteps.Register);
                    }}
                    className={s.buttonLink}
                  >
                    Sign Up
                  </button>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover
        limit={1}
        transition={Flip}
      />
    </>
  );
};
