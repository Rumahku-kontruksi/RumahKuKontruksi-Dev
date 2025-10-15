// client/src/pages/mandor/DashboardMandor.jsx
import React from "react";
import { HiClipboardList, HiCheckCircle, HiDocumentText } from "react-icons/hi";

const DashboardMandor = () => {
  // Data dummy proyek aktif
  const proyekAktif = [
    { nama: "Renovasi Rumah Pak Budi", progress: 75, hariBerjalan: 10, totalHari: 14 },
    { nama: "Bangun Ruko Bu Sari", progress: 40, hariBerjalan: 7, totalHari: 20 },
    { nama: "Pondasi Villa Pak Andi", progress: 60, hariBerjalan: 12, totalHari: 20 },
  ];

  return (
    <div className="space-y-8">
      {/* ===== STATISTIK RINGKAS ===== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card bg-teal-100 shadow-md rounded-xl p-6">
          <div className="flex items-center gap-4">
            <HiClipboardList className="text-4xl text-teal-700" />
            <div>
              <h2 className="text-xl font-bold text-teal-800">Proyek Aktif</h2>
              <p className="text-gray-700 text-lg">{proyekAktif.length} Proyek</p>
            </div>
          </div>
        </div>
        <div className="card bg-green-100 shadow-md rounded-xl p-6">
          <div className="flex items-center gap-4">
            <HiCheckCircle className="text-4xl text-green-700" />
            <div>
              <h2 className="text-xl font-bold text-green-800">Proyek Selesai</h2>
              <p className="text-gray-700 text-lg">2 Proyek</p>
            </div>
          </div>
        </div>
        <div className="card bg-yellow-100 shadow-md rounded-xl p-6">
          <div className="flex items-center gap-4">
            <HiDocumentText className="text-4xl text-yellow-700" />
            <div>
              <h2 className="text-xl font-bold text-yellow-800">Laporan Mingguan</h2>
              <p className="text-gray-700 text-lg">3 Laporan</p>
            </div>
          </div>
        </div>
      </div>

      {/* ===== DAFTAR PROYEK AKTIF ===== */}
      <div className="card shadow-md rounded-xl bg-white p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Proyek Aktif</h2>
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>No</th>
                <th>Nama Proyek</th>
                <th>Progress</th>
                <th>Hari Berjalan</th>
                <th>Total Hari</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {proyekAktif.map((proyek, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{proyek.nama}</td>
                  <td>
                    <progress
                      className="progress progress-success w-full"
                      value={proyek.progress}
                      max="100"
                    ></progress>
                    <span className="text-sm ml-2">{proyek.progress}%</span>
                  </td>
                  <td>{proyek.hariBerjalan} Hari</td>
                  <td>{proyek.totalHari} Hari</td>
                  <td>
                    <button className="btn btn-sm btn-teal">Lihat Detail</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ===== QUICK ACCESS ===== */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="card bg-teal-50 shadow-lg rounded-xl p-6 flex flex-col items-center justify-center gap-3 hover:shadow-xl transition">
          <HiClipboardList className="text-5xl text-teal-700" />
          <h3 className="text-lg font-bold text-teal-800">Daftar Proyek</h3>
          <button className="btn btn-sm btn-teal">Masuk</button>
        </div>
        <div className="card bg-green-50 shadow-lg rounded-xl p-6 flex flex-col items-center justify-center gap-3 hover:shadow-xl transition">
          <HiDocumentText className="text-5xl text-green-700" />
          <h3 className="text-lg font-bold text-green-800">Laporan Mingguan</h3>
          <button className="btn btn-sm btn-green">Masuk</button>
        </div>
      </div>
    </div>
  );
};

export default DashboardMandor;
