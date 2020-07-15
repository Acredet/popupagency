const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create UserSchema
const UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String
    // required: true,
    // unique: true
  },
  password: {
    type: String
    // required: true
  },
  admin: {
    type: Boolean,
    protect: true,
    default: false
  },
  blocked: {
    type: Boolean,
    default: false
  },
  register_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model("user", UserSchema);
