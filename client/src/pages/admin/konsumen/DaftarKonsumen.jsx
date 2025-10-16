// client/src/pages/admin/konsumen/DaftarKonsumen.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiEye, HiPencil, HiTrash, HiUserAdd } from "react-icons/hi";
import konsumenData from "../../../data/mockKonsumen.json";
import ModalInputKonsumen from "../../../components/admin/proyek/ModalInputKonsumen"

const DaftarKonsumen = () => {
  const [konsumenList, setKonsumenList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingKonsumen, setEditingKonsumen] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    setKonsumenList(konsumenData);
  }, []);

  // Tambah atau edit konsumen
  const handleSubmitKonsumen = (data) => {
    if (editingKonsumen) {
      // Edit
      setKonsumenList(
        konsumenList.map((k) => (k.id === editingKonsumen.id ? { ...k, ...data } : k))
      );
    } else {
      // Tambah
      const newKonsumen = {
        id: `K-${Date.now()}`,
        ...data,
        id_proyek: [],
        jenis_kelamin: null,
        nomor_identitas: null,
        status: "Aktif",
      };
      setKonsumenList([...konsumenList, newKonsumen]);
    }
    setEditingKonsumen(null);
  };

  const handleHapus = (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus konsumen ini?")) {
      setKonsumenList(konsumenList.filter((k) => k.id !== id));
    }
  };

  const startEdit = (k) => {
    setEditingKonsumen(k);
    setIsModalOpen(true);
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Daftar Konsumen</h2>
        <button
          onClick={() => { setEditingKonsumen(null); setIsModalOpen(true); }}
          className="btn btn-primary flex items-center gap-2"
        >
          <HiUserAdd /> Tambah Konsumen
        </button>
      </div>

      {/* MODAL INPUT */}
      <ModalInputKonsumen
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setEditingKonsumen(null); }}
        initialData={editingKonsumen}
        onSubmit={handleSubmitKonsumen}
      />

      {/* TABEL */}
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
                <tr key={k.id}>
                  <td>
                    <img
                      src={k.foto || "https://placehold.co/80"}
                      alt={k.nama_lengkap || k.nama_perusahaan}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </td>
                  <td>{i + 1}</td>
                  <td>{k.nama_lengkap || k.nama_perusahaan}</td>
                  <td>{k.email}</td>
                  <td>{k.nomor_telepon}</td>
                  <td>{k.alamat}</td>
                  <td>{k.jenis_konsumen}</td>
                  <td className="flex gap-2 flex-wrap">
                    <button
                      className="btn btn-sm btn-info"
                      onClick={() => navigate(`/admin/konsumen/${k.id}`)}
                    >
                      <HiEye />
                    </button>
                    <button
                      className="btn btn-sm btn-warning"
                      onClick={() => startEdit(k)}
                    >
                      <HiPencil />
                    </button>
                    <button
                      className="btn btn-sm btn-error"
                      onClick={() => handleHapus(k.id)}
                    >
                      <HiTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center text-gray-500 py-4">
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
