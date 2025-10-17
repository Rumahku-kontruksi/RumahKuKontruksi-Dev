// server/src/index.js
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();

// Import semua route
const konsumenRoutes = require('./routes/konsumen');
const mandorRoutes = require('./routes/mandor');
const pengawasRoutes = require('./routes/pengawas');
const rabRoutes = require('./routes/rab');
const rabKategoriRoutes = require('./routes/rabKategori');
const rabPekerjaanRoutes = require('./routes/rabPekerjaan');
const timelineRoutes = require('./routes/timelineProyek');
const proyekRoutes = require('./routes/proyek');
const perusahaanRoutes = require('./routes/perusahaan');
const perseoranganRoutes = require('./routes/perseorangan');
// Jika ada jenisKonsumen, beri path unik misal '/jenis-konsumen'


app.use(cors()); // IZINKAN SEMUA ORIGIN (untuk development)
app.use(express.json());
app.use(morgan('dev'));

// Daftarkan semua route dengan path unik
app.use('/konsumen', konsumenRoutes);
app.use('/mandor', mandorRoutes);
app.use('/pengawas', pengawasRoutes);
app.use('/rab', rabRoutes);
app.use('/rab-kategori', rabKategoriRoutes);
app.use('/rab-pekerjaan', rabPekerjaanRoutes);
app.use('/timeline', timelineRoutes);
app.use('/proyek', proyekRoutes);
app.use('/perusahaan', perusahaanRoutes);
app.use('/perseorangan', perseoranganRoutes);


// Jalankan server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
