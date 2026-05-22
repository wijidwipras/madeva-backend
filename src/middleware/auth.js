const jwt = require('jsonwebtoken')

const JWT_SECRET = process.env.JWT_SECRET || 'medeva_secret_key'

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token tidak ditemukan' })
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    req.user = decoded
    next()
  } catch (err) {
    return res.status(401).json({ error: 'Token tidak valid atau sudah expired' })
  }
}

const authorizeAdmin = (req, res, next) => {
  if (!req.user || !req.user.is_admin) {
    return res.status(403).json({ error: 'Akses ditolak. Hanya Admin yang diizinkan.' })
  }
  next()
}

module.exports = { authenticate, authorizeAdmin, JWT_SECRET }
