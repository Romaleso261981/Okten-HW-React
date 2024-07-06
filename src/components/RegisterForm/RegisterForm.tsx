import { FC } from "react";
import { AuthSteps } from "../../shared/types/enums";
import { ToastContainer, Flip } from "react-toastify";
import { useForm } from "react-hook-form";

import s from "./RegisterForm.module.css";

type RegisterFormProps = {
  setCurrentStep: React.Dispatch<React.SetStateAction<AuthSteps>>;
};

const RegisterForm: FC<RegisterFormProps> = ({ setCurrentStep }) => {
  const { register, handleSubmit, reset } = useForm();

  const registerForm = (data: any) => {
    let formData = {
      email: data.email,
      password: data.password,
      name: data.name
    };
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
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
                <label className="form-label">Name</label>
                <input
                  type="text"
                  {...register("name", { required: "Name is required!" })}
                />
                {/* {errors.email && (
                      <p className="text-danger" style={{ fontSize: 14 }}>
                        {errors.email.message}
                      </p>
                    )} */}
              </div>
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
                {/* {errors.password && (
                      <p className="text-danger" style={{ fontSize: 14 }}>
                        {errors.password.message}
                      </p>
                    )} */}
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
