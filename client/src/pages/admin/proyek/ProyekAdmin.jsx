// client/src/pages/admin/ProyekAdmin.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HiEye, HiPencilAlt, HiTrash, HiUpload } from "react-icons/hi";

const ProyekAdmin = () => {
  // Contoh data dummy proyek
  const [proyekList, setProyekList] = useState([
    {
      id: 1,
      nama: "Renovasi Rumah Pak Budi",
      alamat: "Jl. Merdeka No.12",
      konsumen: "Pak Budi",
      nilai: 25000000,
      status: "Pending",
      tanggalMulai: "2025-10-01",
      tanggalSelesai: "2025-12-01",
    },
    {
      id: 2,
      nama: "Bangun Ruko Ibu Siti",
      alamat: "Jl. Sudirman No.5",
      konsumen: "Ibu Siti",
      nilai: 50000000,
      status: "Baru",
      tanggalMulai: "2025-09-15",
      tanggalSelesai: "2025-11-30",
    },
  ]);

  const handleHapus = (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus proyek ini?")) {
      setProyekList(proyekList.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Data Proyek</h2>
        <Link to="/admin/proyek/tambah" className="btn btn-primary flex items-center gap-2">
          Tambah Proyek
        </Link>
      </div>

      {/* Tabel proyek */}
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Nama Proyek</th>
              <th>Alamat Proyek</th>
              <th>Konsumen</th>
              <th>Nilai Proyek</th>
              <th>Status</th>
              <th>Tanggal Mulai / Estimasi Selesai</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {proyekList.map((proyek) => (
              <tr key={proyek.id}>
                <td>{proyek.nama}</td>
                <td>{proyek.alamat}</td>
                <td>{proyek.konsumen}</td>
                <td>Rp {proyek.nilai.toLocaleString()}</td>
                <td>
                  <span
                    className={`px-2 py-1 rounded-full text-white font-semibold ${
                      proyek.status === "Baru"
                        ? "bg-blue-500"
                        : proyek.status === "Pending"
                        ? "bg-yellow-500"
                        : proyek.status === "Berjalan"
                        ? "bg-teal-500"
                        : "bg-green-500"
                    }`}
                  >
                    {proyek.status}
                  </span>
                </td>
                <td>
                  {proyek.tanggalMulai} / {proyek.tanggalSelesai}
                </td>
                <td className="flex gap-2">
                  <button className="btn btn-sm btn-info flex items-center gap-1">
                    <HiEye /> View
                  </button>
                  <button className="btn btn-sm btn-warning flex items-center gap-1">
                    <HiPencilAlt /> Edit
                  </button>
                  <button
                    onClick={() => handleHapus(proyek.id)}
                    className="btn btn-sm btn-error flex items-center gap-1"
                  >
                    <HiTrash /> Hapus
                  </button>
                  <button className="btn btn-sm btn-primary flex items-center gap-1">
                    <HiUpload /> Upload
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

export default ProyekAdmin;
