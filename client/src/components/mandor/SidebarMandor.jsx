// client/src/components/mandor/SidebarMandor.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import { HiHome, HiClipboardList, HiDocumentText, HiUser } from "react-icons/hi";

const SidebarMandor = () => {
  const menuItems = [
    { name: "Dashboard", path: "/mandor/dashboard", icon: <HiHome /> },
    { name: "Daftar Proyek", path: "/mandor/daftar-proyek", icon: <HiClipboardList /> },
    { name: "Proyek Saya", path: "/mandor/proyek-saya", icon: <HiDocumentText /> },
    { name: "Profil", path: "/mandor/profil", icon: <HiUser /> },
  ];

  return (
    <aside className="w-64 min-h-screen bg-base-100 shadow-xl flex flex-col rounded-r-2xl border-r border-gray-200">
      {/* ===== LOGO / TITLE ===== */}
      <div className="p-6 text-3xl font-bold text-teal-600 border-b border-gray-200">
        <span className="text-teal-700">Mandor</span> Panel
      </div>

      {/* ===== NAVIGATION ===== */}
      <nav className="flex-1 mt-4">
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-4 px-6 py-3 m-2 rounded-xl transition-all duration-200
              ${
                isActive
                  ? "bg-teal-100 text-teal-800 font-semibold shadow"
                  : "text-gray-700 hover:bg-teal-50 hover:text-teal-700"
              }`
            }
          >
            <span className="text-xl">{item.icon}</span>
            <span className="text-md">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* ===== OPTIONAL FOOTER ===== */}
      <div className="p-6 border-t border-gray-200 text-sm text-gray-500">
        © 2025 RumahKuKontruksi
      </div>
    </aside>
  );
};

export default SidebarMandor;
