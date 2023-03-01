require('dotenv').config()
const express = require('express')
const path = require('path');
const { stringify } = require('querystring');
const port = process.env.port || 5000;
const client = require('./config/database')
const user = require('./routes/user')

client.connect((err) => {
    if(err) console.log(err)
    else console.log("database connected")
})
const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')
app.use(express.static(__dirname +'/public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.get('/', (req, res) => {
  res.redirect('user/login')
})
app.use('/user', user);

app.listen(port, () => {
    console.log(`the port is running on ${port}`)
    
})