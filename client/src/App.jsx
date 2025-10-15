// src/App.jsx

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// ===== LAYOUTS =====
import MainLayout from "./layouts/MainLayout";
import KonsumenLayout from "./layouts/KonsumenLayout";
import MandorLayout from "./layouts/MandorLayout";
import AdminLayout from "./layouts/AdminLayout"; // layout admin baru

// ===== HALAMAN UMUM =====
import Home from "./pages/Home";
import About from "./pages/Tentang";
import Contact from "./pages/Contact";

// ===== HALAMAN KONSUMEN =====
import TimelineProyek from "./pages/konsumen/TimelineProyek";
import Proyek from "./pages/konsumen/Proyek";
import Profil from "./pages/konsumen/Profil";

// ===== HALAMAN MANDOR =====
import DashboardMandor from "./pages/mandor/DashboardMandor";
import DaftarProyekMandor from "./pages/mandor/DaftarProyekMandor";
import ProyekSaya from "./pages/mandor/ProyekSaya";
import ProfilMandor from "./pages/mandor/ProfilMandor";
import ProgresProyekMandor from "./pages/mandor/ProgresProyekMandor";

// ===== HALAMAN ADMIN =====
import DashboardAdmin from "./pages/admin/DashboardAdmin";
import ProyekAdmin from "./pages/admin/proyek/ProyekAdmin";
import TambahProyekAdmin from "./pages/admin/proyek/TambahProyekAdmin";
import PengawasRABAdmin from "./pages/admin/proyek/PengawasRABAdmin";
import PengajuanMandorAdmin from "./pages/admin/proyek/PengajuanMandorAdmin";
import ProyekBerjalanAdmin from "./pages/admin/proyek/ProyekBerjalanAdmin";
import HistoriProyekAdmin from "./pages/admin/proyek/HistoriProyekAdmin";

// import KonsumenAdmin from "./pages/admin/KonsumenAdmin";
// import MandorAdmin from "./pages/admin/MandorAdmin";
// import PengawasAdmin from "./pages/admin/PengawasAdmin";
// import LaporanAdmin from "./pages/admin/LaporanAdmin";
// import PembayaranAdmin from "./pages/admin/PembayaranAdmin";
// import SettingsAdmin from "./pages/admin/SettingsAdmin";

function App() {
  return (
    <Router>
      <Routes>
        {/* ================== MAIN LAYOUT (UMUM) ================== */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Route>

        {/* ================== KONSUMEN LAYOUT ================== */}
        <Route path="/konsumen" element={<KonsumenLayout />}>
          <Route path="TimelineProyek" element={<TimelineProyek />} />
          <Route path="proyek" element={<Proyek />} />
          <Route path="profil" element={<Profil />} />
        </Route>

        {/* ================== MANDOR LAYOUT ================== */}
        <Route path="/mandor" element={<MandorLayout />}>
          <Route path="dashboard" element={<DashboardMandor />} />
          <Route path="daftar-proyek" element={<DaftarProyekMandor />} />
          <Route path="proyek-saya" element={<ProyekSaya />} />
          <Route path="profil" element={<ProfilMandor />} />
          <Route path="progres-proyek" element={<ProgresProyekMandor />} />
        </Route>

        {/* ================== ADMIN LAYOUT ================== */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<DashboardAdmin />} />
          <Route path="proyek" element={<ProyekAdmin />} />
          <Route path="proyek/tambah" element={<TambahProyekAdmin />} />
          <Route path="proyek/pengawasrab" element={<PengawasRABAdmin />} />
          <Route path="proyek/mandor" element={<PengajuanMandorAdmin />} />
          <Route path="proyek/berjalan" element={<ProyekBerjalanAdmin />} />
          <Route path="proyek/histori" element={<HistoriProyekAdmin />} />
          {/* <Route path="konsumen" element={<KonsumenAdmin />} />
          <Route path="mandor" element={<MandorAdmin />} />
          <Route path="pengawas" element={<PengawasAdmin />} />
          <Route path="laporan" element={<LaporanAdmin />} />
          <Route path="pembayaran" element={<PembayaranAdmin />} />
          <Route path="settings" element={<SettingsAdmin />} /> */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
