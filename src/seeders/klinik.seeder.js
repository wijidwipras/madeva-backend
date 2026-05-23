const { v4: uuidv4 } = require('uuid')
const { db } = require('../config/db')

const seedKlinik = async () => {
  const id = uuidv4()
  const nama = 'Klinik Medeva Utama'
  const alamat = 'Jl. Kesehatan No. 123, Jakarta'
  const kodeAuth = 'MEDEVA01'

  const existing = await db.get('SELECT id FROM klinik WHERE kode_auth = $1', [kodeAuth])
  if (existing) {
    console.log('Klinik already exists, using existing ID:', existing.id)
    return existing.id
  }

  await db.run(
    `INSERT INTO klinik (id, nama, alamat, kode_auth, created_at, updated_at)
     VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`,
    [id, nama, alamat, kodeAuth]
  )
  console.log('Seeded klinik:', nama)
  return id
}

module.exports = { seedKlinik }
