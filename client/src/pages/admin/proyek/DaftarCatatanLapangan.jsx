import React, { useState } from "react";
import { HiEye, HiTrash, HiPlus } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const DaftarCatatanLapangan = () => {
  const navigate = useNavigate();

  // Dummy data catatan lapangan
  const [catatan, setCatatan] = useState([
    {
      id: 1,
      namaProyek: "Renovasi Rumah Pak Budi",
      tanggal: "2025-10-12",
      catatan: "Progress pengecatan lantai selesai.",
    },
    {
      id: 2,
      namaProyek: "Pembangunan Rumah Ibu Sari",
      tanggal: "2025-10-08",
      catatan: "Pemasangan pondasi hampir selesai.",
    },
  ]);

  const handleHapus = (id) => {
    setCatatan(catatan.filter((item) => item.id !== id));
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-700">Catatan Lapangan</h1>
        <button className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg shadow">
          <HiPlus /> Tambah Catatan
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="min-w-full text-left text-gray-700">
          <thead className="bg-teal-600 text-white">
            <tr>
              <th className="px-6 py-3">No</th>
              <th className="px-6 py-3">Proyek</th>
              <th className="px-6 py-3">Tanggal</th>
              <th className="px-6 py-3">Catatan</th>
              <th className="px-6 py-3 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {catatan.map((item, index) => (
              <tr
                key={item.id}
                className={`border-b hover:bg-gray-50 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
              >
                <td className="px-6 py-3">{index + 1}</td>
                <td className="px-6 py-3 font-medium">{item.namaProyek}</td>
                <td className="px-6 py-3">{item.tanggal}</td>
                <td className="px-6 py-3">{item.catatan}</td>
                <td className="px-6 py-3 flex justify-center gap-3">
                  <button
                    onClick={() => navigate(`/admin/proyek/catatan-proyek/${item.id}`)}
                    className="p-2 bg-teal-100 text-teal-700 rounded hover:bg-teal-200"
                  >
                    <HiEye />
                  </button>
                  <button
                    onClick={() => handleHapus(item.id)}
                    className="p-2 bg-red-100 text-red-700 rounded hover:bg-red-200"
                  >
                    <HiTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DaftarCatatanLapangan;
