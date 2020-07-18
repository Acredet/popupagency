const express = require("express");
const auth = require("../middleware/auth");
const {
  getUser,
  addUser,
  getAllUsers,
  authenticate,
  deleteUser,
  updateUser
} = require("../controller/users");
// const { User, validate } = require('../models/user')
const router = express.Router();

router.get("/me", auth, getUser);
router.post("/", addUser);
router.get("/all", auth, getAllUsers);
router.post("/auth", authenticate);
router.delete("/:id", auth, deleteUser);
router.patch("/:id", auth, updateUser);
module.exports = router;
