const express = require("express");
const auth = require("../middleware/auth");
const { gettag, addtag, deleteTag, updateTag } = require("../controller/tag");
const router = express.Router();
const { multer, uploadImage } = require('../middleware/upload')

router
  .route("/", auth)
  .get(gettag)
  .post(multer.single('avatar'), addtag)
router.delete("/:id", auth, deleteTag);
router.patch("/:id", auth, updateTag);
router.post('/images', multer.single('edit-avatar'), uploadImage)
module.exports = router;
