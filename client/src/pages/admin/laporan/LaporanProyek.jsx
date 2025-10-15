// client/src/pages/admin/laporan/LaporanProyek.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { HiSearch, HiClipboardCheck, HiClock, HiUserGroup } from "react-icons/hi";

const LaporanProyek = () => {
  // =================== DATA DUMMY ===================
  const [dataProyek, setDataProyek] = useState([
    {
      id: 1,
      nama: "Renovasi Rumah Pak Budi",
      lokasi: "Jl. Merpati No. 5",
      konsumen: "Budi Santoso",
      mandor: "Andi Setiawan",
      pengawas: "Dewi Lestari",
      status: "Berjalan",
      progress: 65,
      tanggalMulai: "2025-09-10",
      tanggalSelesai: "2025-11-15",
    },
    {
      id: 2,
      nama: "Pembangunan Ruko Bu Sinta",
      lokasi: "Jl. Cendrawasih No. 18",
      konsumen: "Sinta Dewi",
      mandor: "Rudi Hartono",
      pengawas: "Bambang Prasetyo",
      status: "Selesai",
      progress: 100,
      tanggalMulai: "2025-06-01",
      tanggalSelesai: "2025-08-20",
    },
    {
      id: 3,
      nama: "Renovasi Dapur Pak Adi",
      lokasi: "Jl. Melati No. 12",
      konsumen: "Adi Nugraha",
      mandor: "Tono Widodo",
      pengawas: "Dewi Lestari",
      status: "Tertunda",
      progress: 35,
      tanggalMulai: "2025-08-01",
      tanggalSelesai: "2025-10-10",
    },
  ]);

  // =================== FILTER ===================
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("Semua");

  const filteredProyek = dataProyek.filter((p) => {
    const cocokStatus = statusFilter === "Semua" || p.status === statusFilter;
    const cocokCari =
      p.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.konsumen.toLowerCase().includes(searchTerm.toLowerCase());
    return cocokStatus && cocokCari;
  });

  // =================== RENDER ===================
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* ====== JUDUL ====== */}
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-teal-700 mb-8"
      >
        Laporan Proyek
      </motion.h1>

      {/* ====== FILTER DAN PENCARIAN ====== */}
      <div className="bg-white p-6 rounded-2xl shadow-md mb-8 flex flex-col md:flex-row justify-between gap-4">
        <div className="flex items-center gap-2">
          <HiSearch className="text-gray-500 text-xl" />
          <input
            type="text"
            placeholder="Cari proyek atau konsumen..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div>
          <select
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="Semua">Semua Status</option>
            <option value="Berjalan">Berjalan</option>
            <option value="Selesai">Selesai</option>
            <option value="Tertunda">Tertunda</option>
          </select>
        </div>
      </div>

      {/* ====== TABEL DATA ====== */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-white p-6 rounded-2xl shadow-lg overflow-x-auto"
      >
        <table className="min-w-full text-left border-collapse">
          <thead>
            <tr className="bg-teal-600 text-white">
              <th className="px-4 py-3 rounded-tl-lg">No</th>
              <th className="px-4 py-3">Nama Proyek</th>
              <th className="px-4 py-3">Konsumen</th>
              <th className="px-4 py-3">Mandor</th>
              <th className="px-4 py-3">Pengawas</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Progress</th>
              <th className="px-4 py-3">Durasi</th>
              <th className="px-4 py-3 rounded-tr-lg">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredProyek.length === 0 ? (
              <tr>
                <td colSpan="9" className="text-center py-6 text-gray-500">
                  Tidak ada proyek ditemukan
                </td>
              </tr>
            ) : (
              filteredProyek.map((p, index) => (
                <tr
                  key={p.id}
                  className="hover:bg-gray-50 border-b transition duration-150"
                >
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3 font-semibold text-gray-800">
                    {p.nama}
                  </td>
                  <td className="px-4 py-3">{p.konsumen}</td>
                  <td className="px-4 py-3">{p.mandor}</td>
                  <td className="px-4 py-3">{p.pengawas}</td>
                  <td
                    className={`px-4 py-3 font-semibold ${
                      p.status === "Selesai"
                        ? "text-green-600"
                        : p.status === "Berjalan"
                        ? "text-blue-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {p.status}
                  </td>
                  <td className="px-4 py-3">
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full ${
                          p.progress === 100
                            ? "bg-green-500"
                            : p.progress >= 60
                            ? "bg-blue-500"
                            : "bg-yellow-400"
                        }`}
                        style={{ width: `${p.progress}%` }}
                      ></div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {p.tanggalMulai} → {p.tanggalSelesai}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg transition">
                      Detail
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
};

export default LaporanProyek;
