const mongoose = require("mongoose");
const tagSchema = new mongoose.Schema({
  name: {
    en: {
      type: String,
      required: true,
    },
    sv: {
      type: String,
      required: true,
    },
  },
  parent: {
    type: String,
  },
  description: {
    en: String,
    sv: String,
  },
  avatar: {
    type: String,
  },
});

module.exports = mongoose.model("Tag", tagSchema);
