// client/src/components/mandor/TopbarMandor.jsx
import React from "react";
import { FiBell, FiLogOut } from "react-icons/fi";

const TopbarMandor = () => {
  return (
    <header className="w-full bg-white shadow-md px-6 py-3 flex items-center justify-between">
      {/* ===== FOTO PROFIL DI KIRI ===== */}
      <div className="flex items-center gap-3">
        <img
          src="https://img.daisyui.com/images/profile/demo/batperson@192.webp"
          alt="Profil Mandor"
          className="w-10 h-10 rounded-full object-cover border-2 border-teal-600"
        />
        <span className="hidden md:inline text-gray-700 font-medium">Halo, Mandor!</span>
      </div>

      {/* ===== NAMA MANDOR DI TENGAH ===== */}
      <div className="absolute left-1/2 transform -translate-x-1/2 text-lg font-bold text-teal-700">
        Dashboard Mandor
      </div>

      {/* ===== TOMBOL LOGOUT & NOTIF DI KANAN ===== */}
      <div className="flex items-center gap-4">
        {/* Notifikasi */}
        <button className="relative p-2 hover:bg-gray-100 rounded-lg transition">
          <FiBell size={22} />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Tombol Logout */}
        <button className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition">
          <FiLogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
};

export default TopbarMandor;
