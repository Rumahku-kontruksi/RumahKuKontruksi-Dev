// client/src/components/Navbar.jsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TbLogin2 } from "react-icons/tb";
import axios from 'axios';
import Logo from "../assets/rumahku-kontruksi-high-resolution-logo-transparent.png";

const Navbar = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get('http://localhost:3000/login');
      const allUsers = response.data.data;

      const user = allUsers.find(u => u.email === email && u.password === password);

      if (!user) {
        setError('Email atau password salah');
        return;
      }

      if (email.endsWith('@pengawas.com') || email.endsWith('@mandor.com')) {
        navigate('/admin');
      } else if (email.endsWith('@konsumen.com')) {
        navigate('/konsumen');
      } else {
        setError('Email tidak dikenali');
      }
    } catch (err) {
      console.error(err);
      setError('Terjadi kesalahan saat login');
    }
  };

  return (
    <nav className="navbar fixed bg-white shadow-sm z-10 px-6 py-3 flex justify-between items-center">
      {/* Kiri - Dropdown Menu */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow"
          >
            <li><Link to="/">Beranda</Link></li>
            <li><Link to="/about">Tentang</Link></li>
            <li><Link to="/contact">Kontak</Link></li>
          </ul>
        </div>
      </div>

      {/* Tengah - Logo */}
      <div className="navbar-center">
        <Link to="/">
          <img className="w-40" src={Logo} alt="Logo RumahKuKonstruksi" />
        </Link>
      </div>

      {/* Kanan - Tombol Login */}
      <div className="navbar-end">
        <button
          className="btn btn-accent text-white flex items-center gap-1"
          onClick={() => document.getElementById("my_modal_3").showModal()}
        >
          <TbLogin2 /> Sign In
        </button>

        {/* Modal Login */}
        <dialog id="my_modal_3" className="modal">
          <div className="modal-box">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => document.getElementById("my_modal_3").close()}
            >
              ✕
            </button>

            <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold text-gray-900 md:text-2xl dark:text-white text-center">
                  Sign In Access
                </h1>

                {error && <p className="text-red-500 text-center">{error}</p>}

                <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
                  <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="name@company.com"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="text-white bg-teal-600 py-1.5 px-4 rounded w-full hover:bg-teal-700"
                  >
                    SIGN IN
                  </button>
                </form>
              </div>
            </div>
          </div>
        </dialog>
      </div>
    </nav>
  );
};

export default Navbar;
