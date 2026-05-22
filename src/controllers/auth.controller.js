const authService = require('../services/auth.service')
const { verifyRecaptcha } = require('../utils/recaptcha')

const login = async (req, res, next) => {
  try {
    const { username, password, recaptchaToken } = req.body

    if (!username || !password) {
      return res.status(400).json({ error: 'Username dan password wajib diisi' })
    }

    // Verifikasi reCAPTCHA token jika ada
    if (recaptchaToken) {
      const isValid = await verifyRecaptcha(recaptchaToken)
      if (!isValid) {
        return res.status(400).json({ error: 'Verifikasi reCAPTCHA gagal. Silakan coba lagi.' })
      }
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
