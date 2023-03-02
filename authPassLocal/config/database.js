const mongoose = require('mongoose');

const connection = mongoose.createConnection(process.env.DB_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});



const User = connection.model('User', new mongoose.Schema({
    username: String,
    password: String,
}))

module.exports = connection