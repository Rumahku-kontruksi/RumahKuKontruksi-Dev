const pool = require('../config/db');

// GET all pekerjaan
exports.getAllPekerjaan = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tb_rab_pekerjaan ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch pekerjaan' });
  }
};

// GET pekerjaan by id
exports.getPekerjaanById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM tb_rab_pekerjaan WHERE id_pekerjaan = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Pekerjaan not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch pekerjaan' });
  }
};

// POST create new pekerjaan
exports.createPekerjaan = async (req, res) => {
  try {
    const { id_kategori, nama_pekerjaan, uraian, spesifikasi, satuan, volume, harga_satuan, total } = req.body;

    const result = await pool.query(
      `INSERT INTO tb_rab_pekerjaan 
        (id_kategori, nama_pekerjaan, uraian, spesifikasi, satuan, volume, harga_satuan, total)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
      [id_kategori, nama_pekerjaan, uraian, spesifikasi, satuan, volume, harga_satuan, total]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create pekerjaan' });
  }
};

// PUT update pekerjaan
exports.updatePekerjaan = async (req, res) => {
  try {
    const { id } = req.params;
    const { id_kategori, nama_pekerjaan, uraian, spesifikasi, satuan, volume, harga_satuan, total } = req.body;

    const result = await pool.query(
      `UPDATE tb_rab_pekerjaan SET 
        id_kategori=$1, nama_pekerjaan=$2, uraian=$3, spesifikasi=$4, satuan=$5,
        volume=$6, harga_satuan=$7, total=$8, updated_at=NOW()
       WHERE id_pekerjaan=$9
       RETURNING *`,
      [id_kategori, nama_pekerjaan, uraian, spesifikasi, satuan, volume, harga_satuan, total, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Pekerjaan not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update pekerjaan' });
  }
};

// DELETE pekerjaan
exports.deletePekerjaan = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query('DELETE FROM tb_rab_pekerjaan WHERE id_pekerjaan=$1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Pekerjaan not found' });
    }

    res.json({ message: 'Pekerjaan deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete pekerjaan' });
  }
};
