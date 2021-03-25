const fs = require("fs");
const path = require("path");
const express = require("express");
const router = express.Router();

fs.readdirSync(path.resolve(__dirname + "/api/")).forEach(file => {
  let apipath = `./api/${file.slice(0,-3)}`;
  router.use(`/${file.slice(0,-3).toLowerCase()}`, require(apipath));
});

module.exports = router;
