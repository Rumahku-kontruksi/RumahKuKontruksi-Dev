const pool = require('../config/db');

/**
 * Controller CRUD untuk tb_penanggung_jawab
 */

exports.getAllPenanggungJawab = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tb_penanggung_jawab ORDER BY id_penanggung_jawab ASC');
    return res.json({ status: 'success', data: result.rows });
  } catch (err) {
    console.error('getAllPenanggungJawab error', err);
    return res.status(500).json({ status: 'error', message: err.message });
  }
};

exports.getPenanggungJawabById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM tb_penanggung_jawab WHERE id_penanggung_jawab = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ status: 'fail', message: 'Penanggung jawab tidak ditemukan' });
    }
    return res.json({ status: 'success', data: result.rows[0] });
  } catch (err) {
    console.error('getPenanggungJawabById error', err);
    return res.status(500).json({ status: 'error', message: err.message });
  }
};

exports.createPenanggungJawab = async (req, res) => {
  try {
    const { nama_lengkap, nomor_identitas, alamat, kontak_person, status, hubungan_dengan_konsumen } = req.body;

    // Validasi sederhana
    if (!nama_lengkap || !nomor_identitas || !alamat || !kontak_person || !status) {
      return res.status(400).json({
        status: 'fail',
        message: 'Field wajib: nama_lengkap, nomor_identitas, alamat, kontak_person, status',
      });
    }

    // Trigger auto_id_penanggung_jawab di database akan isi id otomatis
    const query = `
      INSERT INTO tb_penanggung_jawab
        (nama_lengkap, nomor_identitas, alamat, kontak_person, status, hubungan_dengan_konsumen)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;

    const values = [nama_lengkap, nomor_identitas, alamat, kontak_person, status, hubungan_dengan_konsumen || null];
    const result = await pool.query(query, values);

    return res.status(201).json({ status: 'success', data: result.rows[0] });
  } catch (err) {
    console.error('createPenanggungJawab error', err);
    return res.status(500).json({ status: 'error', message: err.message });
  }
};

exports.updatePenanggungJawab = async (req, res) => {
  try {
    const { id } = req.params;
    const allowed = ['nama_lengkap', 'nomor_identitas', 'alamat', 'kontak_person', 'status', 'hubungan_dengan_konsumen'];
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
    const query = `UPDATE tb_penanggung_jawab SET ${sets.join(', ')} WHERE id_penanggung_jawab = $${values.length} RETURNING *`;
    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ status: 'fail', message: 'Penanggung jawab tidak ditemukan' });
    }

    return res.json({ status: 'success', data: result.rows[0] });
  } catch (err) {
    console.error('updatePenanggungJawab error', err);
    return res.status(500).json({ status: 'error', message: err.message });
  }
};

exports.deletePenanggungJawab = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM tb_penanggung_jawab WHERE id_penanggung_jawab = $1 RETURNING *', [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ status: 'fail', message: 'Penanggung jawab tidak ditemukan' });
    }

    return res.json({ status: 'success', message: 'Penanggung jawab berhasil dihapus', data: result.rows[0] });
  } catch (err) {
    console.error('deletePenanggungJawab error', err);
    return res.status(500).json({ status: 'error', message: err.message });
  }
};
