const pool = require('../config/db');

// GET all konsumen
exports.getAllKonsumen = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tb_konsumen ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch konsumen' });
  }
};

// GET konsumen by id
exports.getKonsumenById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM tb_konsumen WHERE id_konsumen = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Konsumen not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch konsumen' });
  }
};

// POST create new konsumen
exports.createKonsumen = async (req, res) => {
  try {
    const {
      jenis_konsumen, id_perusahaan, id_perseorangan, nama_lengkap, password_konsumen,
      jenis_kelamin, tanggal_lahir, nomor_identitas, nama_perusahaan, bidang_usaha,
      jabatan_pekerjaan, npwp, email, nomor_telepon, alamat, foto, id_proyek
    } = req.body;

    const result = await pool.query(
      `INSERT INTO tb_konsumen
      (jenis_konsumen, id_perusahaan, id_perseorangan, nama_lengkap, password_konsumen,
       jenis_kelamin, tanggal_lahir, nomor_identitas, nama_perusahaan, bidang_usaha,
       jabatan_pekerjaan, npwp, email, nomor_telepon, alamat, foto, id_proyek)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17)
      RETURNING *`,
      [jenis_konsumen, id_perusahaan, id_perseorangan, nama_lengkap, password_konsumen,
       jenis_kelamin, tanggal_lahir, nomor_identitas, nama_perusahaan, bidang_usaha,
       jabatan_pekerjaan, npwp, email, nomor_telepon, alamat, foto, id_proyek]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    if (err.code === '23505') { // unique violation
      return res.status(400).json({ error: 'Email sudah digunakan' });
    }
    res.status(500).json({ error: 'Failed to create konsumen' });
  }
};

// PUT update konsumen
exports.updateKonsumen = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      jenis_konsumen, id_perusahaan, id_perseorangan, nama_lengkap, password_konsumen,
      jenis_kelamin, tanggal_lahir, nomor_identitas, nama_perusahaan, bidang_usaha,
      jabatan_pekerjaan, npwp, email, nomor_telepon, alamat, foto, id_proyek
    } = req.body;

    const result = await pool.query(
      `UPDATE tb_konsumen SET
        jenis_konsumen=$1, id_perusahaan=$2, id_perseorangan=$3, nama_lengkap=$4, password_konsumen=$5,
        jenis_kelamin=$6, tanggal_lahir=$7, nomor_identitas=$8, nama_perusahaan=$9, bidang_usaha=$10,
        jabatan_pekerjaan=$11, npwp=$12, email=$13, nomor_telepon=$14, alamat=$15, foto=$16, id_proyek=$17,
        updated_at=NOW()
       WHERE id_konsumen=$18
       RETURNING *`,
      [jenis_konsumen, id_perusahaan, id_perseorangan, nama_lengkap, password_konsumen,
       jenis_kelamin, tanggal_lahir, nomor_identitas, nama_perusahaan, bidang_usaha,
       jabatan_pekerjaan, npwp, email, nomor_telepon, alamat, foto, id_proyek, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Konsumen not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    if (err.code === '23505') {
      return res.status(400).json({ error: 'Email sudah digunakan' });
    }
    res.status(500).json({ error: 'Failed to update konsumen' });
  }
};

// DELETE konsumen
exports.deleteKonsumen = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query('DELETE FROM tb_konsumen WHERE id_konsumen=$1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Konsumen not found' });
    }

    res.json({ message: 'Konsumen deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete konsumen' });
  }
};
