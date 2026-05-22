const kategoriService = require('../services/kategoriRuangan.service')

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
    const { v4: uuidv4 } = require('uuid')
    // Ambil klinik_id dari user (asumsi user terkait 1 klinik untuk mock)
    // Untuk mock, kita hardcode klinik_id dari user pertama yang login
    // Sebenarnya di DB user punya id_klinik, tapi di token kita belum simpan.
    // Untuk simplicity, ambil dari req.body atau default.
    const id_klinik = req.body.id_klinik || req.user.id_klinik || 'default-klinik'

    const data = {
      id: uuidv4(),
      id_klinik,
      ...req.body,
    }
    const result = await kategoriService.create(data)
    res.status(201).json(result)
  } catch (err) {
    next(err)
  }
}

const update = async (req, res, next) => {
  try {
    const result = await kategoriService.update(req.params.id, req.body)
    res.json(result)
  } catch (err) {
    next(err)
  }
}

module.exports = { getAll, getById, create, update }
