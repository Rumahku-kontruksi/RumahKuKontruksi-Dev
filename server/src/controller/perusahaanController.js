const pool = require('../config/db');

// GET all perusahaan
exports.getAllPerusahaan = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tb_perusahaan ORDER BY id_perusahaan DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch data perusahaan' });
  }
};

// GET perusahaan by id
exports.getPerusahaanById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM tb_perusahaan WHERE id_perusahaan = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Data perusahaan not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch data perusahaan' });
  }
};

// POST create new perusahaan
exports.createPerusahaan = async (req, res) => {
  try {
    const { nama_perusahaan, npwp, alamat_kantor, kontak_person, telepon_kontak } = req.body;

    const result = await pool.query(
      `INSERT INTO tb_perusahaan
      (nama_perusahaan, npwp, alamat_kantor, kontak_person, telepon_kontak)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *`,
      [nama_perusahaan, npwp, alamat_kantor, kontak_person, telepon_kontak]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create data perusahaan' });
  }
};

// PUT update perusahaan
exports.updatePerusahaan = async (req, res) => {
  try {
    const { id } = req.params;
    const { nama_perusahaan, npwp, alamat_kantor, kontak_person, telepon_kontak } = req.body;

    const result = await pool.query(
      `UPDATE tb_perusahaan SET
        nama_perusahaan=$1,
        npwp=$2,
        alamat_kantor=$3,
        kontak_person=$4,
        telepon_kontak=$5
       WHERE id_perusahaan=$6
       RETURNING *`,
      [nama_perusahaan, npwp, alamat_kantor, kontak_person, telepon_kontak, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Data perusahaan not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update data perusahaan' });
  }
};

// DELETE perusahaan
exports.deletePerusahaan = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query('DELETE FROM tb_perusahaan WHERE id_perusahaan=$1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Data perusahaan not found' });
    }

    res.json({ message: 'Data perusahaan deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete data perusahaan' });
  }
};
