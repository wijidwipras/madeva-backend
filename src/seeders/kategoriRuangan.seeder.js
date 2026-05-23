const { v4: uuidv4 } = require('uuid')
const { db } = require('../config/db')

const seedKategoriRuangan = async (klinikId) => {
  const rows = await db.all('SELECT id FROM kelas_ruangan WHERE id_klinik = $1', [klinikId])
  if (rows.length === 0) return

  const categories = [
    {
      nama_ruangan: 'Ruangan Melati VIP',
      harga_ruangan: 'Rp 1.500.000',
      jumlah_kamar: 2,
      jenis_kelamin: 'Perempuan',
      usia: 'Dewasa',
      penyakit: '-',
      fasilitas: ['AC', 'TV', 'Kamar Mandi Dalam', 'WiFi'],
    },
    {
      nama_ruangan: 'Ruangan Mawar I',
      harga_ruangan: 'Rp 850.000',
      jumlah_kamar: 4,
      jenis_kelamin: 'Laki-laki',
      usia: 'Dewasa',
      penyakit: 'Umum',
      fasilitas: ['AC', 'TV', 'Kamar Mandi Dalam'],
    },
    {
      nama_ruangan: 'Ruangan Anggrek II',
      harga_ruangan: 'Rp 500.000',
      jumlah_kamar: 6,
      jenis_kelamin: 'Campur',
      usia: 'Anak-anak',
      penyakit: 'Demam',
      fasilitas: ['Kipas Angin', 'TV Bersama'],
    },
  ]

  for (const cat of categories) {
    const existing = await db.get('SELECT id FROM kategori_ruangan WHERE nama_ruangan = $1 AND id_klinik = $2', [cat.nama_ruangan, klinikId])
    if (existing) {
      console.log(`Kategori ${cat.nama_ruangan} already exists, skipping.`)
      continue
    }

    const id = uuidv4()
    const kelasId = rows[Math.floor(Math.random() * rows.length)].id
    await db.run(
      `INSERT INTO kategori_ruangan (id, id_klinik, id_kelas_ruangan, jenis_kelamin, usia, penyakit, nama_ruangan, harga_ruangan, jumlah_kamar, fasilitas_ruangan, is_active, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`,
      [id, klinikId, kelasId, cat.jenis_kelamin, cat.usia, cat.penyakit, cat.nama_ruangan, cat.harga_ruangan, cat.jumlah_kamar, JSON.stringify(cat.fasilitas)]
    )
  }

  console.log('Seeded kategori_ruangan:', categories.length, 'items')
}

module.exports = { seedKategoriRuangan }
