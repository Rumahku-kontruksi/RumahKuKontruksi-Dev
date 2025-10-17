const pool = require('../config/db');

// GET all proyek
const getAllProyek = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tb_proyek ORDER BY id_proyek');
    res.json(result.rows);
  } catch (err) {
    console.error('ERROR getAllProyek:', err);
    res.status(500).json({ error: err.message });
  }
};

// GET proyek by ID
const getProyekById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM tb_proyek WHERE id_proyek = $1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Proyek not found' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error('ERROR getProyekById:', err);
    res.status(500).json({ error: err.message });
  }
};

// CREATE new proyek
const createProyek = async (req, res) => {
  const {
    id_proyek, id_konsumen, id_mandor, id_pengawas, id_rab,
    nama_proyek, alamat, lokasi, tanggal_mulai, tanggal_selesai,
    status_proyek, anggaran, catatan, created_by
  } = req.body;

  try {
    const query = `
      INSERT INTO tb_proyek (
        id_proyek, id_konsumen, id_mandor, id_pengawas, id_rab,
        nama_proyek, alamat, lokasi, tanggal_mulai, tanggal_selesai,
        status_proyek, anggaran, catatan, created_by
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)
      RETURNING *
    `;
    const values = [
      id_proyek, id_konsumen, id_mandor, id_pengawas, id_rab,
      nama_proyek, alamat, lokasi, tanggal_mulai, tanggal_selesai,
      status_proyek, anggaran, catatan, created_by
    ];
    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('ERROR createProyek:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// UPDATE proyek
const updateProyek = async (req, res) => {
  const { id } = req.params;
  const {
    id_konsumen, id_mandor, id_pengawas, id_rab,
    nama_proyek, alamat, lokasi, tanggal_mulai, tanggal_selesai,
    status_proyek, anggaran, catatan, updated_by
  } = req.body;

  try {
    const query = `
      UPDATE tb_proyek
      SET
        id_konsumen=$1, id_mandor=$2, id_pengawas=$3, id_rab=$4,
        nama_proyek=$5, alamat=$6, lokasi=$7, tanggal_mulai=$8, tanggal_selesai=$9,
        status_proyek=$10, anggaran=$11, catatan=$12,
        updated_at=NOW(), updated_by=$13
      WHERE id_proyek=$14
      RETURNING *
    `;
    const values = [
      id_konsumen, id_mandor, id_pengawas, id_rab,
      nama_proyek, alamat, lokasi, tanggal_mulai, tanggal_selesai,
      status_proyek, anggaran, catatan, updated_by, id
    ];
    const result = await pool.query(query, values);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Proyek not found' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error('ERROR updateProyek:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// DELETE proyek
const deleteProyek = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM tb_proyek WHERE id_proyek=$1 RETURNING *', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Proyek not found' });
    res.json({ message: 'Proyek deleted', data: result.rows[0] });
  } catch (err) {
    console.error('ERROR deleteProyek:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  getAllProyek,
  getProyekById,
  createProyek,
  updateProyek,
  deleteProyek
};
