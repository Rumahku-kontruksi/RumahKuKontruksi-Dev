const pool = require('../config/db');

// GET all perseorangan
exports.getAllPerseorangan = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tb_perseorangan ORDER BY id_perseorangan DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch data perseorangan' });
  }
};

// GET perseorangan by id
exports.getPerseoranganById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM tb_perseorangan WHERE id_perseorangan = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Data perseorangan not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch data perseorangan' });
  }
};

// POST create new perseorangan
exports.createPerseorangan = async (req, res) => {
  try {
    const { nama_lengkap, nik, alamat_rumah, kontak_person, status } = req.body;

    const result = await pool.query(
      `INSERT INTO tb_perseorangan
      (nama_lengkap, nik, alamat_rumah, kontak_person, status)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *`,
      [nama_lengkap, nik, alamat_rumah, kontak_person, status]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create data perseorangan' });
  }
};

// PUT update perseorangan
exports.updatePerseorangan = async (req, res) => {
  try {
    const { id } = req.params;
    const { nama_lengkap, nik, alamat_rumah, kontak_person, status } = req.body;

    const result = await pool.query(
      `UPDATE tb_perseorangan SET
        nama_lengkap=$1,
        nik=$2,
        alamat_rumah=$3,
        kontak_person=$4,
        status=$5
       WHERE id_perseorangan=$6
       RETURNING *`,
      [nama_lengkap, nik, alamat_rumah, kontak_person, status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Data perseorangan not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update data perseorangan' });
  }
};

// DELETE perseorangan
exports.deletePerseorangan = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query('DELETE FROM tb_perseorangan WHERE id_perseorangan=$1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Data perseorangan not found' });
    }

    res.json({ message: 'Data perseorangan deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete data perseorangan' });
  }
};
