const mongoose = require("mongoose");
const config = require("../../config/config");

const isDev = process.env.NODE_ENV !== "production";

mongoose.Promise = global.Promise;

mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false);

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

const DB = mongoose.connect(isDev ? config.db_dev : config.db, options)
  .then(() => console.log("Connected to database"))
  .catch(err => console.log(err));

module.exports = DB;
