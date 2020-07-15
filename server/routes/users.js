const express = require("express");
const { getAllUsers, addUser } = require("../controller/users");
const router = express.Router();

router
  .route("/")
  .get(getAllUsers)
  .post(addUser);

module.exports = router;
