const Users = require("../models/userModel")
const jwt = require("jsonwebtoken");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await Users.find();
    const books = await Books.find();

    res.status(200).json({
      status: "success",
      results: users.length,
      data: {
        users: users,
        books: books,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await Users.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        users: user,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.createUser = async (req, res) => {
  try {
    let email = req.body.email;
    let user = await Users.findOne({ email });
    if (user) return res.status(400).send("User already registered.");

    var result = await Users.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      films: req.body.films,
    });

    const token = jwt.sign({ id: result._id }, "labas", {
      expiresIn: "90d",
    });

    res.status(200).json({
      status: "success",
      data: {
        user: result,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getEmail = async (req, res) => {
  console.log(req.query);
  try {
    const user = await Users.exists(req.query);

    res.status(200).json({
      status: "success",
      results: user.length,
      data: {
        users: user,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(404).json({
      status: "fail",
      message: "Neįvestas prisijungimo vardas arba slaptažodis.",
    });
  }
  const user = await Users.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return res.status(404).json({
      status: "fail",
      message: "Neteisingas prisijungimo vardas arba slaptažodis",
    });
  }

  const token = jwt.sign({ id: user._id }, "labas", {
    expiresIn: "90d",
  });

  res.status(200).json({
    status: "success",
    token: token,
    user: user,
  });
};

exports.getAllUserFilms = async (req, res) => {
  try {
    const users = await Users.find({ _id: req.params.id });
    const { films } = users[0];

    res.status(200).json({
      status: "success",
      results: users.length,
      data: {
        films: films,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "error",
      message: err,
    });
  }
};

exports.createUserFilms = async (req, res) => {
  try {
    const updatedFilms = await Users.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { films: req.body } },
      {
        new: true,
      }
    );
    res.status(200).json({
      status: "success",
      data: {
        limit: updatedFilms,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.findFilmAndUpdate = async (req, res) => {
  console.log(req.params.id);
  console.log(req.params.subID);
  console.log(req.body);
  try {
    const updateFilm = await Users.findOneAndUpdate(
      { _id: req.params.id, "films._id": req.params.subID },
      {
        $set: {
          "films.$.name": req.body.name,
          "films.$.category": req.body.category,
          "films.$.date": req.body.date,
        },
      }
    );

    res.status(200).json({
      status: "success",
      data: {
        films: updateFilm,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.findFilmAndDelete = async (req, res) => {
  try {
    await Users.findOneAndUpdate(
      { _id: req.params.id },
      {
        $pull: {
          films: { _id: req.params.subID },
        },
      }
    );
    res.status(200).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
