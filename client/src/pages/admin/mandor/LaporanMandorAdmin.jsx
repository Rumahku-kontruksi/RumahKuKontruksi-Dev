import React, { useState } from "react";
import { HiEye, HiTrash } from "react-icons/hi";

const LaporanMandorAdmin = () => {
  const [laporanList, setLaporanList] = useState([
    {
      id: 1,
      proyek: "Renovasi Rumah Pak Budi",
      mandor: "Pak Andi",
      tanggal: "2025-10-14",
      progres: "Pemasangan keramik lantai 80%",
      status: "Terverifikasi",
    },
    {
      id: 2,
      proyek: "Bangun Ruko Ibu Siti",
      mandor: "Pak Rudi",
      tanggal: "2025-10-12",
      progres: "Pengecoran lantai dasar selesai",
      status: "Menunggu Verifikasi",
    },
  ]);

  const handleHapus = (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus laporan ini?")) {
      setLaporanList(laporanList.filter((lap) => lap.id !== id));
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Laporan Mandor
        </h2>
      </div>

      {/* TABEL LAPORAN */}
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr className="bg-teal-600 text-white">
              <th>No</th>
              <th>Nama Proyek</th>
              <th>Nama Mandor</th>
              <th>Tanggal Laporan</th>
              <th>Progres Pekerjaan</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {laporanList.length > 0 ? (
              laporanList.map((lap, index) => (
                <tr key={lap.id}>
                  <td>{index + 1}</td>
                  <td>{lap.proyek}</td>
                  <td>{lap.mandor}</td>
                  <td>{lap.tanggal}</td>
                  <td>{lap.progres}</td>
                  <td>
                    <span
                      className={`px-2 py-1 rounded-full text-white font-semibold ${
                        lap.status === "Terverifikasi"
                          ? "bg-green-500"
                          : "bg-yellow-500"
                      }`}
                    >
                      {lap.status}
                    </span>
                  </td>
                  <td className="flex gap-2 flex-wrap">
                    <button className="btn btn-sm btn-info flex items-center gap-1">
                      <HiEye /> Detail
                    </button>
                    <button
                      onClick={() => handleHapus(lap.id)}
                      className="btn btn-sm btn-error flex items-center gap-1"
                    >
                      <HiTrash /> Hapus
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-500">
                  Belum ada laporan mandor yang masuk.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LaporanMandorAdmin;
