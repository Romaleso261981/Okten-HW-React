import { FC } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ToastContainer, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import s from "./LoginForm.module.css";

export const LoginForm: FC = (): JSX.Element => {
  const { register, handleSubmit, reset } = useForm();

  const login = (data: any) => {
    let formData = {
      email: data.email,
      password: data.password
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
                {/* {errors.password && (
                      <p className="text-danger" style={{ fontSize: 14 }}>
                        {errors.password.message}
                      </p>
                    )} */}
              </div>
              <div className={s.controllWrapper}>
                <button type="submit">Submit</button>
                <p>
                  Have an Account?{" "}
                  <Link style={{ textDecoration: "none" }} to={"/register"}>
                    Sign Up
                  </Link>
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
