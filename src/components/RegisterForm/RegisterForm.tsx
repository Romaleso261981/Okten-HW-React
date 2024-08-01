import { FC } from "react";
import { AuthSteps } from "../../shared/types/enums";
import { ToastContainer, Flip } from "react-toastify";
import { useForm } from "react-hook-form";

import s from "./RegisterForm.module.css";
import { useAppDispatch } from "../../store/store";
import { registerUser } from "../../store/Slices/UserSlice";

type RegisterFormProps = {
  setCurrentStep: React.Dispatch<React.SetStateAction<AuthSteps>>;
};

const RegisterForm: FC<RegisterFormProps> = ({ setCurrentStep }) => {
  const { register, handleSubmit, reset } = useForm();

  const dispatch = useAppDispatch();

  const registerForm = (data: any) => {
    let formData = {
      username: data.username,
      password: data.password
    };
    dispatch(registerUser(formData));

    reset();
  };

  return (
    <>
      <div className={s.container}>
        <div className={s.wrapper}>
          <div className={s.cardBody}>
            <h3 className="card-title text-center text-secondary mt-3">
              Register Form
            </h3>
            <form
              className={s.form}
              autoComplete="off"
              onSubmit={handleSubmit(registerForm)}
            >
              <div className={s.inputWrapper}>
                <label className="form-label">username</label>
                <input
                  type="text"
                  {...register("username", {
                    required: "username is required!"
                  })}
                />
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
                <button type="submit">Register</button>
                <p>
                  Have an Account?{" "}
                  <button
                    onClick={() => {
                      setCurrentStep(AuthSteps.Login);
                    }}
                    style={{ textDecoration: "none" }}
                  >
                    Login
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

export default RegisterForm;
