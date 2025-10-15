// client/src/components/admin/TopbarAdmin.jsx
import React from "react";
import { useLocation } from "react-router-dom";
import { FiBell, FiUser, FiLogOut, FiSettings } from "react-icons/fi";

const TopbarAdmin = () => {
  const location = useLocation();

  // Mengambil nama halaman dari path, misal: /admin/proyek/data → PROYEK DATA
  const getPageTitle = () => {
    const segments = location.pathname.split("/").filter(Boolean);
    if (segments.length <= 1) return "DASHBOARD";
    return segments.slice(1).map(s => s.replace("-", " ").toUpperCase()).join(" ");
  };

  return (
    <header className="flex justify-between items-center bg-white shadow px-6 py-3">
      {/* ===== Judul Halaman ===== */}
      <div>
        <h1 className="text-xl font-bold text-gray-800">{getPageTitle()}</h1>
      </div>

      {/* ===== Notifikasi & User Info ===== */}
      <div className="flex items-center space-x-4">
        {/* Tombol Notifikasi */}
        <button className="relative p-2 rounded hover:bg-gray-200 transition">
          <FiBell size={20} />
          {/* Badge notifikasi */}
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
        </button>

        {/* Dropdown Avatar/Admin */}
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="flex items-center space-x-2 cursor-pointer p-2 rounded hover:bg-gray-200 transition">
            <FiUser size={20} />
            <span className="hidden md:block font-medium">Admin</span>
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 shadow bg-white rounded-box w-48 mt-2 border border-gray-200"
          >
            <li>
              <a className="flex items-center gap-2 hover:bg-gray-100">
                <FiSettings size={16} /> Settings
              </a>
            </li>
            <li>
              <a className="flex items-center gap-2 hover:bg-gray-100">
                <FiLogOut size={16} /> Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default TopbarAdmin;
