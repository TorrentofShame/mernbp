const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");

//const config = require("../config/config");
const webpackConfig = require("../webpack.config");

const passport = require("./services/passport");

const isDev = process.env.NODE_ENV !== "production";

const host = process.env.HOST || "127.0.0.1";
const port = process.env.PORT || 8080;

/*
    Configuration
*/

// Mongoose
require("./database");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Passport.js
passport(app);

// API Routes
app.use("/api", require("./routes"));

if (isDev) {
  const compiler = webpack(webpackConfig);

  app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath
  }));
  app.use(webpackHotMiddleware(compiler));

  app.use(express.static(path.resolve(__dirname, "../dist")));

} else {

  app.use(express.static(path.resolve(__dirname, "../dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../dist/index.html"));
    res.end();
  });
}

app.listen(port, host, err => {
  if (err) console.log(err);

  console.info(`Listening on http://${host}:${port}`);
});

module.exports = app;
