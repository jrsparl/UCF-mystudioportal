const { User, Teacher, Student } = require("../models");
var passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy;

  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "passwd",
      },
      function (username, password, done) {
        User.findOne({  include: [
          {
            model: Student,
          },
          {
            model: Teacher,
          },
        ], username: username }, function (err, user) {
          if (err) {
            return done(err);
          }
          if (!user) {
            return done(null, false, { message: "Incorrect username." });
          }
          if (!user.validPassword(password)) {
            return done(null, false, { message: "Incorrect password." });
          }
          return done(null, user);
        });
      }
    )
  );

module.exports = passport;