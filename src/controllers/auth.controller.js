const authService = require('../services/auth.service')

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body
    if (!username || !password) {
      return res.status(400).json({ error: 'Username dan password wajib diisi' })
    }
    const result = await authService.login(username, password)
    res.json(result)
  } catch (err) {
    next(err)
  }
}

const me = (req, res) => {
  res.json({ user: req.user })
}

module.exports = { login, me }
