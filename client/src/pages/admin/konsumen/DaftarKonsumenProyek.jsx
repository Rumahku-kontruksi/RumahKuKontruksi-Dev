// ==============================
// File: DaftarKonsumenProyek.jsx
// ==============================
import React, { useEffect, useState } from "react";
import { HiEye, HiPencil, HiTrash } from "react-icons/hi";
import axios from "axios";

// 🔜 nanti bisa dibuat terpisah
// import EditProyek from "../../../components/admin/proyek/EditProyek";
// import DetailProyek from "../../../components/admin/proyek/DetailProyek";

const DaftarKonsumenProyek = () => {
  const [proyekList, setProyekList] = useState([]);
  const [selectedProyek, setSelectedProyek] = useState(null);
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const [modalDetailOpen, setModalDetailOpen] = useState(false);

  const API_PROYEK = "http://localhost:3000/proyek";

  // 🔄 Ambil semua proyek (sudah join ke konsumen)
  const fetchProyek = async () => {
    try {
      const res = await axios.get(API_PROYEK);
      const data = res.data.data || res.data;

      // hanya tampilkan proyek yang punya id_konsumen
      const filtered = data.filter((p) => p.id_konsumen);

      setProyekList(filtered);
    } catch (err) {
      console.error(err);
      alert("Gagal mengambil data proyek");
    }
  };

  useEffect(() => {
    fetchProyek();
  }, []);

  // 👁️ Lihat detail proyek
  const openDetail = (proyek) => {
    setSelectedProyek(proyek);
    setModalDetailOpen(true);
  };

  // ✏️ Edit proyek
  const openEdit = (proyek) => {
    setSelectedProyek(proyek);
    setModalEditOpen(true);
  };

  // 🗑️ Hapus proyek
  const handleHapus = async (proyek) => {
    if (
      window.confirm(`Apakah yakin ingin menghapus proyek ${proyek.nama_proyek}?`)
    ) {
      try {
        await axios.delete(`${API_PROYEK}/${proyek.id_proyek}`);
        fetchProyek();
      } catch (err) {
        console.error(err);
        alert("Gagal menghapus proyek");
      }
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Daftar Konsumen & Proyek</h2>
      </div>

      {/* ================= MODAL DETAIL ================= */}
      {modalDetailOpen && selectedProyek && (
        <DetailProyek
          isOpen={modalDetailOpen}
          onClose={() => setModalDetailOpen(false)}
          proyek={selectedProyek}
        />
      )}

      {/* ================= MODAL EDIT ================= */}
      {modalEditOpen && selectedProyek && (
        <EditProyek
          isOpen={modalEditOpen}
          onClose={() => setModalEditOpen(false)}
          proyek={selectedProyek}
          refreshList={fetchProyek}
        />
      )}

      {/* ================= TABEL ================= */}
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead className="bg-teal-600 text-white">
            <tr>
              <th>No</th>
              <th>ID Proyek</th>
              <th>Nama Proyek</th>
              <th>Nama Konsumen</th>
              <th>Jenis Konsumen</th>
              <th>Lokasi</th>
              <th>Status</th>
              <th>Anggaran</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {proyekList.length > 0 ? (
              proyekList.map((p, i) => (
                <tr key={p.id_proyek}>
                  <td>{i + 1}</td>
                  <td>{p.id_proyek}</td>
                  <td>{p.nama_proyek}</td>
                  <td>{p.nama_konsumen || p.nama_lengkap || "-"}</td>
                  <td>{p.jenis_konsumen || "-"}</td>
                  <td>{p.lokasi || "-"}</td>
                  <td>{p.status_proyek || "-"}</td>
                  <td>
                    {p.anggaran
                      ? `Rp ${Number(p.anggaran).toLocaleString("id-ID")}`
                      : "-"}
                  </td>
                  <td className="flex gap-2 flex-wrap">
                    <button
                      className="btn btn-sm btn-info"
                      onClick={() => openDetail(p)}
                      title="Lihat Detail"
                    >
                      <HiEye />
                    </button>
                    <button
                      className="btn btn-sm btn-warning"
                      onClick={() => openEdit(p)}
                      title="Edit"
                    >
                      <HiPencil />
                    </button>
                    <button
                      className="btn btn-sm btn-error"
                      onClick={() => handleHapus(p)}
                      title="Hapus"
                    >
                      <HiTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center py-4 text-gray-500">
                  Belum ada proyek yang terdaftar.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DaftarKonsumenProyek;
