const express = require("express");
const { getcategory, addcategory } = require("../controller/category");
const router = express.Router();

router
  .route("/")
  .get(getcategory)
  .post(addcategory);

module.exports = router;
