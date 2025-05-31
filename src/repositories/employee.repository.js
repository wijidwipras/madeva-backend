const db = require("../config/db");

const findAllEmployees = async (filters = {}) => {
  const { status, search, tipe_karyawan, page = 1, limit = 10 } = filters;

  let query = `
      SELECT 
        id, nama_lengkap, no_ktp_nik, jenis_kelamin, 
        status, 
        tempat_lahir, tanggal_lahir, no_telepon, alamat, provinsi, 
        kota_kabupaten, kecamatan, kelurahan, kode_pos, username, email, 
        tipe_karyawan, tanggal_mulai_kontrak, tanggal_selesai_kontrak, 
        status_menikah, foto_profil_url, kode_dokter_bpjs, created_at, updated_at 
      FROM 
        m_employee
    `;

  const conditions = [];
  const values = [];
  let placeholderCount = 1;

  if (status) {
    if (
      status.toLowerCase() === "aktif" ||
      status.toLowerCase() === "non-aktif"
    ) {
      conditions.push(`status = $${placeholderCount++}`);
      values.push(status.toLowerCase());
    }
  }

  if (search) {
    conditions.push(
      `(nama_lengkap ILIKE $${placeholderCount++} OR no_ktp_nik ILIKE $${placeholderCount++})`
    );
    values.push(`%${search}%`);
    values.push(`%${search}%`);
  }

  if (tipe_karyawan) {
    conditions.push(`tipe_karyawan = $${placeholderCount++}`);
    values.push(tipe_karyawan);
  }

  if (conditions.length > 0) {
    query += ` WHERE ${conditions.join(" AND ")}`;
  }

  query += ` ORDER BY nama_lengkap ASC`;

  // Pagination
  const offset = (page - 1) * limit;
  query += ` LIMIT $${placeholderCount++} OFFSET $${placeholderCount++}`;
  values.push(limit);
  values.push(offset);

  // total
  let countQuery = `SELECT COUNT(*) FROM m_employee`;
  if (conditions.length > 0) {
    const countValues = values.slice(0, placeholderCount - 3); // 2 terakhir = limit dan offset
    countQuery += ` WHERE ${conditions.join(" AND ")}`;
    const { rows: countRows } = await db.query(countQuery, countValues);
    const totalRecords = parseInt(countRows[0].count, 10);
    const { rows } = await db.query(query, values);
    return { rows, totalRecords, page, limit };
  } else {
    // Jika tidak ada filter, countValues kosong
    const { rows: countRows } = await db.query(countQuery);
    const totalRecords = parseInt(countRows[0].count, 10);
    const { rows } = await db.query(query, values);
    return { rows, totalRecords, page, limit };
  }
};

const findEmployeeById = async (id) => {
  const query = `SELECT id, nama_lengkap, no_ktp_nik, jenis_kelamin, tempat_lahir, tanggal_lahir, no_telepon, alamat, provinsi, kota_kabupaten, kecamatan, kelurahan, kode_pos, username, email, tipe_karyawan, tanggal_mulai_kontrak, tanggal_selesai_kontrak, status_menikah, foto_profil_url, kode_dokter_bpjs, created_at, updated_at FROM m_employee WHERE id = $1`;
  const { rows } = await db.query(query, [id]);
  return rows[0];
};

const createEmployee = async (employeeData) => {
  const {
    id,
    nama_lengkap,
    no_ktp_nik,
    jenis_kelamin,
    tempat_lahir,
    tanggal_lahir,
    no_telepon,
    alamat,
    provinsi,
    kota_kabupaten,
    kecamatan,
    kelurahan,
    kode_pos,
    username,
    email,
    password_hash,
    tipe_karyawan,
    tanggal_mulai_kontrak,
    tanggal_selesai_kontrak,
    status_menikah,
    foto_profil_url,
    kode_dokter_bpjs,
  } = employeeData;

  const query = `
    INSERT INTO m_employee (
      id, nama_lengkap, no_ktp_nik, jenis_kelamin, tempat_lahir, tanggal_lahir,
      no_telepon, alamat, provinsi, kota_kabupaten, kecamatan, kelurahan, kode_pos,
      username, email, password_hash, tipe_karyawan, tanggal_mulai_kontrak,
      tanggal_selesai_kontrak, status_menikah, foto_profil_url, kode_dokter_bpjs
    ) VALUES (
      $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16,
      $17, $18, $19, $20, $21, $22
    ) RETURNING id, nama_lengkap, email, username, created_at;
  `;

  const values = [
    id,
    nama_lengkap,
    no_ktp_nik,
    jenis_kelamin,
    tempat_lahir,
    tanggal_lahir,
    no_telepon,
    alamat,
    provinsi,
    kota_kabupaten,
    kecamatan,
    kelurahan,
    kode_pos,
    username,
    email,
    password_hash,
    tipe_karyawan,
    tanggal_mulai_kontrak,
    tanggal_selesai_kontrak,
    status_menikah,
    foto_profil_url,
    kode_dokter_bpjs,
  ];

  // dummy value
  for (let i = 0; i < values.length; i++) {
    if (values[i] === undefined) {
      values[i] = null;
    }
  }

  const { rows } = await db.query(query, values);
  return rows[0];
};

const editEmployeeById = async (employeeId, editEmployeeData) => {
    const {
        nama_lengkap,
        no_ktp_nik,
        jenis_kelamin,
        tempat_lahir,
        tanggal_lahir,
        no_telepon,
        alamat,
        provinsi,
        kota_kabupaten,
        kecamatan,
        kelurahan,
        kode_pos,
        username,
        email,
        password_hash,
        tipe_karyawan,
        tanggal_mulai_kontrak,
        tanggal_selesai_kontrak,
        status_menikah,
        foto_profil_url,
        kode_dokter_bpjs
    } = editEmployeeData;

    const query = `
      UPDATE m_employee
      SET
        nama_lengkap = $1,
        no_ktp_nik = $2,
        jenis_kelamin = $3,
        tempat_lahir = $4,
        tanggal_lahir = $5,
        no_telepon = $6,
        alamat = $7,
        provinsi = $8,
        kota_kabupaten = $9,
        kecamatan = $10,
        kelurahan = $11,
        kode_pos = $12,
        username = $13,
        email = $14,
        password_hash = $15,
        tipe_karyawan = $16,
        tanggal_mulai_kontrak = $17,
        tanggal_selesai_kontrak = $18,
        status_menikah = $19,
        foto_profil_url = $20,
        kode_dokter_bpjs = $21,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $22
      RETURNING id, nama_lengkap, email, username, updated_at;
    `;

    const values = [
        nama_lengkap,          // $1
        no_ktp_nik,            // $2
        jenis_kelamin,         // $3
        tempat_lahir,          // $4
        tanggal_lahir,         // $5
        no_telepon,            // $6
        alamat,                // $7
        provinsi,              // $8
        kota_kabupaten,        // $9
        kecamatan,             // $10
        kelurahan,             // $11
        kode_pos,              // $12
        username,              // $13
        email,                 // $14
        password_hash,         // $15
        tipe_karyawan,         // $16
        tanggal_mulai_kontrak, // $17
        tanggal_selesai_kontrak, // $18
        status_menikah,        // $19
        foto_profil_url,       // $20
        kode_dokter_bpjs,      // $21
        employeeId             // $22
    ];

    // dummy value
    for (let i = 0; i < values.length; i++) {
        if (values[i] === undefined) {
        values[i] = null;
        }
    }

    const { rows } = await db.query(query, values);
    return rows[0];
}

const deleteEmployeeById = async (id) => {
    const query = `DELETE FROM m_employee WHERE id = $1`;
    const { rows } = await db.query(query, [id]);
    return rows[0];
  };

module.exports = {
  findAllEmployees,
  createEmployee,
  findEmployeeById,
  editEmployeeById,
  deleteEmployeeById
};
