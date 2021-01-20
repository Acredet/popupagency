const express = require("express");
const auth = require("../middleware/auth");
const { multer } = require("../middleware/upload");
const {
  getUser,
  getUsersByRole,
  addUser,
  getAllUsers,
  authenticate,
  deleteUser,
  updateUser,
  changePassword,
  addFilters,
  getOneById,
} = require("../controller/users");
// const { User, validate } = require('../models/user')
const router = express.Router();

router.get("/me", auth, getUser);
router.post("/", multer.single("avatar"), addUser);
router.get("/all", auth, getAllUsers);
router.post("/auth", authenticate);
router.post("/logout", auth, (req, res) =>
  res.status(200).json({ success: true })
);
router.delete("/:id", auth, deleteUser);
router.patch("/:id", multer.single("avatar"), auth, updateUser);
router.patch("/password/:id", auth, changePassword);
router.get("/:role", auth, getUsersByRole);
router.post("/filters/add", auth, addFilters);
router.get("/one/:id", getOneById);
module.exports = router;
