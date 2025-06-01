const express = require('express');
const employeeController = require('../controllers/employee.controller');
const authenticateToken = require('../middlewares/auth.middleware');

const router = express.Router();

// Middleware
router.get('/get-all', authenticateToken, employeeController.getAllEmployeesController);
router.post('/', authenticateToken, employeeController.postEmployeeController);
router.put('/:id', authenticateToken, employeeController.putEmployeeController);
router.get('/:id', authenticateToken, employeeController.getEmployeeByIdController);
router.delete('/:id', authenticateToken, employeeController.deleteEmployeeByIdController);

module.exports = router;