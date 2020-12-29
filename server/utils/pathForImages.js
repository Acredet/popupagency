const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const mime = {
  html: "text/html",
  txt: "text/plain",
  css: "text/css",
  gif: "image/gif",
  jpg: "image/jpeg",
  png: "image/png",
  svg: "image/svg+xml",
  pdf: "application/pdf",
  js: "application/javascript",
};

router.get("/:name", (req, res) => {
  try {
    const filename = req.params.name;
    const filePath = `${__dirname}/../uploads/images/${filename}`;
    var imageAsBase64 = fs.readFileSync(filePath, "base64");
    const type = mime[path.extname(filePath).slice(1)] || "text/plain";
    res.setHeader("Content-Type", type);

    return res.send(`data:${type};base64,${imageAsBase64}`);
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
