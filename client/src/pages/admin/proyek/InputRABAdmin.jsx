// client/src/pages/admin/proyek/InputRABAdmin.jsx
import React, { useState } from "react";

const InputRABAdmin = () => {
  // ============ DATA DUMMY PROYEK ============
  const proyekList = [
    { id: 1, nama: "Renovasi Rumah Pak Budi" },
    { id: 2, nama: "Pembangunan Ruko Bu Sari" },
  ];

  const [selectedProyek, setSelectedProyek] = useState("");
  const [kategoriList, setKategoriList] = useState([]);

  // ============ TAMBAH KATEGORI BARU ============
  const handleAddKategori = () => {
    const newKategori = {
      id: Date.now(),
      namaKategori: "",
      pekerjaanList: [],
    };
    setKategoriList((prev) => [...prev, newKategori]);
  };

  // ============ HAPUS KATEGORI ============
  const handleDeleteKategori = (id) => {
    if (window.confirm("Yakin ingin menghapus kategori ini?")) {
      setKategoriList((prev) => prev.filter((k) => k.id !== id));
    }
  };

  // ============ TAMBAH PEKERJAAN ============
  const handleAddPekerjaan = (kategoriId) => {
    const newPekerjaan = {
      id: Date.now(),
      namaPekerjaan: "",
      uraian: "",
      spesifikasi: "",
      sat: "",
      volume: "",
      hargaSatuan: "",
    };
    setKategoriList((prev) =>
      prev.map((kategori) =>
        kategori.id === kategoriId
          ? {
              ...kategori,
              pekerjaanList: [...kategori.pekerjaanList, newPekerjaan],
            }
          : kategori
      )
    );
  };

  // ============ HAPUS PEKERJAAN ============
  const handleDeletePekerjaan = (kategoriId, pekerjaanId) => {
    setKategoriList((prev) =>
      prev.map((kategori) =>
        kategori.id === kategoriId
          ? {
              ...kategori,
              pekerjaanList: kategori.pekerjaanList.filter(
                (p) => p.id !== pekerjaanId
              ),
            }
          : kategori
      )
    );
  };

  // ============ HANDLE INPUT KATEGORI ============
  const handleKategoriChange = (id, field, value) => {
    setKategoriList((prev) =>
      prev.map((kategori) =>
        kategori.id === id ? { ...kategori, [field]: value } : kategori
      )
    );
  };

  // ============ HANDLE INPUT PEKERJAAN ============
  const handlePekerjaanChange = (kategoriId, pekerjaanId, field, value) => {
    setKategoriList((prev) =>
      prev.map((kategori) =>
        kategori.id === kategoriId
          ? {
              ...kategori,
              pekerjaanList: kategori.pekerjaanList.map((p) =>
                p.id === pekerjaanId ? { ...p, [field]: value } : p
              ),
            }
          : kategori
      )
    );
  };

  // ============ PERHITUNGAN TOTAL ============
  const hitungTotalPekerjaan = (p) =>
    (parseFloat(p.volume) || 0) * (parseFloat(p.hargaSatuan) || 0);

  const hitungTotalKategori = (kategori) =>
    kategori.pekerjaanList.reduce(
      (sum, p) => sum + hitungTotalPekerjaan(p),
      0
    );

  const totalSemua = kategoriList.reduce(
    (sum, k) => sum + hitungTotalKategori(k),
    0
  );

  // ============ SIMPAN HANDLER ============
  const handleSimpanProyek = () => {
    if (!selectedProyek) return alert("Pilih proyek terlebih dahulu!");
    alert(`✅ Proyek "${selectedProyek}" disimpan!`);
  };

  const handleSimpanKategori = (kategori) => {
    if (!kategori.namaKategori)
      return alert("Nama kategori tidak boleh kosong!");
    alert(`✅ Kategori "${kategori.namaKategori}" disimpan!`);
  };

  const handleSimpanPekerjaan = (pekerjaan) => {
    if (!pekerjaan.namaPekerjaan)
      return alert("Nama pekerjaan tidak boleh kosong!");
    alert(`✅ Pekerjaan "${pekerjaan.namaPekerjaan}" disimpan!`);
  };

  // ============ FORMAT RUPIAH ============
  const formatRupiah = (angka) =>
    `Rp ${angka.toLocaleString("id-ID", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })}`;

  // ============ SIMPAN SEMUA DATA ============
  const handleSimpanSemua = () => {
    if (!selectedProyek) return alert("Pilih proyek terlebih dahulu!");
    const data = {
      proyek: selectedProyek,
      kategori: kategoriList.map((k) => ({
        namaKategori: k.namaKategori,
        totalKategori: hitungTotalKategori(k),
        pekerjaan: k.pekerjaanList.map((p) => ({
          ...p,
          total: hitungTotalPekerjaan(p),
        })),
      })),
      totalKeseluruhan: totalSemua,
    };
    console.log("DATA RAB:", data);
    alert("✅ Semua data RAB berhasil disimpan (cek console.log)");
  };

  // ============ RENDER ============

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-teal-700 mb-8">
        Input Rencana Anggaran Biaya (RAB)
      </h1>

      {/* === PILIH PROYEK === */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-8">
        <label className="font-semibold text-gray-700 mb-2 block">
          Pilih Nama Proyek
        </label>
        <div className="flex gap-4">
          <select
            className="select select-bordered w-full"
            value={selectedProyek}
            onChange={(e) => setSelectedProyek(e.target.value)}
          >
            <option value="">-- Pilih Proyek --</option>
            {proyekList.map((p) => (
              <option key={p.id} value={p.nama}>
                {p.nama}
              </option>
            ))}
          </select>
          <button
            onClick={handleSimpanProyek}
            disabled={!selectedProyek}
            className="btn btn-success"
          >
            💾 Simpan
          </button>
        </div>
      </div>

      {/* === TABEL KATEGORI === */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-teal-700">
            Daftar Kategori Pekerjaan
          </h2>
          <button onClick={handleAddKategori} className="btn btn-success btn-sm">
            + Tambah Kategori
          </button>
        </div>

        {kategoriList.map((kategori, idx) => (
          <div
            key={kategori.id}
            className="border border-gray-200 p-4 rounded-lg mb-6"
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-gray-700">
                Kategori #{idx + 1}
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={() => handleSimpanKategori(kategori)}
                  className="btn btn-outline btn-success btn-xs"
                >
                  💾 Simpan
                </button>
                <button
                  onClick={() => handleDeleteKategori(kategori.id)}
                  className="btn btn-outline btn-error btn-xs"
                >
                  🗑 Hapus
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="Nama Kategori Pekerjaan"
                value={kategori.namaKategori}
                onChange={(e) =>
                  handleKategoriChange(kategori.id, "namaKategori", e.target.value)
                }
                className="input input-bordered w-full"
              />
            </div>

            {/* === TABEL PEKERJAAN === */}
            <div className="overflow-x-auto mt-4">
              <table className="table table-zebra w-full text-sm">
                <thead>
                  <tr className="bg-teal-600 text-white text-center">
                    <th>No</th>
                    <th>Nama Pekerjaan</th>
                    <th>Uraian</th>
                    <th>Spesifikasi</th>
                    <th>SAT</th>
                    <th>Volume</th>
                    <th>Harga Satuan</th>
                    <th>Total</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {kategori.pekerjaanList.map((p, i) => (
                    <tr key={p.id} className="text-center">
                      <td>{i + 1}</td>
                      <td>
                        <input
                          type="text"
                          className="input input-bordered input-sm w-full"
                          value={p.namaPekerjaan}
                          onChange={(e) =>
                            handlePekerjaanChange(
                              kategori.id,
                              p.id,
                              "namaPekerjaan",
                              e.target.value
                            )
                          }
                        />
                      </td>
                      <td>
                        <textarea
                          className="textarea textarea-bordered textarea-sm w-full"
                          rows="2"
                          value={p.uraian}
                          onChange={(e) =>
                            handlePekerjaanChange(
                              kategori.id,
                              p.id,
                              "uraian",
                              e.target.value
                            )
                          }
                        ></textarea>
                      </td>
                      <td>
                        <input
                          type="text"
                          className="input input-bordered input-sm w-full"
                          value={p.spesifikasi}
                          onChange={(e) =>
                            handlePekerjaanChange(
                              kategori.id,
                              p.id,
                              "spesifikasi",
                              e.target.value
                            )
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          className="input input-bordered input-sm w-16 text-center"
                          value={p.sat}
                          onChange={(e) =>
                            handlePekerjaanChange(
                              kategori.id,
                              p.id,
                              "sat",
                              e.target.value
                            )
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          className="input input-bordered input-sm w-20 text-right"
                          value={p.volume}
                          onChange={(e) =>
                            handlePekerjaanChange(
                              kategori.id,
                              p.id,
                              "volume",
                              e.target.value
                            )
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          className="input input-bordered input-sm w-28 text-right"
                          value={p.hargaSatuan}
                          onChange={(e) =>
                            handlePekerjaanChange(
                              kategori.id,
                              p.id,
                              "hargaSatuan",
                              e.target.value
                            )
                          }
                        />
                      </td>
                      <td className="font-semibold text-right">
                        {formatRupiah(hitungTotalPekerjaan(p))}
                      </td>
                      <td className="flex justify-center gap-2">
                        <button
                          onClick={() => handleSimpanPekerjaan(p)}
                          className="btn btn-outline btn-success btn-xs"
                        >
                          💾
                        </button>
                        <button
                          onClick={() =>
                            handleDeletePekerjaan(kategori.id, p.id)
                          }
                          className="btn btn-outline btn-error btn-xs"
                        >
                          🗑
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={() => handleAddPekerjaan(kategori.id)}
                  className="btn btn-sm btn-primary"
                >
                  + Tambah Pekerjaan
                </button>
                <div className="font-bold text-gray-800">
                  Total Kategori: {formatRupiah(hitungTotalKategori(kategori))}
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* === TOTAL KESELURUHAN === */}
        {kategoriList.length > 0 && (
          <div className="text-right font-bold text-xl text-teal-700 mt-8">
            TOTAL SEMUA: {formatRupiah(totalSemua)}
          </div>
        )}
      </div>

      {/* === SIMPAN SEMUA DATA === */}
      {kategoriList.length > 0 && (
        <div className="text-right mt-8">
          <button onClick={handleSimpanSemua} className="btn btn-success">
            💾 Simpan Semua Data RAB
          </button>
        </div>
      )}
    </div>
  );
};

export default InputRABAdmin;
