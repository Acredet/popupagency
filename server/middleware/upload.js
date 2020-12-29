const multer = require("multer");

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, `${__dirname}/../uploads/images`);
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.fieldname}-${file.originalname}`);
  },
});

const upload = multer({ storage });

function uploadImage(req, res) {
  return res.status(200).json(req.file.filename);
}

module.exports.multer = upload;
module.exports.uploadImage = uploadImage;
