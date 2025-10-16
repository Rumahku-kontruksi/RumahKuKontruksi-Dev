import React, { useState } from "react";
import { HiEye, HiTrash, HiPlus } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const DaftarRevisiProyek = () => {
  const navigate = useNavigate();

  // Dummy data revisi proyek
  const [revisi, setRevisi] = useState([
    {
      id: 1,
      namaProyek: "Renovasi Rumah Pak Budi",
      tanggal: "2025-10-12",
      status: "Disetujui",
      catatan: "Tambahan plafon dan pengecatan ulang",
    },
    {
      id: 2,
      namaProyek: "Pembangunan Rumah Ibu Sari",
      tanggal: "2025-10-08",
      status: "Menunggu Persetujuan",
      catatan: "Perubahan lokasi jendela dan pintu",
    },
  ]);

  const handleHapus = (id) => {
    setRevisi(revisi.filter((item) => item.id !== id));
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-700">Daftar Revisi Proyek</h1>
        <button className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg shadow">
          <HiPlus /> Tambah Revisi
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
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {revisi.map((item, index) => (
              <tr
                key={item.id}
                className={`border-b hover:bg-gray-50 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
              >
                <td className="px-6 py-3">{index + 1}</td>
                <td className="px-6 py-3 font-medium">{item.namaProyek}</td>
                <td className="px-6 py-3">{item.tanggal}</td>
                <td className={`px-6 py-3 font-semibold ${
                  item.status === "Disetujui"
                    ? "text-green-600"
                    : item.status === "Menunggu Persetujuan"
                    ? "text-yellow-600"
                    : "text-red-600"
                }`}>{item.status}</td>
                <td className="px-6 py-3 flex justify-center gap-3">
                  <button
                    onClick={() => navigate(`/admin/proyek/revisi/${item.id}`)}
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

export default DaftarRevisiProyek;
