// client/src/pages/admin/pengawas/DaftarPengawas.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiEye, HiPencil, HiTrash, HiUserAdd } from "react-icons/hi";
import pengawasData from "../../../data/mockPengawas.json";

const DaftarPengawas = () => {
  const [pengawasList, setPengawasList] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    nama_lengkap: "",
    email: "",
    nomor_telepon: "",
    jabatan: "",
    status_penugasan: "",
    foto: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    setPengawasList(pengawasData);
  }, []);

  const handleTambah = (e) => {
    e.preventDefault();
    if (!form.nama_lengkap || !form.email || !form.nomor_telepon || !form.jabatan) {
      alert("Mohon lengkapi semua field!");
      return;
    }
    const newData = {
      id: `P-${Date.now()}`,
      ...form,
      status_aktif: true,
      tanggal_mulai: new Date().toISOString().split("T")[0],
      tanggal_selesai: null,
      pengalaman: "",
      sertifikasi: [],
      bidang_keahlian: [],
      id_proyek: [],
      catatan: "",
      metode_komunikasi: "",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      created_by: "admin",
      updated_by: "admin",
    };
    setPengawasList([...pengawasList, newData]);
    setForm({ nama_lengkap: "", email: "", nomor_telepon: "", jabatan: "", status_penugasan: "", foto: "" });
    setIsAdding(false);
  };

  const handleEdit = (e) => {
    e.preventDefault();
    setPengawasList(
      pengawasList.map((p) =>
        p.id === editingId ? { ...p, ...form } : p
      )
    );
    setForm({ nama_lengkap: "", email: "", nomor_telepon: "", jabatan: "", status_penugasan: "", foto: "" });
    setEditingId(null);
  };

  const handleHapus = (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus pengawas ini?")) {
      setPengawasList(pengawasList.filter((p) => p.id !== id));
    }
  };

  const startEdit = (p) => {
    setEditingId(p.id);
    setForm({
      nama_lengkap: p.nama_lengkap || "",
      email: p.email || "",
      nomor_telepon: p.nomor_telepon || "",
      jabatan: p.jabatan || "",
      status_penugasan: p.status_penugasan || "",
      foto: p.foto || "",
    });
    setIsAdding(false);
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Daftar Pengawas</h2>
        <button
          onClick={() => {
            setIsAdding(true);
            setEditingId(null);
            setForm({ nama_lengkap: "", email: "", nomor_telepon: "", jabatan: "", status_penugasan: "", foto: "" });
          }}
          className="btn btn-primary flex items-center gap-2"
        >
          <HiUserAdd /> Tambah Pengawas
        </button>
      </div>

      {/* FORM TAMBAH / EDIT */}
      {(isAdding || editingId) && (
        <form
          onSubmit={editingId ? handleEdit : handleTambah}
          className="bg-gray-50 border rounded-xl p-4 mb-6"
        >
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Nama Pengawas"
              className="input input-bordered w-full"
              value={form.nama_lengkap}
              onChange={(e) => setForm({ ...form, nama_lengkap: e.target.value })}
            />
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered w-full"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <input
              type="text"
              placeholder="Nomor Telepon"
              className="input input-bordered w-full"
              value={form.nomor_telepon}
              onChange={(e) => setForm({ ...form, nomor_telepon: e.target.value })}
            />
            <input
              type="text"
              placeholder="Jabatan"
              className="input input-bordered w-full"
              value={form.jabatan}
              onChange={(e) => setForm({ ...form, jabatan: e.target.value })}
            />
            <input
              type="text"
              placeholder="Status Penugasan"
              className="input input-bordered w-full"
              value={form.status_penugasan}
              onChange={(e) => setForm({ ...form, status_penugasan: e.target.value })}
            />
            <input
              type="text"
              placeholder="URL Foto"
              className="input input-bordered w-full"
              value={form.foto}
              onChange={(e) => setForm({ ...form, foto: e.target.value })}
            />
          </div>
          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => {
                setIsAdding(false);
                setEditingId(null);
                setForm({ nama_lengkap: "", email: "", nomor_telepon: "", jabatan: "", status_penugasan: "", foto: "" });
              }}
            >
              Batal
            </button>
            <button type="submit" className="btn btn-success text-white">
              {editingId ? "Simpan Perubahan" : "Simpan"}
            </button>
          </div>
        </form>
      )}

      {/* TABEL */}
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead className="bg-teal-600 text-white">
            <tr>
              <th>Foto</th>
              <th>No</th>
              <th>Nama</th>
              <th>Jabatan</th>
              <th>Telepon</th>
              <th>Status Penugasan</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {pengawasList.length > 0 ? (
              pengawasList.map((p, i) => (
                <tr key={p.id}>
                  <td>
                    <img
                      src={p.foto || "https://placehold.co/80"}
                      alt={p.nama_lengkap}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </td>
                  <td>{i + 1}</td>
                  <td>{p.nama_lengkap}</td>
                  <td>{p.jabatan}</td>
                  <td>{p.nomor_telepon}</td>
                  <td>{p.status_penugasan}</td>
                  <td className="flex gap-2 flex-wrap">
                    <button
                      className="btn btn-sm btn-info"
                      onClick={() => navigate(`/admin/pengawas/${p.id}`)}
                    >
                      <HiEye />
                    </button>
                    <button
                      className="btn btn-sm btn-warning"
                      onClick={() => startEdit(p)}
                    >
                      <HiPencil />
                    </button>
                    <button
                      className="btn btn-sm btn-error"
                      onClick={() => handleHapus(p.id)}
                    >
                      <HiTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center text-gray-500 py-4">
                  Belum ada data pengawas.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DaftarPengawas;
