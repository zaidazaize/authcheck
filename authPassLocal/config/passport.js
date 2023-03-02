const passport = require("passport");
const LocalStrategy = require("passport-local");
const passwordUtils = require("../utils/passwordUtils");

var connection = require("./database");

const User = connection.models.User;

passport.use(
  new LocalStrategy(function varify(username, password, cb) {
    User.findOne({ username: username })
      .then(async (user) => {
        if (!user) {
          return cb(null, false, { message: "Invalid user or password" });
        }
        const isValid = await passwordUtils.isValidPassword(
          password,
          user.password
        );
        console.log("isvalid", isValid);
        if (isValid) {
          return cb(null, user);
        } else {
          return cb(null, false,{message : "Incorect password"});
        }
      })
      .catch((err) => {
        console.log(err);
        cb(err);
      });
  })
);

passport.serializeUser((user,cb)=> {
  return cb(null, {
    username: user.username,
    id : user.id
  })
})

passport.deserializeUser((user, cb) => {
  return cb(null,user)
})