const pool = require('../config/db');

// GET semua RAB
exports.getAllRAB = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT *
      FROM tb_rab
      ORDER BY created_at DESC
    `);
    return res.json({ status: 'success', data: result.rows });
  } catch (err) {
    console.error('getAllRAB error', err);
    return res.status(500).json({ status: 'error', message: err.message });
  }
};

// GET RAB by ID
exports.getRABById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM tb_rab WHERE id_rab = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ status: 'fail', message: 'RAB tidak ditemukan' });
    }

    return res.json({ status: 'success', data: result.rows[0] });
  } catch (err) {
    console.error('getRABById error', err);
    return res.status(500).json({ status: 'error', message: err.message });
  }
};

// POST buat RAB baru
exports.createRAB = async (req, res) => {
  try {
    const { nama_proyek, total_keseluruhan } = req.body;

    if (!nama_proyek || total_keseluruhan == null) {
      return res.status(400).json({ status: 'fail', message: 'Field wajib: nama_proyek, total_keseluruhan' });
    }

    const query = `
      INSERT INTO tb_rab (nama_proyek, total_keseluruhan)
      VALUES ($1, $2)
      RETURNING *
    `;
    const values = [nama_proyek, total_keseluruhan];
    const result = await pool.query(query, values);

    return res.status(201).json({ status: 'success', data: result.rows[0] });
  } catch (err) {
    console.error('createRAB error', err);
    return res.status(500).json({ status: 'error', message: err.message });
  }
};

// PUT update RAB
exports.updateRAB = async (req, res) => {
  try {
    const { id } = req.params;
    const allowed = ['nama_proyek', 'total_keseluruhan'];
    const sets = [];
    const values = [];

    allowed.forEach((f) => {
      if (Object.prototype.hasOwnProperty.call(req.body, f)) {
        values.push(req.body[f]);
        sets.push(`${f} = $${values.length}`);
      }
    });

    if (sets.length === 0) {
      return res.status(400).json({ status: 'fail', message: 'Tidak ada field untuk diupdate' });
    }

    values.push(id);
    const query = `UPDATE tb_rab SET ${sets.join(', ')}, updated_at = CURRENT_TIMESTAMP WHERE id_rab = $${values.length} RETURNING *`;
    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ status: 'fail', message: 'RAB tidak ditemukan' });
    }

    return res.json({ status: 'success', data: result.rows[0] });
  } catch (err) {
    console.error('updateRAB error', err);
    return res.status(500).json({ status: 'error', message: err.message });
  }
};

// DELETE RAB
exports.deleteRAB = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM tb_rab WHERE id_rab = $1 RETURNING *', [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ status: 'fail', message: 'RAB tidak ditemukan' });
    }

    return res.json({ status: 'success', message: 'RAB berhasil dihapus', data: result.rows[0] });
  } catch (err) {
    console.error('deleteRAB error', err);
    return res.status(500).json({ status: 'error', message: err.message });
  }
};
