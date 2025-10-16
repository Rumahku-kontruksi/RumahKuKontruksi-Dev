// client/src/pages/admin/konsumen/DaftarKonsumen.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiEye, HiPencil, HiTrash, HiUserAdd } from "react-icons/hi";
import konsumenData from "../../../data/mockKonsumen.json";

const DaftarKonsumen = () => {
  const [konsumenList, setKonsumenList] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    nama_lengkap: "",
    email: "",
    nomor_telepon: "",
    alamat: "",
    foto: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    setKonsumenList(konsumenData);
  }, []);

  const handleTambah = (e) => {
    e.preventDefault();
    if (!form.nama_lengkap || !form.email || !form.nomor_telepon || !form.alamat) {
      alert("Mohon lengkapi semua field!");
      return;
    }
    const newData = {
      id: `K-${Date.now()}`,
      nama_lengkap: form.nama_lengkap,
      email: form.email,
      nomor_telepon: form.nomor_telepon,
      alamat: form.alamat,
      jenis_konsumen: "Personal",
      alamat_pengiriman: form.alamat,
      foto: form.foto || "https://placehold.co/80",
      id_proyek: [],
      jenis_kelamin: null,
      nama_perusahaan: null,
      bidang_usaha: null,
      jabatan_kontak: null,
      npwp_perusahaan: null,
      nomor_identitas: null,
    };
    setKonsumenList([...konsumenList, newData]);
    setForm({ nama_lengkap: "", email: "", nomor_telepon: "", alamat: "", foto: "" });
    setIsAdding(false);
  };

  const handleEdit = (e) => {
    e.preventDefault();
    if (!form.nama_lengkap || !form.email || !form.nomor_telepon || !form.alamat) {
      alert("Mohon lengkapi semua field!");
      return;
    }
    setKonsumenList(
      konsumenList.map((k) =>
        k.id === editingId
          ? { ...k, ...form, foto: form.foto || k.foto }
          : k
      )
    );
    setForm({ nama_lengkap: "", email: "", nomor_telepon: "", alamat: "", foto: "" });
    setEditingId(null);
  };

  const handleHapus = (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus konsumen ini?")) {
      setKonsumenList(konsumenList.filter((k) => k.id !== id));
    }
  };

  const startEdit = (k) => {
    setEditingId(k.id);
    setForm({
      nama_lengkap: k.nama_lengkap || "",
      email: k.email || "",
      nomor_telepon: k.nomor_telepon || "",
      alamat: k.alamat || "",
      foto: k.foto || "",
    });
    setIsAdding(false);
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Daftar Konsumen</h2>
        <button
          onClick={() => {
            setIsAdding(true);
            setEditingId(null);
            setForm({ nama_lengkap: "", email: "", nomor_telepon: "", alamat: "", foto: "" });
          }}
          className="btn btn-primary flex items-center gap-2"
        >
          <HiUserAdd /> Tambah Konsumen
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
              placeholder="Nama Konsumen"
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
              placeholder="Alamat"
              className="input input-bordered w-full"
              value={form.alamat}
              onChange={(e) => setForm({ ...form, alamat: e.target.value })}
            />
            <input
              type="text"
              placeholder="URL Foto"
              className="input input-bordered w-full col-span-2"
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
                setForm({ nama_lengkap: "", email: "", nomor_telepon: "", alamat: "", foto: "" });
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
