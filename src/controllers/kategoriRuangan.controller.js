const kategoriService = require('../services/kategoriRuangan.service')
const yup = require('yup')

const createSchema = yup.object({
  id_kelas_ruangan: yup.string().required('Kelas ruangan wajib dipilih'),
  nama_ruangan: yup.string().max(100).required('Nama ruangan wajib diisi'),
  harga_ruangan: yup.string().max(100).required('Harga ruangan wajib diisi'),
  jumlah_kamar: yup.number().typeError('Jumlah kamar harus berupa angka').min(0, 'Jumlah kamar minimal 0').nullable(),
  jenis_kelamin: yup.string().max(20).nullable(),
  usia: yup.string().max(20).nullable(),
  penyakit: yup.string().max(100).nullable(),
  fasilitas_ruangan: yup.array().of(yup.string()).nullable(),
  is_active: yup.boolean().nullable(),
})

const getAll = async (req, res, next) => {
  try {
    const { page, perPage, search } = req.query
    const result = await kategoriService.getAll({ page, perPage, search })
    res.json(result)
  } catch (err) {
    next(err)
  }
}

const getById = async (req, res, next) => {
  try {
    const result = await kategoriService.getById(req.params.id)
    res.json(result)
  } catch (err) {
    next(err)
  }
}

const create = async (req, res, next) => {
  try {
    await createSchema.validate(req.body, { abortEarly: false })

    const { v4: uuidv4 } = require('uuid')
    const id_klinik = req.user.id_klinik

    const data = {
      id: uuidv4(),
      id_klinik,
      ...req.body,
    }
    const result = await kategoriService.create(data)
    res.status(201).json(result)
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({
        error: 'Validasi gagal',
        details: err.inner.map(e => ({ field: e.path, message: e.message })),
      })
    }
    next(err)
  }
}

const update = async (req, res, next) => {
  try {
    await createSchema.validate(req.body, { abortEarly: false })
    const result = await kategoriService.update(req.params.id, req.body)
    res.json(result)
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({
        error: 'Validasi gagal',
        details: err.inner.map(e => ({ field: e.path, message: e.message })),
      })
    }
    next(err)
  }
}

const toggleStatus = async (req, res, next) => {
  try {
    const result = await kategoriService.toggleStatus(req.params.id)
    res.json(result)
  } catch (err) {
    if (err.status === 404) {
      return res.status(404).json({ error: err.message })
    }
    next(err)
  }
}

const getKelasRuangan = async (req, res, next) => {
  try {
    const idKlinik = req.user.id_klinik
    const result = await kategoriService.getKelasRuangan(idKlinik)
    res.json(result)
  } catch (err) {
    next(err)
  }
}

module.exports = { getAll, getById, create, update, toggleStatus, getKelasRuangan }
