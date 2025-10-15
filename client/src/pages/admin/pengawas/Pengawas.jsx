import React, { useState } from "react";
import { HiEye, HiPencil, HiTrash, HiPlus } from "react-icons/hi";

const Pengawas = () => {
  // ===== DATA DUMMY =====
  const [pengawasList, setPengawasList] = useState([
    {
      id: 1,
      nama: "Andi Prasetyo",
      email: "andi@rkk.com",
      noHp: "081234567890",
      proyek: "Renovasi Rumah Pak Budi",
      status: "Aktif",
    },
    {
      id: 2,
      nama: "Budi Santoso",
      email: "budi@rkk.com",
      noHp: "089876543210",
      proyek: "Bangun Ruko Ibu Siti",
      status: "Nonaktif",
    },
  ]);

  // ====== EVENT HANDLER ======
  const handleHapus = (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus data pengawas ini?")) {
      setPengawasList(pengawasList.filter((p) => p.id !== id));
    }
  };

  const handleTambah = () => {
    alert("Fitur tambah pengawas belum diimplementasikan.");
  };

  const handleEdit = (id) => {
    alert(`Edit pengawas ID: ${id}`);
  };

  const handleView = (id) => {
    alert(`Lihat detail pengawas ID: ${id}`);
  };

  // ====== RENDER UI ======
  return (
    <div className="p-6 bg-white rounded-xl shadow">
      {/* ===== HEADER ===== */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Daftar Pengawas</h2>
        <button
          className="btn btn-primary flex items-center gap-2"
          onClick={handleTambah}
        >
          <HiPlus /> Tambah Pengawas
        </button>
      </div>

      {/* ===== TABEL DATA PENGAWAS ===== */}
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>No</th>
              <th>Nama Pengawas</th>
              <th>Email</th>
              <th>No. HP</th>
              <th>Proyek</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {pengawasList.map((p, index) => (
              <tr key={p.id}>
                <td>{index + 1}</td>
                <td>{p.nama}</td>
                <td>{p.email}</td>
                <td>{p.noHp}</td>
                <td>{p.proyek}</td>
                <td>
                  <span
                    className={`px-2 py-1 rounded-full text-white font-semibold ${
                      p.status === "Aktif" ? "bg-teal-500" : "bg-gray-400"
                    }`}
                  >
                    {p.status}
                  </span>
                </td>
                <td className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleView(p.id)}
                    className="btn btn-sm btn-info flex items-center gap-1"
                  >
                    <HiEye /> View
                  </button>
                  <button
                    onClick={() => handleEdit(p.id)}
                    className="btn btn-sm btn-warning flex items-center gap-1"
                  >
                    <HiPencil /> Edit
                  </button>
                  <button
                    onClick={() => handleHapus(p.id)}
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

export default Pengawas;
