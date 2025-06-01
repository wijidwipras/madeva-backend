const employeeRepository = require("../repositories/employee.repository");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");

const parseQueryStringToFilters = (queryString) => {
  const filters = {
    page: 1, // Default page
    limit: 10, // Default limit
  };

  if (!queryString) {
    return filters;
  }

  const params = new URLSearchParams(queryString);

  if (params.has("status")) {
    filters.status = params.get("status").toLowerCase();
  }

  if (params.has("search")) {
    filters.search = params.get("search");
  }

  if (params.has("tipe_karyawan")) {
    filters.tipe_karyawan = params.get("tipe_karyawan");
  }

  if (params.has("page")) {
    const page = parseInt(params.get("page"), 10);
    if (!isNaN(page) && page > 0) {
      filters.page = page;
    }
  }

  if (params.has("limit")) {
    const limit = parseInt(params.get("limit"), 10);
    if (!isNaN(limit) && limit > 0) {
      filters.limit = limit;
    }
  }

  return filters;
};

const getAllEmployees = async (param) => {
  try {
    const filter = parseQueryStringToFilters(param)
    const employees = await employeeRepository.findAllEmployees(filter);
    return employees;
  } catch (error) {
    throw error;
  }
};

const getEmployeeById = async (id) => {
  try {
    const employee = await employeeRepository.findEmployeeById(id);
    return employee;
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
    id: myUuid,
  };
  delete newEmployeeData.password;

  try {
    const employee = await employeeRepository.createEmployee(newEmployeeData);
    return employee;
  } catch (error) {
    // error duplikasi dari database
    // const errorMsg = error.constraint.split("_");
    // const tabelMsg = errorMsg.slice(0, 2);
    // const columnMsg = errorMsg.slice(2);

    if (error.code === "23505") {
      // Kode error PostgreSQL untuk unique violation
      const uniqueConstraintError = new Error(
        // `Data dengan ${tabelMsg.join("_")} '${columnMsg.join("_")}' sudah ada.`
        `Data dengan ${error.constraint}' sudah ada.`
      );
      uniqueConstraintError.statusCode = 409;
      throw uniqueConstraintError;
    }
    throw error;
  }
};

const putEmployee = async (employeeId, validatedData) => {
  // Hashing password & uuid
  const salt = await bcrypt.genSalt(10);

  let editEmployeeData
  if (validatedData.password) {
      const password_hash = await bcrypt.hash(validatedData.password, salt);
      editEmployeeData = {
        ...validatedData,
        password_hash,
      };
      delete editEmployeeData.password;
  }else{
      const employee = await employeeRepository.findPWById(employeeId);
      editEmployeeData = {
        ...validatedData,
        password_hash: employee.password_hash,
      };
  }

  console.log("editEmployeeData",editEmployeeData);

  try {
    const employee = await employeeRepository.editEmployeeById(employeeId, editEmployeeData);
    return employee;
  } catch (error) {
    // error duplikasi dari database
    // const errorMsg = error.constraint.split("_");
    // const tabelMsg = errorMsg.slice(0, 2);
    // const columnMsg = errorMsg.slice(2);

    if (error.code === "23505") {
      // Kode error PostgreSQL untuk unique violation
      const uniqueConstraintError = new Error(
        `Data dengan ${error.constraint}' sudah ada.`
      );
      uniqueConstraintError.statusCode = 409;
      throw uniqueConstraintError;
    }
    throw error;
  }
};

const deleteEmployeeById = async (id) => {
    try {
      const employee = await employeeRepository.deleteEmployeeById(id);
      return employee;
    } catch (error) {
      throw error;
    }
  };

module.exports = {
  getAllEmployees,
  postEmployee,
  getEmployeeById,
  putEmployee,
  deleteEmployeeById
};
