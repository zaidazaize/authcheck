const bcrypt = require("bcrypt");
const client = require("../config/database");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  // console.log("reqest body login",req.body);
  const { username, password } = req.body;
  try {
    const data = await client.query(`SELECT  * FROM users where email = $1`, [
      username,
    ]);
    const user = data.rows;
    // console.log(user);
    if (user.length == 0) {
      return res.status(404).json({ message: "User is not registerd" });
    } else {
      bcrypt.compare(password, user[0].password, (err, result) => {
        if (err) {
          res.status(500).json({
            error: "Server error",
          });
        } else if (result === true) {
          //Checking if credentials match
          const token = jwt.sign(
            {
              email: username,
            },
            process.env.SECRET_KEY
          );
          res.status(200).json({
            message: "User signed in!",
            token: token,
          });
        } else {
          //Declaring the errors
          if (result != true)
            res.status(400).json({
              error: "Enter correct password!",
            });
        }
      });
    }
  } catch (err) {
    // console.log(err);
    res.status(500).json({
      error: "Database error occurred while signing in!", //Database connection error
    });
  }
};
