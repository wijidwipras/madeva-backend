const app = require('./app')
require('dotenv').config()
const { initTables } = require('./config/db')
const { runSeeders } = require('./seeders')

const PORT = process.env.PORT || 3001

const startServer = async () => {
  try {
    await initTables()
    console.log('Database tables initialized.')

    await runSeeders()

    app.listen(PORT, () => {
      console.log(`Server backend berjalan di http://localhost:${PORT}`)
    })
  } catch (err) {
    console.error('Failed to start server:', err)
    process.exit(1)
  }
}

startServer()
