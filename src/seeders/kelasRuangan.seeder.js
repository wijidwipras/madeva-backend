const { v4: uuidv4 } = require('uuid')
const { db } = require('../config/db')

const seedKelasRuangan = async (klinikId) => {
  const kelasList = ['Kelas VIP', 'Kelas I', 'Kelas II', 'Kelas III']

  for (const nama of kelasList) {
    const id = uuidv4()
    await new Promise((resolve, reject) => {
      db.run(
        `INSERT OR IGNORE INTO kelas_ruangan (id, id_klinik, nama_kelas, is_active, created_at, updated_at)
         VALUES (?, ?, ?, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`,
        [id, klinikId, nama],
        function (err) {
          if (err) return reject(err)
          resolve()
        }
      )
    })
  }

  console.log('Seeded kelas_ruangan:', kelasList)
}

module.exports = { seedKelasRuangan }
