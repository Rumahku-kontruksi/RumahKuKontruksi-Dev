import React, { useEffect, useState } from "react";
import axios from "axios";
import { HiPlus, HiEye, HiPencil, HiUpload } from "react-icons/hi";
import ModalDetailProyek from "../../../components/admin/proyek/ModalDetailProyek";
import ModalInputProyek from "../../../components/admin/proyek/ModalInputProyek";

const DaftarDataProyek = () => {
  const [proyek, setProyek] = useState([]);
  const [search, setSearch] = useState("");
  const [modalProyek, setModalProyek] = useState(null);
  const [modalInput, setModalInput] = useState(false);

  useEffect(() => {
    fetchProyek();
  }, []);

  const fetchProyek = async () => {
    try {
      const res = await axios.get("http://localhost:3000/proyek");
      const proyekData = await Promise.all(
        res.data.map(async (p) => {
          // Fetch nama Konsumen
          let konsumenNama = "-";
          if (p.id_konsumen) {
            const konsumenRes = await axios.get(`http://localhost:3000/konsumen/${p.id_konsumen}`);
            konsumenNama = konsumenRes.data.nama_konsumen || "-";
          }

          // Fetch nama Mandor
          let mandorNama = "-";
          if (p.id_mandor) {
            const mandorRes = await axios.get(`http://localhost:3000/mandor/${p.id_mandor}`);
            mandorNama = mandorRes.data.nama_mandor || "-";
          }

          // Fetch nama Pengawas
          let pengawasNama = "-";
          if (p.id_pengawas) {
            const pengawasRes = await axios.get(`http://localhost:3000/pengawas/${p.id_pengawas}`);
            pengawasNama = pengawasRes.data.nama_pengawas || "-";
          }

          return {
            ...p,
            konsumenNama,
            mandorNama,
            pengawasNama
          };
        })
      );

      setProyek(proyekData);
    } catch (err) {
      console.error(err);
    }
  };

  const filteredProyek = proyek.filter((p) =>
    (p.nama_proyek?.toLowerCase() || "").includes(search.toLowerCase())
  );

  const isUploadReady = (p) => p.id_mandor && p.id_pengawas;

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
              <th className="px-6 py-3">Anggaran</th>
              <th className="px-6 py-3">Konsumen</th>
              <th className="px-6 py-3">Mandor</th>
              <th className="px-6 py-3">Pengawas</th>
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
                <td className="px-6 py-3">{p.anggaran?.toLocaleString("id-ID") || "-"}</td>
                <td className="px-6 py-3">{p.konsumenNama}</td>
                <td className="px-6 py-3">{p.mandorNama}</td>
                <td className="px-6 py-3">{p.pengawasNama}</td>
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

      {modalProyek && (
        <ModalDetailProyek proyek={modalProyek} onClose={() => setModalProyek(null)} />
      )}

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
