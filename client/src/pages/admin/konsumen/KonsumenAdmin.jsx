import React, { useState } from "react";
import { HiUserAdd, HiPencil, HiTrash, HiEye } from "react-icons/hi";

const KonsumenAdmin = () => {
  const [konsumenList, setKonsumenList] = useState([
    {
      id: 1,
      nama: "Pak Budi",
      email: "budi@example.com",
      telepon: "081234567890",
      alamat: "Jl. Merdeka No.12, Bandung",
      status: "Aktif",
    },
    {
      id: 2,
      nama: "Ibu Siti",
      email: "siti@example.com",
      telepon: "082112223334",
      alamat: "Jl. Sudirman No.5, Jakarta",
      status: "Nonaktif",
    },
  ]);

  const [form, setForm] = useState({
    nama: "",
    email: "",
    telepon: "",
    alamat: "",
  });

  const [isAdding, setIsAdding] = useState(false);

  const handleTambah = (e) => {
    e.preventDefault();
    if (!form.nama || !form.email || !form.telepon || !form.alamat) {
      alert("Mohon lengkapi semua field!");
      return;
    }
    const newData = {
      id: Date.now(),
      ...form,
      status: "Aktif",
    };
    setKonsumenList([...konsumenList, newData]);
    setForm({ nama: "", email: "", telepon: "", alamat: "" });
    setIsAdding(false);
  };

  const handleHapus = (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus konsumen ini?")) {
      setKonsumenList(konsumenList.filter((k) => k.id !== id));
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Data Konsumen</h2>
        <button
          onClick={() => setIsAdding(true)}
          className="btn btn-primary flex items-center gap-2"
        >
          <HiUserAdd /> Tambah Konsumen
        </button>
      </div>

      {/* FORM TAMBAH KONSUMEN */}
      {isAdding && (
        <form
          onSubmit={handleTambah}
          className="bg-gray-50 border rounded-xl p-4 mb-6"
        >
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Nama Konsumen"
              className="input input-bordered w-full"
              value={form.nama}
              onChange={(e) => setForm({ ...form, nama: e.target.value })}
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
              value={form.telepon}
              onChange={(e) => setForm({ ...form, telepon: e.target.value })}
            />
            <input
              type="text"
              placeholder="Alamat"
              className="input input-bordered w-full"
              value={form.alamat}
              onChange={(e) => setForm({ ...form, alamat: e.target.value })}
            />
          </div>
          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => setIsAdding(false)}
            >
              Batal
            </button>
            <button type="submit" className="btn btn-success text-white">
              Simpan
            </button>
          </div>
        </form>
      )}

      {/* TABEL DATA KONSUMEN */}
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead className="bg-teal-600 text-white">
            <tr>
              <th>No</th>
              <th>Nama</th>
              <th>Email</th>
              <th>Telepon</th>
              <th>Alamat</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {konsumenList.length > 0 ? (
              konsumenList.map((k, i) => (
                <tr key={k.id}>
                  <td>{i + 1}</td>
                  <td>{k.nama}</td>
                  <td>{k.email}</td>
                  <td>{k.telepon}</td>
                  <td>{k.alamat}</td>
                  <td>
                    <span
                      className={`px-2 py-1 rounded-full text-white ${
                        k.status === "Aktif" ? "bg-green-500" : "bg-gray-400"
                      }`}
                    >
                      {k.status}
                    </span>
                  </td>
                  <td className="flex gap-2 flex-wrap">
                    <button className="btn btn-sm btn-info">
                      <HiEye />
                    </button>
                    <button className="btn btn-sm btn-warning">
                      <HiPencil />
                    </button>
                    <button
                      onClick={() => handleHapus(k.id)}
                      className="btn btn-sm btn-error"
                    >
                      <HiTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center text-gray-500 py-4">
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

export default KonsumenAdmin;
