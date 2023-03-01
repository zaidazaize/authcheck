const bcrypt = require('bcrypt')
const client = require('../config/database')
const jwt = require('jsonwebtoken')

module.exports.register = async (req, res) => {
    // console.log("register",req.body)
    const {  username, password } = req.body;
    try {
        const data = await client.query(`SELECT * FROM users WHERE email = $1;`, [username])
        // console.log("register",data.rows);
        const arr = data.rows;
        if (arr.length != 0) {
            return res.status(400).json({
                error: "user already exists"
            })
        }
        bcrypt.hash(password, 10, (err, hash) => {
            if (err) {
                res.status(err).json({
                    error: "server error"
                })
            }
                const user = { email: username, password: hash }
                var flag = 1;
                client.query(`INSERT INTO users (email,password,date_entered) values($1, $2, CURRENT_TIMESTAMP )`, [user.email, user.password], (err) => {
                    if (err) {
                        flag = 1;
                        return res.status(500).json({
                            error: "data base error"
                        })

                    } else {
                        flag = 1;
                        res.status(200).send({ message: "user added to database" })
                    }
                })
                if (flag) {
                    const token = jwt.sign({ email: user.email }, process.env.SECRET_KEY);
                }
            })
        
    } catch (err) {
        // console.log(err)
        res.status(500).json({
            error: "database error user while registering the user"
        })
    }

}

