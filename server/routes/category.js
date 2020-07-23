const express = require("express");
const auth = require("../middleware/auth");
const {
  getcategory,
  addcategory,
  deleteCategory,
  updateCategory
} = require("../controller/category");
const router = express.Router();
const { multer } = require('../middleware/upload')

router
  .route("/", auth)
  .get(getcategory)
  .post(multer.single('avatar'), addcategory);
router.delete("/:id", auth, deleteCategory);
router.patch("/:id", multer.single('edit-avatar'), auth, updateCategory);
module.exports = router;
