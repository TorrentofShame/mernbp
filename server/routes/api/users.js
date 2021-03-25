const express = require("express");

const User = require("../../database/schemas/User");

const router = express.Router();

module.exports = router;

router.get("/listusers", (req, res, next) => {
  User.find()
    .exec()
    .then(user => res.json(user))
    .catch(err => next(err));
});
