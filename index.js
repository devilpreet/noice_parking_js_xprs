const CONFIG = require('./src/config')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()

/* Middlewares */
app.use(bodyParser.json())

app.listen(CONFIG.PORT, () => {
  console.log("Server is running on", CONFIG.PORT)
  console.log("API documentation: <baseUrl>/doc")
})

/* Endpoints */
require('./src/endpoints')(app)