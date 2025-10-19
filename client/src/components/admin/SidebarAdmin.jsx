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
  HiCheckCircle,
  HiCollection,
  HiOutlineUserAdd,
  
} from "react-icons/hi";

import { MdSupervisorAccount } from "react-icons/md";

const menuItems = [
  { name: "Dashboard", path: "/admin", icon: <HiHome size={20} /> },

  // ===================== PROYEK =====================
  {
    name: "Proyek",
    icon: <HiFolder size={20} />,
    subMenu: [
      { name: "Data Proyek", path: "/admin/proyek", icon: <HiClipboardList /> },
      { name: "Rencana Anggaran (RAB)", path: "/admin/proyek/DaftarRAB", icon: <HiCash /> },
      { name: "Timeline Proyek", path: "/admin/proyek/daftartimeline", icon: <HiClock /> },
      { name: "Laporan Proyek", path: "/admin/proyek/laporan-proyek", icon: <HiDocumentText /> },
      { name: "Dokumentasi Proyek", path: "/admin/proyek/dokumentasi-proyek", icon: <HiCollection /> },
      { name: "Persetujuan / Revisi", path: "/admin/proyek/revisi", icon: <HiCheckCircle /> },
      { name: "Catatan Lapangan", path: "/admin/proyek/catatan-proyek", icon: <HiUserCircle /> },
      { name: "Proyek Berjalan", path: "/admin/proyek/berjalan", icon: <HiPlay /> },
      { name: "Histori Proyek", path: "/admin/proyek/histori", icon: <HiClock /> },
     
    ],
  },

  // ===================== KONSUMEN =====================
  {
    name: "Konsumen",
    icon: <HiUserGroup size={20} />,
    subMenu: [
      { name: "Data Konsumen", path: "/admin/konsumen", icon: <HiUser size={16} /> },
      { name: "Konsumen Belum Lengkap", path: "/admin/konsumen/belum-lengkap", icon: <HiOutlineUserAdd size={20} /> },
      { name: "Proyek Konsumen", path: "/admin/konsumen-proyek", icon: <HiFolder size={16} /> },
      { name: "RAB & Pembayaran", path: "/admin/konsumen/rab", icon: <HiCash size={16} /> },
      { name: "Dokumen Proyek", path: "/admin/konsumen/dokumen", icon: <HiFolder size={16} /> },
      { name: "Timeline Proyek", path: "/admin/konsumen/timeline", icon: <HiClock size={16} /> },
      { name: "Feedback & Keluhan", path: "/admin/konsumen/feedback", icon: <HiDocumentText size={16} /> },
      { name: "Laporan Konsumen", path: "/admin/konsumen/laporan", icon: <HiClipboardList size={16} /> },
    ],
  },

  // ===================== MANDOR =====================
  {
    name: "Mandor",
    icon: <HiUser size={20} />,
    subMenu: [
      { name: "Data Mandor", path: "/admin/mandor", icon: <HiUser size={16} /> },
      { name: "Assign / Pantau Proyek", path: "/admin/mandor/laporan", icon: <HiClipboardList size={16} /> },
      { name: "Laporan Mandor", path: "/admin/mandor/laporanproyek", icon: <HiDocumentText size={16} /> },
      { name: "Timeline Mandor", path: "/admin/mandor/timeline", icon: <HiClock size={16} /> },
      { name: "Dokumentasi Mandor", path: "/admin/mandor/dokumentasi", icon: <HiFolder size={16} /> },
      { name: "Pembayaran Mandor", path: "/admin/mandor/pembayaran", icon: <HiCash size={16} /> },
      { name: "Feedback / Revisi", path: "/admin/mandor/feedback", icon: <HiUserCircle size={16} /> },
    ],
  },

  // ===================== PENGAWAS =====================
  {
    name: "Pengawas",
    icon: <MdSupervisorAccount size={20} />,
    subMenu: [
      { name: "Data Pengawas", path: "/admin/pengawas", icon: <HiUser size={16} /> },
      { name: "Pantau & Submit Laporan", path: "/admin/pengawas/laporan", icon: <HiClipboardList size={16} /> },
      { name: "Timeline Proyek", path: "/admin/pengawas/timeline", icon: <HiClock size={16} /> },
      { name: "Dokumentasi Lapangan", path: "/admin/pengawas/dokumentasi", icon: <HiDocumentText size={16} /> },
    ],
  },

  // ===================== LAPORAN =====================
  {
    name: "Laporan",
    icon: <HiClipboardList size={20} />,
    subMenu: [
      { name: "Dashboard Laporan", path: "/admin/laporan", icon: <HiDocumentText size={16} /> },
      { name: "Laporan Mingguan", path: "/admin/laporan/mingguan", icon: <HiClipboardList size={16} /> },
      { name: "Laporan Keuangan", path: "/admin/laporan/keseluruhan", icon: <HiCash size={16} /> },
      { name: "Laporan Konsumen", path: "/admin/laporan/konsumen", icon: <HiUserGroup size={16} /> },
      { name: "Laporan Mandor", path: "/admin/laporan/mandor", icon: <HiUser size={16} /> },
      { name: "Laporan Pengawas", path: "/admin/laporan/pengawas", icon: <MdSupervisorAccount size={16} /> },
      { name: "Laporan Proyek", path: "/admin/laporan/proyek", icon: <HiFolder size={16} /> },
    ],
  },

  // ===================== PEMBAYARAN =====================
  {
  name: "Pembayaran",
  icon: <HiCash size={20} />,
  subMenu: [
    { name: "Data Pembayaran", path: "/admin/pembayaran", icon: <HiClipboardList size={16} /> },
    { name: "Verifikasi Pembayaran", path: "/admin/pembayaran/verifikasi", icon: <HiCheckCircle size={16} /> },
    { name: "Laporan Keuangan", path: "/admin/pembayaran/laporan", icon: <HiDocumentText size={16} /> },
  ],
},

];

const SidebarAdmin = () => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  return (
    <aside
      className={`${
        isOpen ? "w-64" : "w-16"
      } bg-teal-700 text-white transition-all duration-300 flex flex-col`}
    >
      {/* LOGO + TOGGLE */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-teal-600">
        <span className={`font-bold text-lg ${isOpen ? "block" : "hidden"}`}>
          RKK Admin
        </span>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-1 rounded hover:bg-teal-600 transition"
        >
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
                    item.subMenu.some((sub) => sub.path === location.pathname)
                      ? "bg-teal-800"
                      : ""
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {item.icon}
                    {isOpen && item.name}
                  </span>
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
