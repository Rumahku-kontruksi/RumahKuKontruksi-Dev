import React, { useEffect, useState } from "react";
import { HiEye, HiPencil, HiTrash, HiUserAdd } from "react-icons/hi";
import axios from "axios";
import TambahKonsumen from "../../../components/admin/konsumen/TambahKonsumen";
import EditKonsumen from "../../../components/admin/konsumen/EditKonsumen";
import ModalDetailKonsumen from "../../../components/admin/konsumen/ModalDetailKonsumen";

const DaftarKonsumen = () => {
  const [jenis, setJenis] = useState("Semua");
  const [konsumenList, setKonsumenList] = useState([]);
  const [modalTambahOpen, setModalTambahOpen] = useState(false);
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const [selectedKonsumen, setSelectedKonsumen] = useState(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [detailKonsumen, setDetailKonsumen] = useState(null);

  const API_KONSUMEN = "http://localhost:3000/konsumen";

  // 🔄 Ambil data konsumen
  const fetchKonsumen = async () => {
    try {
      const res = await axios.get(API_KONSUMEN);
      const data = res.data.data || res.data;

      const filtered =
        jenis === "Semua"
          ? data
          : data.filter((k) => k.jenis_konsumen === jenis);

      setKonsumenList(filtered);
    } catch (err) {
      console.error(err);
      alert("Gagal mengambil data konsumen");
    }
  };

  useEffect(() => {
    fetchKonsumen();
  }, [jenis]);

  // 🗑️ Hapus Konsumen
  const handleHapus = async (k) => {
    if (window.confirm("Apakah yakin ingin menghapus konsumen ini?")) {
      try {
        await axios.delete(`${API_KONSUMEN}/${k.id_konsumen}`);
        fetchKonsumen();
      } catch (err) {
        console.error(err);
        alert("Gagal menghapus konsumen");
      }
    }
  };

  // ✏️ Buka modal edit
  const openEdit = (k) => {
    setSelectedKonsumen(k);
    setModalEditOpen(true);
  };

  // 👁️ Buka detail
  const openDetail = (k) => {
    setDetailKonsumen(k);
    setDetailOpen(true);
  };

  // ➕ Tambah konsumen
  const openTambah = () => {
    setSelectedKonsumen(null);
    setModalTambahOpen(true);
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Daftar Konsumen</h2>
        <div className="flex gap-2">
          <select
            value={jenis}
            onChange={(e) => setJenis(e.target.value)}
            className="select select-bordered"
          >
            <option value="Semua">Semua</option>
            <option value="Perseorangan">Perseorangan</option>
            <option value="Perusahaan">Perusahaan</option>
          </select>
          <button
            className="btn btn-primary flex items-center gap-2"
            onClick={openTambah}
          >
            <HiUserAdd /> Tambah Konsumen
          </button>
        </div>
      </div>

      {/* ================= MODAL TAMBAH ================= */}
      {modalTambahOpen && (
        <TambahKonsumen
          isOpen={modalTambahOpen}
          onClose={() => setModalTambahOpen(false)}
          refreshList={fetchKonsumen}
        />
      )}

      {/* ================= MODAL EDIT ================= */}
      {modalEditOpen && selectedKonsumen && (
        <EditKonsumen
          isOpen={modalEditOpen}
          onClose={() => setModalEditOpen(false)}
          selectedKonsumen={selectedKonsumen}
          refreshList={fetchKonsumen}
        />
      )}

      {/* ================= MODAL DETAIL ================= */}
      {detailOpen && detailKonsumen && (
        <ModalDetailKonsumen
          isOpen={detailOpen}
          onClose={() => setDetailOpen(false)}
          konsumen={detailKonsumen}
        />
      )}

      {/* ================= TABEL KONSUMEN ================= */}
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead className="bg-teal-600 text-white">
            <tr>
              <th>No</th>
              <th>ID Konsumen</th>
              <th>Nama Lengkap</th>
              <th>Jenis Konsumen</th>
              <th>Email</th>
              <th>Telepon</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {konsumenList.length > 0 ? (
              konsumenList.map((k, i) => (
                <tr key={k.id_konsumen}>
                  <td>{i + 1}</td>
                  <td>{k.id_konsumen}</td>
                  <td>{k.nama_lengkap}</td>
                  <td>{k.jenis_konsumen}</td>
                  <td>{k.email || "-"}</td>
                  <td>{k.nomor_telepon || "-"}</td>
                  <td className="flex gap-2 flex-wrap">
                    <button
                      className="btn btn-sm btn-info"
                      onClick={() => openDetail(k)}
                      title="Lihat Detail"
                    >
                      <HiEye />
                    </button>
                    <button
                      className="btn btn-sm btn-warning"
                      onClick={() => openEdit(k)}
                      title="Edit"
                    >
                      <HiPencil />
                    </button>
                    <button
                      className="btn btn-sm btn-error"
                      onClick={() => handleHapus(k)}
                      title="Hapus"
                    >
                      <HiTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-500">
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
