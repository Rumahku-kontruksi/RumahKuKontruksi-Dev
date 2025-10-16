// client/src/pages/admin/proyek/DaftarRAB.jsx
import React, { useState } from "react";
import { HiEye, HiPlus } from "react-icons/hi";
import dataProyek from "../../../data/mockProyek.json";
import ModalDetailRAB from "../../../components/admin/proyek/ModalDetailRAB";
import ModalInputRAB from "../../../components/admin/proyek/ModalInputRAB";

const DaftarRAB = () => {
  const [proyek, setProyek] = useState(dataProyek);
  const [search, setSearch] = useState("");
  const [modalDetail, setModalDetail] = useState(null);
  const [modalInput, setModalInput] = useState(null);

  // Filter proyek yang punya list_rab kosong
  const filteredProyek = proyek.filter(
    (p) =>
      (!p.list_rab || p.list_rab.length === 0) &&
      (p.nama_proyek.toLowerCase().includes(search.toLowerCase()) ||
        p.kode_proyek.toLowerCase().includes(search.toLowerCase()))
  );

  const handleSaveRAB = (newRAB) => {
    // Update proyek dengan list_rab yang baru
    setProyek((prev) =>
      prev.map((p) =>
        p.id_proyek === modalInput.id_proyek
          ? { ...p, list_rab: [newRAB.id], rabData: newRAB }
          : p
      )
    );
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-700">Daftar RAB</h1>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Cari proyek..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="min-w-full text-left text-gray-700">
          <thead className="bg-teal-600 text-white">
            <tr>
              <th className="px-6 py-3">No</th>
              <th className="px-6 py-3">Kode Proyek</th>
              <th className="px-6 py-3">Nama Proyek</th>
              <th className="px-6 py-3">Status RAB</th>
              <th className="px-6 py-3 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredProyek.map((p, idx) => (
              <tr
                key={p.id_proyek}
                className={`border-b hover:bg-gray-50 ${
                  idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                <td className="px-6 py-3">{idx + 1}</td>
                <td className="px-6 py-3 font-medium">{p.kode_proyek}</td>
                <td className="px-6 py-3">{p.nama_proyek}</td>
                <td className="px-6 py-3">
                  {p.list_rab && p.list_rab.length > 0 ? "Sudah ada" : "Belum"}
                </td>
                <td className="px-6 py-3 flex justify-center gap-2">
                  {(!p.list_rab || p.list_rab.length === 0) && (
                    <button
                      onClick={() => setModalInput(p)}
                      className="flex items-center gap-1 px-3 py-1 bg-teal-600 text-white rounded hover:bg-teal-700"
                    >
                      <HiPlus /> Input RAB
                    </button>
                  )}
                  {p.list_rab && p.list_rab.length > 0 && (
                    <button
                      onClick={() => setModalDetail(p.rabData)}
                      className="p-2 bg-teal-100 text-teal-700 rounded hover:bg-teal-200"
                    >
                      <HiEye />
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {filteredProyek.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-3 text-center text-gray-500">
                  Tidak ada proyek ditemukan
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Detail */}
      {modalDetail && (
        <ModalDetailRAB
          rabData={modalDetail}
          onClose={() => setModalDetail(null)}
        />
      )}

      {/* Modal Input */}
      {modalInput && (
        <ModalInputRAB
          proyek={modalInput}
          onClose={() => setModalInput(null)}
          onSave={handleSaveRAB}
        />
      )}
    </div>
  );
};

export default DaftarRAB;
