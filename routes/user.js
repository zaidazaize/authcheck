const express = require('express')
const router = express.Router()

const {register} = require('../controller/register')
const {login} = require('../controller/login')
router.get('/login', (req, res,next) => {
    res.render('login');
    next()
})
router.post('/register',register)
router.post('/login',login)
module.exports = router;