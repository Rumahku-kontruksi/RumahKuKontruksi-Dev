const pool = require('../config/db');

// GET semua konsumen
const getAllKonsumen = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tb_konsumen ORDER BY id_konsumen');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Gagal mengambil data konsumen' });
  }
};

// GET konsumen berdasarkan jenis (Personal / Perusahaan)
const getKonsumenByJenis = async (req, res) => {
  const { jenis } = req.params; // perseorangan / perusahaan
  try {
    const result = await pool.query(
      'SELECT * FROM tb_konsumen WHERE jenis_konsumen = $1 ORDER BY id_konsumen',
      [jenis]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Gagal mengambil data konsumen' });
  }
};

module.exports = { getAllKonsumen, getKonsumenByJenis };
