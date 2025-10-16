import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiArrowLeft } from "react-icons/hi";

const TambahkanDataProyek = () => {
  const navigate = useNavigate();

  const [proyekBaru, setProyekBaru] = useState({
    nama: "",
    lokasi: "",
    nilaiProyek: "",
    tanggalMulai: "",
    targetSelesai: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProyekBaru({ ...proyekBaru, [name]: value });
  };

  const handleSave = () => {
    alert("Proyek baru berhasil ditambahkan (placeholder)!");
    navigate("/admin/proyek");
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-6 text-teal-700 hover:text-teal-900 font-medium"
      >
        <HiArrowLeft /> Kembali
      </button>

      <h1 className="text-2xl font-semibold text-gray-700 mb-4">Tambah Proyek Baru</h1>

      <div className="bg-white rounded-xl shadow p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Nama Proyek */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">Nama Proyek</label>
            <input
              type="text"
              name="nama"
              value={proyekBaru.nama}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Masukkan nama proyek"
            />
          </div>

          {/* Lokasi */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">Lokasi</label>
            <input
              type="text"
              name="lokasi"
              value={proyekBaru.lokasi}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Masukkan lokasi proyek"
            />
          </div>

          {/* Nilai Proyek */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">Nilai Proyek (Rp)</label>
            <input
              type="number"
              name="nilaiProyek"
              value={proyekBaru.nilaiProyek}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Masukkan nilai proyek"
            />
          </div>

          {/* Tanggal Mulai */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">Tanggal Mulai</label>
            <input
              type="date"
              name="tanggalMulai"
              value={proyekBaru.tanggalMulai}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          {/* Target Selesai */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">Target Selesai</label>
            <input
              type="date"
              name="targetSelesai"
              value={proyekBaru.targetSelesai}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
        </div>

        {/* Tombol Simpan */}
        <button
          onClick={handleSave}
          className="mt-4 px-6 py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
        >
          Simpan Proyek
        </button>
      </div>
    </div>
  );
};

export default TambahkanDataProyek;
