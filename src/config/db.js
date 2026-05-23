const { Pool } = require('pg')

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
})

const db = {
  async query(text, params) {
    const result = await pool.query(text, params)
    return result
  },

  async get(text, params) {
    const result = await pool.query(text, params)
    return result.rows[0] || null
  },

  async all(text, params) {
    const result = await pool.query(text, params)
    return result.rows
  },

  async run(text, params) {
    const result = await pool.query(text, params)
    return { changes: result.rowCount, lastID: result.rows[0]?.id }
  },
}

const initTables = async () => {
  await db.query(`
    CREATE TABLE IF NOT EXISTS klinik (
      id VARCHAR(36) PRIMARY KEY NOT NULL,
      nama VARCHAR(50) NOT NULL,
      alamat VARCHAR(100),
      kode_auth VARCHAR(20) NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `)

  await db.query(`
    CREATE TABLE IF NOT EXISTS users (
      id VARCHAR(36) PRIMARY KEY NOT NULL,
      id_klinik VARCHAR(36) NOT NULL,
      nama_lengkap VARCHAR(40) NOT NULL,
      email VARCHAR(30) NOT NULL,
      username VARCHAR(20) NOT NULL UNIQUE,
      password_hash VARCHAR NOT NULL,
      is_admin BOOLEAN NOT NULL DEFAULT false,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (id_klinik) REFERENCES klinik(id)
    )
  `)

  await db.query(`
    CREATE TABLE IF NOT EXISTS kelas_ruangan (
      id VARCHAR(36) PRIMARY KEY NOT NULL,
      id_klinik VARCHAR(36) NOT NULL,
      nama_kelas VARCHAR(40) NOT NULL,
      is_active BOOLEAN DEFAULT true,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (id_klinik) REFERENCES klinik(id)
    )
  `)

  await db.query(`
    CREATE TABLE IF NOT EXISTS kategori_ruangan (
      id VARCHAR(36) PRIMARY KEY NOT NULL,
      id_klinik VARCHAR(36) NOT NULL,
      id_kelas_ruangan VARCHAR(36) NOT NULL,
      jenis_kelamin VARCHAR(20),
      usia VARCHAR(20),
      penyakit VARCHAR(100),
      nama_ruangan VARCHAR(100) NOT NULL,
      harga_ruangan VARCHAR(100) NOT NULL,
      jumlah_kamar INTEGER DEFAULT 0,
      fasilitas_ruangan JSONB,
      is_active BOOLEAN DEFAULT true,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (id_klinik) REFERENCES klinik(id),
      FOREIGN KEY (id_kelas_ruangan) REFERENCES kelas_ruangan(id)
    )
  `)
}

module.exports = { db, pool, initTables }
