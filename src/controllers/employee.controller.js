const employeeService = require('../services/employee.service');
const { employeeSchema } = require('../domains/employee.domain'); // skema Yup

const getAllEmployeesController = async (req, res, next) => {
  try {
    const param = req._parsedUrl.query;
    const employees = await employeeService.getAllEmployees(param);
    res.status(200).json({
      status: 'success',
      message: 'Berhasil mengambil data semua karyawan',
      data: {
        data: employees.rows,
        total: employees.totalRecords,
        page: employees.page,
        limit: employees.limit
      },
    });
  } catch (error) {
    res.status(500).json({
        status: 'error',
        message: error.message || 'Gagal mengambil data karyawan',
    });
  }
};

const getEmployeeByIdController = async (req, res, next) => {
  try {
    const employeeId = req.params.id;
    const employee = await employeeService.getEmployeeById(employeeId);

    if (!employee) {
      return res.status(404).json({
        status: 'fail',
        message: 'Karyawan tidak ditemukan.',
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Berhasil mengambil data semua karyawan',
      data: employee,
    });
  } catch (error) {
    res.status(500).json({
        status: 'error',
        message: error.message || 'Gagal mengambil data karyawan',
    });
  }
};

const postEmployeeController = async (req, res, next) => {
  try {
    const validatedData = await employeeSchema.validate(req.body, {
      abortEarly: false, // all error validasi, not first
      stripUnknown: true, // delete req not use in schema
    });

    const employees = await employeeService.postEmployee(validatedData);
    res.status(200).json({
      status: 'success',
      message: 'Berhasil menambah data karyawan',
      data: employees,
    });
  } catch (error) {
    if (error.name === 'ValidationError') { // Error Yup
      const errors = error.inner.reduce((acc, err) => {
        acc[err.path] = err.message;
        return acc;
      }, {});
      return res.status(400).json({
        status: 'fail',
        message: 'Data yang diberikan tidak valid',
        errors,
      });
    }

    return res.status(error.statusCode || 500).json({
      status: 'error',
      message: error.message || 'Gagal menambahkan karyawan baru',
    });
  }
};

const putEmployeeController = async (req, res, next) => {
  try {
    const employeeId = req.params.id;

    const validatedData = await employeeSchema.validate(req.body, {
      abortEarly: false, // all error validasi, not first
      stripUnknown: true, // delete req not use in schema
    });

    const employee = await employeeService.putEmployee(employeeId, validatedData);
    if (!employee) {
      return res.status(404).json({
        status: 'fail',
        message: 'Karyawan tidak ditemukan.',
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Berhasil mengubah data karyawan',
      data: employee,
    });
  } catch (error) {
    if (error.name === 'ValidationError') { // Error Yup
      const errors = error.inner.reduce((acc, err) => {
        acc[err.path] = err.message;
        return acc;
      }, {});
      return res.status(400).json({
        status: 'fail',
        message: 'Data yang diberikan tidak valid',
        errors,
      });
    }

    return res.status(error.statusCode || 500).json({
      status: 'error',
      message: error.message || 'Gagal menambahkan karyawan baru',
    });
  }
};

const deleteEmployeeByIdController = async (req, res, next) => {
  try {
    const employeeId = req.params.id;
    const employee = await employeeService.deleteEmployeeById(employeeId);

    res.status(200).json({
      status: 'success',
      message: 'Berhasil menghapus data karyawan',
      data: employee,
    });
  } catch (error) {
    res.status(500).json({
        status: 'error',
        message: error.message || 'Gagal menghapus data karyawan',
    });
  }
};


module.exports = {
  getAllEmployeesController,
  postEmployeeController,
  getEmployeeByIdController,
  putEmployeeController,
  deleteEmployeeByIdController
};