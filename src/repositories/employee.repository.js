const db = require('../config/db');

const findAllEmployees = async () => {
  const { rows } = await db.query('SELECT id, nama_lengkap, no_ktp_nik, jenis_kelamin, tempat_lahir, tanggal_lahir, no_telepon, alamat, provinsi, kota_kabupaten, kecamatan, kelurahan, kode_pos, username, email, tipe_karyawan, tanggal_mulai_kontrak, tanggal_selesai_kontrak, status_menikah, foto_profil_url, kode_dokter_bpjs, created_at, updated_at FROM m_employee ORDER BY nama_lengkap ASC');
  return rows;
};

module.exports = {
  findAllEmployees,
};