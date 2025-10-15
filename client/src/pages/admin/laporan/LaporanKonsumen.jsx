// client/src/pages/admin/LaporanKonsumenAdmin.jsx
import React, { useState } from "react";
import { HiSearch, HiEye } from "react-icons/hi";

const LaporanKonsumenAdmin = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // === Data Dummy Konsumen ===
  const dataKonsumen = [
    {
      id: 1,
      nama: "Budi Santoso",
      proyek: "Renovasi Rumah",
      lokasi: "Jl. Merdeka No.12, Bandung",
      progres: "80%",
      totalPembayaran: "Rp 120.000.000",
      status: "Berjalan",
    },
    {
      id: 2,
      nama: "Siti Aminah",
      proyek: "Pembangunan Ruko",
      lokasi: "Jl. Cendana No.45, Bekasi",
      progres: "100%",
      totalPembayaran: "Rp 420.000.000",
      status: "Selesai",
    },
    {
      id: 3,
      nama: "Andi Wijaya",
      proyek: "Pembangunan Villa",
      lokasi: "Jl. Puncak Indah No.7, Bogor",
      progres: "60%",
      totalPembayaran: "Rp 250.000.000",
      status: "Berjalan",
    },
  ];

  // === Filter Berdasarkan Pencarian ===
  const filteredData = dataKonsumen.filter((item) =>
    item.nama.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* === HEADER === */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-teal-700">
          📊 Laporan Konsumen
        </h1>
        <div className="relative w-64">
          <input
            type="text"
            placeholder="Cari konsumen..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <HiSearch className="absolute left-3 top-2.5 text-gray-400" />
        </div>
      </div>

      {/* === TABEL DATA === */}
      <div className="overflow-x-auto bg-white shadow-lg rounded-xl">
        <table className="w-full text-left border-collapse">
          <thead className="bg-teal-600 text-white">
            <tr>
              <th className="p-4">No</th>
              <th className="p-4">Nama Konsumen</th>
              <th className="p-4">Proyek</th>
              <th className="p-4">Lokasi</th>
              <th className="p-4 text-center">Progres</th>
              <th className="p-4 text-center">Total Pembayaran</th>
              <th className="p-4 text-center">Status</th>
              <th className="p-4 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <tr
                  key={item.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="p-4">{index + 1}</td>
                  <td className="p-4 font-semibold">{item.nama}</td>
                  <td className="p-4">{item.proyek}</td>
                  <td className="p-4">{item.lokasi}</td>
                  <td className="p-4 text-center">{item.progres}</td>
                  <td className="p-4 text-center">{item.totalPembayaran}</td>
                  <td
                    className={`p-4 text-center font-semibold ${
                      item.status === "Selesai"
                        ? "text-green-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {item.status}
                  </td>
                  <td className="p-4 text-center">
                    <button className="bg-teal-500 hover:bg-teal-600 text-white px-3 py-1.5 rounded-lg flex items-center gap-1 mx-auto">
                      <HiEye /> Detail
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="8"
                  className="p-6 text-center text-gray-500 italic"
                >
                  Tidak ada data konsumen ditemukan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LaporanKonsumenAdmin;
