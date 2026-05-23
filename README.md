# Medeva Backend

Backend API untuk aplikasi Room Category Management. Dibangun dengan Express.js 5 dan SQLite.

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js 5
- **Database:** SQLite3
- **Authentication:** JWT (JSON Web Token)
- **Validation:** Yup
- **Password Hashing:** bcryptjs

## Struktur Proyek

```
madeva-backend/
├── src/
│   ├── config/
│   │   └── db.js              # Database connection & table initialization
│   ├── controllers/
│   │   ├── auth.controller.js  # Login & user auth endpoints
│   │   └── kategoriRuangan.controller.js
│   ├── middleware/
│   │   └── auth.js             # JWT verification & RBAC middleware
│   ├── routes/
│   │   ├── auth.routes.js
│   │   └── kategoriRuangan.routes.js
│   ├── seeders/
│   │   ├── index.js            # Seeder orchestrator
│   │   ├── klinik.seeder.js
│   │   ├── users.seeder.js
│   │   ├── kelasRuangan.seeder.js
│   │   └── kategoriRuangan.seeder.js
│   ├── services/
│   │   ├── auth.service.js
│   │   └── kategoriRuangan.service.js
│   ├── utils/
│   │   └── recaptcha.js
│   ├── app.js                  # Express app setup
│   └── server.js               # Server entry point
└── medeva.db                   # SQLite database file (auto-generated)
```

## Instalasi

```bash
cd madeva-backend
npm install
```

## Menjalankan

### Development

```bash
npm run dev
```

Server berjalan di `http://localhost:3001`

### Production

```bash
npm start
```

### Seed Data

Untuk mengisi database dengan data awal:

```bash
node src/seeders/index.js
```

## Environment Variables

Buat file `.env` di root project:

```env
PORT=3001
JWT_SECRET=your_jwt_secret_key_here
RECAPTCHA_SECRET_KEY=your_recaptcha_secret_key
```

## API Endpoints

### Authentication

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/login` | Login user | No |
| GET | `/api/auth/me` | Get current user | Yes |

#### POST /api/auth/login

Request body:
```json
{
  "kodeAuth": "MEDEVA01",
  "username": "admin",
  "password": "password123",
  "recaptchaToken": "optional"
}
```

Response:
```json
{
  "token": "jwt_token_here",
  "user": {
    "id": "uuid",
    "username": "admin",
    "nama_lengkap": "Admin Medeva",
    "email": "admin@medeva.com",
    "is_admin": true
  }
}
```

### Kategori Ruangan

| Method | Endpoint | Description | Auth | Role |
|--------|----------|-------------|------|------|
| GET | `/api/kategori-ruangan` | Get all (with pagination) | Yes | All |
| GET | `/api/kategori-ruangan/:id` | Get by ID | Yes | All |
| POST | `/api/kategori-ruangan` | Create new | Yes | Admin |
| PUT | `/api/kategori-ruangan/:id` | Update | Yes | Admin |
| PATCH | `/api/kategori-ruangan/:id/status` | Toggle active status | Yes | Admin |
| GET | `/api/kategori-ruangan/kelas-ruangan` | Get kelas options | Yes | All |

#### GET /api/kategori-ruangan

Query parameters:
- `page` (number): Page number (default: 1)
- `perPage` (number): Items per page (default: 10)
- `search` (string): Search by nama_ruangan

Response:
```json
{
  "data": [...],
  "meta": {
    "page": 1,
    "perPage": 10,
    "total": 50,
    "totalPages": 5
  }
}
```

#### POST /api/kategori-ruangan

Request body:
```json
{
  "id_kelas_ruangan": "uuid",
  "nama_ruangan": "VVIP-01",
  "harga_ruangan": "5000000",
  "jumlah_kamar": 2,
  "jenis_kelamin": "Semua",
  "usia": "Semua",
  "penyakit": "Semua",
  "fasilitas_ruangan": ["AC", "TV", "Kasur"]
}
```

## Database Schema

### klinik
| Column | Type | Constraint |
|--------|------|------------|
| id | UUID | PK |
| nama | VARCHAR(50) | NOT NULL |
| alamat | VARCHAR(100) | NULL |
| kode_auth | VARCHAR(20) | NOT NULL |

### users
| Column | Type | Constraint |
|--------|------|------------|
| id | UUID | PK |
| id_klinik | UUID | FK → klinik.id |
| nama_lengkap | VARCHAR(40) | NOT NULL |
| email | VARCHAR(30) | NOT NULL |
| username | VARCHAR(20) | NOT NULL, UNIQUE |
| password_hash | VARCHAR | NOT NULL |
| is_admin | BOOLEAN | NOT NULL |

### kelas_ruangan
| Column | Type | Constraint |
|--------|------|------------|
| id | UUID | PK |
| id_klinik | UUID | FK → klinik.id |
| nama_kelas | VARCHAR(40) | NOT NULL |
| is_active | BOOLEAN | DEFAULT true |

### kategori_ruangan
| Column | Type | Constraint |
|--------|------|------------|
| id | UUID | PK |
| id_klinik | UUID | FK → klinik.id |
| id_kelas_ruangan | UUID | FK → kelas_ruangan.id |
| nama_ruangan | VARCHAR(100) | NOT NULL |
| harga_ruangan | VARCHAR(100) | NOT NULL |
| jumlah_kamar | INTEGER | DEFAULT 0 |
| jenis_kelamin | VARCHAR(20) | NULL |
| usia | VARCHAR(20) | NULL |
| penyakit | VARCHAR(100) | NULL |
| fasilitas_ruangan | TEXT (JSON) | NULL |
| is_active | BOOLEAN | DEFAULT true |

## Default Credentials

| Role | Kode Klinik | Username | Password |
|------|-------------|----------|----------|
| Admin | MEDEVA01 | admin | password123 |
| User | MEDEVA01 | user | password123 |

## RBAC Rules

| Action | Admin | User |
|--------|-------|------|
| Lihat data | ✅ | ✅ |
| Tambah data | ✅ | ❌ |
| Edit data | ✅ | ❌ |
| Toggle status | ✅ | ❌ |
