const mongoose = require('mongoose')
const regionSchema = new mongoose.Schema({
  name: {
    en: {
      type: String,
      required: true
    },
    sv: {
      type: String,
      required: true
    }
  },
  parent: {
    type: mongoose.ObjectId
  },
  description: {
    en: String,
    sv: String
  },
  centrum: mongoose.Schema.Types.ObjectId
})

module.exports = mongoose.model('Region', regionSchema)
