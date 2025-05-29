const employeeRepository = require('../repositories/employee.repository');

const getAllEmployees = async () => {
  try {
    const employees = await employeeRepository.findAllEmployees();
    return employees;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllEmployees,
  // ...
};