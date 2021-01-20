const express = require("express");
const auth = require("../middleware/auth");

const {
  getregion,
  addregion,
  deleteRegion,
  updateRegion,
} = require("../controller/region");
const router = express.Router();

router.route("/", auth).get(getregion).post(addregion);

router.delete("/:id", auth, deleteRegion);
router.patch("/:id", auth, updateRegion);
module.exports = router;
