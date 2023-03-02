const express = require("express");
const router = express.Router();
const passport = require("passport");

router
  .route("/")
  .get((req, res) => {
    console.log(req.body)
    res.render("login");
  })
  .post(
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureMessage: true,
    }), (req, res) => {
        res.send(`<h1>hello ${req.user.username}</h1>`)
    }
);
  
router.route('/signup')
  .get((req, res) => {
  res.render('signup')
  })
  .post((req, res) => {
    
    console.log(req.body)
  })
router.route('/logout').get(
  (req, res) => {
    req.session.destroy()
    res.send("<h1>Logged out</h1>")
  }
)
module.exports = router;
