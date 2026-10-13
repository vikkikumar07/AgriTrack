const mongoose = require("mongoose");

let userSchema = mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    requred: true,
    unique: true,
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
  location: {
    type: String,
  },
  logo: {
    type: String,
  },
  role: {
    type: String,
    enum: ["farmer", "admin", "export"],
  },
});

let User = mongoose.model("User", userSchema);
module.exports = User;
