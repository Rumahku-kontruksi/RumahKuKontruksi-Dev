import React, { useEffect, useState } from "react";
import { HiEye, HiPencil, HiTrash, HiUserAdd } from "react-icons/hi";
import axios from "axios";
import ModalKonsumen from "../../../components/admin/konsumen/ModalKonsumen";
import ModalDetailKonsumen from "../../../components/admin/konsumen/ModalDetailKonsumen";

const DaftarKonsumen = () => {
  const [jenis, setJenis] = useState("perseorangan");
  const [konsumenList, setKonsumenList] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingKonsumen, setEditingKonsumen] = useState(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [detailKonsumen, setDetailKonsumen] = useState(null);

  const API_URL = "http://localhost:3000/konsumen";

  const fetchKonsumen = async () => {
    try {
      const res = await axios.get(`${API_URL}/${jenis}`);
      setKonsumenList(res.data);
    } catch (err) {
      console.error(err);
      alert("Gagal mengambil data konsumen");
    }
  };

  useEffect(() => {
    fetchKonsumen();
  }, [jenis]);

  const handleHapus = async (k) => {
    const jenisParam = k.jenis_konsumen.startsWith("PR") ? "perseorangan" : "perusahaan";
    const id = k.id_konsumen || k.id_perseorangan || k.id_perusahaan;

    if (window.confirm("Apakah yakin ingin menghapus konsumen ini?")) {
      try {
        await axios.delete(`${API_URL}/${jenisParam}/${id}`);
        fetchKonsumen();
      } catch (err) {
        console.error(err);
        alert("Gagal menghapus konsumen");
      }
    }
  };

  const openEdit = (k) => {
    setEditingKonsumen(k);
    setModalOpen(true);
  };

  const openDetail = (k) => {
    setDetailKonsumen(k);
    setDetailOpen(true);
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Daftar Konsumen</h2>
        <div className="flex gap-2">
          <select
            value={jenis}
            onChange={(e) => setJenis(e.target.value)}
            className="select select-bordered"
          >
            <option value="perseorangan">Perseorangan</option>
            <option value="perusahaan">Perusahaan</option>
          </select>
          <button
            className="btn btn-primary flex items-center gap-2"
            onClick={() => { setEditingKonsumen(null); setModalOpen(true); }}
          >
            <HiUserAdd /> Tambah Konsumen
          </button>
        </div>
      </div>

      <ModalKonsumen
        isOpen={modalOpen}
        onClose={() => { setModalOpen(false); setEditingKonsumen(null); }}
        initialData={editingKonsumen}
        refreshList={fetchKonsumen}
      />

      {detailKonsumen && (
        <ModalDetailKonsumen
          isOpen={detailOpen}
          onClose={() => setDetailOpen(false)}
          konsumen={detailKonsumen}
        />
      )}

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead className="bg-teal-600 text-white">
            <tr>
              <th>Foto</th>
              <th>No</th>
              <th>Nama</th>
              <th>Email</th>
              <th>Telepon</th>
              <th>Alamat</th>
              <th>Jenis Konsumen</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {konsumenList.length > 0 ? (
              konsumenList.map((k, i) => (
                <tr key={k.id_konsumen || k.id_perseorangan || k.id_perusahaan}>
                  <td>
                    <img
                      src={k.foto || "https://img.daisyui.com/images/profile/demo/superperson@192.webp"}
                      alt={k.nama_lengkap || k.nama_perusahaan}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </td>
                  <td>{i + 1}</td>
                  <td>{k.nama_lengkap || k.nama_perusahaan}</td>
                  <td>{k.email || "-"}</td>
                  <td>{k.nomor_telepon || "-"}</td>
                  <td>{k.alamat_rumah || k.alamat_kantor || k.alamat || "-"}</td>
                  <td>{k.jenis_konsumen?.startsWith("PR") ? "Perseorangan" : "Perusahaan"}</td>
                  <td className="flex gap-2 flex-wrap">
                    <button className="btn btn-sm btn-info" onClick={() => openDetail(k)}>
                      <HiEye />
                    </button>
                    <button className="btn btn-sm btn-warning" onClick={() => openEdit(k)}>
                      <HiPencil />
                    </button>
                    <button className="btn btn-sm btn-error" onClick={() => handleHapus(k)}>
                      <HiTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-4 text-gray-500">
                  Belum ada data konsumen.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DaftarKonsumen;
