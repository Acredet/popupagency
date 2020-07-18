const express = require("express");
const auth = require("../middleware/auth");
const { gettag, addtag, deleteTag, updateTag } = require("../controller/tag");
const router = express.Router();

router
  .route("/", auth)
  .get(gettag)
  .post(addtag);
router.delete("/:id", auth, deleteTag);
router.patch("/:id", auth, updateTag);
module.exports = router;
