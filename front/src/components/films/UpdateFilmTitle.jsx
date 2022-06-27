import React from "react";
import { useForm } from "react-hook-form";
import { findFilmAndUpdate } from "../../api/library/UsersApi";
import { useGlobalUserContext } from "../context/UserContext";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";

function UpdateFilmTitle(props) {
  const { userData, refreshUserData } = useGlobalUserContext();

  const { filmID, setIsEditing, title, category, date } = props;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  let UppercaseFirst = (str) => {
    let newStr = str.charAt(0).toUpperCase() + str.slice(1);
    return newStr;
  };

  function onSubmit(data) {
    const newObj = {
      category: category,
      date: date,
      name: UppercaseFirst(data.name),
    };

    findFilmAndUpdate(newObj, userData._id, filmID).then(() => {
      refreshUserData(userData._id);
    });
    reset();
    setIsEditing(false);
  }
  return (
    <>
      <form className="update-form" onSubmit={handleSubmit(onSubmit)}>
        <input
          className="rounded-0 update-input "
          placeholder="Knygos pavadinimas"
          type="text"
          name="name"
          id="name"
          defaultValue={title}
          {...register("name", {
            maxLength: 50,
            minLength: 2,
            pattern:
              /^[a-ząčęėįšųūž|A-ZĄČĘĖĮŠŲŪŽ]+(?: [a-ząčęėįšųūž|A-ZĄČĘĖĮŠŲŪŽ]+)*$/,

            required: true,
          })}
        />

        <button className="update-btn" type="submit">
          <AiOutlineCheck color="#3a3845" fontSize="1.5em" />
        </button>

        <button
          type="button"
          className="update-btn"
          onClick={() => setIsEditing(false)}
        >
          <AiOutlineClose color="#3a3845" fontSize="1.5em" />
        </button>

        {errors.name && (
          <p className="fs-4 text-danger fw-light text-center">
            Būtinas laukelis, tik raidės, 2-50 simbolių.
          </p>
        )}
      </form>
    </>
  );
}

export default UpdateFilmTitle;
