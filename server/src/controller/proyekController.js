const pool = require('../config/db');

/**
 * Controller CRUD untuk tb_proyek
 */

exports.getAllProyek = async (req, res) => {
  try {
    // ambil data proyek + nama konsumen, mandor, pengawas (JOIN)
    const result = await pool.query(`
      SELECT 
        p.*, 
        k.nama_lengkap AS nama_konsumen,
        m.nama_lengkap AS nama_mandor,
        g.nama_lengkap AS nama_pengawas
      FROM tb_proyek p
      LEFT JOIN tb_konsumen k ON p.id_konsumen = k.id_konsumen
      LEFT JOIN tb_mandor m ON p.id_mandor = m.id_mandor
      LEFT JOIN tb_pengawas g ON p.id_pengawas = g.id_pengawas
      ORDER BY p.created_at DESC
    `);
    return res.json({ status: 'success', data: result.rows });
  } catch (err) {
    console.error('getAllProyek error', err);
    return res.status(500).json({ status: 'error', message: err.message });
  }
};

exports.getProyekById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(`
      SELECT 
        p.*, 
        k.nama_lengkap AS nama_konsumen,
        m.nama_lengkap AS nama_mandor,
        g.nama_lengkap AS nama_pengawas
      FROM tb_proyek p
      LEFT JOIN tb_konsumen k ON p.id_konsumen = k.id_konsumen
      LEFT JOIN tb_mandor m ON p.id_mandor = m.id_mandor
      LEFT JOIN tb_pengawas g ON p.id_pengawas = g.id_pengawas
      WHERE p.id_proyek = $1
    `, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ status: 'fail', message: 'Proyek tidak ditemukan' });
    }

    return res.json({ status: 'success', data: result.rows[0] });
  } catch (err) {
    console.error('getProyekById error', err);
    return res.status(500).json({ status: 'error', message: err.message });
  }
};

exports.createProyek = async (req, res) => {
  try {
    const {
      id_konsumen,
      id_mandor,
      id_pengawas,
      nama_proyek,
      lokasi,
      tanggal_mulai,
      tanggal_selesai,
      status,
      nilai_proyek
    } = req.body;

    if (!id_konsumen || !nama_proyek || !lokasi) {
      return res.status(400).json({
        status: 'fail',
        message: 'Field wajib: id_konsumen, nama_proyek, lokasi'
      });
    }

    const query = `
      INSERT INTO tb_proyek (
        id_konsumen, id_mandor, id_pengawas, nama_proyek,
        lokasi, tanggal_mulai, tanggal_selesai, status, nilai_proyek,
        created_at, updated_at
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9, NOW(), NOW())
      RETURNING *;
    `;
    const values = [
      id_konsumen, id_mandor || null, id_pengawas || null, nama_proyek,
      lokasi, tanggal_mulai || null, tanggal_selesai || null, status || 'Perencanaan', nilai_proyek || 0
    ];

    const result = await pool.query(query, values);
    return res.status(201).json({ status: 'success', data: result.rows[0] });
  } catch (err) {
    console.error('createProyek error', err);
    return res.status(500).json({ status: 'error', message: err.message });
  }
};

exports.updateProyek = async (req, res) => {
  try {
    const { id } = req.params;
    const allowed = [
      'id_konsumen', 'id_mandor', 'id_pengawas',
      'nama_proyek', 'lokasi', 'tanggal_mulai', 'tanggal_selesai',
      'status', 'nilai_proyek'
    ];
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
    const query = `UPDATE tb_proyek SET ${sets.join(', ')}, updated_at = NOW() WHERE id_proyek = $${values.length} RETURNING *`;
    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ status: 'fail', message: 'Proyek tidak ditemukan' });
    }

    return res.json({ status: 'success', data: result.rows[0] });
  } catch (err) {
    console.error('updateProyek error', err);
    return res.status(500).json({ status: 'error', message: err.message });
  }
};

exports.deleteProyek = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM tb_proyek WHERE id_proyek = $1 RETURNING *', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ status: 'fail', message: 'Proyek tidak ditemukan' });
    }
    return res.json({ status: 'success', message: 'Proyek berhasil dihapus', data: result.rows[0] });
  } catch (err) {
    console.error('deleteProyek error', err);
    return res.status(500).json({ status: 'error', message: err.message });
  }
};
