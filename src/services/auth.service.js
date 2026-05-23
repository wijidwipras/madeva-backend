const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { db } = require('../config/db')
const { JWT_SECRET } = require('../middleware/auth')

const login = (kodeAuth, username, password) => {
  return new Promise((resolve, reject) => {
    // First, find klinik by kode_auth
    db.get(`SELECT id FROM klinik WHERE kode_auth = ?`, [kodeAuth], (err, klinik) => {
      if (err) return reject(err)
      if (!klinik) return reject({ status: 401, message: 'Kode klinik tidak valid' })

      // Then, find user by username and klinik id
      db.get(`SELECT * FROM users WHERE username = ? AND id_klinik = ?`, [username, klinik.id], async (err, user) => {
        if (err) return reject(err)
        if (!user) return reject({ status: 401, message: 'Username atau password salah' })

        const isMatch = await bcrypt.compare(password, user.password_hash)
        if (!isMatch) return reject({ status: 401, message: 'Username atau password salah' })

        const token = jwt.sign(
          { id: user.id, username: user.username, is_admin: user.is_admin === 1, id_klinik: user.id_klinik },
          JWT_SECRET,
          { expiresIn: '24h' }
        )

        resolve({
          token,
          user: {
            id: user.id,
            username: user.username,
            nama_lengkap: user.nama_lengkap,
            email: user.email,
            is_admin: user.is_admin === 1,
          },
        })
      })
    })
  })
}

module.exports = { login }
