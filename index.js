const CONFIG = require('./src/config')
const app = require('./server')

app.listen(CONFIG.PORT, () => {
  console.log("Server is running on", CONFIG.PORT)
})