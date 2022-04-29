const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  Atpresent: {
  	type: Date,
	default: new Date()
  }
});

module.exports = mongoose.model("User", UserSchema);
