// client/src/layouts/MandorLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import SidebarMandor from "../components/mandor/SidebarMandor";
import TopbarMandor from "../components/mandor/TopbarMandor"; // nanti kita buat TopbarMandor.jsx
import { motion } from "framer-motion";

const MandorLayout = () => {
  return (
    <div className="min-h-screen flex bg-gray-50 text-gray-800">
      {/* ====== SIDEBAR MANDOR ====== */}
      <SidebarMandor />

      {/* ====== BAGIAN KONTEN UTAMA ====== */}
      <div className="flex-1 flex flex-col">
        {/* ====== TOPBAR ====== */}
        <TopbarMandor />

        {/* ====== BAGIAN KONTEN (BERGANTI SESUAI ROUTE) ====== */}
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

export default MandorLayout;
