const employeeRepository = require("../repositories/employee.repository");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require('uuid');

const getAllEmployees = async () => {
  try {
    const employees = await employeeRepository.findAllEmployees();
    return employees;
  } catch (error) {
    throw error;
  }
};

const postEmployee = async (employeeData) => {
  // Hashing password & uuid
  const salt = await bcrypt.genSalt(10);
  const password_hash = await bcrypt.hash(employeeData.password, salt);
  const myUuid = uuidv4();

  const newEmployeeData = {
    ...employeeData,
    password_hash,
    id: myUuid
  };
  delete newEmployeeData.password;

  try {
    const employee = await employeeRepository.createEmployee(newEmployeeData);
    return employee;
  } catch (error) {
      // error duplikasi dari database
    const errorMsg = error.constraint.split('_');
    const tabelMsg = errorMsg.slice(0,2);
    const columnMsg = errorMsg.slice(2);

    if (error.code === '23505') { // Kode error PostgreSQL untuk unique violation
        const uniqueConstraintError = new Error(`Data dengan ${tabelMsg.join("_")} '${columnMsg.join("_")}' sudah ada.`);
        uniqueConstraintError.statusCode = 409;
        throw uniqueConstraintError;
    }
    throw error;
  }
};

module.exports = {
  getAllEmployees,
  postEmployee,
};
