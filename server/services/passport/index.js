/* const fs = require("fs");
   const path = require("path"); */
const passport = require("passport");
const session = require("express-session");
const uuid = require("uuid").v4;
const MongoStore = require("connect-mongo")(session);
const mongoose = require("mongoose");

const User = require("../../database/schemas/User");

module.exports = app => {

  app.use(session({
    genid: () => uuid(),
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      collection: "sessions"
    }),
    secret: "viva la pluto",
    resave: false,
    saveUninitialized: false
  }));

  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, done) => {
    done(null, { _id: user._id });
  });

  passport.deserializeUser((id, done) => {
    User.findOne({ _id: id },
      "username role characters",
      (err, user) => { done(null, user); }
    );
  });


  passport.use(require("./localStrategy"));
};
