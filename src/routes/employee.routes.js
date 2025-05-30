const express = require('express');
const employeeController = require('../controllers/employee.controller');

const router = express.Router();

router.get('/get-all', employeeController.getAllEmployeesController);
router.post('/', employeeController.postEmployeeController);
router.put('/:id', employeeController.putEmployeeController);
router.get('/:id', employeeController.getEmployeeByIdController);

module.exports = router;