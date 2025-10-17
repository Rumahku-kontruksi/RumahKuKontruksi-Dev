const pool = require('../config/db');

// GET all timeline
exports.getAllTimeline = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tb_timeline_proyek ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch timeline' });
  }
};

// GET timeline by id
exports.getTimelineById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM tb_timeline_proyek WHERE id_timeline = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Timeline not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch timeline' });
  }
};

// POST create new timeline
exports.createTimeline = async (req, res) => {
  try {
    const {
      id_proyek, minggu, kode, judul, pekerjaan, tanggal_mulai,
      tanggal_selesai, durasi_hari, foto, biaya_harus_dibayar,
      biaya_terbayar, verifikasi, catatan
    } = req.body;

    const result = await pool.query(
      `INSERT INTO tb_timeline_proyek 
      (id_proyek, minggu, kode, judul, pekerjaan, tanggal_mulai, tanggal_selesai,
       durasi_hari, foto, biaya_harus_dibayar, biaya_terbayar, verifikasi, catatan)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) RETURNING *`,
      [id_proyek, minggu, kode, judul, pekerjaan, tanggal_mulai, tanggal_selesai,
       durasi_hari, foto, biaya_harus_dibayar, biaya_terbayar, verifikasi, catatan]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create timeline' });
  }
};

// PUT update timeline
exports.updateTimeline = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      id_proyek, minggu, kode, judul, pekerjaan, tanggal_mulai,
      tanggal_selesai, durasi_hari, foto, biaya_harus_dibayar,
      biaya_terbayar, verifikasi, catatan
    } = req.body;

    const result = await pool.query(
      `UPDATE tb_timeline_proyek SET
        id_proyek=$1, minggu=$2, kode=$3, judul=$4, pekerjaan=$5,
        tanggal_mulai=$6, tanggal_selesai=$7, durasi_hari=$8, foto=$9,
        biaya_harus_dibayar=$10, biaya_terbayar=$11, verifikasi=$12,
        catatan=$13, updated_at=NOW()
       WHERE id_timeline=$14
       RETURNING *`,
      [id_proyek, minggu, kode, judul, pekerjaan, tanggal_mulai, tanggal_selesai,
       durasi_hari, foto, biaya_harus_dibayar, biaya_terbayar, verifikasi, catatan, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Timeline not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update timeline' });
  }
};

// DELETE timeline
exports.deleteTimeline = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query('DELETE FROM tb_timeline_proyek WHERE id_timeline=$1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Timeline not found' });
    }

    res.json({ message: 'Timeline deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete timeline' });
  }
};
