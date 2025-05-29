const express = require('express');
const employeeRoutes = require('./employee.routes');

const router = express.Router();

router.use('/employees', employeeRoutes);

module.exports = router;