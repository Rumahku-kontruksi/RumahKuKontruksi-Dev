const pool = require('../config/db');

// GET all kategori
exports.getAllKategori = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tb_rab_kategori ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch kategori' });
  }
};

// GET kategori by id
exports.getKategoriById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM tb_rab_kategori WHERE id_kategori = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Kategori not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch kategori' });
  }
};

// POST create new kategori
exports.createKategori = async (req, res) => {
  try {
    const { id_rab, nama_kategori, total_kategori } = req.body;

    const result = await pool.query(
      `INSERT INTO tb_rab_kategori (id_rab, nama_kategori, total_kategori)
       VALUES ($1, $2, $3) RETURNING *`,
      [id_rab, nama_kategori, total_kategori]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create kategori' });
  }
};

// PUT update kategori
exports.updateKategori = async (req, res) => {
  try {
    const { id } = req.params;
    const { id_rab, nama_kategori, total_kategori } = req.body;

    const result = await pool.query(
      `UPDATE tb_rab_kategori SET 
        id_rab=$1, nama_kategori=$2, total_kategori=$3, updated_at=NOW()
       WHERE id_kategori=$4
       RETURNING *`,
      [id_rab, nama_kategori, total_kategori, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Kategori not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update kategori' });
  }
};

// DELETE kategori
exports.deleteKategori = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query('DELETE FROM tb_rab_kategori WHERE id_kategori=$1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Kategori not found' });
    }

    res.json({ message: 'Kategori deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete kategori' });
  }
};
