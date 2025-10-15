// client/src/pages/mandor/ProfilMandor.jsx
import React, { useState } from "react";
import { HiPencilAlt } from "react-icons/hi";

const ProfilMandor = () => {
  // State dummy profil
  const [profil, setProfil] = useState({
    nama: "Budi Santoso",
    email: "budi.mandor@example.com",
    hp: "0812-3456-7890",
    alamat: "Jl. Merdeka No. 12, Jakarta",
  });

  // Dummy ringkasan proyek
  const proyekAktif = 3;
  const laporanMingguan = 5;

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-800">Profil Mandor</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* ===== PROFIL ===== */}
        <div className="card shadow-md rounded-xl bg-white p-6 flex flex-col items-center gap-4">
          <img
            src="https://img.daisyui.com/images/profile/demo/batperson@192.webp"
            alt="Profil Mandor"
            className="w-24 h-24 rounded-full object-cover border-2 border-teal-600"
          />
          <h3 className="text-xl font-bold text-gray-800">{profil.nama}</h3>

          <div className="space-y-2 text-gray-700 w-full">
            <p><span className="font-semibold">Email:</span> {profil.email}</p>
            <p><span className="font-semibold">No. HP:</span> {profil.hp}</p>
            <p><span className="font-semibold">Alamat:</span> {profil.alamat}</p>
          </div>

          <button className="btn btn-sm btn-teal flex items-center gap-2 mt-4">
            <HiPencilAlt /> Edit Profil
          </button>
        </div>

        {/* ===== RINGKASAN PROYEK ===== */}
        <div className="card shadow-md rounded-xl bg-teal-50 p-6 flex flex-col items-center justify-center gap-4">
          <h3 className="text-lg font-bold text-teal-700">Proyek Aktif</h3>
          <span className="text-3xl font-bold text-teal-800">{proyekAktif}</span>
        </div>

        <div className="card shadow-md rounded-xl bg-green-50 p-6 flex flex-col items-center justify-center gap-4">
          <h3 className="text-lg font-bold text-green-700">Laporan Mingguan</h3>
          <span className="text-3xl font-bold text-green-800">{laporanMingguan}</span>
        </div>
      </div>
    </div>
  );
};

export default ProfilMandor;
