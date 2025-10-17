// server/src/controller/konsumenController.js

const pool = require('../config/db');

// GET all konsumen
const getAllKonsumen = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tb_konsumen ORDER BY id_konsumen');
    console.log('Query berhasil:', result.rows.length, 'rows');
    res.json(result.rows);
  } catch (err) {
    console.error('ERROR getAllKonsumen full:', err);  // tampilkan object error lengkap
    res.status(500).json({ error: err.message, stack: err.stack });
  }
};


// GET konsumen by ID
const getKonsumenById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM tb_konsumen WHERE id_konsumen = $1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Konsumen not found' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error('ERROR getKonsumenById:', err);
    res.status(500).json({ error: err.message }); // kirim detail error ke client sementara
  }
};


// CREATE new konsumen
const createKonsumen = async (req, res) => {
  const {
    id_konsumen,
    jenis_konsumen,
    nama_lengkap,
    password_konsumen,
    jenis_kelamin,
    tanggal_lahir,
    nomor_identitas,
    nama_perusahaan,
    bidang_usaha,
    jabatan_kontak,
    npwp_perusahaan,
    email,
    nomor_telepon,
    alamat,
    foto,
    id_proyek
  } = req.body;

  try {
    const query = `
      INSERT INTO tb_konsumen (
        id_konsumen, jenis_konsumen, nama_lengkap, password_konsumen, jenis_kelamin,
        tanggal_lahir, nomor_identitas, nama_perusahaan, bidang_usaha, jabatan_kontak,
        npwp_perusahaan, email, nomor_telepon, alamat, foto, id_proyek
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16)
      RETURNING *
    `;
    const values = [
      id_konsumen, jenis_konsumen, nama_lengkap, password_konsumen, jenis_kelamin,
      tanggal_lahir, nomor_identitas, nama_perusahaan, bidang_usaha, jabatan_kontak,
      npwp_perusahaan, email, nomor_telepon, alamat, foto, id_proyek
    ];
    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// UPDATE konsumen
const updateKonsumen = async (req, res) => {
  const { id } = req.params;
  const {
    jenis_konsumen,
    nama_lengkap,
    password_konsumen,
    jenis_kelamin,
    tanggal_lahir,
    nomor_identitas,
    nama_perusahaan,
    bidang_usaha,
    jabatan_kontak,
    npwp_perusahaan,
    email,
    nomor_telepon,
    alamat,
    foto,
    id_proyek
  } = req.body;

  try {
    const query = `
      UPDATE tb_konsumen
      SET
        jenis_konsumen=$1, nama_lengkap=$2, password_konsumen=$3, jenis_kelamin=$4,
        tanggal_lahir=$5, nomor_identitas=$6, nama_perusahaan=$7, bidang_usaha=$8,
        jabatan_kontak=$9, npwp_perusahaan=$10, email=$11, nomor_telepon=$12,
        alamat=$13, foto=$14, id_proyek=$15, updated_at=NOW()
      WHERE id_konsumen=$16
      RETURNING *
    `;
    const values = [
      jenis_konsumen, nama_lengkap, password_konsumen, jenis_kelamin,
      tanggal_lahir, nomor_identitas, nama_perusahaan, bidang_usaha,
      jabatan_kontak, npwp_perusahaan, email, nomor_telepon,
      alamat, foto, id_proyek, id
    ];
    const result = await pool.query(query, values);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Konsumen not found' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// DELETE konsumen
const deleteKonsumen = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM tb_konsumen WHERE id_konsumen=$1 RETURNING *', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Konsumen not found' });
    res.json({ message: 'Konsumen deleted', data: result.rows[0] });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  getAllKonsumen,
  getKonsumenById,
  createKonsumen,
  updateKonsumen,
  deleteKonsumen
};
