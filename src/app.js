const express = require('express')
const cors = require('cors')
const mainRoutes = require('./routes/index')
const errorHandler = require('./middleware/errorHandler')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`)
  next()
})

app.use('/api', mainRoutes)

app.use(errorHandler)

module.exports = app
