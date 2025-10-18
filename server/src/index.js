// server/src/index.js
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();

// Import semua route
const konsumenRoutes = require('./routes/konsumenRoutes');
const perusahaanRoutes = require('./routes/perusahaanRoutes');
const penanggungJawabRoutes = require('./routes/penanggungJawabRoutes');
const mandorRoutes = require('./routes/mandorRoutes');
const pengawasRoutes = require('./routes/pengawasRoutes');
const proyekRoutes = require('./routes/proyekRoutes');
const rabRoutes = require('./routes/rabRoutes');
const rabKategoriRoutes = require('./routes/rabKategoriRoutes');
const rabPekerjaanRoutes = require('./routes/rabPekerjaanRoutes');
const timelineRoutes = require('./routes/timelineRoutes'); // <--- Tambahkan ini

app.use(cors()); // IZINKAN SEMUA ORIGIN (untuk development)
app.use(express.json());
app.use(morgan('dev'));

// Daftarkan semua route dengan path unik
app.use('/konsumen', konsumenRoutes);
app.use('/perusahaan', perusahaanRoutes);
app.use('/penanggung-jawab', penanggungJawabRoutes);
app.use('/mandor', mandorRoutes);
app.use('/pengawas', pengawasRoutes);
app.use('/proyek', proyekRoutes);
app.use('/rab', rabRoutes);
app.use('/kategori', rabKategoriRoutes);
app.use('/pekerjaan', rabPekerjaanRoutes);
app.use('/timeline', timelineRoutes); // <--- Tambahkan ini

// Jalankan server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
