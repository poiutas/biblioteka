import React, { useState } from "react";
import { findFilmAndDelete } from "../../api/library/UsersApi";
import { useGlobalUserContext } from "../context/UserContext";
import { BsTrash, BsPencil } from "react-icons/bs";
import swal from "sweetalert";
import UpdateFilmTitle from "./UpdateFilmTitle";

function FilmsTable({ title, category, date, filmID }) {
  const { userData, refreshUserData } = useGlobalUserContext();
  const [isEditing, setIsEditing] = useState(false);
  return (
    <>
      <tr>
        <td>{date.slice(0, 10)}</td>
        {isEditing === false && <td className="text-start">{title}</td>}
        {isEditing === true && (
          <td>
            <UpdateFilmTitle
              setIsEditing={setIsEditing}
              filmID={filmID}
              title={title}
              category={category}
              date={date}
            />
          </td>
        )}
        <td>{category}</td>
        <td>
          <button
            className="btn m-1 custom-button-edit"
            onClick={() => setIsEditing(!isEditing)}
          >
            <BsPencil color="#7e685a" fontSize="1.5em" />
          </button>

          <button
            className="btn  m-1 custom-button-tr"
            onClick={() =>
              swal({
                title: "Ar tikrai norite ištrinti?",
                icon: "warning",
                buttons: ["Atšaukti", "Gerai"],
              }).then((isConfirm) => {
                if (isConfirm) {
                  findFilmAndDelete(userData._id, filmID).then(() => {
                    refreshUserData(userData._id);
                  });
                }
              })
            }
          >
            <BsTrash color="#7e685a" fontSize="1.5em" />
          </button>
        </td>
      </tr>
    </>
  );
}

export default FilmsTable;
