import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { HiArrowLeft, HiUpload, HiTrash } from "react-icons/hi";

const DetailRevisiProyek = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Dummy data revisi awal
  const [detailRevisi, setDetailRevisi] = useState({
    id,
    namaProyek: id === "1" ? "Renovasi Rumah Pak Budi" : "Pembangunan Rumah Ibu Sari",
    tanggal: id === "1" ? "2025-10-12" : "2025-10-08",
    status: id === "1" ? "Disetujui" : "Menunggu Persetujuan",
    catatan: id === "1"
      ? "Tambahan plafon dan pengecatan ulang, perubahan material cat, dan penyesuaian anggaran."
      : "Perubahan lokasi jendela dan pintu, penyesuaian ukuran kamar, dan revisi pondasi.",
    lampiran: [
      "https://placehold.co/400",
      "https://placehold.co/400",
    ],
  });

  const [newCatatan, setNewCatatan] = useState("");
  const [newLampiran, setNewLampiran] = useState([]);

  // Handle status update
  const handleStatusChange = (e) => {
    setDetailRevisi({ ...detailRevisi, status: e.target.value });
  };

  // Handle catatan tambahan
  const handleAddCatatan = () => {
    if (!newCatatan) return;
    setDetailRevisi({
      ...detailRevisi,
      catatan: detailRevisi.catatan + "\n" + newCatatan,
    });
    setNewCatatan("");
  };

  // Handle lampiran baru upload
  const handleLampiranChange = (e) => {
    const files = Array.from(e.target.files);
    const urls = files.map((file) => URL.createObjectURL(file));
    setNewLampiran([...newLampiran, ...urls]);
  };

  // Handle hapus lampiran
  const handleHapusLampiran = (index, isNew = false) => {
    if (isNew) {
      setNewLampiran(newLampiran.filter((_, idx) => idx !== index));
    } else {
      setDetailRevisi({
        ...detailRevisi,
        lampiran: detailRevisi.lampiran.filter((_, idx) => idx !== index),
      });
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Kembali */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-6 text-teal-700 hover:text-teal-900 font-medium"
      >
        <HiArrowLeft /> Kembali
      </button>

      {/* Header */}
      <h1 className="text-2xl font-semibold text-gray-700 mb-3">{detailRevisi.namaProyek}</h1>
      <p className="text-gray-600 mb-2">Tanggal: {detailRevisi.tanggal}</p>

      {/* Status */}
      <div className="mb-4">
        <label className="font-semibold mr-2">Status:</label>
        <select
          value={detailRevisi.status}
          onChange={handleStatusChange}
          className="border border-gray-300 rounded px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
        >
          <option value="Menunggu Persetujuan">Menunggu Persetujuan</option>
          <option value="Disetujui">Disetujui</option>
          <option value="Ditolak">Ditolak</option>
        </select>
      </div>

      {/* Catatan */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Catatan Revisi:</h2>
        <textarea
          value={detailRevisi.catatan}
          readOnly
          rows={5}
          className="w-full border border-gray-300 rounded p-3 shadow-sm mb-2 bg-white resize-none"
        />
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Tambah catatan..."
            value={newCatatan}
            onChange={(e) => setNewCatatan(e.target.value)}
            className="flex-1 border border-gray-300 rounded px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <button
            onClick={handleAddCatatan}
            className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 shadow"
          >
            Tambah
          </button>
        </div>
      </div>

      {/* Lampiran */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Lampiran Revisi:</h2>
        <div className="flex gap-2 mb-3 items-center">
          <input
            type="file"
            multiple
            onChange={handleLampiranChange}
            className="border border-gray-300 rounded px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <HiUpload className="text-teal-600 text-2xl" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {detailRevisi.lampiran.map((img, idx) => (
            <div key={idx} className="relative">
              <img
                src={img}
                alt={`Lampiran ${idx + 1}`}
                className="w-full h-64 object-cover rounded shadow"
              />
              <button
                onClick={() => handleHapusLampiran(idx)}
                className="absolute top-2 right-2 bg-red-100 text-red-700 rounded p-1 hover:bg-red-200"
              >
                <HiTrash />
              </button>
            </div>
          ))}
          {newLampiran.map((img, idx) => (
            <div key={idx} className="relative">
              <img
                src={img}
                alt={`Lampiran baru ${idx + 1}`}
                className="w-full h-64 object-cover rounded shadow"
              />
              <button
                onClick={() => handleHapusLampiran(idx, true)}
                className="absolute top-2 right-2 bg-red-100 text-red-700 rounded p-1 hover:bg-red-200"
              >
                <HiTrash />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DetailRevisiProyek;
