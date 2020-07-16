const auth = require("../middleware/auth");
const { getUser, addUser, getAllUsers } = require("../controller/users");
const { User, validate } = require("../models/user");
const express = require("express");
const router = express.Router();

router.get("/me", auth, getUser);
router.post("/", addUser);
router.get("/all", auth, getAllUsers);

module.exports = router;
