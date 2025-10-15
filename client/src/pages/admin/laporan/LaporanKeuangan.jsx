// client/src/pages/admin/laporan/LaporanKeuangan.jsx
import React from "react";
import { motion } from "framer-motion";
import { HiArrowDown, HiArrowUp, HiCurrencyDollar } from "react-icons/hi";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// =================== DATA DUMMY ===================
const dataTransaksi = [
  { id: 1, tanggal: "2025-10-01", keterangan: "Pembayaran Proyek Bu Sinta", jenis: "Masuk", jumlah: 250000000 },
  { id: 2, tanggal: "2025-10-02", keterangan: "Pembelian Material Proyek Pak Budi", jenis: "Keluar", jumlah: 75000000 },
  { id: 3, tanggal: "2025-10-05", keterangan: "Gaji Mandor & Pengawas Mingguan", jenis: "Keluar", jumlah: 30000000 },
  { id: 4, tanggal: "2025-10-07", keterangan: "Pembayaran Proyek Pak Adi", jenis: "Masuk", jumlah: 150000000 },
];

const cashFlow = [
  { bulan: "Januari", masuk: 120, keluar: 80 },
  { bulan: "Februari", masuk: 100, keluar: 60 },
  { bulan: "Maret", masuk: 160, keluar: 90 },
  { bulan: "April", masuk: 140, keluar: 110 },
  { bulan: "Mei", masuk: 180, keluar: 130 },
  { bulan: "Juni", masuk: 200, keluar: 150 },
  { bulan: "Juli", masuk: 210, keluar: 160 },
  { bulan: "Agustus", masuk: 190, keluar: 140 },
  { bulan: "September", masuk: 220, keluar: 180 },
  { bulan: "Oktober", masuk: 250, keluar: 200 },
];

// =================== KOMPONEN ===================
const LaporanKeuangan = () => {
  const totalMasuk = dataTransaksi
    .filter((t) => t.jenis === "Masuk")
    .reduce((acc, t) => acc + t.jumlah, 0);

  const totalKeluar = dataTransaksi
    .filter((t) => t.jenis === "Keluar")
    .reduce((acc, t) => acc + t.jumlah, 0);

  const saldoAkhir = totalMasuk - totalKeluar;

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* ====== JUDUL ====== */}
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-teal-700 mb-8"
      >
        Laporan Keuangan
      </motion.h1>

      {/* ====== CARD RINGKASAN ====== */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
      >
        {/* Dana Masuk */}
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-1">Dana Masuk</h2>
            <p className="text-2xl font-bold text-green-600">
              Rp {totalMasuk.toLocaleString("id-ID")}
            </p>
          </div>
          <HiArrowUp className="text-green-600 text-4xl" />
        </div>

        {/* Dana Keluar */}
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-1">Dana Keluar</h2>
            <p className="text-2xl font-bold text-red-600">
              Rp {totalKeluar.toLocaleString("id-ID")}
            </p>
          </div>
          <HiArrowDown className="text-red-600 text-4xl" />
        </div>

        {/* Saldo Akhir */}
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-1">Saldo Akhir</h2>
            <p className="text-2xl font-bold text-teal-600">
              Rp {saldoAkhir.toLocaleString("id-ID")}
            </p>
          </div>
          <HiCurrencyDollar className="text-teal-600 text-4xl" />
        </div>
      </motion.div>

      {/* ====== GRAFIK CASH FLOW ====== */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-white p-8 rounded-2xl shadow-lg mb-10"
      >
        <h2 className="text-xl font-semibold text-gray-700 mb-6">Grafik Cash Flow Bulanan</h2>
        <div className="h-80">
          <ResponsiveContainer>
            <LineChart data={cashFlow}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="bulan" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="masuk" stroke="#16a34a" name="Dana Masuk" />
              <Line type="monotone" dataKey="keluar" stroke="#dc2626" name="Dana Keluar" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* ====== TABEL TRANSAKSI ====== */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="bg-white p-8 rounded-2xl shadow-lg overflow-x-auto"
      >
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Daftar Transaksi</h2>
        <table className="min-w-full text-left border-collapse">
          <thead>
            <tr className="bg-teal-600 text-white">
              <th className="px-4 py-3 rounded-tl-lg">No</th>
              <th className="px-4 py-3">Tanggal</th>
              <th className="px-4 py-3">Keterangan</th>
              <th className="px-4 py-3">Jenis</th>
              <th className="px-4 py-3 rounded-tr-lg">Jumlah</th>
            </tr>
          </thead>
          <tbody>
            {dataTransaksi.map((t, index) => (
              <tr key={t.id} className="hover:bg-gray-50 border-b transition duration-150">
                <td className="px-4 py-3">{index + 1}</td>
                <td className="px-4 py-3">{t.tanggal}</td>
                <td className="px-4 py-3">{t.keterangan}</td>
                <td
                  className={`px-4 py-3 font-semibold ${
                    t.jenis === "Masuk" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {t.jenis}
                </td>
                <td className="px-4 py-3 font-medium">
                  Rp {t.jumlah.toLocaleString("id-ID")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
};

export default LaporanKeuangan;
