const user = require("../models/user");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const { User, validate } = require("../models/user");
// @desc  Get a user
// @route GET /api/users/me
// @access Private
exports.getUser = async (req, res, next) => {
  const user = await User.findById(req.user._id).select("-password");
  res.status(200).json({
    success: true,
    ResultsNumber: user.length,
    data: user
  });
};
// @desc  Get all users
// @route GET /api/users
// @access Private
exports.getAllUsers = async (req, res, next) => {
  try {
    User.find().then(users =>
      res.status(200).json({
        success: true,
        ResultsNumber: User.length,
        data: users
      })
    );
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// @desc  Create a User
// @route POST /api/users
// @access Public
exports.addUser = async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("User already registered.");

    user = new User(_.pick(req.body, ["name", "email", "password"]));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    const token = user.generateAuthToken();
    res
      .header("x-auth-token", token)
      .send(_.pick(user, ["_id", "name", "email"]));
  } catch (err) {
    console.log(err);
  }
};
