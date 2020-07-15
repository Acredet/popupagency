const User = require("../models/user");

// @desc  Get all users
// @route GET /api/users
// @access Public
exports.getAllUsers = async (req, res, next) => {
  try {
    const User = await User.find();

    return res.status(200).json({
      success: true,
      ResultsNumber: places.length,
      data: places
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// @desc  Create a User
// @route POST /api/users
// @access Public
exports.addUser = async (req, res, next) => {
  try {
    const User = await Place.create(req.body);

    return res.status(201).json({
      success: true,
      data: place
    });
  } catch (err) {
    console.error(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: "This User already exists" });
    }
    res.status(500).json({ error: "Server error" });
  }
};
