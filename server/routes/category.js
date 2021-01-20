const express = require("express");
const auth = require("../middleware/auth");
const {
  getcategory,
  addcategory,
  deleteCategory,
  updateCategory,
} = require("../controller/category");
const router = express.Router();
const { multer, uploadImage } = require("../middleware/upload");

router
  .route("/", auth)
  .get(getcategory)
  .post(multer.single("avatar"), addcategory);
router.delete("/:id", auth, deleteCategory);
router.patch("/:id", auth, updateCategory);

router.post("/images", multer.single("edit-avatar"), uploadImage);
module.exports = router;
