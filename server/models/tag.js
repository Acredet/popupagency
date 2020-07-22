const mongoose = require("mongoose");
const tagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  parent: {
    type: String
  },
  description: {
    type: String
  },
  avatar: {
    type: String
  }
});

module.exports = mongoose.model("Tag", tagSchema);
