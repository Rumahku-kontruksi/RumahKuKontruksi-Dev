const pool = require('../config/db');

// GET all konsumen berdasarkan jenis (perseorangan / perusahaan)
const getAllKonsumenByJenis = async (req, res) => {
  const { jenis } = req.params;
  try {
    const result = await pool.query(
      'SELECT * FROM tb_konsumen WHERE jenis_konsumen = $1 ORDER BY id_konsumen',
      [jenis]
    );
    res.json(result.rows);
  } catch (err) {
    console.error('ERROR getAllKonsumenByJenis:', err);
    res.status(500).json({ error: 'Terjadi kesalahan server' });
  }
};

// GET satu konsumen berdasarkan id dan jenis
const getKonsumenByIdAndJenis = async (req, res) => {
  const { jenis, id } = req.params;
  try {
    const result = await pool.query(
      'SELECT * FROM tb_konsumen WHERE id_konsumen = $1 AND jenis_konsumen = $2',
      [id, jenis]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Data tidak ditemukan' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('ERROR getKonsumenByIdAndJenis:', err);
    res.status(500).json({ error: 'Terjadi kesalahan server' });
  }
};

// CREATE konsumen baru
const createKonsumen = async (req, res) => {
  const { jenis } = req.params;
  const { nama, alamat, telepon } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO tb_konsumen (nama, alamat, telepon, jenis_konsumen) VALUES ($1, $2, $3, $4) RETURNING *',
      [nama, alamat, telepon, jenis]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('ERROR createKonsumen:', err);
    res.status(500).json({ error: 'Terjadi kesalahan server' });
  }
};

// UPDATE konsumen
const updateKonsumen = async (req, res) => {
  const { jenis, id } = req.params;
  const { nama, alamat, telepon } = req.body;
  try {
    const result = await pool.query(
      'UPDATE tb_konsumen SET nama=$1, alamat=$2, telepon=$3 WHERE id_konsumen=$4 AND jenis_konsumen=$5 RETURNING *',
      [nama, alamat, telepon, id, jenis]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Data tidak ditemukan' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('ERROR updateKonsumen:', err);
    res.status(500).json({ error: 'Terjadi kesalahan server' });
  }
};

// DELETE konsumen
const deleteKonsumen = async (req, res) => {
  const { jenis, id } = req.params;
  try {
    const result = await pool.query(
      'DELETE FROM tb_konsumen WHERE id_konsumen=$1 AND jenis_konsumen=$2 RETURNING *',
      [id, jenis]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Data tidak ditemukan' });
    }
    res.json({ message: 'Data berhasil dihapus', data: result.rows[0] });
  } catch (err) {
    console.error('ERROR deleteKonsumen:', err);
    res.status(500).json({ error: 'Terjadi kesalahan server' });
  }
};

module.exports = {
  getAllKonsumenByJenis,
  getKonsumenByIdAndJenis,
  createKonsumen,
  updateKonsumen,
  deleteKonsumen,
};
