import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { HiArrowLeft, HiUpload } from "react-icons/hi";

const DetailDataProyek = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Dummy data proyek awal
  const [proyek, setProyek] = useState({
    id,
    nama: "Renovasi Rumah Pak Budi",
    lokasi: "Jl. Merdeka No.12",
    tanggalMulai: "2025-07-01",
    targetSelesai: "2025-08-15",
    mandor: "Sedang tender",
    pengawas: "Belum penunjukan",
    rab: "Belum input",
    dokumen: { rab: "", gambarKerja: "" },
    status: "Draft",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProyek({ ...proyek, [name]: value });
  };

  const handleUpload = (e) => {
    const { name, files } = e.target;
    if (files.length > 0) {
      setProyek({
        ...proyek,
        dokumen: { ...proyek.dokumen, [name]: URL.createObjectURL(files[0]) },
      });
    }
  };

  const handleSave = () => {
    alert("Data proyek berhasil disimpan (placeholder)!");
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

      <h1 className="text-2xl font-semibold text-gray-700 mb-4">{proyek.nama}</h1>

      <div className="bg-white rounded-xl shadow p-6 space-y-4">
        {/* Lokasi dan tanggal */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium text-gray-700 mb-1">Lokasi</label>
            <input
              type="text"
              name="lokasi"
              value={proyek.lokasi}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700 mb-1">Tanggal Mulai</label>
            <input
              type="date"
              name="tanggalMulai"
              value={proyek.tanggalMulai}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700 mb-1">Target Selesai</label>
            <input
              type="date"
              name="targetSelesai"
              value={proyek.targetSelesai}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
        </div>

        {/* Mandor & Pengawas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium text-gray-700 mb-1">Mandor</label>
            <select
              name="mandor"
              value={proyek.mandor}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              <option>Belum tender</option>
              <option>Sedang tender</option>
              <option>Pak Anton</option>
              <option>Pak Rudi</option>
            </select>
          </div>
          <div>
            <label className="block font-medium text-gray-700 mb-1">Pengawas</label>
            <select
              name="pengawas"
              value={proyek.pengawas}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              <option>Belum penunjukan</option>
              <option>Sedang proses penunjukan</option>
              <option>Bu Dian</option>
              <option>Pak Joko</option>
            </select>
          </div>
        </div>

        {/* RAB */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">RAB</label>
          <select
            name="rab"
            value={proyek.rab}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 mb-2"
          >
            <option>Belum input RAB</option>
            <option>Sedang input RAB</option>
            <option>Selesai</option>
          </select>

          <label className="block font-medium text-gray-700 mb-1">Upload RAB</label>
          <input
            type="file"
            name="rab"
            onChange={handleUpload}
            className="w-full border border-gray-300 rounded px-3 py-2 mb-2"
          />
          {proyek.dokumen.rab && (
            <img src={proyek.dokumen.rab} alt="RAB" className="w-40 h-40 object-cover rounded shadow" />
          )}
        </div>

        {/* Gambar Kerja */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">Upload Gambar Kerja</label>
          <input
            type="file"
            name="gambarKerja"
            onChange={handleUpload}
            className="w-full border border-gray-300 rounded px-3 py-2 mb-2"
          />
          {proyek.dokumen.gambarKerja && (
            <img src={proyek.dokumen.gambarKerja} alt="Gambar Kerja" className="w-40 h-40 object-cover rounded shadow" />
          )}
        </div>

        {/* Status */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">Status Proyek</label>
          <select
            name="status"
            value={proyek.status}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          >
            <option>Draft</option>
            <option>Proses</option>
            <option>Selesai</option>
          </select>
        </div>

        {/* Save Button */}
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

export default DetailDataProyek;
