const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const isValidEmail = require("../../utils/utils").isValidEmail;
//const jwt = require("jsonwebtoken");

const saltRounds = 10;

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: 1,
    maxlength: 50,
    lowercase: true
  },
  email: {
    type: String,
    required: true,
    unique: 1,
    lowercase: true,
    validator: isValidEmail
  },
  password: {
    type: String,
    required: true
  },
  date_joined: {
    type: Date,
    default: Date.now
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user"
  }
});

UserSchema.pre("save", next => {
  let user = this;

  if (user.isModified("password")) {
    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

/*
UserSchema.methods.validPassword = (plain_password, cb) => {
};

UserSchema.methods.generateToken = (cb) => {
};

UserSchema.statics.findByToken = (token, cb) => {
};
*/

module.exports = mongoose.model("User", UserSchema);
