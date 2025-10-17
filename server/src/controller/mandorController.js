// server/src/controller/mandorController.js

const pool = require('../config/db');

// GET all mandor
const getAllMandor = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tb_mandor ORDER BY id_mandor');
    res.json(result.rows);
  } catch (err) {
    console.error('ERROR getAllMandor:', err);
    res.status(500).json({ error: err.message });
  }
};

// GET mandor by ID
const getMandorById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM tb_mandor WHERE id_mandor = $1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Mandor not found' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error('ERROR getMandorById:', err);
    res.status(500).json({ error: err.message });
  }
};

// CREATE new mandor
const createMandor = async (req, res) => {
  const {
    id_mandor, nama_lengkap, password_mandor, jenis_kelamin, tanggal_lahir,
    nomor_identitas, email, nomor_telepon, alamat, foto, jabatan,
    pengalaman, sertifikasi, bidang_keahlian, id_proyek, status_penugasan,
    tanggal_mulai, tanggal_selesai, catatan, metode_komunikasi,
    status_aktif, created_by
  } = req.body;

  try {
    const query = `
      INSERT INTO tb_mandor (
        id_mandor, nama_lengkap, password_mandor, jenis_kelamin, tanggal_lahir,
        nomor_identitas, email, nomor_telepon, alamat, foto, jabatan,
        pengalaman, sertifikasi, bidang_keahlian, id_proyek, status_penugasan,
        tanggal_mulai, tanggal_selesai, catatan, metode_komunikasi,
        status_aktif, created_by
      )
      VALUES (
        $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22
      )
      RETURNING *
    `;
    const values = [
      id_mandor, nama_lengkap, password_mandor, jenis_kelamin, tanggal_lahir,
      nomor_identitas, email, nomor_telepon, alamat, foto, jabatan,
      pengalaman, sertifikasi, bidang_keahlian, id_proyek, status_penugasan,
      tanggal_mulai, tanggal_selesai, catatan, metode_komunikasi,
      status_aktif, created_by
    ];
    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('ERROR createMandor:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// UPDATE mandor
const updateMandor = async (req, res) => {
  const { id } = req.params;
  const {
    nama_lengkap, password_mandor, jenis_kelamin, tanggal_lahir,
    nomor_identitas, email, nomor_telepon, alamat, foto, jabatan,
    pengalaman, sertifikasi, bidang_keahlian, id_proyek, status_penugasan,
    tanggal_mulai, tanggal_selesai, catatan, metode_komunikasi,
    status_aktif, updated_by
  } = req.body;

  try {
    const query = `
      UPDATE tb_mandor
      SET
        nama_lengkap=$1, password_mandor=$2, jenis_kelamin=$3, tanggal_lahir=$4,
        nomor_identitas=$5, email=$6, nomor_telepon=$7, alamat=$8, foto=$9, jabatan=$10,
        pengalaman=$11, sertifikasi=$12, bidang_keahlian=$13, id_proyek=$14, status_penugasan=$15,
        tanggal_mulai=$16, tanggal_selesai=$17, catatan=$18, metode_komunikasi=$19,
        status_aktif=$20, updated_at=NOW(), updated_by=$21
      WHERE id_mandor=$22
      RETURNING *
    `;
    const values = [
      nama_lengkap, password_mandor, jenis_kelamin, tanggal_lahir,
      nomor_identitas, email, nomor_telepon, alamat, foto, jabatan,
      pengalaman, sertifikasi, bidang_keahlian, id_proyek, status_penugasan,
      tanggal_mulai, tanggal_selesai, catatan, metode_komunikasi,
      status_aktif, updated_by, id
    ];
    const result = await pool.query(query, values);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Mandor not found' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error('ERROR updateMandor:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// DELETE mandor
const deleteMandor = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM tb_mandor WHERE id_mandor=$1 RETURNING *', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Mandor not found' });
    res.json({ message: 'Mandor deleted', data: result.rows[0] });
  } catch (err) {
    console.error('ERROR deleteMandor:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  getAllMandor,
  getMandorById,
  createMandor,
  updateMandor,
  deleteMandor
};
