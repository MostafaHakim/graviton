const dotenv = require("dotenv");
dotenv.config();

const mongoose = require("mongoose");

const ConnectDB = () => {
  mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log("DB Connected");
  });
};

module.exports = ConnectDB;
