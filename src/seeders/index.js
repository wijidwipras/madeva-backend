const { initTables } = require('../config/db')
const { seedKlinik } = require('./klinik.seeder')
const { seedUsers } = require('./users.seeder')
const { seedKelasRuangan } = require('./kelasRuangan.seeder')
const { seedKategoriRuangan } = require('./kategoriRuangan.seeder')

const runSeeders = async () => {
  try {
    await initTables()
    console.log('Database tables initialized.')

    const klinikId = await seedKlinik()
    await seedUsers(klinikId)
    await seedKelasRuangan(klinikId)
    await seedKategoriRuangan(klinikId)

    console.log('All seeders completed successfully.')
  } catch (err) {
    console.error('Seeder error:', err.message)
  }
}

module.exports = { runSeeders }
