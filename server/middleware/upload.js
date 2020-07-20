const multer = require('multer')

const storage = multer.diskStorage({
  destination (req, file, cb) {
    cb(null, `${__dirname}/../images`)
  },
  filename (req, file, cb) {
    cb(null, `${file.fieldname.slice(0, file.fieldname.length-2)}-${Date.now()}.jpg`)
  }
})

const upload = multer({ storage })

module.exports.multer = upload
