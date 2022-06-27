import React from "react";
import swal from "sweetalert";
import { useForm } from "react-hook-form";
import { createUser, getEmail } from "../../api/library/UsersApi";
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import "./Home.css";

function Registration() {
  const {
    watch,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    createUser(data)
      .then((result) => {
        swal({
          text: "Registracija sekminga, dabar galite prisijungti",
          icon: "success",
          button: "Puiku",
          timer: 2000,
        });
      })
      .catch((error) => {
        swal({
          text: "Toks vartotojas jau egzistuoja",
          icon: "error",
          button: "Gerai",
          timer: 5000,
        });
      });
    reset();
  }
  let password = watch("password");

  return (
    <div>
      <h1 className="home-title"> <FaUser /> Registracija</h1>
      <form className="home-form" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            className="form-label"
            type="text"
            id="name"
            placeholder="Vardas"
            {...register("name", {
              required: "Vardas būtinas",
              maxLength: 12,
              minLength: 2,
              pattern: /^[[^A-Za-ząčęėįšųūžĄČĘĖĮŠŲŪŽ0-9]*$/i,
            })}
          />

          <div className="text-danger fw-light m-2">
            {errors.name?.type === "pattern" && "Negali būti specialų simbolių"}
            {errors.name?.type === "required" && "Vardas būtinas"}
            {errors.name?.type === "minLength" && "Turi būti bent 2 simboliai"}
            {errors.name?.type === "maxLength" && "Ne daugiau kaip 12 simbolių"}
          </div>
        </div>
        <div>
          <input
            className="form-label"
            type="email"
            id="email-register"
            placeholder="El. paštas"
            {...register("email", {
              required: true,
              maxLength: 50,
              validate: {
                checkEmail: async (value) => {
                  let pass = await getEmail(value);
                  return !pass;
                },
              },
            })}
          />
          <div className="text-danger fw-light m-2">
            {errors.email?.type === "required" && "El.paštas būtinas"}
            {errors.email?.type === "maxLength" &&
              "Ne daugiau kaip 50 simbolių"}
            {errors.email?.type === "checkEmail" &&
              "El. paštas jau naudojamas."}
          </div>
        </div>
        <div>
          <input
            className="form-label"
            type="password"
            id="password"
            name="password"
            placeholder="Slaptažodis"
            {...register("password", {
              required: true,
              minLength: 8,
              maxLength: 20,
              pattern: /^(?=.*[0-9])(?=.*[A-Z])[a-zA-Z0-9?!@#$%^&*]/,
            })}
          />
          <div className="text-danger fw-light m-2">
            {errors?.password?.type === "required" && "Slaptažodis būtinas"}
            {errors?.password?.type === "minLength" &&
              "Turi būti bent 8 simboliai"}
            {errors?.password?.type === "maxLength" &&
              "Ne daugiau kaip 20 simbolių"}
            {errors?.password?.type === "pattern" &&
              "Turi būti bent 1 didžioji raidė ir bent 1 simbolis"}
          </div>
        </div>
        <div>
          <input
            className="form-label"
            type="password"
            id="passwordRepeat"
            placeholder="Pakartokite slaptažodį"
            {...register("passwordRepeat", {
              required: true,
              minLength: 8,
              maxLength: 20,
              validate: { passwordMatch: (value) => value === password },
            })}
          />
          <div className="text-danger fw-light m-2">
            {errors.passwordRepeat?.type === "required" &&
              "Slaptažodis būtinas"}
            {errors.passwordRepeat?.type === "minLength" &&
              "Turi būti bent 8 simboliai"}
            {errors.passwordRepeat?.type === "maxLength" &&
              "Ne daugiau kaip 20 simbolių"}
            {errors.passwordRepeat?.type === "passwordMatch" &&
              "Slaptažodžiai turi sutapti"}
          </div>
          <div className="text-danger fw-light m-2">
            {errors.balance?.type === "maxLength" &&
              "Ne daugiau kaip 10 skaičių"}
          </div>
        </div>
        <div>
          <button className="btn btn-primary" type="submit">
            Registruotis
          </button>
        </div>
        <div>
          <button className="btn btn-primary" type="reset">
            Atšaukti
          </button>
        </div>
      </form>
    </div>
  );
}

export default Registration;
