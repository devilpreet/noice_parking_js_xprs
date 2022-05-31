const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const app = express()
const {errorResponder} = require("./src/error")

const router = express.Router()
/* Endpoints */
require('./src/endpoints')(router)


/* Middlewares */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('combined'))
app.use(router)
app.use(errorResponder)

module.exports = app