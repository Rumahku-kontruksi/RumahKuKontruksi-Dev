const pool = require('../config/db');

// GET all RAB
exports.getAllRAB = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tb_rab_proyek ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch RAB' });
  }
};

// GET RAB by id
exports.getRABById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM tb_rab_proyek WHERE id_rab = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'RAB not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch RAB' });
  }
};

// POST create new RAB
exports.createRAB = async (req, res) => {
  try {
    const { nama_proyek, total_keseluruhan } = req.body;

    const result = await pool.query(
      `INSERT INTO tb_rab_proyek (nama_proyek, total_keseluruhan)
       VALUES ($1, $2) RETURNING *`,
      [nama_proyek, total_keseluruhan]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create RAB' });
  }
};

// PUT update RAB
exports.updateRAB = async (req, res) => {
  try {
    const { id } = req.params;
    const { nama_proyek, total_keseluruhan } = req.body;

    const result = await pool.query(
      `UPDATE tb_rab_proyek SET 
        nama_proyek=$1, total_keseluruhan=$2, updated_at=NOW()
       WHERE id_rab=$3
       RETURNING *`,
      [nama_proyek, total_keseluruhan, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'RAB not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update RAB' });
  }
};

// DELETE RAB
exports.deleteRAB = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query('DELETE FROM tb_rab_proyek WHERE id_rab=$1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'RAB not found' });
    }

    res.json({ message: 'RAB deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete RAB' });
  }
};
