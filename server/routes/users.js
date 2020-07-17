const express = require("express");
const auth = require("../middleware/auth");
const {
  getUser,
  addUser,
  getAllUsers,
  authenticate
} = require("../controller/users");
// const { User, validate } = require('../models/user')
const router = express.Router();

router.get("/me", auth, getUser);
router.post("/", addUser);
router.get("/all", auth, getAllUsers);
router.post("/auth", authenticate);

module.exports = router;
