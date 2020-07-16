const auth = require("../middleware/auth");
const { getUser, addUser } = require("../controller/users");
const { User, validate } = require("../models/user");
const express = require("express");
const router = express.Router();

router.get("/me", auth, getUser);

router.post("/", addUser);

module.exports = router;
