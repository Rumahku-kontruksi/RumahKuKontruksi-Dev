const pool = require('../config/db');

/**
 * Controller CRUD untuk tb_pengawas
 */

exports.getAllPengawas = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tb_pengawas ORDER BY id_pengawas ASC');
    return res.json({ status: 'success', data: result.rows });
  } catch (err) {
    console.error('getAllPengawas error', err);
    return res.status(500).json({ status: 'error', message: err.message });
  }
};

exports.getPengawasById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM tb_pengawas WHERE id_pengawas = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ status: 'fail', message: 'Pengawas tidak ditemukan' });
    }
    return res.json({ status: 'success', data: result.rows[0] });
  } catch (err) {
    console.error('getPengawasById error', err);
    return res.status(500).json({ status: 'error', message: err.message });
  }
};

exports.createPengawas = async (req, res) => {
  try {
    const { nama_lengkap, nomor_identitas, alamat, kontak_person, status, bidang_pengawasan } = req.body;

    if (!nama_lengkap) {
      return res.status(400).json({ status: 'fail', message: 'Field wajib: nama_lengkap' });
    }

    const query = `
      INSERT INTO tb_pengawas
        (nama_lengkap, nomor_identitas, alamat, kontak_person, status, bidang_pengawasan)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;
    const values = [nama_lengkap, nomor_identitas || null, alamat || null, kontak_person || null, status || null, bidang_pengawasan || null];
    const result = await pool.query(query, values);

    return res.status(201).json({ status: 'success', data: result.rows[0] });
  } catch (err) {
    console.error('createPengawas error', err);
    return res.status(500).json({ status: 'error', message: err.message });
  }
};

exports.updatePengawas = async (req, res) => {
  try {
    const { id } = req.params;
    const allowed = ['nama_lengkap', 'nomor_identitas', 'alamat', 'kontak_person', 'status', 'bidang_pengawasan'];
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
    const query = `UPDATE tb_pengawas SET ${sets.join(', ')} WHERE id_pengawas = $${values.length} RETURNING *`;
    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ status: 'fail', message: 'Pengawas tidak ditemukan' });
    }

    return res.json({ status: 'success', data: result.rows[0] });
  } catch (err) {
    console.error('updatePengawas error', err);
    return res.status(500).json({ status: 'error', message: err.message });
  }
};

exports.deletePengawas = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM tb_pengawas WHERE id_pengawas = $1 RETURNING *', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ status: 'fail', message: 'Pengawas tidak ditemukan' });
    }
    return res.json({ status: 'success', message: 'Pengawas berhasil dihapus', data: result.rows[0] });
  } catch (err) {
    console.error('deletePengawas error', err);
    return res.status(500).json({ status: 'error', message: err.message });
  }
};
