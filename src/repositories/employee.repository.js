const db = require("../config/db");

const findAllEmployees = async () => {
  const { rows } = await db.query(
    "SELECT id, nama_lengkap, no_ktp_nik, jenis_kelamin, tempat_lahir, tanggal_lahir, no_telepon, alamat, provinsi, kota_kabupaten, kecamatan, kelurahan, kode_pos, username, email, tipe_karyawan, tanggal_mulai_kontrak, tanggal_selesai_kontrak, status_menikah, foto_profil_url, kode_dokter_bpjs, created_at, updated_at FROM m_employee ORDER BY nama_lengkap ASC"
  );
  return rows;
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

module.exports = {
  findAllEmployees,
  createEmployee
};
