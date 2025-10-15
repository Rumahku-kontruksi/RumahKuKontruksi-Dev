// client/src/components/admin/SidebarAdmin.jsx
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  HiMenuAlt3,
  HiX,
  HiHome,
  HiFolder,
  HiUserGroup,
  HiUser,
  HiClipboardList,
  HiCash,
  HiPlay,
  HiDocumentText,
  HiUserCircle,
  HiClock,
} from "react-icons/hi";
import { FiSettings } from "react-icons/fi";
import { MdSupervisorAccount } from "react-icons/md";

const menuItems = [
  { name: "Dashboard", path: "/admin/dashboard", icon: <HiHome size={20} /> },
  {
    name: "Proyek",
    icon: <HiFolder size={20} />,
    subMenu: [
      { name: "Data Proyek", path: "/admin/proyek", icon: <HiClipboardList /> },
      { name: "Penunjukan Pengawas & Input RAB", path: "/admin/proyek/pengawasrab", icon: <HiUserCircle /> },
      { name: "Pengajuan Mandor", path: "/admin/proyek/mandor", icon: <HiUser /> },
      { name: "Proyek Berjalan", path: "/admin/proyek/berjalan", icon: <HiPlay /> },
      { name: "Histori Proyek", path: "/admin/proyek/histori", icon: <HiClock /> },
    ],
  },
  {
    name: "Konsumen",
    icon: <HiUserGroup size={20} />,
    subMenu: [
      { name: "Data Konsumen", path: "/admin/konsumen/data", icon: <HiUser size={16} /> },
      { name: "Timeline Proyek Konsumen", path: "/admin/konsumen/timeline", icon: <HiClipboardList size={16} /> },
    ],
  },
  {
    name: "Mandor",
    icon: <HiUser size={20} />,
    subMenu: [
      { name: "Data Mandor", path: "/admin/mandor/data", icon: <HiUser size={16} /> },
      { name: "Assign / Pantau Proyek", path: "/admin/mandor/assign", icon: <HiClipboardList size={16} /> },
    ],
  },
  {
    name: "Pengawas",
    icon: <MdSupervisorAccount size={20} />,
    subMenu: [
      { name: "Data Pengawas", path: "/admin/pengawas/data", icon: <HiUser size={16} /> },
      { name: "Pantau & Submit Laporan", path: "/admin/pengawas/laporan", icon: <HiClipboardList size={16} /> },
    ],
  },
  {
    name: "Laporan",
    icon: <HiClipboardList size={20} />,
    subMenu: [
      { name: "Mingguan Mandor", path: "/admin/laporan/mingguan", icon: <HiClipboardList size={16} /> },
      { name: "Keseluruhan", path: "/admin/laporan/keseluruhan", icon: <HiClipboardList size={16} /> },
    ],
  },
  {
    name: "Pembayaran",
    icon: <HiCash size={20} />,
    subMenu: [
      { name: "Status Pembayaran Mandor", path: "/admin/pembayaran/status", icon: <HiCash size={16} /> },
      { name: "Proses Pembayaran", path: "/admin/pembayaran/proses", icon: <HiCash size={16} /> },
    ],
  },
  { name: "Settings", path: "/admin/settings", icon: <FiSettings size={20} /> },
];

const SidebarAdmin = () => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  return (
    <aside className={`${isOpen ? "w-64" : "w-16"} bg-teal-700 text-white transition-all duration-300 flex flex-col`}>
      {/* LOGO + TOGGLE */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-teal-600">
        <span className={`font-bold text-lg ${isOpen ? "block" : "hidden"}`}>RKK Admin</span>
        <button onClick={() => setIsOpen(!isOpen)} className="p-1 rounded hover:bg-teal-600 transition">
          {isOpen ? <HiX size={20} /> : <HiMenuAlt3 size={20} />}
        </button>
      </div>

      {/* MENU */}
      <ul className="menu p-4 overflow-y-auto flex-1">
        {menuItems.map((item, idx) => (
          <li key={idx} className="mb-1">
            {item.subMenu ? (
              <details className="group [&_summary::-webkit-details-marker]:hidden">
                <summary
                  className={`flex items-center justify-between px-3 py-2 rounded cursor-pointer font-semibold hover:bg-teal-600 transition-all ${
                    item.subMenu.some(sub => sub.path === location.pathname) ? "bg-teal-800" : ""
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {item.icon}
                    {isOpen && item.name}
                  </span>
                  {isOpen }
                </summary>
                <ul className="pl-8 mt-1">
                  {item.subMenu.map((sub, subIdx) => (
                    <li key={subIdx}>
                      <Link
                        to={sub.path}
                        className={`flex items-center gap-2 px-2 py-1 rounded text-sm hover:bg-teal-600 transition-all ${
                          location.pathname === sub.path ? "bg-teal-900" : ""
                        }`}
                      >
                        {sub.icon}
                        {isOpen && sub.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </details>
            ) : (
              <Link
                to={item.path}
                className={`flex items-center gap-2 px-3 py-2 rounded font-semibold hover:bg-teal-600 transition-all ${
                  location.pathname === item.path ? "bg-teal-800" : ""
                }`}
              >
                {item.icon}
                {isOpen && item.name}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default SidebarAdmin;
