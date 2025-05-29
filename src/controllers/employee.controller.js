const employeeService = require('../services/employee.service');

const getAllEmployeesController = async (req, res, next) => {
  try {
    const employees = await employeeService.getAllEmployees();
    res.status(200).json({
      status: 'success',
      message: 'Berhasil mengambil data semua karyawan',
      data: employees,
    });
  } catch (error) {
    res.status(500).json({
        status: 'error',
        message: error.message || 'Gagal mengambil data karyawan',
    });
  }
};

module.exports = {
  getAllEmployeesController,
  // ...
};