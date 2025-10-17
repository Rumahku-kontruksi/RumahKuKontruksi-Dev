const pool = require('../config/db');

// GET all mandor
exports.getAllMandor = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tb_mandor ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch mandor' });
  }
};

// GET mandor by id
exports.getMandorById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM tb_mandor WHERE id_mandor = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Mandor not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch mandor' });
  }
};

// POST create new mandor
exports.createMandor = async (req, res) => {
  try {
    const {
      nama_lengkap, password_mandor, jenis_kelamin, tanggal_lahir, nomor_identitas,
      email, nomor_telepon, alamat, foto, jabatan, pengalaman,
      sertifikasi, bidang_keahlian, id_proyek, status_penugasan,
      tanggal_mulai, tanggal_selesai, catatan, metode_komunikasi,
      status_aktif, created_by, updated_by
    } = req.body;

    const result = await pool.query(
      `INSERT INTO tb_mandor
      (nama_lengkap, password_mandor, jenis_kelamin, tanggal_lahir, nomor_identitas,
       email, nomor_telepon, alamat, foto, jabatan, pengalaman,
       sertifikasi, bidang_keahlian, id_proyek, status_penugasan,
       tanggal_mulai, tanggal_selesai, catatan, metode_komunikasi,
       status_aktif, created_by, updated_by)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22)
      RETURNING *`,
      [nama_lengkap, password_mandor, jenis_kelamin, tanggal_lahir, nomor_identitas,
       email, nomor_telepon, alamat, foto, jabatan, pengalaman,
       sertifikasi, bidang_keahlian, id_proyek, status_penugasan,
       tanggal_mulai, tanggal_selesai, catatan, metode_komunikasi,
       status_aktif, created_by, updated_by]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    if (err.code === '23505') { // unique violation
      return res.status(400).json({ error: 'Email sudah digunakan' });
    }
    res.status(500).json({ error: 'Failed to create mandor' });
  }
};

// PUT update mandor
exports.updateMandor = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      nama_lengkap, password_mandor, jenis_kelamin, tanggal_lahir, nomor_identitas,
      email, nomor_telepon, alamat, foto, jabatan, pengalaman,
      sertifikasi, bidang_keahlian, id_proyek, status_penugasan,
      tanggal_mulai, tanggal_selesai, catatan, metode_komunikasi,
      status_aktif, updated_by
    } = req.body;

    const result = await pool.query(
      `UPDATE tb_mandor SET
        nama_lengkap=$1, password_mandor=$2, jenis_kelamin=$3, tanggal_lahir=$4, nomor_identitas=$5,
        email=$6, nomor_telepon=$7, alamat=$8, foto=$9, jabatan=$10, pengalaman=$11,
        sertifikasi=$12, bidang_keahlian=$13, id_proyek=$14, status_penugasan=$15,
        tanggal_mulai=$16, tanggal_selesai=$17, catatan=$18, metode_komunikasi=$19,
        status_aktif=$20, updated_by=$21, updated_at=NOW()
       WHERE id_mandor=$22
       RETURNING *`,
      [nama_lengkap, password_mandor, jenis_kelamin, tanggal_lahir, nomor_identitas,
       email, nomor_telepon, alamat, foto, jabatan, pengalaman,
       sertifikasi, bidang_keahlian, id_proyek, status_penugasan,
       tanggal_mulai, tanggal_selesai, catatan, metode_komunikasi,
       status_aktif, updated_by, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Mandor not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    if (err.code === '23505') {
      return res.status(400).json({ error: 'Email sudah digunakan' });
    }
    res.status(500).json({ error: 'Failed to update mandor' });
  }
};

// DELETE mandor
exports.deleteMandor = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query('DELETE FROM tb_mandor WHERE id_mandor=$1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Mandor not found' });
    }

    res.json({ message: 'Mandor deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete mandor' });
  }
};
