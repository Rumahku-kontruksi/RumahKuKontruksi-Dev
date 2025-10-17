const pool = require('../config/db');

// GET all timeline
const getAllTimeline = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tb_timeline_proyek ORDER BY id_timeline');
    res.json(result.rows);
  } catch (err) {
    console.error('ERROR getAllTimeline:', err);
    res.status(500).json({ error: err.message });
  }
};

// GET timeline by ID
const getTimelineById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM tb_timeline_proyek WHERE id_timeline = $1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Timeline not found' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error('ERROR getTimelineById:', err);
    res.status(500).json({ error: err.message });
  }
};

// CREATE timeline
const createTimeline = async (req, res) => {
  const {
    id_proyek, minggu, kode, judul, pekerjaan, tanggal_mulai, tanggal_selesai,
    durasi_hari, foto, biaya_harus_dibayar, biaya_terbayar, verifikasi, catatan
  } = req.body;

  try {
    const query = `
      INSERT INTO tb_timeline_proyek (
        id_proyek, minggu, kode, judul, pekerjaan, tanggal_mulai, tanggal_selesai,
        durasi_hari, foto, biaya_harus_dibayar, biaya_terbayar, verifikasi, catatan
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)
      RETURNING *
    `;
    const values = [
      id_proyek, minggu, kode, judul, pekerjaan, tanggal_mulai, tanggal_selesai,
      durasi_hari, foto, biaya_harus_dibayar, biaya_terbayar, verifikasi, catatan
    ];
    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('ERROR createTimeline:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// UPDATE timeline
const updateTimeline = async (req, res) => {
  const { id } = req.params;
  const {
    id_proyek, minggu, kode, judul, pekerjaan, tanggal_mulai, tanggal_selesai,
    durasi_hari, foto, biaya_harus_dibayar, biaya_terbayar, verifikasi, catatan
  } = req.body;

  try {
    const query = `
      UPDATE tb_timeline_proyek
      SET
        id_proyek=$1, minggu=$2, kode=$3, judul=$4, pekerjaan=$5,
        tanggal_mulai=$6, tanggal_selesai=$7, durasi_hari=$8, foto=$9,
        biaya_harus_dibayar=$10, biaya_terbayar=$11, verifikasi=$12,
        catatan=$13, updated_at=NOW()
      WHERE id_timeline=$14
      RETURNING *
    `;
    const values = [
      id_proyek, minggu, kode, judul, pekerjaan, tanggal_mulai, tanggal_selesai,
      durasi_hari, foto, biaya_harus_dibayar, biaya_terbayar, verifikasi,
      catatan, id
    ];
    const result = await pool.query(query, values);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Timeline not found' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error('ERROR updateTimeline:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// DELETE timeline
const deleteTimeline = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM tb_timeline_proyek WHERE id_timeline=$1 RETURNING *', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Timeline not found' });
    res.json({ message: 'Timeline deleted', data: result.rows[0] });
  } catch (err) {
    console.error('ERROR deleteTimeline:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  getAllTimeline,
  getTimelineById,
  createTimeline,
  updateTimeline,
  deleteTimeline
};
