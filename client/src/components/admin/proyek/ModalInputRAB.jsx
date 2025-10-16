// client/src/components/admin/proyek/ModalInputRAB.jsx
import React, { useState } from "react";
import { HiX, HiPlus, HiTrash } from "react-icons/hi";

const ModalInputRAB = ({ proyek, onClose, onSave }) => {
  const [nama, setNama] = useState(proyek?.nama || "");
  const [kategoriList, setKategoriList] = useState(proyek?.kategori || []);

  const addKategori = () => {
    setKategoriList([
      ...kategoriList,
      { id: `KAT-${Date.now()}`, namaKategori: "", pekerjaanList: [], totalKategori: 0 },
    ]);
  };

  const removeKategori = (katId) => {
    setKategoriList(kategoriList.filter((k) => k.id !== katId));
  };

  const updateKategori = (katId, key, value) => {
    setKategoriList(
      kategoriList.map((k) =>
        k.id === katId ? { ...k, [key]: value } : k
      )
    );
  };

  const addPekerjaan = (katId) => {
    setKategoriList(
      kategoriList.map((k) =>
        k.id === katId
          ? {
              ...k,
              pekerjaanList: [
                ...k.pekerjaanList,
                {
                  id: `PKJ-${Date.now()}`,
                  namaPekerjaan: "",
                  uraian: "",
                  spesifikasi: "",
                  sat: "",
                  volume: 0,
                  hargaSatuan: 0,
                  total: 0,
                },
              ],
            }
          : k
      )
    );
  };

  const updatePekerjaan = (katId, pkjId, key, value) => {
    setKategoriList(
      kategoriList.map((k) =>
        k.id === katId
          ? {
              ...k,
              pekerjaanList: k.pekerjaanList.map((p) =>
                p.id === pkjId
                  ? {
                      ...p,
                      [key]: key === "volume" || key === "hargaSatuan" ? Number(value) : value,
                      total:
                        key === "volume"
                          ? value * p.hargaSatuan
                          : key === "hargaSatuan"
                          ? value * p.volume
                          : p.total,
                    }
                  : p
              ),
            }
          : k
      )
    );
  };

  const removePekerjaan = (katId, pkjId) => {
    setKategoriList(
      kategoriList.map((k) =>
        k.id === katId
          ? {
              ...k,
              pekerjaanList: k.pekerjaanList.filter((p) => p.id !== pkjId),
            }
          : k
      )
    );
  };

  const totalKeseluruhan = kategoriList.reduce(
    (sum, k) =>
      sum + k.pekerjaanList.reduce((s, p) => s + (p.total || 0), 0),
    0
  );

  const handleSave = () => {
    const dataRAB = {
      id: proyek?.id || `PRJ-${Date.now()}`,
      nama,
      kategori: kategoriList.map((k) => ({
        ...k,
        totalKategori: k.pekerjaanList.reduce((s, p) => s + (p.total || 0), 0),
      })),
      totalKeseluruhan,
    };
    onSave(dataRAB);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl shadow-xl w-11/12 md:w-4/5 lg:w-3/4 max-h-[90vh] overflow-y-auto p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition"
        >
          <HiX size={24} />
        </button>

        {/* Header */}
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Input RAB</h2>
        <hr className="mb-6 border-gray-200" />

        {/* Nama Proyek */}
        <div className="mb-4">
          <label className="font-medium">Nama Proyek:</label>
          <input
            type="text"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
          />
        </div>

        {/* Kategori */}
        <div className="space-y-6">
          {kategoriList.map((kat) => (
            <div key={kat.id} className="border p-4 rounded-lg bg-gray-50">
              <div className="flex justify-between items-center mb-2">
                <input
                  type="text"
                  placeholder="Nama Kategori"
                  value={kat.namaKategori}
                  onChange={(e) => updateKategori(kat.id, "namaKategori", e.target.value)}
                  className="border border-gray-300 rounded px-2 py-1 w-2/3"
                />
                <button
                  onClick={() => removeKategori(kat.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <HiTrash />
                </button>
              </div>

              {/* Pekerjaan */}
              <div className="space-y-2">
                {kat.pekerjaanList.map((p) => (
                  <div key={p.id} className="grid grid-cols-2 md:grid-cols-4 gap-2 items-end">
                    <input
                      type="text"
                      placeholder="Nama Pekerjaan"
                      value={p.namaPekerjaan}
                      onChange={(e) => updatePekerjaan(kat.id, p.id, "namaPekerjaan", e.target.value)}
                      className="border border-gray-300 rounded px-2 py-1"
                    />
                    <input
                      type="text"
                      placeholder="Uraian"
                      value={p.uraian}
                      onChange={(e) => updatePekerjaan(kat.id, p.id, "uraian", e.target.value)}
                      className="border border-gray-300 rounded px-2 py-1"
                    />
                    <input
                      type="number"
                      placeholder="Volume"
                      value={p.volume}
                      onChange={(e) => updatePekerjaan(kat.id, p.id, "volume", e.target.value)}
                      className="border border-gray-300 rounded px-2 py-1"
                    />
                    <input
                      type="number"
                      placeholder="Harga Satuan"
                      value={p.hargaSatuan}
                      onChange={(e) => updatePekerjaan(kat.id, p.id, "hargaSatuan", e.target.value)}
                      className="border border-gray-300 rounded px-2 py-1"
                    />
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Total: {p.total?.toLocaleString("id-ID")}</span>
                      <button
                        onClick={() => removePekerjaan(kat.id, p.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <HiTrash />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => addPekerjaan(kat.id)}
                className="mt-2 flex items-center gap-1 px-3 py-1 bg-teal-600 text-white rounded hover:bg-teal-700"
              >
                <HiPlus /> Tambah Pekerjaan
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={addKategori}
          className="mt-4 flex items-center gap-1 px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600"
        >
          <HiPlus /> Tambah Kategori
        </button>

        {/* Footer */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2 border border-gray-300 rounded hover:bg-gray-100"
          >
            Batal
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
          >
            Simpan
          </button>
        </div>

        {/* Total Keseluruhan */}
        <div className="mt-4 text-right font-semibold">
          Total Keseluruhan: {totalKeseluruhan.toLocaleString("id-ID")}
        </div>
      </div>
    </div>
  );
};

export default ModalInputRAB;
