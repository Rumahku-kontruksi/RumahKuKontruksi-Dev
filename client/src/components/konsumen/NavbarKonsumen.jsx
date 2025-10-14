import React from "react";
import { NavLink } from "react-router-dom";
import { FaUserCircle, FaProjectDiagram, FaComments, FaStream } from "react-icons/fa";

const NavbarKonsumen = () => {
  return (
    <nav className="bg-teal-700 text-white py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-6">
        <h1 className="text-xl font-bold tracking-wide">RKK Konsumen</h1>

        <div className="flex items-center gap-6">
          <NavLink
            to="/konsumen/timeline"
            className={({ isActive }) =>
              isActive ? "text-yellow-300 font-semibold" : "hover:text-yellow-200"
            }
          >
            <FaStream className="inline mr-1" /> Timeline
          </NavLink>

          <NavLink
            to="/konsumen/proyek"
            className={({ isActive }) =>
              isActive ? "text-yellow-300 font-semibold" : "hover:text-yellow-200"
            }
          >
            <FaProjectDiagram className="inline mr-1" /> Proyek
          </NavLink>

          <NavLink
            to="/konsumen/pesan"
            className={({ isActive }) =>
              isActive ? "text-yellow-300 font-semibold" : "hover:text-yellow-200"
            }
          >
            <FaComments className="inline mr-1" /> Pesan
          </NavLink>

          <NavLink
            to="/konsumen/profil"
            className={({ isActive }) =>
              isActive ? "text-yellow-300 font-semibold" : "hover:text-yellow-200"
            }
          >
            <FaUserCircle className="inline mr-1" /> Profil
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default NavbarKonsumen;
