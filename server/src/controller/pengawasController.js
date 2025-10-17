const pool = require('../config/db');

// GET all pengawas
const getAllPengawas = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tb_pengawas ORDER BY id_pengawas');
    res.json(result.rows);
  } catch (err) {
    console.error('ERROR getAllPengawas:', err);
    res.status(500).json({ error: err.message });
  }
};

// GET pengawas by ID
const getPengawasById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM tb_pengawas WHERE id_pengawas = $1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Pengawas not found' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error('ERROR getPengawasById:', err);
    res.status(500).json({ error: err.message });
  }
};

// CREATE new pengawas
const createPengawas = async (req, res) => {
  const {
    id_pengawas, nama_lengkap, jenis_kelamin, tanggal_lahir,
    nomor_identitas, email, nomor_telepon, alamat, foto, jabatan,
    pengalaman, sertifikasi, bidang_keahlian, id_proyek, status_penugasan,
    tanggal_mulai, tanggal_selesai, catatan, metode_komunikasi,
    status_aktif, created_by
  } = req.body;

  try {
    const query = `
      INSERT INTO tb_pengawas (
        id_pengawas, nama_lengkap, jenis_kelamin, tanggal_lahir,
        nomor_identitas, email, nomor_telepon, alamat, foto, jabatan,
        pengalaman, sertifikasi, bidang_keahlian, id_proyek, status_penugasan,
        tanggal_mulai, tanggal_selesai, catatan, metode_komunikasi,
        status_aktif, created_by
      )
      VALUES (
        $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21
      )
      RETURNING *
    `;
    const values = [
      id_pengawas, nama_lengkap, jenis_kelamin, tanggal_lahir,
      nomor_identitas, email, nomor_telepon, alamat, foto, jabatan,
      pengalaman, sertifikasi, bidang_keahlian, id_proyek, status_penugasan,
      tanggal_mulai, tanggal_selesai, catatan, metode_komunikasi,
      status_aktif, created_by
    ];
    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('ERROR createPengawas:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// UPDATE pengawas
const updatePengawas = async (req, res) => {
  const { id } = req.params;
  const {
    nama_lengkap, jenis_kelamin, tanggal_lahir,
    nomor_identitas, email, nomor_telepon, alamat, foto, jabatan,
    pengalaman, sertifikasi, bidang_keahlian, id_proyek, status_penugasan,
    tanggal_mulai, tanggal_selesai, catatan, metode_komunikasi,
    status_aktif, updated_by
  } = req.body;

  try {
    const query = `
      UPDATE tb_pengawas
      SET
        nama_lengkap=$1, jenis_kelamin=$2, tanggal_lahir=$3, nomor_identitas=$4,
        email=$5, nomor_telepon=$6, alamat=$7, foto=$8, jabatan=$9,
        pengalaman=$10, sertifikasi=$11, bidang_keahlian=$12, id_proyek=$13, status_penugasan=$14,
        tanggal_mulai=$15, tanggal_selesai=$16, catatan=$17, metode_komunikasi=$18,
        status_aktif=$19, updated_at=NOW(), updated_by=$20
      WHERE id_pengawas=$21
      RETURNING *
    `;
    const values = [
      nama_lengkap, jenis_kelamin, tanggal_lahir, nomor_identitas,
      email, nomor_telepon, alamat, foto, jabatan,
      pengalaman, sertifikasi, bidang_keahlian, id_proyek, status_penugasan,
      tanggal_mulai, tanggal_selesai, catatan, metode_komunikasi,
      status_aktif, updated_by, id
    ];
    const result = await pool.query(query, values);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Pengawas not found' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error('ERROR updatePengawas:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// DELETE pengawas
const deletePengawas = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM tb_pengawas WHERE id_pengawas=$1 RETURNING *', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Pengawas not found' });
    res.json({ message: 'Pengawas deleted', data: result.rows[0] });
  } catch (err) {
    console.error('ERROR deletePengawas:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  getAllPengawas,
  getPengawasById,
  createPengawas,
  updatePengawas,
  deletePengawas
};
