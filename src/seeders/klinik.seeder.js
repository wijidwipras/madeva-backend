const { v4: uuidv4 } = require('uuid')
const { db } = require('../config/db')

const seedKlinik = () => {
  return new Promise((resolve, reject) => {
    const id = uuidv4()
    const nama = 'Klinik Medeva Utama'
    const alamat = 'Jl. Kesehatan No. 123, Jakarta'
    const kodeAuth = 'MEDEVA01'

    db.run(
      `INSERT OR IGNORE INTO klinik (id, nama, alamat, kode_auth, created_at, updated_at)
       VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`,
      [id, nama, alamat, kodeAuth],
      function (err) {
        if (err) return reject(err)
        resolve(id)
      }
    )
  })
}

module.exports = { seedKlinik }
