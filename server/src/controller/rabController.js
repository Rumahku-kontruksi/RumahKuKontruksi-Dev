const pool = require('../config/db');

/////////////////////////
// RAB PROYEK
/////////////////////////

// GET all proyek
const getAllRabProyek = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tb_rab_proyek ORDER BY id_rab');
    res.json(result.rows);
  } catch (err) {
    console.error('ERROR getAllRabProyek:', err);
    res.status(500).json({ error: err.message });
  }
};

// GET proyek by ID
const getRabProyekById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM tb_rab_proyek WHERE id_rab = $1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'RAB Proyek not found' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error('ERROR getRabProyekById:', err);
    res.status(500).json({ error: err.message });
  }
};

// CREATE proyek
const createRabProyek = async (req, res) => {
  const { id_rab, nama_proyek, total_keseluruhan } = req.body;
  try {
    const query = `
      INSERT INTO tb_rab_proyek (id_rab, nama_proyek, total_keseluruhan)
      VALUES ($1,$2,$3)
      RETURNING *
    `;
    const result = await pool.query(query, [id_rab, nama_proyek, total_keseluruhan]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('ERROR createRabProyek:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// UPDATE proyek
const updateRabProyek = async (req, res) => {
  const { id } = req.params;
  const { nama_proyek, total_keseluruhan } = req.body;
  try {
    const query = `
      UPDATE tb_rab_proyek
      SET nama_proyek=$1, total_keseluruhan=$2, updated_at=NOW()
      WHERE id_rab=$3
      RETURNING *
    `;
    const result = await pool.query(query, [nama_proyek, total_keseluruhan, id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'RAB Proyek not found' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error('ERROR updateRabProyek:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// DELETE proyek
const deleteRabProyek = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM tb_rab_proyek WHERE id_rab=$1 RETURNING *', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'RAB Proyek not found' });
    res.json({ message: 'RAB Proyek deleted', data: result.rows[0] });
  } catch (err) {
    console.error('ERROR deleteRabProyek:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

/////////////////////////
// RAB KATEGORI
/////////////////////////

// GET all kategori
const getAllRabKategori = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tb_rab_kategori ORDER BY id_kategori');
    res.json(result.rows);
  } catch (err) {
    console.error('ERROR getAllRabKategori:', err);
    res.status(500).json({ error: err.message });
  }
};

// GET kategori by ID
const getRabKategoriById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM tb_rab_kategori WHERE id_kategori=$1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'RAB Kategori not found' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error('ERROR getRabKategoriById:', err);
    res.status(500).json({ error: err.message });
  }
};

// CREATE kategori
const createRabKategori = async (req, res) => {
  const { id_kategori, id_rab, nama_kategori, total_kategori } = req.body;
  try {
    const query = `
      INSERT INTO tb_rab_kategori (id_kategori, id_rab, nama_kategori, total_kategori)
      VALUES ($1,$2,$3,$4)
      RETURNING *
    `;
    const result = await pool.query(query, [id_kategori, id_rab, nama_kategori, total_kategori]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('ERROR createRabKategori:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// UPDATE kategori
const updateRabKategori = async (req, res) => {
  const { id } = req.params;
  const { nama_kategori, total_kategori } = req.body;
  try {
    const query = `
      UPDATE tb_rab_kategori
      SET nama_kategori=$1, total_kategori=$2, updated_at=NOW()
      WHERE id_kategori=$3
      RETURNING *
    `;
    const result = await pool.query(query, [nama_kategori, total_kategori, id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'RAB Kategori not found' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error('ERROR updateRabKategori:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// DELETE kategori
const deleteRabKategori = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM tb_rab_kategori WHERE id_kategori=$1 RETURNING *', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'RAB Kategori not found' });
    res.json({ message: 'RAB Kategori deleted', data: result.rows[0] });
  } catch (err) {
    console.error('ERROR deleteRabKategori:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

/////////////////////////
// RAB PEKERJAAN
/////////////////////////

// GET all pekerjaan
const getAllRabPekerjaan = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tb_rab_pekerjaan ORDER BY id_pekerjaan');
    res.json(result.rows);
  } catch (err) {
    console.error('ERROR getAllRabPekerjaan:', err);
    res.status(500).json({ error: err.message });
  }
};

// GET pekerjaan by ID
const getRabPekerjaanById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM tb_rab_pekerjaan WHERE id_pekerjaan=$1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'RAB Pekerjaan not found' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error('ERROR getRabPekerjaanById:', err);
    res.status(500).json({ error: err.message });
  }
};

// CREATE pekerjaan
const createRabPekerjaan = async (req, res) => {
  const { id_pekerjaan, id_kategori, nama_pekerjaan, uraian, spesifikasi, satuan, volume, harga_satuan, total } = req.body;
  try {
    const query = `
      INSERT INTO tb_rab_pekerjaan (id_pekerjaan, id_kategori, nama_pekerjaan, uraian, spesifikasi, satuan, volume, harga_satuan, total)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
      RETURNING *
    `;
    const result = await pool.query(query, [id_pekerjaan, id_kategori, nama_pekerjaan, uraian, spesifikasi, satuan, volume, harga_satuan, total]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('ERROR createRabPekerjaan:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// UPDATE pekerjaan
const updateRabPekerjaan = async (req, res) => {
  const { id } = req.params;
  const { nama_pekerjaan, uraian, spesifikasi, satuan, volume, harga_satuan, total } = req.body;
  try {
    const query = `
      UPDATE tb_rab_pekerjaan
      SET nama_pekerjaan=$1, uraian=$2, spesifikasi=$3, satuan=$4, volume=$5, harga_satuan=$6, total=$7, updated_at=NOW()
      WHERE id_pekerjaan=$8
      RETURNING *
    `;
    const result = await pool.query(query, [nama_pekerjaan, uraian, spesifikasi, satuan, volume, harga_satuan, total, id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'RAB Pekerjaan not found' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error('ERROR updateRabPekerjaan:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// DELETE pekerjaan
const deleteRabPekerjaan = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM tb_rab_pekerjaan WHERE id_pekerjaan=$1 RETURNING *', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'RAB Pekerjaan not found' });
    res.json({ message: 'RAB Pekerjaan deleted', data: result.rows[0] });
  } catch (err) {
    console.error('ERROR deleteRabPekerjaan:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  getAllRabProyek,
  getRabProyekById,
  createRabProyek,
  updateRabProyek,
  deleteRabProyek,

  getAllRabKategori,
  getRabKategoriById,
  createRabKategori,
  updateRabKategori,
  deleteRabKategori,

  getAllRabPekerjaan,
  getRabPekerjaanById,
  createRabPekerjaan,
  updateRabPekerjaan,
  deleteRabPekerjaan
};
