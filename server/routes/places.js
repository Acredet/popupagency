const express = require("express");
const { getPlaces, addPlace } = require("../controller/places");
const router = express.Router();

router
  .route("/")
  .get(getPlaces)
  .post(addPlace);

module.exports = router;
