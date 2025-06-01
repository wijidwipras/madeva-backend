-- Adminer 4.8.1 PostgreSQL 17.0 dump

DROP TABLE IF EXISTS "m_employee";
CREATE TABLE "public"."m_employee" (
    "id" character varying(50) NOT NULL,
    "nama_lengkap" character varying(255) NOT NULL,
    "no_ktp_nik" character varying(16) NOT NULL,
    "jenis_kelamin" gender_enum NOT NULL,
    "tempat_lahir" character varying(100),
    "tanggal_lahir" date,
    "no_telepon" character varying(20),
    "alamat" text,
    "provinsi" character varying(100),
    "kota_kabupaten" character varying(100),
    "kecamatan" character varying(100),
    "kelurahan" character varying(100),
    "kode_pos" character varying(10),
    "username" character varying(50) NOT NULL,
    "email" character varying(100) NOT NULL,
    "password_hash" character varying(255) NOT NULL,
    "tipe_karyawan" character varying(50) NOT NULL,
    "tanggal_mulai_kontrak" date,
    "tanggal_selesai_kontrak" date,
    "status_menikah" marital_status_enum,
    "foto_profil_url" character varying(255),
    "kode_dokter_bpjs" character varying(20),
    "created_at" timestamptz DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamptz DEFAULT CURRENT_TIMESTAMP,
    "status" character varying(10) NOT NULL,
    CONSTRAINT "m_employee_email_key" UNIQUE ("email"),
    CONSTRAINT "m_employee_no_ktp_nik_key" UNIQUE ("no_ktp_nik"),
    CONSTRAINT "m_employee_no_telepon_key" UNIQUE ("no_telepon"),
    CONSTRAINT "m_employee_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "m_employee_username_key" UNIQUE ("username")
) WITH (oids = false);

INSERT INTO "m_employee" ("id", "nama_lengkap", "no_ktp_nik", "jenis_kelamin", "tempat_lahir", "tanggal_lahir", "no_telepon", "alamat", "provinsi", "kota_kabupaten", "kecamatan", "kelurahan", "kode_pos", "username", "email", "password_hash", "tipe_karyawan", "tanggal_mulai_kontrak", "tanggal_selesai_kontrak", "status_menikah", "foto_profil_url", "kode_dokter_bpjs", "created_at", "updated_at", "status") VALUES
('7509b429-b298-4f90-806f-c2d950070591',	'Doni',	'1234123412341235',	'Laki-laki',	'Jakarta',	'2008-06-01',	'0831081499159',	NULL,	'prov1',	'city1_1',	'dist1_1_1',	'vill1_1_1_1',	NULL,	'doni',	'doni@gmail.com',	'$2b$10$pdSQ8MCkudlIL8c7Hkwgcuo8Z4JuJEHQ9MhFToFBZx.4i5WyIXzjG',	'Admin',	'2025-06-01',	'2025-06-30',	'Belum Menikah',	NULL,	'reguler',	'2025-06-01 05:33:03.327788+07',	'2025-06-01 05:33:03.327788+07',	'aktif'),
('7f6aac4d-5bd8-4bbe-ac3e-2afdfb75ef75',	'Egi',	'1234123412341236',	'Laki-laki',	'Jakarta',	'1999-06-04',	'0831081499112',	NULL,	'prov1',	'city1_2',	'dist1_2_1',	'vill1_2_1_1',	NULL,	'egifirman',	'egifirman@gmail.com',	'$2b$10$6UvH6sgfTmEvE2w9ulfl1ushSdya8nPiQzYTzvA3Ulr1LLCTJN8K.',	'Finance',	'2025-06-01',	'2025-06-30',	'Menikah',	NULL,	'reguler',	'2025-06-01 05:36:42.445543+07',	'2025-06-01 05:36:42.445543+07',	'aktif'),
('668c0445-23f4-47fd-ae9a-40873c3c584c',	'Gilang',	'1234123412341238',	'Laki-laki',	'Jakarta',	'2003-06-01',	'0831081499182',	NULL,	'prov1',	'city1_1',	'dist1_1_1',	'vill1_1_1_1',	NULL,	'gilang',	'gilang@gmail.com',	'$2b$10$2.8VnFDxfyRVf3wrwG9jFuebjvQXwoOoqoxudIcjlZnth8GiaMHZa',	'Purchasing',	'2025-06-01',	'2025-06-30',	'Belum Menikah',	NULL,	'reguler',	'2025-06-01 05:55:14.517427+07',	'2025-06-01 05:55:14.517427+07',	'non-aktif'),
('b17f8374-b513-4fc8-9985-b6544a810130',	'Fahri',	'1234123412341237',	'Laki-laki',	'Malang',	'2003-05-30',	'0831081499115',	'sini lo',	'prov1',	'city1_1',	'dist1_1_1',	'vill1_1_1_1',	NULL,	'fahri',	'fahri@gmail.com',	'$2b$10$qRaozvRvRAU5yiLFVi1hteJWYO0LkIIeMy3.x73LMjjCkirRRlpO2',	'Kasir',	'2025-05-30',	'2025-06-28',	'Belum Menikah',	NULL,	'reguler',	'2025-06-01 05:51:11.166512+07',	'2025-06-01 08:24:37.396939+07',	'aktif'),
('a7cf36f4-1986-4575-9644-c63cb9455e3d',	'Asep Fasolasido',	'1234567890123486',	'Laki-laki',	'Jakarta',	'1990-01-11',	'081234567830',	'Jl. Merdeka No. 10',	'prov1',	'city1_1',	'dist1_1_1',	'vill1_1_1_1',	NULL,	'asepdo',	'asep.do@example.com',	'$2b$10$ivlFOYVwdZwqY1gg9u/JBOeOBaShgPr6Xu43QKRvsubqvQxpLVnG6',	'Finance',	'2023-12-28',	'2025-06-27',	'Belum Menikah',	NULL,	'reguler',	'2025-05-30 10:00:16.476498+07',	'2025-06-01 10:58:45.530435+07',	'aktif'),
('6b7280e1-cd42-4465-887a-7b1130adf336',	'Cecil',	'1234123412341234',	'Perempuan',	'Jakarta',	'2013-09-29',	'0831081499149',	'dinisi',	'prov1',	'city1_1',	'dist1_1_1',	'vill1_1_1_1',	NULL,	'cecil',	'cecil@gmail.com',	'$2b$10$TxrR0bu7IYn6dv9b9QSSReX9V0GsbPV5ROJbc9rsywDGlNduFtePi',	'Resepsionis',	'2025-05-30',	'2025-06-28',	'Belum Menikah',	NULL,	'reguler',	'2025-06-01 05:24:23.842922+07',	'2025-06-01 08:29:39.911576+07',	'non-aktif');

-- 2025-06-01 11:23:18.159357+07
