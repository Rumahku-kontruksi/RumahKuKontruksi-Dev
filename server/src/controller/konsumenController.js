// server/src/controller/konsumenController.js
const pool = require('../config/db');

/**
 * Controller CRUD untuk tb_konsumen (tanpa jenis_konsumen, id_perusahaan, id_penanggung_jawab, id_proyek)
 */

exports.getAllKonsumen = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tb_konsumen ORDER BY id_konsumen ASC');
    return res.json({ status: 'success', data: result.rows });
  } catch (err) {
    console.error('getAllKonsumen error:', err);
    return res.status(500).json({ status: 'error', message: err.message });
  }
};

exports.getKonsumenById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM tb_konsumen WHERE id_konsumen = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ status: 'fail', message: 'Konsumen tidak ditemukan' });
    }
    return res.json({ status: 'success', data: result.rows[0] });
  } catch (err) {
    console.error('getKonsumenById error:', err);
    return res.status(500).json({ status: 'error', message: err.message });
  }
};

exports.createKonsumen = async (req, res) => {
  try {
    const {
      nama_lengkap,
      password_konsumen,
      email,
      nomor_telepon,
      jenis_kelamin,
      tanggal_lahir,
      nomor_identitas,
      nama_perusahaan,
      bidang_usaha,
      jabatan_pekerjaan,
      npwp,
      alamat,
      foto
    } = req.body;

    // Validasi kolom wajib
    if (!nama_lengkap || !password_konsumen || !email || !nomor_telepon) {
      return res.status(400).json({
        status: 'fail',
        message: 'Field wajib: nama_lengkap, password_konsumen, email, nomor_telepon',
      });
    }

    const result = await pool.query(
      `
      INSERT INTO tb_konsumen 
      (nama_lengkap, password_konsumen, email, nomor_telepon, jenis_kelamin, tanggal_lahir, nomor_identitas, nama_perusahaan, bidang_usaha, jabatan_pekerjaan, npwp, alamat, foto)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)
      RETURNING *;
      `,
      [
        nama_lengkap,
        password_konsumen,
        email,
        nomor_telepon,
        jenis_kelamin || null,
        tanggal_lahir || null,
        nomor_identitas || null,
        nama_perusahaan || null,
        bidang_usaha || null,
        jabatan_pekerjaan || null,
        npwp || null,
        alamat || null,
        foto || null
      ]
    );

    return res.status(201).json({ status: 'success', data: result.rows[0] });
  } catch (err) {
    console.error('createKonsumen error:', err);
    return res.status(500).json({ status: 'error', message: err.message });
  }
};

exports.updateKonsumen = async (req, res) => {
  try {
    const { id } = req.params;
    const allowed = [
      'nama_lengkap',
      'password_konsumen',
      'email',
      'nomor_telepon',
      'jenis_kelamin',
      'tanggal_lahir',
      'nomor_identitas',
      'nama_perusahaan',
      'bidang_usaha',
      'jabatan_pekerjaan',
      'npwp',
      'alamat',
      'foto'
    ];
    const sets = [];
    const values = [];

    allowed.forEach((f) => {
      if (req.body[f] !== undefined) {
        values.push(req.body[f]);
        sets.push(`${f} = $${values.length}`);
      }
    });

    if (sets.length === 0) {
      return res.status(400).json({ status: 'fail', message: 'Tidak ada field untuk diupdate' });
    }

    values.push(id);
    const query = `UPDATE tb_konsumen SET ${sets.join(', ')}, updated_at = NOW() WHERE id_konsumen = $${values.length} RETURNING *`;
    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ status: 'fail', message: 'Konsumen tidak ditemukan' });
    }

    return res.json({ status: 'success', data: result.rows[0] });
  } catch (err) {
    console.error('updateKonsumen error:', err);
    return res.status(500).json({ status: 'error', message: err.message });
  }
};

exports.deleteKonsumen = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM tb_konsumen WHERE id_konsumen = $1 RETURNING *', [
      id,
    ]);

    if (result.rowCount === 0) {
      return res.status(404).json({ status: 'fail', message: 'Konsumen tidak ditemukan' });
    }

    return res.json({
      status: 'success',
      message: 'Konsumen berhasil dihapus',
      data: result.rows[0],
    });
  } catch (err) {
    console.error('deleteKonsumen error:', err);
    return res.status(500).json({ status: 'error', message: err.message });
  }
};


exports.getKonsumenBelumLengkap = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT * FROM tb_konsumen 
      WHERE jenis_konsumen IS NULL OR jenis_konsumen = ''
      ORDER BY created_at DESC
    `);

    if (result.rows.length === 0) {
      return res.status(404).json({ status: 'fail', message: 'Konsumen tidak ditemukan' });
    }

    return res.json({ status: 'success', data: result.rows });
  } catch (err) {
    console.error('getKonsumenBelumLengkap error:', err);
    return res.status(500).json({ status: 'error', message: err.message });
  }
};

// 🟢 Update kolom jenis_konsumen + relasi id_perusahaan / id_penanggung_jawab
exports.updateJenisKonsumen = async (req, res) => {
  try {
    const { id } = req.params;
    const { jenis_konsumen, id_perusahaan, id_penanggung_jawab } = req.body;

    if (!jenis_konsumen) {
      return res.status(400).json({ message: "Field jenis_konsumen wajib diisi" });
    }

    const result = await pool.query(
      `UPDATE tb_konsumen
       SET jenis_konsumen = $1,
           id_perusahaan = $2,
           id_penanggung_jawab = $3,
           updated_at = NOW()
       WHERE id_konsumen = $4
       RETURNING *;`,
      [
        jenis_konsumen,
        id_perusahaan || null,
        id_penanggung_jawab || null,
        id
      ]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Konsumen tidak ditemukan" });
    }

    res.status(200).json({
      message: "Jenis konsumen & relasi berhasil diperbarui",
      data: result.rows[0],
    });
  } catch (err) {
    console.error("updateJenisKonsumen error:", err);
    res.status(500).json({ message: "Gagal mengupdate data", error: err.message });
  }
};