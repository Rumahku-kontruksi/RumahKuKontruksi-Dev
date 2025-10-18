const pool = require('../config/db');

/**
 * Controller CRUD untuk tb_mandor
 */

exports.getAllMandor = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tb_mandor ORDER BY id_mandor ASC');
    return res.json({ status: 'success', data: result.rows });
  } catch (err) {
    console.error('getAllMandor error', err);
    return res.status(500).json({ status: 'error', message: err.message });
  }
};

exports.getMandorById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM tb_mandor WHERE id_mandor = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ status: 'fail', message: 'Mandor tidak ditemukan' });
    }
    return res.json({ status: 'success', data: result.rows[0] });
  } catch (err) {
    console.error('getMandorById error', err);
    return res.status(500).json({ status: 'error', message: err.message });
  }
};

exports.createMandor = async (req, res) => {
  try {
    const { nama_lengkap, nomor_identitas, alamat, kontak_person, status, spesialisasi } = req.body;

    if (!nama_lengkap) {
      return res.status(400).json({ status: 'fail', message: 'Field wajib: nama_lengkap' });
    }

    const query = `
      INSERT INTO tb_mandor
        (nama_lengkap, nomor_identitas, alamat, kontak_person, status, spesialisasi)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;
    const values = [nama_lengkap, nomor_identitas || null, alamat || null, kontak_person || null, status || null, spesialisasi || null];
    const result = await pool.query(query, values);

    return res.status(201).json({ status: 'success', data: result.rows[0] });
  } catch (err) {
    console.error('createMandor error', err);
    return res.status(500).json({ status: 'error', message: err.message });
  }
};

exports.updateMandor = async (req, res) => {
  try {
    const { id } = req.params;
    const allowed = ['nama_lengkap', 'nomor_identitas', 'alamat', 'kontak_person', 'status', 'spesialisasi'];
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
    const query = `UPDATE tb_mandor SET ${sets.join(', ')} WHERE id_mandor = $${values.length} RETURNING *`;
    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ status: 'fail', message: 'Mandor tidak ditemukan' });
    }

    return res.json({ status: 'success', data: result.rows[0] });
  } catch (err) {
    console.error('updateMandor error', err);
    return res.status(500).json({ status: 'error', message: err.message });
  }
};

exports.deleteMandor = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM tb_mandor WHERE id_mandor = $1 RETURNING *', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ status: 'fail', message: 'Mandor tidak ditemukan' });
    }
    return res.json({ status: 'success', message: 'Mandor berhasil dihapus', data: result.rows[0] });
  } catch (err) {
    console.error('deleteMandor error', err);
    return res.status(500).json({ status: 'error', message: err.message });
  }
};
