// timelineController.js
const pool = require('../config/db'); // pastikan sudah ada file db.js untuk koneksi PG
// contoh db.js:
// const { Pool } = require('pg');
// const pool = new Pool({ connectionString: process.env.DATABASE_URL });
// module.exports = pool;

// GET all timeline
const getAllTimelines = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tb_timeline_proyek ORDER BY tanggal_mulai DESC');
    res.json(result.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// GET timeline by id
const getTimelineById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM tb_timeline_proyek WHERE id_timeline = $1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ message: 'Timeline not found' });
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// CREATE new timeline
const createTimeline = async (req, res) => {
  try {
    const {
      id_timeline,
      id_proyek,
      minggu,
      kode,
      judul,
      pekerjaan,
      tanggal_mulai,
      tanggal_selesai,
      durasi_hari,
      foto,
      biaya_harus_dibayar,
      biaya_terbayar,
      verifikasi,
      catatan
    } = req.body;

    const query = `
      INSERT INTO tb_timeline_proyek
      (id_timeline, id_proyek, minggu, kode, judul, pekerjaan, tanggal_mulai, tanggal_selesai, durasi_hari, foto, biaya_harus_dibayar, biaya_terbayar, verifikasi, catatan)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14) RETURNING *`;

    const values = [
      id_timeline,
      id_proyek,
      minggu,
      kode,
      judul,
      pekerjaan,
      tanggal_mulai,
      tanggal_selesai,
      durasi_hari,
      foto,
      biaya_harus_dibayar || 0,
      biaya_terbayar || 0,
      verifikasi || false,
      catatan
    ];

    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// UPDATE timeline
const updateTimeline = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      id_proyek,
      minggu,
      kode,
      judul,
      pekerjaan,
      tanggal_mulai,
      tanggal_selesai,
      durasi_hari,
      foto,
      biaya_harus_dibayar,
      biaya_terbayar,
      verifikasi,
      catatan
    } = req.body;

    const query = `
      UPDATE tb_timeline_proyek SET
        id_proyek=$1,
        minggu=$2,
        kode=$3,
        judul=$4,
        pekerjaan=$5,
        tanggal_mulai=$6,
        tanggal_selesai=$7,
        durasi_hari=$8,
        foto=$9,
        biaya_harus_dibayar=$10,
        biaya_terbayar=$11,
        verifikasi=$12,
        catatan=$13,
        updated_at=CURRENT_TIMESTAMP
      WHERE id_timeline=$14
      RETURNING *`;

    const values = [
      id_proyek,
      minggu,
      kode,
      judul,
      pekerjaan,
      tanggal_mulai,
      tanggal_selesai,
      durasi_hari,
      foto,
      biaya_harus_dibayar,
      biaya_terbayar,
      verifikasi,
      catatan,
      id
    ];

    const result = await pool.query(query, values);

    if (result.rows.length === 0) return res.status(404).json({ message: 'Timeline not found' });
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// DELETE timeline
const deleteTimeline = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM tb_timeline_proyek WHERE id_timeline=$1 RETURNING *', [id]);
    if (result.rows.length === 0) return res.status(404).json({ message: 'Timeline not found' });
    res.json({ message: 'Timeline deleted successfully', data: result.rows[0] });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  getAllTimelines,
  getTimelineById,
  createTimeline,
  updateTimeline,
  deleteTimeline
};
