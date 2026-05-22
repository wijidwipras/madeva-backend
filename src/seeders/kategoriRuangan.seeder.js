const { v4: uuidv4 } = require('uuid')
const { db } = require('../config/db')

const seedKategoriRuangan = async (klinikId) => {
  // Ambil semua kelas_ruangan untuk klinik ini
  const rows = await new Promise((resolve, reject) => {
    db.all(`SELECT id FROM kelas_ruangan WHERE id_klinik = ?`, [klinikId], (err, rows) => {
      if (err) return reject(err)
      resolve(rows)
    })
  })

  if (rows.length === 0) return

  const categories = [
    {
      nama_ruangan: 'Ruangan Melati VIP',
      harga_ruangan: 'Rp 1.500.000',
      jenis_kelamin: 'Perempuan',
      usia: 'Dewasa',
      penyakit: '-',
      fasilitas: JSON.stringify(['AC', 'TV', 'Kamar Mandi Dalam', 'WiFi']),
    },
    {
      nama_ruangan: 'Ruangan Mawar I',
      harga_ruangan: 'Rp 850.000',
      jenis_kelamin: 'Laki-laki',
      usia: 'Dewasa',
      penyakit: 'Umum',
      fasilitas: JSON.stringify(['AC', 'TV', 'Kamar Mandi Dalam']),
    },
    {
      nama_ruangan: 'Ruangan Anggrek II',
      harga_ruangan: 'Rp 500.000',
      jenis_kelamin: 'Campur',
      usia: 'Anak-anak',
      penyakit: 'Demam',
      fasilitas: JSON.stringify(['Kipas Angin', 'TV Bersama']),
    },
  ]

  for (const cat of categories) {
    const id = uuidv4()
    const kelasId = rows[Math.floor(Math.random() * rows.length)].id
    await new Promise((resolve, reject) => {
      db.run(
        `INSERT OR IGNORE INTO kategori_ruangan (id, id_klinik, id_kelas_ruangan, jenis_kelamin, usia, penyakit, nama_ruangan, harga_ruangan, fasilitas_ruangan, is_active, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`,
        [id, klinikId, kelasId, cat.jenis_kelamin, cat.usia, cat.penyakit, cat.nama_ruangan, cat.harga_ruangan, cat.fasilitas],
        function (err) {
          if (err) return reject(err)
          resolve()
        }
      )
    })
  }

  console.log('Seeded kategori_ruangan:', categories.length, 'items')
}

module.exports = { seedKategoriRuangan }
