const express = require("express");
const auth = require("../middleware/auth");
const {
	getUser,
	getUsersByRole,
	addUser,
	getAllUsers,
	authenticate,
	deleteUser,
	updateUser,
	changePassword,
	savedFilters,
} = require("../controller/users");
// const { User, validate } = require('../models/user')
const router = express.Router();

router.get("/me", auth, getUser);
router.post("/", addUser);
router.get("/all", auth, getAllUsers);
router.post("/auth", authenticate);
router.post("/logout", auth, (req, res) =>
	res.status(200).json({ success: true })
);
router.delete("/:id", auth, deleteUser);
router.patch("/:id", auth, updateUser);
router.patch("/password/:id", auth, changePassword);
router.get("/:role", auth, getUsersByRole);
router.post("/filters/add", savedFilters);
module.exports = router;
