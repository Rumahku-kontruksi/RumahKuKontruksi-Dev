const pool = require('../config/db');

/**
 * Controller CRUD untuk tb_perusahaan
 */

exports.getAllPerusahaan = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tb_perusahaan ORDER BY id_perusahaan ASC');
    return res.json({ status: 'success', data: result.rows });
  } catch (err) {
    console.error('getAllPerusahaan error', err);
    return res.status(500).json({ status: 'error', message: err.message });
  }
};

exports.getPerusahaanById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM tb_perusahaan WHERE id_perusahaan = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ status: 'fail', message: 'Perusahaan tidak ditemukan' });
    }
    return res.json({ status: 'success', data: result.rows[0] });
  } catch (err) {
    console.error('getPerusahaanById error', err);
    return res.status(500).json({ status: 'error', message: err.message });
  }
};

exports.createPerusahaan = async (req, res) => {
  try {
    const { nama_perusahaan, npwp, alamat_kantor, kontak_person, telepon_kontak } = req.body;

    if (!nama_perusahaan || !npwp || !alamat_kantor || !kontak_person || !telepon_kontak) {
      return res.status(400).json({
        status: 'fail',
        message: 'Semua field wajib diisi: nama_perusahaan, npwp, alamat_kantor, kontak_person, telepon_kontak',
      });
    }

    // trigger auto_id_perusahaan akan generate ID otomatis
    const result = await pool.query(
      `INSERT INTO tb_perusahaan 
        (nama_perusahaan, npwp, alamat_kantor, kontak_person, telepon_kontak)
       VALUES ($1,$2,$3,$4,$5)
       RETURNING *`,
      [nama_perusahaan, npwp, alamat_kantor, kontak_person, telepon_kontak]
    );

    return res.status(201).json({ status: 'success', data: result.rows[0] });
  } catch (err) {
    console.error('createPerusahaan error', err);
    return res.status(500).json({ status: 'error', message: err.message });
  }
};

exports.updatePerusahaan = async (req, res) => {
  try {
    const { id } = req.params;
    const allowed = ['nama_perusahaan', 'npwp', 'alamat_kantor', 'kontak_person', 'telepon_kontak'];
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
    const query = `UPDATE tb_perusahaan SET ${sets.join(', ')} WHERE id_perusahaan = $${values.length} RETURNING *`;
    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ status: 'fail', message: 'Perusahaan tidak ditemukan' });
    }

    return res.json({ status: 'success', data: result.rows[0] });
  } catch (err) {
    console.error('updatePerusahaan error', err);
    return res.status(500).json({ status: 'error', message: err.message });
  }
};

exports.deletePerusahaan = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM tb_perusahaan WHERE id_perusahaan = $1 RETURNING *', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ status: 'fail', message: 'Perusahaan tidak ditemukan' });
    }
    return res.json({ status: 'success', message: 'Perusahaan berhasil dihapus', data: result.rows[0] });
  } catch (err) {
    console.error('deletePerusahaan error', err);
    return res.status(500).json({ status: 'error', message: err.message });
  }
};
