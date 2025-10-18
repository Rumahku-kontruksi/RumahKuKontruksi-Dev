const pool = require('../config/db');

/**
 * Controller CRUD untuk tb_rab_kategori
 */

// GET semua kategori RAB
exports.getAllRABKategori = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        k.*, 
        r.nama_proyek, 
        r.total_keseluruhan AS total_rab
      FROM tb_rab_kategori k
      JOIN tb_rab r ON k.id_rab = r.id_rab
      ORDER BY k.id_kategori ASC
    `);
    return res.json({ status: 'success', data: result.rows });
  } catch (err) {
    console.error('getAllRABKategori error', err);
    return res.status(500).json({ status: 'error', message: err.message });
  }
};

// GET kategori RAB by ID
exports.getRABKategoriById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(`
      SELECT 
        k.*, 
        r.nama_proyek, 
        r.total_keseluruhan AS total_rab
      FROM tb_rab_kategori k
      JOIN tb_rab r ON k.id_rab = r.id_rab
      WHERE k.id_kategori = $1
    `, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ status: 'fail', message: 'Kategori RAB tidak ditemukan' });
    }

    return res.json({ status: 'success', data: result.rows[0] });
  } catch (err) {
    console.error('getRABKategoriById error', err);
    return res.status(500).json({ status: 'error', message: err.message });
  }
};

// POST buat kategori RAB baru
exports.createRABKategori = async (req, res) => {
  try {
    const { id_rab, nama_kategori, total_kategori } = req.body;

    if (!id_rab || !nama_kategori) {
      return res.status(400).json({
        status: 'fail',
        message: 'Field wajib: id_rab dan nama_kategori'
      });
    }

    const query = `
      INSERT INTO tb_rab_kategori (id_rab, nama_kategori, total_kategori)
      VALUES ($1, $2, $3)
      RETURNING *
    `;
    const values = [id_rab, nama_kategori, total_kategori || 0];
    const result = await pool.query(query, values);

    return res.status(201).json({ status: 'success', data: result.rows[0] });
  } catch (err) {
    console.error('createRABKategori error', err);
    return res.status(500).json({ status: 'error', message: err.message });
  }
};

// PUT update kategori RAB
exports.updateRABKategori = async (req, res) => {
  try {
    const { id } = req.params;
    const allowed = ['id_rab', 'nama_kategori', 'total_kategori'];
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
    const query = `
      UPDATE tb_rab_kategori
      SET ${sets.join(', ')}, updated_at = CURRENT_TIMESTAMP
      WHERE id_kategori = $${values.length}
      RETURNING *
    `;
    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ status: 'fail', message: 'Kategori RAB tidak ditemukan' });
    }

    return res.json({ status: 'success', data: result.rows[0] });
  } catch (err) {
    console.error('updateRABKategori error', err);
    return res.status(500).json({ status: 'error', message: err.message });
  }
};

// DELETE kategori RAB
exports.deleteRABKategori = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM tb_rab_kategori WHERE id_kategori = $1 RETURNING *', [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ status: 'fail', message: 'Kategori RAB tidak ditemukan' });
    }

    return res.json({ status: 'success', message: 'Kategori RAB berhasil dihapus', data: result.rows[0] });
  } catch (err) {
    console.error('deleteRABKategori error', err);
    return res.status(500).json({ status: 'error', message: err.message });
  }
};
