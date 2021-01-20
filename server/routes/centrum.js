const express = require("express");
const auth = require("../middleware/auth");
const {
  getCentrums,
  getOneCentrum,
  addCentrum,
  deleteCentrum,
  updateCentrum,
} = require("../controller/centrum");
const router = express.Router();
const { multer, uploadImage } = require("../middleware/upload");

const fields = [{ name: "centrumgalleri[]" }];

router
  .route("/", auth)
  .get(getCentrums)
  .post(multer.fields(fields), addCentrum);

router
  .route("/:id", auth)
  .get(getOneCentrum)
  .delete(deleteCentrum)
  .patch(multer.fields(fields), updateCentrum);

router.post("/images", multer.single("centrumgalleri"), uploadImage);

module.exports = router;
