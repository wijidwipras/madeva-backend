const { v4: uuidv4 } = require('uuid')
const bcrypt = require('bcryptjs')
const { db } = require('../config/db')

const seedUsers = async (klinikId) => {
  const users = [
    {
      nama_lengkap: 'Admin Medeva',
      email: 'admin@medeva.com',
      username: 'admin',
      password: 'password123',
      is_admin: true,
    },
    {
      nama_lengkap: 'User Medeva',
      email: 'user@medeva.com',
      username: 'user',
      password: 'password123',
      is_admin: false,
    },
  ]

  for (const u of users) {
    const existing = await db.get('SELECT id FROM users WHERE username = $1', [u.username])
    if (existing) {
      console.log(`User ${u.username} already exists, skipping.`)
      continue
    }

    const id = uuidv4()
    const hash = await bcrypt.hash(u.password, 10)
    await db.run(
      `INSERT INTO users (id, id_klinik, nama_lengkap, email, username, password_hash, is_admin, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`,
      [id, klinikId, u.nama_lengkap, u.email, u.username, hash, u.is_admin]
    )
  }

  console.log('Seeded users: admin/password123, user/password123')
}

module.exports = { seedUsers }
