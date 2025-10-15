import React, { useState } from "react";
import { HiEye, HiPlus, HiPencilAlt, HiTrash } from "react-icons/hi";

const MandorAdmin = () => {
  // ====== DATA DUMMY MANDOR ======
  const [mandorList, setMandorList] = useState([
    {
      id: 1,
      nama: "Agus Santoso",
      noHp: "081234567890",
      proyek: "Renovasi Rumah Pak Budi",
      keahlian: "Finishing dan Pengecatan",
      status: "Aktif",
    },
    {
      id: 2,
      nama: "Joko Prasetyo",
      noHp: "089876543210",
      proyek: "Bangun Ruko Ibu Siti",
      keahlian: "Konstruksi Beton",
      status: "Tidak Aktif",
    },
  ]);

  const [tambahForm, setTambahForm] = useState({
    nama: "",
    noHp: "",
    proyek: "",
    keahlian: "",
  });

  const [showForm, setShowForm] = useState(false);

  // ====== HANDLER ======
  const handleTambahMandor = () => {
    if (!tambahForm.nama || !tambahForm.noHp) {
      alert("Mohon lengkapi semua data mandor!");
      return;
    }
    const newMandor = {
      id: Date.now(),
      ...tambahForm,
      status: "Aktif",
    };
    setMandorList([...mandorList, newMandor]);
    setTambahForm({ nama: "", noHp: "", proyek: "", keahlian: "" });
    setShowForm(false);
    alert("✅ Mandor baru berhasil ditambahkan!");
  };

  const handleHapus = (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus mandor ini?")) {
      setMandorList(mandorList.filter((m) => m.id !== id));
    }
  };

  const handleEdit = (mandor) => {
    const namaBaru = prompt("Masukkan nama mandor baru:", mandor.nama);
    if (namaBaru) {
      setMandorList(
        mandorList.map((m) =>
          m.id === mandor.id ? { ...m, nama: namaBaru } : m
        )
      );
      alert("✅ Nama mandor berhasil diubah!");
    }
  };

  const handleView = (mandor) => {
    alert(
      `📋 Detail Mandor:\n\nNama: ${mandor.nama}\nNo HP: ${mandor.noHp}\nProyek: ${mandor.proyek}\nKeahlian: ${mandor.keahlian}\nStatus: ${mandor.status}`
    );
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow">
      {/* ===== HEADER ===== */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Daftar Mandor</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn btn-success flex items-center gap-1"
        >
          <HiPlus /> Tambah Mandor
        </button>
      </div>

      {/* ===== FORM TAMBAH MANDOR ===== */}
      {showForm && (
        <div className="bg-gray-50 border p-4 rounded-lg mb-6">
          <h3 className="font-semibold mb-3 text-teal-700">Tambah Mandor Baru</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="Nama Mandor"
              className="input input-bordered w-full"
              value={tambahForm.nama}
              onChange={(e) =>
                setTambahForm({ ...tambahForm, nama: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Nomor HP"
              className="input input-bordered w-full"
              value={tambahForm.noHp}
              onChange={(e) =>
                setTambahForm({ ...tambahForm, noHp: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Proyek yang Ditangani"
              className="input input-bordered w-full"
              value={tambahForm.proyek}
              onChange={(e) =>
                setTambahForm({ ...tambahForm, proyek: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Keahlian Mandor"
              className="input input-bordered w-full"
              value={tambahForm.keahlian}
              onChange={(e) =>
                setTambahForm({ ...tambahForm, keahlian: e.target.value })
              }
            />
          </div>

          <button onClick={handleTambahMandor} className="btn btn-primary">
            💾 Simpan Mandor
          </button>
        </div>
      )}

      {/* ===== TABEL MANDOR ===== */}
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>No</th>
              <th>Nama Mandor</th>
              <th>No. HP</th>
              <th>Proyek</th>
              <th>Keahlian</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {mandorList.map((mandor, index) => (
              <tr key={mandor.id}>
                <td>{index + 1}</td>
                <td>{mandor.nama}</td>
                <td>{mandor.noHp}</td>
                <td>{mandor.proyek}</td>
                <td>{mandor.keahlian}</td>
                <td>
                  <span
                    className={`px-2 py-1 rounded-full text-white font-semibold ${
                      mandor.status === "Aktif"
                        ? "bg-green-500"
                        : "bg-gray-400"
                    }`}
                  >
                    {mandor.status}
                  </span>
                </td>
                <td className="flex gap-2 flex-wrap">
                  <button
                    onClick={() => handleView(mandor)}
                    className="btn btn-sm btn-info flex items-center gap-1"
                  >
                    <HiEye /> View
                  </button>
                  <button
                    onClick={() => handleEdit(mandor)}
                    className="btn btn-sm btn-warning flex items-center gap-1"
                  >
                    <HiPencilAlt /> Edit
                  </button>
                  <button
                    onClick={() => handleHapus(mandor.id)}
                    className="btn btn-sm btn-error flex items-center gap-1"
                  >
                    <HiTrash /> Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MandorAdmin;
