const { v4: uuidv4 } = require('uuid')
const { db } = require('../config/db')

const seedKelasRuangan = async (klinikId) => {
  const kelasList = ['Kelas VIP', 'Kelas I', 'Kelas II', 'Kelas III']

  for (const nama of kelasList) {
    const existing = await db.get('SELECT id FROM kelas_ruangan WHERE nama_kelas = $1 AND id_klinik = $2', [nama, klinikId])
    if (existing) {
      console.log(`Kelas ${nama} already exists, skipping.`)
      continue
    }

    const id = uuidv4()
    await db.run(
      `INSERT INTO kelas_ruangan (id, id_klinik, nama_kelas, is_active, created_at, updated_at)
       VALUES ($1, $2, $3, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`,
      [id, klinikId, nama]
    )
  }

  console.log('Seeded kelas_ruangan:', kelasList)
}

module.exports = { seedKelasRuangan }
