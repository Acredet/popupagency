const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
	destination(req, file, cb) {
		cb(null, path.join(__dirname, "..", "client", "img"));
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
