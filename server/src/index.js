// server/src/index.js
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();

// Import semua route

// Jika ada jenisKonsumen, beri path unik misal '/jenis-konsumen'


app.use(cors()); // IZINKAN SEMUA ORIGIN (untuk development)
app.use(express.json());
app.use(morgan('dev'));

// Daftarkan semua route dengan path unik



// Jalankan server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
