const express = require('express')
const { getAll, getById, create, update, toggleStatus, getKelasRuangan } = require('../controllers/kategoriRuangan.controller')
const { authenticate, authorizeAdmin } = require('../middleware/auth')

const router = express.Router()

router.get('/', authenticate, getAll)
router.get('/kelas-ruangan', authenticate, getKelasRuangan)
router.get('/:id', authenticate, getById)
router.post('/', authenticate, authorizeAdmin, create)
router.put('/:id', authenticate, authorizeAdmin, update)
router.patch('/:id/status', authenticate, authorizeAdmin, toggleStatus)

module.exports = router
