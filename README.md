# Medeva Backend - Manajemen Karyawan API

API service untuk mengelola data karyawan sebagai bagian dari Tes Fullstack Developer Medeva. [cite: 1] Proyek ini dibangun menggunakan Node.js dan Express.js dengan database PostgreSQL.

## Fitur Utama
- Autentikasi dummy untuk akses ke endpoint.
- Operasi CRUD (Create, Read, Update, Delete) untuk data karyawan.
- Pemfilteran dan pencarian data karyawan.
- Validasi input menggunakan Yup. [cite: 1]

## Prasyarat
- Node.js (versi 16.x atau lebih tinggi direkomendasikan)
- npm (versi 8.x atau lebih tinggi) atau yarn
- PostgreSQL server (versi 12.x atau lebih tinggi direkomendasikan)

## Instalasi
1.  Clone repository ini:
    ```bash
    git clone https://github.com/wijidwipras/madeva-backend.git
    cd medeva-backend
    ```
2.  Install dependensi:
    ```bash
    npm install
    # atau
    yarn install
    ```

## Konfigurasi
1.  Buat file `.env` di root direktori proyek (`medeva-backend`).
2.  Salin konten dari file `.env.example` (lihat di bawah) ke dalam file `.env` Anda.
3.  Sesuaikan variabel environment di file `.env` dengan konfigurasi lokal Anda, terutama untuk koneksi database PostgreSQL dan port server.

    **Contoh `.env.example`:**
    ```env
    # Server Configuration
    PORT=3001

    # PostgreSQL Database Configuration
    DB_USER=postgres_user_anda
    DB_HOST=localhost
    DB_DATABASE=nama_database_anda
    DB_PASSWORD=password_db_anda
    DB_PORT=5432

    # Dummy Auth (JWT_SECRET)
    # DUMMY_USERNAME=userdev
    # DUMMY_PASSWORD=password123
    ```

## Setup Database
1.  Pastikan server PostgreSQL Anda berjalan.
2.  Buat database baru (misalnya, `medeva_db`) dan import ke db anda.

## Menjalankan Proyek
1.  Untuk mode development (dengan auto-reload menggunakan nodemon):
    ```bash
    npm run dev
    ```
2.  Untuk mode produksi (atau menjalankan tanpa nodemon):
    ```bash
    npm start
    ```
    Server akan berjalan di port yang Anda tentukan di file `.env` (default: 3001).

## Struktur Folder Utama
Proyek ini mencoba mengikuti prinsip Clean Architecture [cite: 1] dengan pemisahan sebagai berikut:
```
src/
├── api/                # (Jika menggunakan struktur presentasi lebih dalam)
├── config/             # Konfigurasi database, environment variables
├── controllers/        # Handler untuk request HTTP, memanggil services
├── domains/            # Entitas atau model data bisnis (termasuk skema Yup) 
├── middlewares/        # Middleware (otentikasi, logger, error handling) 
├── repositories/       # Logika akses data ke database 
├── routes/             # Definisi endpoint API dan mapping ke controllers 
├── services/           # (Atau use_cases) Logika bisnis aplikasi, memanggil repositories
├── utils/              # Fungsi-fungsi utilitas
├── app.js              # Konfigurasi utama aplikasi Express
└── server.js           # Titik masuk untuk menjalankan server HTTP
```

## API Endpoints (Contoh)
Semua endpoint di-prefix dengan `/api`. Beberapa endpoint memerlukan token otentikasi dummy.

- **Auth:**
    - `POST /auth/login`: Login untuk mendapatkan token dummy.
- **Karyawan (`/employee`):**
    - `GET /employee/get-all`: Mendapatkan semua karyawan (dilindungi, mendukung query params: `status`, `search`, `tipe_karyawan`, `page`, `limit`).
    - `POST /employee`: Menambah karyawan baru (dilindungi).
    - `GET /employee/:id`: Mendapatkan detail karyawan berdasarkan ID (dilindungi).
    - `PUT /employee/:id`: Mengupdate data karyawan berdasarkan ID (dilindungi).
    - `DELETE /employee/:id`: Menghapus karyawan berdasarkan ID (dilindungi).

## Teknologi yang Digunakan
- Node.js
- Express.js [cite: 1]
- PostgreSQL (dengan library `pg`) [cite: 1]
- `cors` untuk menangani Cross-Origin Resource Sharing.
- `bcryptjs` untuk hashing password (pada dummy login atau jika ada manajemen user).
- `yup` untuk validasi data. [cite: 1]
- `dotenv` untuk manajemen environment variables.
- `multer` untuk penanganan file upload (jika diimplementasikan). [cite: 1]
- `nodemon` (dev dependency) untuk auto-reload server.
