const express = require('express')
const authRoutes = require('./auth.routes')
const kategoriRuanganRoutes = require('./kategoriRuangan.routes')

const router = express.Router()

router.use('/auth', authRoutes)
router.use('/kategori-ruangan', kategoriRuanganRoutes)

module.exports = router
