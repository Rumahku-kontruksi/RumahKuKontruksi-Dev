import React, { useState } from "react";
import { HiEye, HiClipboardList } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const DaftarProyekBerjalan = () => {
  const navigate = useNavigate();

  // Dummy data proyek berjalan
  const [proyek, setProyek] = useState([
    {
      id: 1,
      nama: "Renovasi Rumah Pak Budi",
      lokasi: "Jl. Merdeka No.12",
      tanggalMulai: "2025-10-01",
      tanggalSelesai: "2025-11-15",
      mandor: "Pak Anton",
      pengawas: "Pak Joko",
      status: "Sedang Berjalan",
      progress: 45,
      thumbnail: "https://placehold.co/100",
    },
    {
      id: 2,
      nama: "Pembangunan Rumah Ibu Sari",
      lokasi: "Jl. Melati No.7",
      tanggalMulai: "2025-09-25",
      tanggalSelesai: "2025-12-05",
      mandor: "Pak Rudi",
      pengawas: "Bu Dian",
      status: "Sedang Berjalan",
      progress: 60,
      thumbnail: "https://placehold.co/100",
    },
  ]);

  const [search, setSearch] = useState("");

  // Filter proyek berdasarkan search
  const filteredProyek = proyek.filter((p) =>
    p.nama.toLowerCase().includes(search.toLowerCase()) ||
    p.lokasi.toLowerCase().includes(search.toLowerCase()) ||
    p.mandor.toLowerCase().includes(search.toLowerCase()) ||
    p.pengawas.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-700">Proyek Berjalan</h1>
        <input
          type="text"
          placeholder="Cari proyek..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="min-w-full text-left text-gray-700">
          <thead className="bg-teal-600 text-white">
            <tr>
              <th className="px-6 py-3">No</th>
              <th className="px-6 py-3">Thumbnail</th>
              <th className="px-6 py-3">Nama Proyek</th>
              <th className="px-6 py-3">Lokasi</th>
              <th className="px-6 py-3">Mandor</th>
              <th className="px-6 py-3">Pengawas</th>
              <th className="px-6 py-3">Progress</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredProyek.map((item, idx) => (
              <tr
                key={item.id}
                className={`border-b hover:bg-gray-50 ${idx % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
              >
                <td className="px-6 py-3">{idx + 1}</td>
                <td className="px-6 py-3">
                  <img
                    src={item.thumbnail}
                    alt="Thumbnail"
                    className="w-20 h-20 object-cover rounded shadow"
                  />
                </td>
                <td className="px-6 py-3 font-medium">{item.nama}</td>
                <td className="px-6 py-3">{item.lokasi}</td>
                <td className="px-6 py-3">{item.mandor}</td>
                <td className="px-6 py-3">{item.pengawas}</td>
                <td className="px-6 py-3">
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-teal-600 h-3 rounded-full"
                      style={{ width: `${item.progress}%` }}
                    ></div>
                  </div>
                  <span className="text-sm">{item.progress}%</span>
                </td>
                <td className="px-6 py-3">{item.status}</td>
                <td className="px-6 py-3 flex justify-center gap-2">
                  <button
                    onClick={() => navigate(`/admin/proyek/berjalan/${item.id}`)}
                    className="p-2 bg-teal-100 text-teal-700 rounded hover:bg-teal-200"
                  >
                    <HiEye />
                  </button>
                  <button
                    onClick={() => navigate(`/admin/proyek/berjalan/${item.id}/laporan`)}
                    className="p-2 bg-teal-100 text-teal-700 rounded hover:bg-teal-200"
                  >
                    <HiClipboardList />
                  </button>
                </td>
              </tr>
            ))}
            {filteredProyek.length === 0 && (
              <tr>
                <td colSpan={9} className="px-6 py-3 text-center text-gray-500">
                  Tidak ada proyek ditemukan
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DaftarProyekBerjalan;
