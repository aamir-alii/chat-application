const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  uName: {
    type: String,
    required: true,
  },
  pass: {
    type: String,
    required: true,
  },
  socket: {
    type: String,
    default: "",
  },
});
userModel = mongoose.model("User", UserSchema);
module.exports = userModel;
