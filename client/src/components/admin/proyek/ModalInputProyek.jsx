// client/src/components/admin/proyek/ModalInputProyek.jsx
import React, { useState } from "react";
import { HiX } from "react-icons/hi";
import axios from "axios";

const ModalInputProyek = ({ onClose, onSave }) => {
  const [form, setForm] = useState({
    id_konsumen: "",
    id_mandor: "",
    id_pengawas: "",
    id_rab: "",
    nama_proyek: "",
    alamat: "",
    lokasi: "",
    tanggal_mulai: "",
    tanggal_selesai: "",
    status_proyek: "Perencanaan",
    anggaran: "",
    catatan: "",
    created_by: "",
    updated_by: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/proyek", form);
      onSave(res.data);
      onClose();
    } catch (err) {
      console.error(err);
      alert("Gagal menyimpan proyek");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start pt-20 z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-3xl p-6 relative overflow-y-auto max-h-[80vh]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <HiX size={24} />
        </button>

        <h2 className="text-xl font-semibold mb-4">Tambah Proyek Baru</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-600 mb-1">Nama Proyek</label>
            <input
              type="text"
              name="nama_proyek"
              value={form.nama_proyek}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Konsumen</label>
            <input
              type="text"
              name="id_konsumen"
              value={form.id_konsumen}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Mandor</label>
            <input
              type="text"
              name="id_mandor"
              value={form.id_mandor}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Pengawas</label>
            <input
              type="text"
              name="id_pengawas"
              value={form.id_pengawas}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">RAB</label>
            <input
              type="text"
              name="id_rab"
              value={form.id_rab}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Anggaran</label>
            <input
              type="number"
              name="anggaran"
              value={form.anggaran}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Alamat</label>
            <input
              type="text"
              name="alamat"
              value={form.alamat}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Lokasi</label>
            <input
              type="text"
              name="lokasi"
              value={form.lokasi}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Tanggal Mulai</label>
            <input
              type="date"
              name="tanggal_mulai"
              value={form.tanggal_mulai}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Tanggal Selesai</label>
            <input
              type="date"
              name="tanggal_selesai"
              value={form.tanggal_selesai}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Status Proyek</label>
            <select
              name="status_proyek"
              value={form.status_proyek}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-teal-500"
            >
              <option value="Perencanaan">Perencanaan</option>
              <option value="Proses">Proses</option>
              <option value="Selesai">Selesai</option>
            </select>
          </div>

          <div className="col-span-2">
            <label className="block text-gray-600 mb-1">Catatan</label>
            <textarea
              name="catatan"
              value={form.catatan}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Created By</label>
            <input
              type="text"
              name="created_by"
              value={form.created_by}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Updated By</label>
            <input
              type="text"
              name="updated_by"
              value={form.updated_by}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </form>

        <div className="mt-6 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
          >
            Batal
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded bg-teal-600 text-white hover:bg-teal-700"
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalInputProyek;
