// client/src/layouts/AdminLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import SidebarAdmin from "../components/admin/SidebarAdmin"; // nanti kita buat SidebarAdmin.jsx
import TopbarAdmin from "../components/admin/TopbarAdmin";   // nanti kita buat TopbarAdmin.jsx
import { motion } from "framer-motion";

const AdminLayout = () => {
  return (
    <div className="min-h-screen flex bg-gray-100 text-gray-800">
      {/* ====== SIDEBAR ADMIN ====== */}
      <SidebarAdmin />

      {/* ====== BAGIAN KONTEN UTAMA ====== */}
      <div className="flex-1 flex flex-col">
        {/* ====== TOPBAR ADMIN ====== */}
        <TopbarAdmin />

        {/* ====== BAGIAN KONTEN UTAMA YANG BERGANTI SESUAI ROUTE ====== */}
        <motion.main
          className="flex-1 container mx-auto px-6 py-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Outlet />
        </motion.main>
      </div>
    </div>
  );
};

export default AdminLayout;
