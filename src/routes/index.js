const express = require('express');
const testRoutes = require('./test.routes');

const router = express.Router();

router.use('/test', testRoutes);

module.exports = router;