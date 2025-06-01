const express = require('express');
const employeeRoutes = require('./employee.routes');
const authRoutes = require('./auth.routes');

const router = express.Router();

router.use('/employee', employeeRoutes);
router.use('/auth', authRoutes);

module.exports = router;