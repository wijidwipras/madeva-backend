const Yup = require('yup');

const GENDER_ENUM = ['Laki-laki', 'Perempuan'];
const MARITAL_STATUS_ENUM = ['Belum Menikah', 'Menikah', 'Cerai Hidup', 'Cerai Mati'];

const employeeSchema = Yup.object({
  nama_lengkap: Yup.string().required('Nama lengkap wajib diisi').max(255),
  no_ktp_nik: Yup.string().required('No. KTP/NIK wajib diisi').length(16, 'No. KTP/NIK harus 16 digit'),
  jenis_kelamin: Yup.string().required('Jenis kelamin wajib diisi').oneOf(GENDER_ENUM, 'Jenis kelamin tidak valid'),
  tempat_lahir: Yup.string().optional().max(100),
  tanggal_lahir: Yup.date().optional().typeError('Format tanggal lahir tidak valid'),
  no_telepon: Yup.string().optional().max(20),
  alamat: Yup.string().optional(),
  provinsi: Yup.string().optional().max(100),
  kota_kabupaten: Yup.string().optional().max(100),
  kecamatan: Yup.string().optional().max(100),
  kelurahan: Yup.string().optional().max(100),
  kode_pos: Yup.string().optional().max(10),
  username: Yup.string().required('Username wajib diisi').min(3).max(50),
  email: Yup.string().email('Format email tidak valid').required('Email wajib diisi').max(100),
  password: Yup.string().required('Password wajib diisi').min(6, 'Password minimal 6 karakter'),
  tipe_karyawan: Yup.string().required('Tipe karyawan wajib diisi'),
  tanggal_mulai_kontrak: Yup.date().optional().typeError('Format tanggal mulai kontrak tidak valid'),
  tanggal_selesai_kontrak: Yup.date().optional().typeError('Format tanggal selesai kontrak tidak valid')
    .when('tanggal_mulai_kontrak', (tanggal_mulai_kontrak, schema) => {
        return tanggal_mulai_kontrak ? schema.min(Yup.ref('tanggal_mulai_kontrak'), 'Tanggal selesai tidak boleh sebelum tanggal mulai') : schema;
    }),
  status_menikah: Yup.string().optional().oneOf(MARITAL_STATUS_ENUM, 'Status menikah tidak valid'),
  foto_profil_url: Yup.string().optional().url('URL foto profil tidak valid').max(255),
  kode_dokter_bpjs: Yup.string().optional(),
  status: Yup.string().required('Status wajib diisi.'),
});

const employeeUpdateSchema = Yup.object({
    nama_lengkap: Yup.string().optional().max(255),
    no_ktp_nik: Yup.string().optional().length(16, 'No. KTP/NIK harus 16 digit jika diisi'),
    jenis_kelamin: Yup.string().optional().oneOf(GENDER_ENUM, 'Jenis kelamin tidak valid jika diisi'),
    tempat_lahir: Yup.string().optional().nullable().max(100),
    tanggal_lahir: Yup.date().optional().nullable().typeError('Format tanggal lahir tidak valid jika diisi'),
    no_telepon: Yup.string().optional().nullable().max(20),
    alamat: Yup.string().optional().nullable(),
    provinsi: Yup.string().optional().nullable().max(100),
    kota_kabupaten: Yup.string().optional().nullable().max(100),
    kecamatan: Yup.string().optional().nullable().max(100),
    kelurahan: Yup.string().optional().nullable().max(100),
    kode_pos: Yup.string().optional().nullable().max(10),
    username: Yup.string().optional().min(3, 'Username minimal 3 karakter jika diisi').max(50),
    email: Yup.string().email('Format email tidak valid jika diisi').optional().max(100),
    password: Yup.string().optional().nullable().min(6, 'Password minimal 6 karakter jika diisi'),
    tipe_karyawan: Yup.string().optional().nullable(),
    tanggal_mulai_kontrak: Yup.date().optional().nullable().typeError('Format tanggal mulai kontrak tidak valid jika diisi'),
    tanggal_selesai_kontrak: Yup.date().optional().nullable().typeError('Format tanggal selesai kontrak tidak valid jika diisi')
      .when('tanggal_mulai_kontrak', (tanggal_mulai_kontrak, schema) => {
          return tanggal_mulai_kontrak ? schema.min(Yup.ref('tanggal_mulai_kontrak'), 'Tanggal selesai tidak boleh sebelum tanggal mulai') : schema;
      }),
    status_menikah: Yup.string().optional().nullable().oneOf(MARITAL_STATUS_ENUM, 'Status menikah tidak valid jika diisi'),
    foto_profil_url: Yup.string().optional().nullable().url('URL foto profil tidak valid jika diisi').max(255),
    kode_dokter_bpjs: Yup.string().optional().nullable(),
  status: Yup.string().required('Status wajib diisi.'),

  });

module.exports = {
  employeeSchema,
  employeeUpdateSchema
};