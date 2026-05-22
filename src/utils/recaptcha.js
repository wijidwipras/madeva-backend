const axios = require('axios')

/**
 * Verifikasi token reCAPTCHA dengan Google API.
 *
 * @param {string} token - Token dari widget reCAPTCHA client
 * @returns {Promise<boolean>} - true jika verifikasi sukses, false jika gagal
 */
const verifyRecaptcha = async (token) => {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY

  if (!secretKey) {
    console.warn('RECAPTCHA_SECRET_KEY tidak diatur. Lewati verifikasi reCAPTCHA.')
    return true
  }

  try {
    const response = await axios.post(
      'https://www.google.com/recaptcha/api/siteverify',
      null,
      {
        params: {
          secret: secretKey,
          response: token,
        },
      }
    )

    return response.data.success === true
  } catch (err) {
    console.error('reCAPTCHA verification error:', err.message)
    return false
  }
}

module.exports = { verifyRecaptcha }
