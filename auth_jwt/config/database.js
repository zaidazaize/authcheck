require('dotenv').config()
const { Client } = require('pg')

const client = new Client()

module.exports = client;