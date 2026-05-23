const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { db } = require('../config/db')
const { JWT_SECRET } = require('../middleware/auth')

const login = async (kodeAuth, username, password) => {
  // First, find klinik by kode_auth
  const klinik = await db.get('SELECT id FROM klinik WHERE kode_auth = $1', [kodeAuth])
  if (!klinik) throw { status: 401, message: 'Kode klinik tidak valid' }

  // Then, find user by username and klinik id
  const user = await db.get('SELECT * FROM users WHERE username = $1 AND id_klinik = $2', [username, klinik.id])
  if (!user) throw { status: 401, message: 'Username atau password salah' }

  const isMatch = await bcrypt.compare(password, user.password_hash)
  if (!isMatch) throw { status: 401, message: 'Username atau password salah' }

  const token = jwt.sign(
    { id: user.id, username: user.username, is_admin: user.is_admin === true, id_klinik: user.id_klinik },
    JWT_SECRET,
    { expiresIn: '24h' }
  )

  return {
    token,
    user: {
      id: user.id,
      username: user.username,
      nama_lengkap: user.nama_lengkap,
      email: user.email,
      is_admin: user.is_admin === true,
    },
  }
}

module.exports = { login }
