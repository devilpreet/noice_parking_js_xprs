const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const app = express()

/* Middlewares */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('combined'))

/* Endpoints */
require('./src/endpoints')(app)

module.exports = app