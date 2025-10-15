import React, { useState } from "react";
import { HiEye, HiCheckCircle, HiTrash } from "react-icons/hi";

const LaporanPengawasAdmin = () => {
  // ===== DATA DUMMY LAPORAN =====
  const [laporanList, setLaporanList] = useState([
    {
      id: 1,
      proyek: "Renovasi Rumah Pak Budi",
      pengawas: "Andi Prasetyo",
      tanggal: "2025-10-14",
      progress: "70%",
      catatan: "Pekerjaan lantai hampir selesai. Tinggal pemasangan pintu.",
      status: "Menunggu Validasi",
    },
    {
      id: 2,
      proyek: "Bangun Ruko Ibu Siti",
      pengawas: "Budi Santoso",
      tanggal: "2025-10-13",
      progress: "45%",
      catatan: "Struktur lantai dua selesai, mulai pekerjaan plester.",
      status: "Tervalidasi",
    },
  ]);

  // ===== HANDLER =====
  const handleValidasi = (id) => {
    setLaporanList(
      laporanList.map((lap) =>
        lap.id === id ? { ...lap, status: "Tervalidasi" } : lap
      )
    );
    alert("Laporan berhasil divalidasi ✅");
  };

  const handleHapus = (id) => {
    if (window.confirm("Yakin ingin menghapus laporan ini?")) {
      setLaporanList(laporanList.filter((lap) => lap.id !== id));
    }
  };

  const handleView = (laporan) => {
    alert(
      `📋 Detail Laporan:\n\nProyek: ${laporan.proyek}\nPengawas: ${laporan.pengawas}\nTanggal: ${laporan.tanggal}\nProgress: ${laporan.progress}\nCatatan: ${laporan.catatan}`
    );
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow">
      {/* ===== HEADER ===== */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Laporan Pengawas</h2>
      </div>

      {/* ===== TABEL LAPORAN ===== */}
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>No</th>
              <th>Nama Proyek</th>
              <th>Pengawas</th>
              <th>Tanggal Laporan</th>
              <th>Progress</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {laporanList.map((lap, index) => (
              <tr key={lap.id}>
                <td>{index + 1}</td>
                <td>{lap.proyek}</td>
                <td>{lap.pengawas}</td>
                <td>{lap.tanggal}</td>
                <td>{lap.progress}</td>
                <td>
                  <span
                    className={`px-2 py-1 rounded-full text-white font-semibold ${
                      lap.status === "Tervalidasi"
                        ? "bg-green-500"
                        : "bg-yellow-500"
                    }`}
                  >
                    {lap.status}
                  </span>
                </td>
                <td className="flex gap-2 flex-wrap">
                  <button
                    onClick={() => handleView(lap)}
                    className="btn btn-sm btn-info flex items-center gap-1"
                  >
                    <HiEye /> View
                  </button>
                  {lap.status !== "Tervalidasi" && (
                    <button
                      onClick={() => handleValidasi(lap.id)}
                      className="btn btn-sm btn-success flex items-center gap-1"
                    >
                      <HiCheckCircle /> Validasi
                    </button>
                  )}
                  <button
                    onClick={() => handleHapus(lap.id)}
                    className="btn btn-sm btn-error flex items-center gap-1"
                  >
                    <HiTrash /> Hapus
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

export default LaporanPengawasAdmin;
