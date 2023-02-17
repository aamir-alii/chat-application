const mongoose = require("mongoose");
require("dotenv").config();
const connect = () => {
  mongoose.connect(process.env.DB_URI);
};

module.exports = connect;
