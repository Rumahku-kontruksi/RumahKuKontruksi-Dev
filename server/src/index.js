const express = require('express');
const morgan = require('morgan');
const app = express();

const konsumenRoutes = require('./routes/konsumen');
const mandorRoutes = require('./routes/mandor');
const pengawasRoutes = require('./routes/pengawas');
const rabRoutes = require('./routes/rab');
const proyekRoutes = require('./routes/proyek');
const timelineRoutes = require('./routes/timeline');

app.use(express.json());
app.use(morgan('dev'));

app.use('/konsumen', konsumenRoutes);
app.use('/mandor', mandorRoutes);
app.use('/pengawas', pengawasRoutes);
app.use('/rab', rabRoutes);
app.use('/proyek', proyekRoutes);
app.use('/timeline', timelineRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
