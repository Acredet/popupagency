const express = require("express");
const auth = require("../middleware/auth");
const {
  getcategory,
  addcategory,
  deleteCategory,
  updateCategory
} = require("../controller/category");
const router = express.Router();

router
  .route("/", auth)
  .get(getcategory)
  .post(addcategory);
router.delete("/:id", auth, deleteCategory);
router.patch("/:id", auth, updateCategory);
module.exports = router;
