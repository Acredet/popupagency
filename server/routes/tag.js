const express = require("express");
const auth = require("../middleware/auth");
const { gettag, addtag, deleteTag, updateTag } = require("../controller/tag");
const router = express.Router();
const { multer } = require('../middleware/upload')

router
  .route("/", auth)
  .get(gettag)
  .post(multer.single('avatar'), addtag)
router.delete("/:id", auth, deleteTag);
router.patch("/:id", multer.single('edit-avatar'), auth, updateTag);
module.exports = router;
