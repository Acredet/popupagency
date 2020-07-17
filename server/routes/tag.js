const express = require("express");
const { gettag, addtag } = require("../controller/tag");
const router = express.Router();

router
  .route("/")
  .get(gettag)
  .post(addtag);

module.exports = router;
