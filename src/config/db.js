const sqlite3 = require('sqlite3').verbose()
const path = require('path')

const DB_PATH = process.env.DB_PATH || path.join(__dirname, '../../medeva.db')

const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error('Error opening database:', err.message)
  } else {
    console.log('Connected to SQLite database.')
  }
})

const initTables = () => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.run(`
        CREATE TABLE IF NOT EXISTS klinik (
          id TEXT PRIMARY KEY NOT NULL,
          nama VARCHAR(50) NOT NULL,
          alamat VARCHAR(100),
          kode_auth VARCHAR(20) NOT NULL,
          created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        )
      `)

      db.run(`
        CREATE TABLE IF NOT EXISTS users (
          id TEXT PRIMARY KEY NOT NULL,
          id_klinik TEXT NOT NULL,
          nama_lengkap VARCHAR(40) NOT NULL,
          email VARCHAR(30) NOT NULL,
          username VARCHAR(20) NOT NULL UNIQUE,
          password_hash VARCHAR NOT NULL,
          is_admin BOOLEAN NOT NULL DEFAULT 0,
          created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (id_klinik) REFERENCES klinik(id)
        )
      `)

      db.run(`
        CREATE TABLE IF NOT EXISTS kelas_ruangan (
          id TEXT PRIMARY KEY NOT NULL,
          id_klinik TEXT NOT NULL,
          nama_kelas VARCHAR(40) NOT NULL,
          is_active BOOLEAN DEFAULT 1,
          created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (id_klinik) REFERENCES klinik(id)
        )
      `)

      db.run(`
        CREATE TABLE IF NOT EXISTS kategori_ruangan (
          id TEXT PRIMARY KEY NOT NULL,
          id_klinik TEXT NOT NULL,
          id_kelas_ruangan TEXT NOT NULL,
          jenis_kelamin VARCHAR(20),
          usia VARCHAR(20),
          penyakit VARCHAR(100),
          nama_ruangan VARCHAR(100) NOT NULL,
          harga_ruangan VARCHAR(100) NOT NULL,
          jumlah_kamar INTEGER DEFAULT 0,
          fasilitas_ruangan TEXT,
          is_active BOOLEAN DEFAULT 1,
          created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (id_klinik) REFERENCES klinik(id),
          FOREIGN KEY (id_kelas_ruangan) REFERENCES kelas_ruangan(id)
        )
      `, (err) => {
        if (err) return reject(err)
        // Migration: add jumlah_kamar column if it doesn't exist
        db.run(`ALTER TABLE kategori_ruangan ADD COLUMN jumlah_kamar INTEGER DEFAULT 0`, (err2) => {
          // Ignore error if column already exists
          resolve()
        })
      })
    })
  })
}

module.exports = { db, initTables }
