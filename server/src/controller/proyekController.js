// server/src/controller/proyekController.js
const pool = require('../config/db');

// GET all proyek
exports.getAllProyek = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tb_proyek ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch proyek' });
  }
};

// GET proyek by id
exports.getProyekById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM tb_proyek WHERE id_proyek = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Proyek not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch proyek' });
  }
};

// POST create new proyek
exports.createProyek = async (req, res) => {
  try {
    const {
      id_konsumen,
      id_mandor,
      id_pengawas,
      id_rab,
      nama_proyek,
      alamat,
      lokasi,
      tanggal_mulai,
      tanggal_selesai,
      status_proyek,
      anggaran,
      catatan,
      created_by,
      updated_by
    } = req.body;

    const result = await pool.query(
      `INSERT INTO tb_proyek
      (id_konsumen, id_mandor, id_pengawas, id_rab, nama_proyek, alamat, lokasi, tanggal_mulai, tanggal_selesai, status_proyek, anggaran, catatan, created_by, updated_by)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)
      RETURNING *`,
      [id_konsumen, id_mandor, id_pengawas, id_rab, nama_proyek, alamat, lokasi, tanggal_mulai, tanggal_selesai, status_proyek, anggaran, catatan, created_by, updated_by]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create proyek' });
  }
};

// PUT update proyek
exports.updateProyek = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      id_konsumen,
      id_mandor,
      id_pengawas,
      id_rab,
      nama_proyek,
      alamat,
      lokasi,
      tanggal_mulai,
      tanggal_selesai,
      status_proyek,
      anggaran,
      catatan,
      updated_by
    } = req.body;

    const result = await pool.query(
      `UPDATE tb_proyek SET 
        id_konsumen=$1, id_mandor=$2, id_pengawas=$3, id_rab=$4,
        nama_proyek=$5, alamat=$6, lokasi=$7, tanggal_mulai=$8, tanggal_selesai=$9,
        status_proyek=$10, anggaran=$11, catatan=$12, updated_by=$13, updated_at=NOW()
       WHERE id_proyek=$14
       RETURNING *`,
      [id_konsumen, id_mandor, id_pengawas, id_rab, nama_proyek, alamat, lokasi, tanggal_mulai, tanggal_selesai, status_proyek, anggaran, catatan, updated_by, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Proyek not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update proyek' });
  }
};

// DELETE proyek
exports.deleteProyek = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query('DELETE FROM tb_proyek WHERE id_proyek=$1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Proyek not found' });
    }

    res.json({ message: 'Proyek deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete proyek' });
  }
};
