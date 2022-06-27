import React from "react";
import { useForm } from "react-hook-form";
import { useGlobalUserContext, UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import swal from "sweetalert";
import "./Home.css";

function Login() {
  const { doLogin } = useGlobalUserContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  let navigate = useNavigate();

  function onSubmit(data) {
    doLogin(data)
      .then((res) => {
        let user = res.data.user;

        swal({
          text: "Pavyko prisijungti!",
          icon: "success",
          button: "Puiku",
          timer: 5000,
        });
        if (res.status === 200) {
          setTimeout(() => {
            navigate("/films");
          }, 1000);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        swal({
          text: "Duomenys blogai suvesti, patikrinkite duomenis!",
          icon: "error",
          button: "Gerai",
          timer: 2000,
        });
      });
  }

  return (
    <>
      <h1 className="home-title"> < FaSignInAlt /> Prisijungti</h1>
      <form className="home-form" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            type="email"
            className="form-label"
            id="email-login"
            placeholder="El. paštas"
            {...register("email", {
              required: "El.paštas būtinas",
              maxLength: {
                value: 50,
                message: "Nedaugiau kaip 50 simbolių",
              },
            })}
          />
          <div className="error text-danger fw-light m-2">
            {errors.email?.message}
          </div>
        </div>
        <div>
          <input
            className="form-label"
            type="password"
            name="password"
            placeholder="Slaptažodis"
            {...register("password", {
              required: "Slaptažodis būtinas",
              minLength: {
                value: 8,
                message: "Turi būti bent 8 simboliai",
              },
              maxLength: {
                value: 20,
                message: "Nedaugiau kaip 20 simbolių",
              },
            })}
          />
          <div className="error text-danger fw-light m-2">
            {errors.password?.message}
          </div>
        </div>
        <div className="">
          <button className="btn btn-primary" type="submit">
            Prisijungti
          </button>
        </div>
        <div className="">
          <button className="btn btn-primary" type="reset">
            Atšaukti
          </button>
        </div>
      </form>
    </>
  );
}

export default Login;
