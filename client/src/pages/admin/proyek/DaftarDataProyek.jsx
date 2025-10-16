// client/src/pages/admin/proyek/DaftarDataProyek.jsx
import React, { useState } from "react";
import { HiPlus, HiEye, HiPencil, HiUpload } from "react-icons/hi";
import dataProyek from "../../../data/mockProyek.json";
import ModalDetailProyek from "../../../components/admin/proyek/ModalDetailProyek";
import ModalInputProyek from "../../../components/admin/proyek/ModalInputProyek";

const DaftarDataProyek = () => {
  const [proyek, setProyek] = useState(dataProyek);
  const [search, setSearch] = useState("");
  const [modalProyek, setModalProyek] = useState(null);
  const [modalInput, setModalInput] = useState(false);

  // Filter proyek
  const filteredProyek = proyek.filter((p) =>
    (p.nama_proyek?.toLowerCase() || "").includes(search.toLowerCase())
  );

  // Upload siap
  const isUploadReady = (p) =>
    p.id_mandor.length > 0 &&
    p.id_pengawas.length > 0 &&
    p.list_rab.length > 0;

  // Warna Mandor
  const getMandorColor = (value) => {
    if (!value || value.length === 0) return "text-red-600";
    return "text-green-600";
  };

  // Warna Pengawas
  const getPengawasColor = (value) => {
    if (!value || value.length === 0) return "text-yellow-600";
    return "text-green-600";
  };

  // Fungsi menyimpan proyek baru dari modal
  const handleSaveProyek = (newProyek) => {
    setProyek((prev) => [...prev, newProyek]);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-700">Daftar Data Proyek</h1>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Cari proyek..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <button
            onClick={() => setModalInput(true)}
            className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
          >
            <HiPlus /> Tambah Proyek
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="min-w-full text-left text-gray-700">
          <thead className="bg-teal-600 text-white">
            <tr>
              <th className="px-6 py-3">No</th>
              <th className="px-6 py-3">Nama Proyek</th>
              <th className="px-6 py-3">Nilai Proyek</th>
              <th className="px-6 py-3">Mandor</th>
              <th className="px-6 py-3">Pengawas</th>
              <th className="px-6 py-3">Progress</th>
              <th className="px-6 py-3 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredProyek.map((p, idx) => (
              <tr
                key={p.id_proyek}
                className={`border-b hover:bg-gray-50 ${idx % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
              >
                <td className="px-6 py-3">{idx + 1}</td>
                <td className="px-6 py-3 font-medium">{p.nama_proyek}</td>
                <td className="px-6 py-3">{p.nilai_proyek?.toLocaleString("id-ID")}</td>
                <td className={`px-6 py-3 font-semibold ${getMandorColor(p.id_mandor)}`}>
                  {p.id_mandor.join(", ") || "-"}
                </td>
                <td className={`px-6 py-3 font-semibold ${getPengawasColor(p.id_pengawas)}`}>
                  {p.id_pengawas.join(", ") || "-"}
                </td>
                <td className="px-6 py-3">
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div
                      className={`h-4 rounded-full ${
                        p.progress === 100
                          ? "bg-green-600"
                          : p.progress >= 50
                          ? "bg-yellow-400"
                          : "bg-red-500"
                      }`}
                      style={{ width: `${p.progress || 0}%` }}
                    ></div>
                  </div>
                  <span className="text-sm">{p.progress || 0}%</span>
                </td>
                <td className="px-6 py-3 flex justify-center gap-2">
                  <button
                    onClick={() => setModalProyek(p)}
                    className="p-2 bg-teal-100 text-teal-700 rounded hover:bg-teal-200"
                  >
                    <HiEye />
                  </button>
                  <button className="p-2 bg-teal-100 text-teal-700 rounded hover:bg-teal-200">
                    <HiPencil />
                  </button>
                  <button
                    disabled={!isUploadReady(p)}
                    className={`p-2 rounded ${isUploadReady(p) ? "bg-teal-600 text-white" : "bg-gray-200 text-gray-400"}`}
                  >
                    <HiUpload />
                  </button>
                </td>
              </tr>
            ))}
            {filteredProyek.length === 0 && (
              <tr>
                <td colSpan={7} className="px-6 py-3 text-center text-gray-500">
                  Tidak ada proyek ditemukan
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Detail Proyek */}
      {modalProyek && (
        <ModalDetailProyek proyek={modalProyek} onClose={() => setModalProyek(null)} />
      )}

      {/* Modal Input Proyek */}
      {modalInput && (
        <ModalInputProyek
          onClose={() => setModalInput(false)}
          onSave={handleSaveProyek}
        />
      )}
    </div>
  );
};

export default DaftarDataProyek;
