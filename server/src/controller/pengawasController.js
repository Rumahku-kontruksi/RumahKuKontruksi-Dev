const pool = require('../config/db');

// GET all pengawas
exports.getAllPengawas = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tb_pengawas ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch pengawas' });
  }
};

// GET pengawas by id
exports.getPengawasById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM tb_pengawas WHERE id_pengawas = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Pengawas not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch pengawas' });
  }
};

// POST create new pengawas
exports.createPengawas = async (req, res) => {
  try {
    const {
      nama_lengkap, jenis_kelamin, tanggal_lahir, nomor_identitas,
      email, nomor_telepon, alamat, foto, jabatan, pengalaman,
      sertifikasi, bidang_keahlian, id_proyek, status_penugasan,
      tanggal_mulai, tanggal_selesai, catatan, metode_komunikasi,
      status_aktif, created_by, updated_by
    } = req.body;

    const result = await pool.query(
      `INSERT INTO tb_pengawas 
      (nama_lengkap, jenis_kelamin, tanggal_lahir, nomor_identitas, email, nomor_telepon, alamat, foto, jabatan, pengalaman,
       sertifikasi, bidang_keahlian, id_proyek, status_penugasan, tanggal_mulai, tanggal_selesai, catatan, metode_komunikasi,
       status_aktif, created_by, updated_by)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21)
      RETURNING *`,
      [nama_lengkap, jenis_kelamin, tanggal_lahir, nomor_identitas, email, nomor_telepon, alamat, foto, jabatan, pengalaman,
       sertifikasi, bidang_keahlian, id_proyek, status_penugasan, tanggal_mulai, tanggal_selesai, catatan, metode_komunikasi,
       status_aktif, created_by, updated_by]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    if (err.code === '23505') { // unique violation
      return res.status(400).json({ error: 'Email atau nomor identitas sudah digunakan' });
    }
    res.status(500).json({ error: 'Failed to create pengawas' });
  }
};

// PUT update pengawas
exports.updatePengawas = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      nama_lengkap, jenis_kelamin, tanggal_lahir, nomor_identitas,
      email, nomor_telepon, alamat, foto, jabatan, pengalaman,
      sertifikasi, bidang_keahlian, id_proyek, status_penugasan,
      tanggal_mulai, tanggal_selesai, catatan, metode_komunikasi,
      status_aktif, updated_by
    } = req.body;

    const result = await pool.query(
      `UPDATE tb_pengawas SET
        nama_lengkap=$1, jenis_kelamin=$2, tanggal_lahir=$3, nomor_identitas=$4, email=$5, nomor_telepon=$6,
        alamat=$7, foto=$8, jabatan=$9, pengalaman=$10, sertifikasi=$11, bidang_keahlian=$12, id_proyek=$13,
        status_penugasan=$14, tanggal_mulai=$15, tanggal_selesai=$16, catatan=$17, metode_komunikasi=$18,
        status_aktif=$19, updated_by=$20, updated_at=NOW()
       WHERE id_pengawas=$21
       RETURNING *`,
      [nama_lengkap, jenis_kelamin, tanggal_lahir, nomor_identitas, email, nomor_telepon,
       alamat, foto, jabatan, pengalaman, sertifikasi, bidang_keahlian, id_proyek,
       status_penugasan, tanggal_mulai, tanggal_selesai, catatan, metode_komunikasi,
       status_aktif, updated_by, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Pengawas not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    if (err.code === '23505') {
      return res.status(400).json({ error: 'Email atau nomor identitas sudah digunakan' });
    }
    res.status(500).json({ error: 'Failed to update pengawas' });
  }
};

// DELETE pengawas
exports.deletePengawas = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query('DELETE FROM tb_pengawas WHERE id_pengawas=$1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Pengawas not found' });
    }

    res.json({ message: 'Pengawas deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete pengawas' });
  }
};
