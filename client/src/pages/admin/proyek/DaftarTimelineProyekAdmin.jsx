import React from "react";
import { useNavigate } from "react-router-dom";
import { HiCalendar, HiEye, HiClipboardList } from "react-icons/hi";

const DaftarTimelineProyekAdmin = () => {
  const navigate = useNavigate();

  const proyekList = [
    {
      id: 1,
      nama: "Renovasi Rumah Pak Budi",
      lokasi: "Jl. Merdeka No. 21, Bandung",
      tanggalMulai: "2025-09-01",
      tanggalSelesai: "2025-11-15",
      status: "Berjalan",
    },
    {
      id: 2,
      nama: "Pembangunan Ruko Bu Sari",
      lokasi: "Jl. Dipatiukur No. 45, Bandung",
      tanggalMulai: "2025-08-10",
      tanggalSelesai: "2025-12-01",
      status: "Selesai",
    },
    {
      id: 3,
      nama: "Kontruksi Rumah Minimalis",
      lokasi: "Jl. Setiabudi No. 10, Cimahi",
      tanggalMulai: "2025-10-01",
      tanggalSelesai: "2026-01-20",
      status: "Belum Dimulai",
    },
  ];

  const handleLihatTimeline = (id) => {
    navigate(`/admin/proyek/timelineproyek/${id}`);
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
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <HiClipboardList className="text-teal-600" />
          Daftar Timeline Proyek
        </h1>
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
            {proyekList.map((item, index) => (
              <tr
                key={item.id}
                className="border-b hover:bg-gray-50 transition-colors"
              >
                <td className="py-3 px-4">{index + 1}</td>
                <td className="py-3 px-4 font-semibold text-gray-800">
                  {item.nama}
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
                    onClick={() => handleLihatTimeline(item.id)}
                    className="flex items-center gap-2 mx-auto bg-teal-600 hover:bg-teal-700 text-white px-3 py-1 rounded-md text-sm"
                  >
                    <HiEye /> Lihat Timeline
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

export default DaftarTimelineProyekAdmin;
