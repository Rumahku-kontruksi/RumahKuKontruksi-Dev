const pool = require('../config/db');

/**
 * Controller CRUD untuk tb_rab_pekerjaan
 * Relasi: setiap pekerjaan masuk dalam 1 kategori RAB
 */

// GET semua pekerjaan RAB
exports.getAllRABPekerjaan = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        p.*, 
        k.nama_kategori, 
        r.id_rab, 
        r.total_keseluruhan AS total_rab
      FROM tb_rab_pekerjaan p
      JOIN tb_rab_kategori k ON p.id_kategori = k.id_kategori
      JOIN tb_rab r ON k.id_rab = r.id_rab
      ORDER BY p.id_pekerjaan ASC
    `);
    return res.json({ status: 'success', data: result.rows });
  } catch (err) {
    console.error('getAllRABPekerjaan error', err);
    return res.status(500).json({ status: 'error', message: err.message });
  }
};

// GET pekerjaan RAB by ID
exports.getRABPekerjaanById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(`
      SELECT 
        p.*, 
        k.nama_kategori, 
        r.id_rab
      FROM tb_rab_pekerjaan p
      JOIN tb_rab_kategori k ON p.id_kategori = k.id_kategori
      JOIN tb_rab r ON k.id_rab = r.id_rab
      WHERE p.id_pekerjaan = $1
    `, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ status: 'fail', message: 'Pekerjaan RAB tidak ditemukan' });
    }

    return res.json({ status: 'success', data: result.rows[0] });
  } catch (err) {
    console.error('getRABPekerjaanById error', err);
    return res.status(500).json({ status: 'error', message: err.message });
  }
};

// POST buat pekerjaan RAB baru
exports.createRABPekerjaan = async (req, res) => {
  try {
    const { id_kategori, nama_pekerjaan, volume, satuan, harga_satuan } = req.body;

    if (!id_kategori || !nama_pekerjaan) {
      return res.status(400).json({
        status: 'fail',
        message: 'Field wajib: id_kategori dan nama_pekerjaan'
      });
    }

    const total = (volume || 0) * (harga_satuan || 0);

    const query = `
      INSERT INTO tb_rab_pekerjaan (id_kategori, nama_pekerjaan, volume, satuan, harga_satuan, total)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;
    const values = [id_kategori, nama_pekerjaan, volume || 0, satuan || null, harga_satuan || 0, total];
    const result = await pool.query(query, values);

    // Update total_kategori setelah pekerjaan baru ditambahkan
    await pool.query(`
      UPDATE tb_rab_kategori
      SET total_kategori = (
        SELECT COALESCE(SUM(total), 0)
        FROM tb_rab_pekerjaan
        WHERE id_kategori = $1
      )
      WHERE id_kategori = $1
    `, [id_kategori]);

    return res.status(201).json({ status: 'success', data: result.rows[0] });
  } catch (err) {
    console.error('createRABPekerjaan error', err);
    return res.status(500).json({ status: 'error', message: err.message });
  }
};

// PUT update pekerjaan RAB
exports.updateRABPekerjaan = async (req, res) => {
  try {
    const { id } = req.params;
    const allowed = ['id_kategori', 'nama_pekerjaan', 'uraian', 'spesifikasi', 'volume', 'satuan', 'harga_satuan'];
    const sets = [];
    const values = [];

    allowed.forEach((f) => {
      if (Object.prototype.hasOwnProperty.call(req.body, f)) {
        values.push(req.body[f]);
        sets.push(`${f} = $${values.length}`);
      }
    });

    // Jika ada volume atau harga_satuan yang berubah, hitung ulang total
    let updateTotal = '';
    if (req.body.volume !== undefined || req.body.harga_satuan !== undefined) {
      updateTotal = ', total = COALESCE(volume,0) * COALESCE(harga_satuan,0)';
    }

    if (sets.length === 0 && !updateTotal) {
      return res.status(400).json({ status: 'fail', message: 'Tidak ada field untuk diupdate' });
    }

    values.push(id);
    const query = `
      UPDATE tb_rab_pekerjaan
      SET ${sets.join(', ')}${updateTotal}, updated_at = CURRENT_TIMESTAMP
      WHERE id_pekerjaan = $${values.length}
      RETURNING *
    `;
    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ status: 'fail', message: 'Pekerjaan RAB tidak ditemukan' });
    }

    // Update total_kategori terkait
    const idKategori = result.rows[0].id_kategori;
    await pool.query(`
      UPDATE tb_rab_kategori
      SET total_kategori = (
        SELECT COALESCE(SUM(total), 0)
        FROM tb_rab_pekerjaan
        WHERE id_kategori = $1
      )
      WHERE id_kategori = $1
    `, [idKategori]);

    return res.json({ status: 'success', data: result.rows[0] });
  } catch (err) {
    console.error('updateRABPekerjaan error', err);
    return res.status(500).json({ status: 'error', message: err.message });
  }
};

// DELETE pekerjaan RAB
exports.deleteRABPekerjaan = async (req, res) => {
  try {
    const { id } = req.params;

    // Ambil id_kategori sebelum hapus
    const find = await pool.query('SELECT id_kategori FROM tb_rab_pekerjaan WHERE id_pekerjaan = $1', [id]);
    if (find.rows.length === 0) {
      return res.status(404).json({ status: 'fail', message: 'Pekerjaan RAB tidak ditemukan' });
    }
    const idKategori = find.rows[0].id_kategori;

    const result = await pool.query('DELETE FROM tb_rab_pekerjaan WHERE id_pekerjaan = $1 RETURNING *', [id]);

    // Update total_kategori setelah penghapusan
    await pool.query(`
      UPDATE tb_rab_kategori
      SET total_kategori = (
        SELECT COALESCE(SUM(total), 0)
        FROM tb_rab_pekerjaan
        WHERE id_kategori = $1
      )
      WHERE id_kategori = $1
    `, [idKategori]);

    return res.json({ status: 'success', message: 'Pekerjaan RAB berhasil dihapus', data: result.rows[0] });
  } catch (err) {
    console.error('deleteRABPekerjaan error', err);
    return res.status(500).json({ status: 'error', message: err.message });
  }
};
