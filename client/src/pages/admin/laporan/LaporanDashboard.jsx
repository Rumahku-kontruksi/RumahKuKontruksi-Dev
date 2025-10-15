// client/src/pages/admin/laporan/LaporanDashboard.jsx
import React from "react";
import { motion } from "framer-motion";
import { HiUsers, HiClipboardCheck, HiCurrencyDollar, HiEye } from "react-icons/hi";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

// =================== DATA DUMMY (nanti bisa diganti API) ===================
const dataProyek = [
  { name: "Selesai", value: 8 },
  { name: "Berjalan", value: 5 },
  { name: "Tertunda", value: 2 },
];
const COLORS = ["#16a34a", "#0284c7", "#f59e0b"];

const LaporanDashboard = () => {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* ====== JUDUL HALAMAN ====== */}
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-teal-700 mb-8"
      >
        Dashboard Laporan Admin
      </motion.h1>

      {/* ====== CARD RINGKASAN ====== */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10"
      >
        {/* Total Proyek */}
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
          <HiClipboardCheck className="text-4xl text-teal-600 mb-3" />
          <h2 className="text-lg font-semibold text-gray-700">Total Proyek</h2>
          <p className="text-3xl font-bold text-gray-900">15</p>
        </div>

        {/* Konsumen */}
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
          <HiUsers className="text-4xl text-teal-600 mb-3" />
          <h2 className="text-lg font-semibold text-gray-700">Konsumen Aktif</h2>
          <p className="text-3xl font-bold text-gray-900">24</p>
        </div>

        {/* Total Dana */}
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
          <HiCurrencyDollar className="text-4xl text-teal-600 mb-3" />
          <h2 className="text-lg font-semibold text-gray-700">Total Dana</h2>
          <p className="text-3xl font-bold text-gray-900">Rp 1,250,000,000</p>
        </div>

        {/* Pengawas & Mandor */}
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
          <HiEye className="text-4xl text-teal-600 mb-3" />
          <h2 className="text-lg font-semibold text-gray-700">Mandor & Pengawas</h2>
          <p className="text-3xl font-bold text-gray-900">12</p>
        </div>
      </motion.div>

      {/* ====== GRAFIK PROYEK ====== */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="bg-white p-8 rounded-2xl shadow-lg"
      >
        <h2 className="text-xl font-semibold text-gray-700 mb-6">
          Distribusi Status Proyek
        </h2>
        <div className="h-72">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={dataProyek}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {dataProyek.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* ====== NOTIFIKASI LAPORAN ====== */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-10 bg-white p-8 rounded-2xl shadow-lg"
      >
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Laporan Terbaru</h2>
        <ul className="divide-y divide-gray-200">
          <li className="py-3 flex justify-between">
            <span>📄 Laporan Keuangan Proyek A diperbarui</span>
            <span className="text-sm text-gray-500">2 jam lalu</span>
          </li>
          <li className="py-3 flex justify-between">
            <span>🧱 Mandor B menambahkan laporan harian</span>
            <span className="text-sm text-gray-500">5 jam lalu</span>
          </li>
          <li className="py-3 flex justify-between">
            <span>👀 Pengawas C mengirim inspeksi proyek D</span>
            <span className="text-sm text-gray-500">1 hari lalu</span>
          </li>
        </ul>
      </motion.div>
    </div>
  );
};

export default LaporanDashboard;
