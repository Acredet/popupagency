const express = require("express");
const { getregion, addregion } = require("../controller/region");
const router = express.Router();

router
  .route("/")
  .get(getregion)
  .post(addregion);

module.exports = router;
