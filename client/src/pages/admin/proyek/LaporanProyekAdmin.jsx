import React from "react";
import { HiDocumentText, HiEye } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const LaporanProyekAdmin = () => {
  const navigate = useNavigate();

  // Dummy data laporan proyek
  const laporanProyek = [
    {
      id: 1,
      namaProyek: "Renovasi Rumah Pak Budi",
      lokasi: "Jl. Merdeka No. 21, Bandung",
      tanggalMulai: "2025-09-01",
      tanggalSelesai: "2025-11-15",
      status: "Berjalan",
      catatan: "Proyek berjalan lancar, tidak ada kendala signifikan.",
    },
    {
      id: 2,
      namaProyek: "Pembangunan Ruko Bu Sari",
      lokasi: "Jl. Dipatiukur No. 45, Bandung",
      tanggalMulai: "2025-08-10",
      tanggalSelesai: "2025-12-01",
      status: "Selesai",
      catatan: "Semua tahap selesai tepat waktu.",
    },
    {
      id: 3,
      namaProyek: "Kontruksi Rumah Minimalis",
      lokasi: "Jl. Setiabudi No. 10, Cimahi",
      tanggalMulai: "2025-10-01",
      tanggalSelesai: "2026-01-20",
      status: "Belum Dimulai",
      catatan: "Persiapan material dan tim sedang dilakukan.",
    },
  ];

  const lihatDetail = (id) => {
    // Nanti bisa arahkan ke halaman detail laporan proyek
    navigate(`/admin/proyek/laporan-proyek/${id}`);
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "Selesai":
        return "bg-green-100 text-green-700";
      case "Berjalan":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <HiDocumentText className="text-teal-600 text-2xl" />
        <h1 className="text-2xl font-bold text-gray-800">Laporan Proyek</h1>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="w-full text-left border-collapse">
          <thead className="bg-teal-600 text-white">
            <tr>
              <th className="py-3 px-4">No</th>
              <th className="py-3 px-4">Nama Proyek</th>
              <th className="py-3 px-4">Lokasi</th>
              <th className="py-3 px-4">Mulai</th>
              <th className="py-3 px-4">Selesai</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {laporanProyek.map((item, index) => (
              <tr
                key={item.id}
                className="border-b hover:bg-gray-50 transition-colors"
              >
                <td className="py-3 px-4">{index + 1}</td>
                <td className="py-3 px-4 font-semibold text-gray-800">
                  {item.namaProyek}
                </td>
                <td className="py-3 px-4 text-gray-600">{item.lokasi}</td>
                <td className="py-3 px-4 text-gray-600">{item.tanggalMulai}</td>
                <td className="py-3 px-4 text-gray-600">{item.tanggalSelesai}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${getStatusStyle(
                      item.status
                    )}`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-center">
                  <button
                    onClick={() => lihatDetail(item.id)}
                    className="flex items-center gap-2 mx-auto bg-teal-600 hover:bg-teal-700 text-white px-3 py-1 rounded-md text-sm"
                  >
                    <HiEye /> Lihat
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

export default LaporanProyekAdmin;
