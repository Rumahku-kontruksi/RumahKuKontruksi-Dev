// src/App.jsx

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// ===== LAYOUTS =====
import MainLayout from "./layouts/MainLayout";
import KonsumenLayout from "./layouts/KonsumenLayout"; // layout baru

// ===== HALAMAN UMUM =====
import Home from "./pages/Home";
import About from "./pages/Tentang";
import Contact from "./pages/Contact";

// ===== HALAMAN KONSUMEN =====
//  import Timeline from "./pages/konsumen/Timeline";
//  import Proyek from "./pages/konsumen/Proyek";
//  import Profil from "./pages/konsumen/Profil";

import Timeline from "./pages/konsumen/Timeline";
import Proyek from "./pages/konsumen/Proyek";
import Profil from "./pages/konsumen/Profil";

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
          <Route path="timeline" element={<Timeline />} />
          <Route path="proyek" element={<Proyek />} />
          <Route path="profil" element={<Profil />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
