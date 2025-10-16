// client/src/components/admin/proyek/ModalInputKonsumen.jsx
import React, { useState, useEffect } from "react";
import { HiX } from "react-icons/hi";

const ModalInputKonsumen = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [form, setForm] = useState({
    nama_lengkap: "",
    email: "",
    nomor_telepon: "",
    alamat: "",
    alamat_pengiriman: "",
    jenis_konsumen: "Personal",
    nama_perusahaan: "",
    bidang_usaha: "",
    jabatan_kontak: "",
    npwp_perusahaan: "",
    foto: "",
  });

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    } else {
      setForm({
        nama_lengkap: "",
        email: "",
        nomor_telepon: "",
        alamat: "",
        alamat_pengiriman: "",
        jenis_konsumen: "Personal",
        nama_perusahaan: "",
        bidang_usaha: "",
        jabatan_kontak: "",
        npwp_perusahaan: "",
        foto: "",
      });
    }
  }, [initialData, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <HiX size={24} />
        </button>
        <h2 className="text-xl font-bold mb-4">Input Konsumen</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              name="nama_lengkap"
              placeholder="Nama Lengkap"
              className="input input-bordered w-full"
              value={form.nama_lengkap}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="input input-bordered w-full"
              value={form.email}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="nomor_telepon"
              placeholder="Nomor Telepon"
              className="input input-bordered w-full"
              value={form.nomor_telepon}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="alamat"
              placeholder="Alamat"
              className="input input-bordered w-full"
              value={form.alamat}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="alamat_pengiriman"
              placeholder="Alamat Pengiriman"
              className="input input-bordered w-full"
              value={form.alamat_pengiriman}
              onChange={handleChange}
            />
            <select
              name="jenis_konsumen"
              className="select select-bordered w-full"
              value={form.jenis_konsumen}
              onChange={handleChange}
            >
              <option value="Personal">Personal</option>
              <option value="Perusahaan">Perusahaan</option>
            </select>
            {form.jenis_konsumen === "Perusahaan" && (
              <>
                <input
                  type="text"
                  name="nama_perusahaan"
                  placeholder="Nama Perusahaan"
                  className="input input-bordered w-full"
                  value={form.nama_perusahaan}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="bidang_usaha"
                  placeholder="Bidang Usaha"
                  className="input input-bordered w-full"
                  value={form.bidang_usaha}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="jabatan_kontak"
                  placeholder="Jabatan Kontak"
                  className="input input-bordered w-full"
                  value={form.jabatan_kontak}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="npwp_perusahaan"
                  placeholder="NPWP Perusahaan"
                  className="input input-bordered w-full"
                  value={form.npwp_perusahaan}
                  onChange={handleChange}
                />
              </>
            )}
            <input
              type="text"
              name="foto"
              placeholder="URL Foto"
              className="input input-bordered w-full"
              value={form.foto}
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-ghost"
            >
              Batal
            </button>
            <button type="submit" className="btn btn-primary text-white">
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalInputKonsumen;
