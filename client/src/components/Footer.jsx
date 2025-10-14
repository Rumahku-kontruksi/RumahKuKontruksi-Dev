// client/src/components/Footer.jsx
// Komponen Footer RumahKu Kontruksi (RKK)
// Disesuaikan dengan warna dan tema Navbar RKK, serta menggunakan logo Cloudinary

import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-base-200 border-t border-gray-300 text-base-content py-10 px-6">
      {/* Container utama */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-center sm:text-left">
        
        {/* Bagian Kiri: Logo dan Deskripsi */}
        <div className="flex flex-col items-center sm:items-start space-y-3">
          {/* Logo Gambar */}
          <img
            src="https://res.cloudinary.com/dmv4vtgbw/image/upload/v1760437039/RKK-logo_ougu97.png"
            alt="RumahKu Kontruksi Logo"
            className="w-16 h-16 object-contain mx-auto sm:mx-0"
          />

          {/* Nama dan Versi */}
          <p className="font-semibold text-lg text-teal-600 ">
            RumahKu Kontruksi{" "}
            <span className="text-sm font-normal text-[#E67E22]">
              v1.0 Beta
            </span>
          </p>

          {/* Deskripsi singkat */}
          <p className="text-sm text-gray-500 max-w-[230px]">
            Platform kolaborasi untuk konsumen, mandor, dan pengawas proyek
            membangun rumah dengan efisien dan transparan.
          </p>
        </div>

        {/* Bagian Tengah: Navigasi Cepat */}
        <div>
          <h3 className="font-semibold mb-3 text-lg text-[#1B3A57]">Navigasi</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>
              <Link to="/" className="hover:text-[#E67E22] transition-colors">Beranda</Link>
            </li>
            <li>
              <Link to="/tentang" className="hover:text-[#E67E22] transition-colors">Tentang</Link>
            </li>
            <li>
              <Link to="/layanan" className="hover:text-[#E67E22] transition-colors">Layanan</Link>
            </li>
            <li>
              <Link to="/kontak" className="hover:text-[#E67E22] transition-colors">Kontak</Link>
            </li>
          </ul>
        </div>

        {/* Bagian Kanan: Info Tambahan */}
        <div>
          <h3 className="font-semibold mb-3 text-lg text-[#1B3A57]">Informasi</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>
              Email:{" "}
              <a
                href="mailto:Rumahkukontruksi@outlook.com"
                className="hover:text-[#E67E22] transition-colors"
              >
                rumahkukontruksi@outlook.com
              </a>
            </li>
            <li>
              Telepon: <span className="text-gray-800">+62 812-3456-7890</span>
            </li>
            <li>© 2025 Seeusyah. All rights reserved.</li>
          </ul>
        </div>
      </div>

      {/* Garis pemisah & Catatan */}
      <div className="mt-10 border-t border-gray-300 pt-5 text-center text-sm text-gray-500">
        Dibangun dengan ❤️ oleh tim{" "}
        <span className="text-teal-600 font-semibold">RumahKu Kontruksi</span>
      </div>
    </footer>
  );
};

export default Footer;
