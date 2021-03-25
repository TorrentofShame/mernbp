const User = require("../../database/schemas/User");
const LocalStrategy = require("passport-local").Strategy;

const strategy = new LocalStrategy(
  (username, password, done) => {
    User.findOne({ username: username },
      (err, user) => {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: "Incorrect username." });
        }
        if (!user.validPassword(password)) {
          return done(null, false, { message: "Incorrect password." });
        }

        return done(null, user);

      });
  });

module.exports = strategy;
