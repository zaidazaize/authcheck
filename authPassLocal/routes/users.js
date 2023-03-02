var express = require('express');

var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  if(req.isAuthenticated())
    res.send(`hi user ${req.user.username}`);
  else {
    res.redirect('/login')
  }
});

module.exports = router;
