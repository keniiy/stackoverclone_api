require("dotenv").config();

module.exports = {
  TEST_DB: process.env.TEST_DB,
  LOCAL_DB: process.env.LOCAL_DB,
  JWTSecret: process.env.JWT_SECRET,
  PRODUCTION_DB: process.env.PRODUCTION_DB,
};
