// client/src/pages/admin/LaporanAdmin.jsx
import React, { useState } from "react";
import {
  HiDocumentReport,
  HiEye,
  HiDownload,
  HiFilter,
  HiPrinter,
} from "react-icons/hi";
import { motion } from "framer-motion";
import jsPDF from "jspdf";
import "jspdf-autotable";

const LaporanAdmin = () => {
  // ==== DATA DUMMY UNTUK CONTOH ====
  const [laporan] = useState([
    {
      id: 1,
      jenis: "Laporan Proyek",
      tanggal: "2025-10-10",
      deskripsi: "Proyek Renovasi Rumah Pak Budi - Tahap 2",
      file: "laporan-proyek-budi.pdf",
    },
    {
      id: 2,
      jenis: "Laporan Mandor",
      tanggal: "2025-10-09",
      deskripsi: "Laporan harian pekerjaan tukang dan progress pekerjaan dapur",
      file: "laporan-mandor-dapur.pdf",
    },
    {
      id: 3,
      jenis: "Laporan Pengawas",
      tanggal: "2025-10-08",
      deskripsi: "Hasil pengecekan kualitas material dan keamanan kerja",
      file: "laporan-pengawas.pdf",
    },
    {
      id: 4,
      jenis: "Laporan Proyek",
      tanggal: "2025-10-12",
      deskripsi: "Pembangunan Rumah Baru Bu Sinta - Tahap Fondasi",
      file: "laporan-proyek-sinta.pdf",
    },
  ]);

  const [filterJenis, setFilterJenis] = useState("Semua");

  // ===== FILTER DATA BERDASARKAN JENIS =====
  const laporanTampil =
    filterJenis === "Semua"
      ? laporan
      : laporan.filter((lap) => lap.jenis === filterJenis);

  // ===== CETAK PDF MENGGUNAKAN jsPDF =====
  const handleCetakPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text("Laporan Admin RumahKuKonstruksi", 14, 15);
    doc.setFontSize(11);
    doc.text(`Jenis Laporan: ${filterJenis}`, 14, 25);

    const rows = laporanTampil.map((lap, index) => [
      index + 1,
      lap.jenis,
      lap.tanggal,
      lap.deskripsi,
    ]);

    doc.autoTable({
      head: [["No", "Jenis", "Tanggal", "Deskripsi"]],
      body: rows,
      startY: 30,
    });

    doc.save("laporan-admin.pdf");
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* ===== HEADER ===== */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8 text-center"
      >
        <h1 className="text-3xl font-bold text-teal-700 flex justify-center items-center gap-2">
          <HiDocumentReport className="text-4xl" /> Laporan Admin
        </h1>
        <p className="text-gray-600 mt-2">
          Kelola semua laporan proyek, mandor, dan pengawas dalam satu halaman.
        </p>
      </motion.div>

      {/* ===== FILTER & CETAK ===== */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6 bg-white p-4 rounded-2xl shadow-md">
        {/* Filter dropdown */}
        <div className="flex items-center gap-2">
          <HiFilter className="text-teal-600 text-xl" />
          <select
            className="border border-teal-500 rounded-lg px-3 py-2 text-gray-700 focus:outline-none"
            value={filterJenis}
            onChange={(e) => setFilterJenis(e.target.value)}
          >
            <option>Semua</option>
            <option>Laporan Proyek</option>
            <option>Laporan Mandor</option>
            <option>Laporan Pengawas</option>
          </select>
        </div>

        {/* Tombol cetak */}
        <button
          onClick={handleCetakPDF}
          className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg shadow transition-all"
        >
          <HiPrinter className="text-lg" />
          Cetak PDF
        </button>
      </div>

      {/* ===== TABEL LAPORAN ===== */}
      <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
        <table className="min-w-full border-collapse">
          <thead className="bg-teal-600 text-white">
            <tr>
              <th className="py-3 px-4 text-left">No</th>
              <th className="py-3 px-4 text-left">Jenis Laporan</th>
              <th className="py-3 px-4 text-left">Tanggal</th>
              <th className="py-3 px-4 text-left">Deskripsi</th>
              <th className="py-3 px-4 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {laporanTampil.map((lap, index) => (
              <motion.tr
                key={lap.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="border-b hover:bg-gray-100"
              >
                <td className="py-3 px-4">{index + 1}</td>
                <td className="py-3 px-4 font-semibold text-teal-700">
                  {lap.jenis}
                </td>
                <td className="py-3 px-4">{lap.tanggal}</td>
                <td className="py-3 px-4">{lap.deskripsi}</td>
                <td className="py-3 px-4 text-center space-x-3">
                  <button
                    className="text-blue-600 hover:text-blue-800"
                    title="Lihat Laporan"
                  >
                    <HiEye size={22} />
                  </button>
                  <button
                    className="text-green-600 hover:text-green-800"
                    title="Download"
                  >
                    <HiDownload size={22} />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ===== FOOTER INFO ===== */}
      <p className="text-center text-gray-500 mt-8 text-sm">
        © 2025 RumahKuKonstruksi — Sistem Laporan Admin
      </p>
    </div>
  );
};

export default LaporanAdmin;
