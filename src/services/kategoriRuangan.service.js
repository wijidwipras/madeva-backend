const { db } = require('../config/db')

const getAll = ({ page = 1, perPage = 10, search = '' }) => {
  return new Promise((resolve, reject) => {
    const offset = (page - 1) * perPage
    const searchQuery = search ? `WHERE nama_ruangan LIKE ?` : ''
    const params = search ? [`%${search}%`] : []

    db.all(
      `SELECT kr.*, kel.nama_kelas
       FROM kategori_ruangan kr
       LEFT JOIN kelas_ruangan kel ON kr.id_kelas_ruangan = kel.id
       ${searchQuery}
       ORDER BY kr.created_at DESC
       LIMIT ? OFFSET ?`,
      [...params, perPage, offset],
      (err, rows) => {
        if (err) return reject(err)

        db.get(
          `SELECT COUNT(*) as total FROM kategori_ruangan ${searchQuery}`,
          params,
          (err2, countRow) => {
            if (err2) return reject(err2)
            resolve({
              data: rows.map(r => ({
                ...r,
                fasilitas_ruangan: r.fasilitas_ruangan ? JSON.parse(r.fasilitas_ruangan) : null,
              })),
              meta: {
                page: parseInt(page),
                perPage: parseInt(perPage),
                total: countRow.total,
                totalPages: Math.ceil(countRow.total / perPage),
              },
            })
          }
        )
      }
    )
  })
}

const getById = (id) => {
  return new Promise((resolve, reject) => {
    db.get(
      `SELECT kr.*, kel.nama_kelas
       FROM kategori_ruangan kr
       LEFT JOIN kelas_ruangan kel ON kr.id_kelas_ruangan = kel.id
       WHERE kr.id = ?`,
      [id],
      (err, row) => {
        if (err) return reject(err)
        if (!row) return reject({ status: 404, message: 'Data tidak ditemukan' })
        resolve({
          ...row,
          fasilitas_ruangan: row.fasilitas_ruangan ? JSON.parse(row.fasilitas_ruangan) : null,
        })
      }
    )
  })
}

const create = (data) => {
  return new Promise((resolve, reject) => {
    const { id, id_klinik, id_kelas_ruangan, jenis_kelamin, usia, penyakit, nama_ruangan, harga_ruangan, fasilitas_ruangan } = data
    db.run(
      `INSERT INTO kategori_ruangan (id, id_klinik, id_kelas_ruangan, jenis_kelamin, usia, penyakit, nama_ruangan, harga_ruangan, fasilitas_ruangan, is_active, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`,
      [id, id_klinik, id_kelas_ruangan, jenis_kelamin, usia, penyakit, nama_ruangan, harga_ruangan, JSON.stringify(fasilitas_ruangan || [])],
      function (err) {
        if (err) return reject(err)
        resolve({ id, ...data })
      }
    )
  })
}

const update = (id, data) => {
  return new Promise((resolve, reject) => {
    const { id_kelas_ruangan, jenis_kelamin, usia, penyakit, nama_ruangan, harga_ruangan, fasilitas_ruangan, is_active } = data
    db.run(
      `UPDATE kategori_ruangan
       SET id_kelas_ruangan = ?, jenis_kelamin = ?, usia = ?, penyakit = ?, nama_ruangan = ?, harga_ruangan = ?, fasilitas_ruangan = ?, is_active = ?, updated_at = CURRENT_TIMESTAMP
       WHERE id = ?`,
      [id_kelas_ruangan, jenis_kelamin, usia, penyakit, nama_ruangan, harga_ruangan, JSON.stringify(fasilitas_ruangan || []), is_active !== undefined ? (is_active ? 1 : 0) : 1, id],
      function (err) {
        if (err) return reject(err)
        if (this.changes === 0) return reject({ status: 404, message: 'Data tidak ditemukan' })
        resolve({ id, ...data })
      }
    )
  })
}

const toggleStatus = (id) => {
  return new Promise((resolve, reject) => {
    db.run(
      `UPDATE kategori_ruangan
       SET is_active = CASE WHEN is_active = 1 THEN 0 ELSE 1 END,
           updated_at = CURRENT_TIMESTAMP
       WHERE id = ?`,
      [id],
      function (err) {
        if (err) return reject(err)
        if (this.changes === 0) return reject({ status: 404, message: 'Data tidak ditemukan' })
        db.get(
          `SELECT kr.*, kel.nama_kelas
           FROM kategori_ruangan kr
           LEFT JOIN kelas_ruangan kel ON kr.id_kelas_ruangan = kel.id
           WHERE kr.id = ?`,
          [id],
          (err2, row) => {
            if (err2) return reject(err2)
            resolve({
              ...row,
              fasilitas_ruangan: row.fasilitas_ruangan ? JSON.parse(row.fasilitas_ruangan) : null,
            })
          }
        )
      }
    )
  })
}

const getKelasRuangan = (idKlinik) => {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT id, nama_kelas, is_active FROM kelas_ruangan WHERE id_klinik = ? AND is_active = 1 ORDER BY created_at ASC`,
      [idKlinik],
      (err, rows) => {
        if (err) return reject(err)
        resolve(rows)
      }
    )
  })
}

module.exports = { getAll, getById, create, update, toggleStatus, getKelasRuangan }
