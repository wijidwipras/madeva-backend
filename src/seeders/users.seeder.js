const { v4: uuidv4 } = require('uuid')
const bcrypt = require('bcryptjs')
const { db } = require('../config/db')

const seedUsers = async (klinikId) => {
  const users = [
    {
      nama_lengkap: 'Admin Medeva',
      email: 'admin@medeva.com',
      username: 'admin',
      password: 'admin123',
      is_admin: true,
    },
    {
      nama_lengkap: 'User Medeva',
      email: 'user@medeva.com',
      username: 'user',
      password: 'user123',
      is_admin: false,
    },
  ]

  for (const u of users) {
    const id = uuidv4()
    const hash = await bcrypt.hash(u.password, 10)
    await new Promise((resolve, reject) => {
      db.run(
        `INSERT OR IGNORE INTO users (id, id_klinik, nama_lengkap, email, username, password_hash, is_admin, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`,
        [id, klinikId, u.nama_lengkap, u.email, u.username, hash, u.is_admin ? 1 : 0],
        function (err) {
          if (err) return reject(err)
          resolve()
        }
      )
    })
  }

  console.log('Seeded users: admin/admin123, user/user123')
}

module.exports = { seedUsers }
