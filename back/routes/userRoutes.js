const express = require("express");
// const { protect } = require("../controllers/authController");

const {
  getAllUsers,
  getUserById,
  getAllUserFilms,
  createUserFilms,
  findFilmAndUpdate,
  findFilmAndDelete,
  createUser,
  getEmail,
  loginUser,
} = require("./../controllers/userController");


const router = express.Router();

// apsaugotas routas
router.route("/").get(getAllUsers);
router.route("/register").post(createUser);
router.route("/email").get(getEmail);
router.route("/login").post(loginUser);
router.route("/:id").get(getUserById);


router.route("/:id/films/upd/:subID").patch(findFilmAndUpdate);
router.route("/:id/films/dlt/:subID").patch(findFilmAndDelete);
router.route("/:id/films").get(getAllUserFilms).patch(createUserFilms);

module.exports = router;
