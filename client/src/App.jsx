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
// ----- Proyek ------
import DaftarProyek from "./pages/admin/proyek/DaftarDataProyek";
import DetailProyek from "./pages/admin/proyek/DetailDataProyek";
import TambahkanDataProyek from "./pages/admin/proyek/TambahkanDataProyek";

import DaftarRAB from "./pages/admin/proyek/DaftarRAB";

import DaftarTimelineProyekAdmin from "./pages/admin/proyek/DaftarTimelineProyekAdmin";
import LaporanProyekAdmin from "./pages/admin/proyek/LaporanProyekAdmin";
import DetailLaporanProyekAdmin from "./pages/admin/proyek/DetailLaporanProyekAdmin";
import DaftarDokumentasiProyek from "./pages/admin/proyek/DaftarDokumentasiProyek";
import DetailDokumentasiProyek from "./pages/admin/proyek/DetailDokumentasiProyek";
import DaftarRevisiProyek from "./pages/admin/proyek/DaftarRevisiProyek";
import DetailRevisiProyek from "./pages/admin/proyek/DetailRevisiProyek";
import DaftarCatatanProyek from "./pages/admin/proyek/DaftarCatatanLapangan";
import DetailCatatanProyek from "./pages/admin/proyek/DetailCatatanLapangan";
import DaftarProyekBerjalan from "./pages/admin/proyek/DaftarProyekBerjalan";
import DetailProyekBerjalan from "./pages/admin/proyek/DetailProyekBerjalan";
import DaftarProyekSelesai from "./pages/admin/proyek/DaftarHistoriProyek";
import DetailProyekSelesai from "./pages/admin/proyek/DetailHistoriProyek";


import TimelineProyekAdmin from "./pages/admin/proyek/TimelineProyekAdmin";

import PengawasRABAdmin from "./pages/admin/proyek/PengawasRABAdmin";
import PengajuanMandorAdmin from "./pages/admin/proyek/PengajuanMandorAdmin";

import InputRABAdmin from "./pages/admin/proyek/InputRABAdmin";


// ----- Pengawas ------
import DaftarPengawas from "./pages/admin/pengawas/DaftarPengawas";
import LaporanPengawasAdmin from "./pages/admin/pengawas/LaporanPengawasAdmin";
// ----- Mandor ------

import DaftarMandor from "./pages/admin/mandor/DaftarMandor";
import LaporanMandorAdmin from "./pages/admin/mandor/LaporanMandorAdmin"; 
// ----- Konsumen ------
import DaftarKonsumen from "./pages/admin/konsumen/DaftarKonsumen";
import DaftarKonsumenProyek from "./pages/admin/konsumen/DaftarKonsumenProyek";

import LaporanKonsumenAdmin from "./pages/admin/konsumen/TimelineProyekKonsumenAdmin";
// ----- Laporan ------
import LaporanAdmin from "./pages/admin/laporan/LaporanAdmin";
import LaporanDashboard from "./pages/admin/laporan/LaporanDashboard";
import LaporanKeuangan from "./pages/admin/laporan/LaporanKeuangan";
import LaporanKonsumen from "./pages/admin/laporan/LaporanKonsumen";
import LaporanMandor from "./pages/admin/laporan/LaporanMandor";
import LaporanPengawas from "./pages/admin/laporan/LaporanPengawas";
import LaporanProyek from "./pages/admin/laporan/LaporanProyek";


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
        {/* // ----- Proyek ------ */}
          <Route path="dashboard" element={<DashboardAdmin />} />
          
          
          <Route path="proyek" element={<DaftarProyek />} />
          <Route path="proyek/:id" element={<DetailProyek />} />
          <Route path="proyek/tambah" element={<TambahkanDataProyek />} />
          <Route path="proyek/DaftarRAB" element={<DaftarRAB />} />

          
          <Route path="proyek/daftartimeline" element={<DaftarTimelineProyekAdmin />} />
          <Route path="proyek/timelineproyek/:id" element={<TimelineProyekAdmin />} />
          <Route path="proyek/laporan-proyek" element={<LaporanProyekAdmin />} />
          <Route path="proyek/laporan-proyek/:id" element={<DetailLaporanProyekAdmin />} />
          <Route path="proyek/dokumentasi-proyek" element={<DaftarDokumentasiProyek />} /> 
          <Route path="proyek/dokumentasi-proyek/:id" element={<DetailDokumentasiProyek />} />
          <Route path="proyek/revisi" element={<DaftarRevisiProyek />} />
          <Route path="proyek/revisi/:id" element={<DetailRevisiProyek />} />
          <Route path="proyek/catatan-proyek" element={<DaftarCatatanProyek />} />
          <Route path="proyek/catatan-proyek/:id" element={<DetailCatatanProyek />} />
          <Route path="proyek/berjalan" element={<DaftarProyekBerjalan />} />
          <Route path="proyek/berjalan/:id" element={<DetailProyekBerjalan />} />          
          <Route path="proyek/histori" element={<DaftarProyekSelesai />} />
          <Route path="proyek/histori/:id" element={<DetailProyekSelesai />} />



          <Route path="proyek/pengawasrab" element={<PengawasRABAdmin />} />
          <Route path="proyek/mandor" element={<PengajuanMandorAdmin />} />
          
          <Route path="proyek/inputrab" element={<InputRABAdmin />} />
          {/* // ----- Pengawas ------ */}
          <Route path="pengawas" element={<DaftarPengawas />} />
          <Route path="pengawas/laporan" element={<LaporanPengawasAdmin />} />
          {/* // ----- Mandor ------ */}
          <Route path="mandor" element={<DaftarMandor />} />
          <Route path="mandor/laporan" element={<LaporanMandorAdmin />} />
          {/* // ----- konsumen ------ */}
          <Route path="konsumen" element={<DaftarKonsumen />} />
          
          <Route path="konsumen/proyek" element={<DaftarKonsumenProyek />} />
          
          <Route path="konsumen/timeline" element={<LaporanKonsumenAdmin />} />
          {/* // ----- Laporan ------ */}
          <Route path="laporan/" element={<LaporanAdmin />} />
          <Route path="laporan/mingguan" element={<LaporanDashboard />} />
          <Route path="laporan/keseluruhan" element={<LaporanKeuangan />} />
          <Route path="laporan/konsumen" element={<LaporanKonsumen />} />
          <Route path="laporan/mandor" element={<LaporanMandor />} />
          <Route path="laporan/pengawas" element={<LaporanPengawas />} />
          <Route path="laporan/proyek" element={<LaporanProyek />} />

          
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
