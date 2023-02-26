const mongoose = require("mongoose");
const { PRODUCTION_DB, LOCAL_DB } = require("./keys");
const dotenv = require("dotenv");
dotenv.config();

let mongoUrl = null;

const mongoConnection = () => {
  if (process.env.NODE_ENV === "development") {
    mongoUrl = LOCAL_DB || "mongodb://localhost:27017/stackoverclone";
  } else {
    mongoUrl = PRODUCTION_DB;
  }
  return mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = mongoConnection;
