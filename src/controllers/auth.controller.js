const authService = require('../services/auth.service')
const { verifyRecaptcha } = require('../utils/recaptcha')

const login = async (req, res, next) => {
  try {
    const { kodeAuth, username, password, recaptchaToken } = req.body

    if (!kodeAuth || !username || !password) {
      return res.status(400).json({ error: 'Kode Klinik, username, dan password wajib diisi' })
    }

    // Verifikasi reCAPTCHA token jika ada
    if (recaptchaToken) {
      const isValid = await verifyRecaptcha(recaptchaToken)
      if (!isValid) {
        return res.status(400).json({ error: 'Verifikasi reCAPTCHA gagal. Silakan coba lagi.' })
      }
    }

    const result = await authService.login(kodeAuth, username, password)
    res.json(result)
  } catch (err) {
    next(err)
  }
}

const me = (req, res) => {
  res.json({ user: req.user })
}

module.exports = { login, me }
