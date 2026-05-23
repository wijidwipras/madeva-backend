const { db } = require('../config/db')

const getAll = async ({ page = 1, perPage = 10, search = '' }) => {
  const offset = (page - 1) * perPage
  let query = `
    SELECT kr.*, kel.nama_kelas
    FROM kategori_ruangan kr
    LEFT JOIN kelas_ruangan kel ON kr.id_kelas_ruangan = kel.id
  `
  let countQuery = 'SELECT COUNT(*) as total FROM kategori_ruangan'
  const params = []
  const countParams = []

  if (search) {
    query += ' WHERE kr.nama_ruangan ILIKE $1'
    countQuery += ' WHERE nama_ruangan ILIKE $1'
    params.push(`%${search}%`)
    countParams.push(`%${search}%`)
  }

  query += ` ORDER BY kr.created_at DESC`
  params.push(perPage, offset)
  query += ` LIMIT $${params.length - 1} OFFSET $${params.length}`

  const rows = await db.all(query, params)
  const countRow = await db.get(countQuery, countParams)

  return {
    data: rows.map(r => ({
      ...r,
      fasilitas_ruangan: r.fasilitas_ruangan || null,
    })),
    meta: {
      page: parseInt(page),
      perPage: parseInt(perPage),
      total: parseInt(countRow.total),
      totalPages: Math.ceil(countRow.total / perPage),
    },
  }
}

const getById = async (id) => {
  const row = await db.get(
    `SELECT kr.*, kel.nama_kelas
     FROM kategori_ruangan kr
     LEFT JOIN kelas_ruangan kel ON kr.id_kelas_ruangan = kel.id
     WHERE kr.id = $1`,
    [id]
  )
  if (!row) throw { status: 404, message: 'Data tidak ditemukan' }
  return {
    ...row,
    fasilitas_ruangan: row.fasilitas_ruangan || null,
  }
}

const create = async (data) => {
  const { id, id_klinik, id_kelas_ruangan, jenis_kelamin, usia, penyakit, nama_ruangan, harga_ruangan, jumlah_kamar, fasilitas_ruangan } = data
  await db.run(
    `INSERT INTO kategori_ruangan (id, id_klinik, id_kelas_ruangan, jenis_kelamin, usia, penyakit, nama_ruangan, harga_ruangan, jumlah_kamar, fasilitas_ruangan, is_active, created_at, updated_at)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`,
    [id, id_klinik, id_kelas_ruangan, jenis_kelamin, usia, penyakit, nama_ruangan, harga_ruangan, jumlah_kamar || 0, JSON.stringify(fasilitas_ruangan || [])]
  )
  return { id, ...data }
}

const update = async (id, data) => {
  const { id_kelas_ruangan, jenis_kelamin, usia, penyakit, nama_ruangan, harga_ruangan, jumlah_kamar, fasilitas_ruangan, is_active } = data
  const result = await db.run(
    `UPDATE kategori_ruangan
     SET id_kelas_ruangan = $1, jenis_kelamin = $2, usia = $3, penyakit = $4, nama_ruangan = $5, harga_ruangan = $6, jumlah_kamar = $7, fasilitas_ruangan = $8, is_active = $9, updated_at = CURRENT_TIMESTAMP
     WHERE id = $10`,
    [id_kelas_ruangan, jenis_kelamin, usia, penyakit, nama_ruangan, harga_ruangan, jumlah_kamar || 0, JSON.stringify(fasilitas_ruangan || []), is_active !== undefined ? is_active : true, id]
  )
  if (result.changes === 0) throw { status: 404, message: 'Data tidak ditemukan' }
  return { id, ...data }
}

const toggleStatus = async (id) => {
  const result = await db.run(
    `UPDATE kategori_ruangan
     SET is_active = NOT is_active, updated_at = CURRENT_TIMESTAMP
     WHERE id = $1`,
    [id]
  )
  if (result.changes === 0) throw { status: 404, message: 'Data tidak ditemukan' }

  const row = await db.get(
    `SELECT kr.*, kel.nama_kelas
     FROM kategori_ruangan kr
     LEFT JOIN kelas_ruangan kel ON kr.id_kelas_ruangan = kel.id
     WHERE kr.id = $1`,
    [id]
  )
  return {
    ...row,
    fasilitas_ruangan: row.fasilitas_ruangan || null,
  }
}

const getKelasRuangan = async (idKlinik) => {
  return await db.all(
    `SELECT id, nama_kelas, is_active FROM kelas_ruangan WHERE id_klinik = $1 AND is_active = true ORDER BY created_at ASC`,
    [idKlinik]
  )
}

module.exports = { getAll, getById, create, update, toggleStatus, getKelasRuangan }
