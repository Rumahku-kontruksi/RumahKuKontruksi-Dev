import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white px-6 py-3 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-bold">RumahKuKonstruksi</h1>
      <ul className="flex space-x-6">
        <li><Link to="/">Beranda</Link></li>
        <li><Link to="/about">Tentang</Link></li>
        <li><Link to="/contact">Kontak</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
