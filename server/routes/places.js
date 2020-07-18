const express = require("express");
const auth = require("../middleware/auth");
const {
  getPlaces,
  addPlace,
  deletePlace,
  updatePlace
} = require("../controller/places");
const router = express.Router();

router
  .route("/", auth)
  .get(getPlaces)
  .post(addPlace);

router.delete("/:id", auth, deletePlace);
router.patch("/:id", auth, updatePlace);
module.exports = router;
