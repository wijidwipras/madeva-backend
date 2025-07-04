const express = require('express');
const mainRoutes = require('./routes/index');
const cors = require('cors');
const loggerMiddleware = require('./middlewares/logger.middleware');

const app = express();
app.use(cors());

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(loggerMiddleware);

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
  next();
});

// Main Utama
app.use('/api', mainRoutes);

// Main Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: 'Terjadi kesalahan pada server!' });
});

module.exports = app;