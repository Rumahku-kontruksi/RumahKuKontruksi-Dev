// client/src/pages/admin/LaporanMandor.jsx
import React, { useState } from "react";
import {
  HiDocumentText,
  HiEye,
  HiDownload,
  HiCalendar,
  HiPrinter,
} from "react-icons/hi";
import { motion } from "framer-motion";
import jsPDF from "jspdf";
import "jspdf-autotable";

const LaporanMandor = () => {
  // ==== DATA DUMMY UNTUK CONTOH ====
  const [laporan] = useState([
    {
      id: 1,
      tanggal: "2025-10-10",
      proyek: "Renovasi Rumah Pak Budi",
      deskripsi: "Pekerjaan lantai ruang tamu telah selesai 80%.",
      file: "laporan-mandor-budi.pdf",
    },
    {
      id: 2,
      tanggal: "2025-10-09",
      proyek: "Pembangunan Rumah Bu Sinta",
      deskripsi: "Pengecoran fondasi tahap awal selesai dengan baik.",
      file: "laporan-mandor-sinta.pdf",
    },
    {
      id: 3,
      tanggal: "2025-10-08",
      proyek: "Kantor Baru CV. Maju Jaya",
      deskripsi: "Pemasangan kerangka baja dimulai hari ini.",
      file: "laporan-mandor-majujaya.pdf",
    },
  ]);

  const [tanggalFilter, setTanggalFilter] = useState("");

  // ==== FILTER DATA BERDASARKAN TANGGAL ====
  const laporanTampil = tanggalFilter
    ? laporan.filter((lap) => lap.tanggal === tanggalFilter)
    : laporan;

  // ==== CETAK PDF ====
  const handleCetakPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text("Laporan Mandor RumahKuKonstruksi", 14, 15);
    doc.setFontSize(11);
    doc.text(
      `Tanggal: ${tanggalFilter || "Semua Tanggal"}`,
      14,
      25
    );

    const rows = laporanTampil.map((lap, index) => [
      index + 1,
      lap.tanggal,
      lap.proyek,
      lap.deskripsi,
    ]);

    doc.autoTable({
      head: [["No", "Tanggal", "Proyek", "Deskripsi"]],
      body: rows,
      startY: 30,
    });

    doc.save("laporan-mandor.pdf");
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
          <HiDocumentText className="text-4xl" /> Laporan Mandor
        </h1>
        <p className="text-gray-600 mt-2">
          Lihat, kelola, dan cetak laporan kegiatan mandor proyek.
        </p>
      </motion.div>

      {/* ===== FILTER DAN CETAK ===== */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6 bg-white p-4 rounded-2xl shadow-md">
        {/* Filter tanggal */}
        <div className="flex items-center gap-2">
          <HiCalendar className="text-teal-600 text-xl" />
          <input
            type="date"
            className="border border-teal-500 rounded-lg px-3 py-2 text-gray-700 focus:outline-none"
            value={tanggalFilter}
            onChange={(e) => setTanggalFilter(e.target.value)}
          />
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
              <th className="py-3 px-4 text-left">Tanggal</th>
              <th className="py-3 px-4 text-left">Proyek</th>
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
                <td className="py-3 px-4">{lap.tanggal}</td>
                <td className="py-3 px-4 font-semibold text-teal-700">
                  {lap.proyek}
                </td>
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

      {/* ===== FOOTER ===== */}
      <p className="text-center text-gray-500 mt-8 text-sm">
        © 2025 RumahKuKonstruksi — Sistem Laporan Mandor
      </p>
    </div>
  );
};

export default LaporanMandor;
