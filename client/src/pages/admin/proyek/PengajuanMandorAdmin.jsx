// client/src/pages/admin/PengajuanMandorAdmin.jsx
import React from "react";
import { Link } from "react-router-dom";
import { HiEye, HiUserAdd, HiCheck, HiTrash } from "react-icons/hi";

const PengajuanMandorAdmin = () => {
  // Dummy data proyek yang siap diajukan ke mandor
  const proyekData = [
    {
      id: 1,
      nama: "Renovasi Rumah Pak Budi",
      alamat: "Jl. Merdeka No. 12",
      konsumen: "Pak Budi",
      nilai: "Rp 120.000.000",
      status: "Pending",
      tanggalMulai: "2025-10-20",
      tanggalSelesai: "2025-12-01",
    },
    {
      id: 2,
      nama: "Bangun Gudang CV. Sukses",
      alamat: "Jl. Industri No. 5",
      konsumen: "CV. Sukses",
      nilai: "Rp 250.000.000",
      status: "Pending",
      tanggalMulai: "2025-11-01",
      tanggalSelesai: "2026-01-10",
    },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">Pengajuan Mandor</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>No</th>
              <th>Nama Proyek</th>
              <th>Alamat</th>
              <th>Konsumen</th>
              <th>Nilai Proyek</th>
              <th>Status</th>
              <th>Tanggal Mulai / Estimasi Selesai</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {proyekData.map((proyek, idx) => (
              <tr key={proyek.id}>
                <td>{idx + 1}</td>
                <td>{proyek.nama}</td>
                <td>{proyek.alamat}</td>
                <td>{proyek.konsumen}</td>
                <td>{proyek.nilai}</td>
                <td>{proyek.status}</td>
                <td>
                  {proyek.tanggalMulai} / {proyek.tanggalSelesai}
                </td>
                <td className="flex gap-2">
                  <button className="btn btn-sm btn-info flex items-center gap-1">
                    <HiEye /> View
                  </button>
                  <button className="btn btn-sm btn-success flex items-center gap-1">
                    <HiUserAdd /> Set Mandor
                  </button>
                  <button className="btn btn-sm btn-primary flex items-center gap-1">
                    <HiCheck /> Post
                  </button>
                  <button className="btn btn-sm btn-error flex items-center gap-1">
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

export default PengajuanMandorAdmin;
