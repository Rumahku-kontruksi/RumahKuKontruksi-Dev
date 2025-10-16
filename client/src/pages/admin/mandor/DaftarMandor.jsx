// client/src/pages/admin/mandor/DaftarMandor.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiEye, HiPencil, HiTrash, HiUserAdd } from "react-icons/hi";
import mandorData from "../../../data/mockMandor.json";

const DaftarMandor = () => {
  const [mandorList, setMandorList] = useState([]);
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
    setMandorList(mandorData);
  }, []);

  const handleTambah = (e) => {
    e.preventDefault();
    if (!form.nama_lengkap || !form.email || !form.nomor_telepon || !form.jabatan) {
      alert("Mohon lengkapi semua field!");
      return;
    }
    const newData = {
      id: `M-${Date.now()}`,
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
    setMandorList([...mandorList, newData]);
    setForm({ nama_lengkap: "", email: "", nomor_telepon: "", jabatan: "", status_penugasan: "", foto: "" });
    setIsAdding(false);
  };

  const handleEdit = (e) => {
    e.preventDefault();
    setMandorList(
      mandorList.map((m) =>
        m.id === editingId ? { ...m, ...form } : m
      )
    );
    setForm({ nama_lengkap: "", email: "", nomor_telepon: "", jabatan: "", status_penugasan: "", foto: "" });
    setEditingId(null);
  };

  const handleHapus = (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus mandor ini?")) {
      setMandorList(mandorList.filter((m) => m.id !== id));
    }
  };

  const startEdit = (m) => {
    setEditingId(m.id);
    setForm({
      nama_lengkap: m.nama_lengkap || "",
      email: m.email || "",
      nomor_telepon: m.nomor_telepon || "",
      jabatan: m.jabatan || "",
      status_penugasan: m.status_penugasan || "",
      foto: m.foto || "",
    });
    setIsAdding(false);
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Daftar Mandor</h2>
        <button
          onClick={() => {
            setIsAdding(true);
            setEditingId(null);
            setForm({ nama_lengkap: "", email: "", nomor_telepon: "", jabatan: "", status_penugasan: "", foto: "" });
          }}
          className="btn btn-primary flex items-center gap-2"
        >
          <HiUserAdd /> Tambah Mandor
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
              placeholder="Nama Mandor"
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
            {mandorList.length > 0 ? (
              mandorList.map((m, i) => (
                <tr key={m.id}>
                  <td>
                    <img
                      src={m.foto || "https://placehold.co/80"}
                      alt={m.nama_lengkap}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </td>
                  <td>{i + 1}</td>
                  <td>{m.nama_lengkap}</td>
                  <td>{m.jabatan}</td>
                  <td>{m.nomor_telepon}</td>
                  <td>{m.status_penugasan}</td>
                  <td className="flex gap-2 flex-wrap">
                    <button
                      className="btn btn-sm btn-info"
                      onClick={() => navigate(`/admin/mandor/${m.id}`)}
                    >
                      <HiEye />
                    </button>
                    <button
                      className="btn btn-sm btn-warning"
                      onClick={() => startEdit(m)}
                    >
                      <HiPencil />
                    </button>
                    <button
                      className="btn btn-sm btn-error"
                      onClick={() => handleHapus(m.id)}
                    >
                      <HiTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center text-gray-500 py-4">
                  Belum ada data mandor.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DaftarMandor;
