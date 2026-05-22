const app = require('./app')
require('dotenv').config()
const { runSeeders } = require('./seeders')

const PORT = process.env.PORT || 3001

const startServer = async () => {
  await runSeeders()

  app.listen(PORT, () => {
    console.log(`Server backend berjalan di http://localhost:${PORT}`)
  })
}

startServer()
