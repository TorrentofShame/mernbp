const express = require("express");
const passport = require("passport");

/* const User = require("../../database/schemas/User");
   const auth = require("../../middleware/auth"); */

const router = express.Router();

module.exports = router;

/* router.get("/auth", auth, (req, res) => {
   res.status(200).json({
   _id: req.user._id,
   isAdmin: req.user.role === 0 ? false : true,
   isAuth: true,
   email: req.user.email,
   date_joined: req.user.date_joined,
   role: req.user.role
   });
   }); */

router.post("/fuc", (req, res, next) => {
  if (!req) { return next(); }
  res.send({
    message: "fasdf",
  });
});

router.post("/login", (req, res, next) => {
  req.body.username = req.body.username.toLowerCase();

  passport.authenticate("local", (err, user, info) => {
    if (err) { return next(err); }
    if (!user) { return res.status.send(info); }

    req.login(user, err => {
      if (err) {
        res.status(401).send({ message: "Login Failed", err });
      }
      res.send({
        message: "Successfully logged in",
        user: user.hidePassword()
      });
    });

  })(req, res, next);
});

router.get("/logout", (req, res) => {
  req.session.destroy(err => {
    if (err) {
      res.status(400).send({ message: "Logout failed", err });
    }
    req.sessionID = null;
    req.logout();
    res.send({ message: "Logged out successfully" });
  });
});
