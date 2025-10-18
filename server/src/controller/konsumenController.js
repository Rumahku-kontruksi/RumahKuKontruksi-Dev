const pool = require('../config/db');

exports.getAllKonsumen = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tb_konsumen ORDER BY id_konsumen ASC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getKonsumenById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM tb_konsumen WHERE id_konsumen = $1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ message: 'Konsumen tidak ditemukan' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createKonsumen = async (req, res) => {
  try {
    const {
      jenis_konsumen, id_perusahaan, id_penanggung_jawab,
      nama_lengkap, password_konsumen, email, nomor_telepon
    } = req.body;

    const result = await pool.query(
      `INSERT INTO tb_konsumen 
       (jenis_konsumen, id_perusahaan, id_penanggung_jawab, nama_lengkap, password_konsumen, email, nomor_telepon)
       VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
      [jenis_konsumen, id_perusahaan, id_penanggung_jawab, nama_lengkap, password_konsumen, email, nomor_telepon]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateKonsumen = async (req, res) => {
  try {
    const { id } = req.params;
    const fields = ['jenis_konsumen', 'nama_lengkap', 'email', 'nomor_telepon', 'alamat'];
    const updates = [];
    const values = [];
    fields.forEach((f, i) => {
      if (req.body[f] !== undefined) {
        updates.push(`${f} = $${updates.length + 1}`);
        values.push(req.body[f]);
      }
    });
    if (updates.length === 0) return res.status(400).json({ message: 'Tidak ada data untuk diupdate' });
    values.push(id);

    const result = await pool.query(
      `UPDATE tb_konsumen SET ${updates.join(', ')}, updated_at = NOW() WHERE id_konsumen = $${values.length} RETURNING *`,
      values
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteKonsumen = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM tb_konsumen WHERE id_konsumen = $1', [id]);
    res.json({ message: 'Konsumen berhasil dihapus' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
