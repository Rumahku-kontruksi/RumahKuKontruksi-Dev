// client/src/pages/admin/RencanaAnggaran.jsx
import React, { useState } from "react";
import {
  HiDocumentText,
  HiPlus,
  HiEye,
  HiTrash,
  HiDownload,
  HiX,
} from "react-icons/hi";

const RencanaAnggaran = () => {
  const [dataRAB, setDataRAB] = useState([
    {
      id: 1,
      namaProyek: "Renovasi Rumah Pak Budi",
      konsumen: "Budi Santoso",
      totalBiaya: 125000000,
      status: "Disetujui",
      detail: [
        { nama: "Pondasi", volume: 10, satuan: "m³", harga: 1500000 },
        { nama: "Dinding Bata", volume: 120, satuan: "m²", harga: 95000 },
        { nama: "Plafon Gypsum", volume: 80, satuan: "m²", harga: 85000 },
      ],
    },
    {
      id: 2,
      namaProyek: "Pembangunan Rumah Ibu Sari",
      konsumen: "Sari Wulandari",
      totalBiaya: 98000000,
      status: "Menunggu Persetujuan",
      detail: [
        { nama: "Pekerjaan Tanah", volume: 15, satuan: "m³", harga: 1200000 },
        { nama: "Kolom Beton", volume: 25, satuan: "m³", harga: 1750000 },
      ],
    },
  ]);

  const [selectedRAB, setSelectedRAB] = useState(null);

  const formatRupiah = (num) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(num);
  };

  const handleOpenDetail = (rab) => {
    setSelectedRAB(rab);
  };

  const handleCloseDetail = () => {
    setSelectedRAB(null);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-700 flex items-center gap-2">
          <HiDocumentText className="text-teal-600" /> Rencana Anggaran Biaya (RAB)
        </h1>
        <button className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg shadow">
          <HiPlus /> Tambah RAB
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-teal-600 text-white">
            <tr>
              <th className="px-6 py-3">No</th>
              <th className="px-6 py-3">Nama Proyek</th>
              <th className="px-6 py-3">Konsumen</th>
              <th className="px-6 py-3">Total Biaya</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {dataRAB.map((item, index) => (
              <tr
                key={item.id}
                className={`border-b hover:bg-gray-50 transition ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                <td className="px-6 py-3">{index + 1}</td>
                <td className="px-6 py-3 font-medium">{item.namaProyek}</td>
                <td className="px-6 py-3">{item.konsumen}</td>
                <td className="px-6 py-3">{formatRupiah(item.totalBiaya)}</td>
                <td
                  className={`px-6 py-3 font-semibold ${
                    item.status === "Disetujui"
                      ? "text-green-600"
                      : item.status === "Menunggu Persetujuan"
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  {item.status}
                </td>
                <td className="px-6 py-3 flex justify-center gap-3">
                  <button
                    onClick={() => handleOpenDetail(item)}
                    className="p-2 bg-teal-100 text-teal-700 rounded hover:bg-teal-200"
                    title="Lihat Detail"
                  >
                    <HiEye />
                  </button>
                  <button
                    className="p-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                    title="Export PDF"
                  >
                    <HiDownload />
                  </button>
                  <button
                    className="p-2 bg-red-100 text-red-700 rounded hover:bg-red-200"
                    title="Hapus"
                  >
                    <HiTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Detail */}
      {selectedRAB && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white w-[90%] md:w-[700px] rounded-xl shadow-lg p-6 relative">
            {/* Close Button */}
            <button
              onClick={handleCloseDetail}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
            >
              <HiX size={22} />
            </button>

            {/* Header Modal */}
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-teal-700">
              <HiDocumentText /> Detail RAB - {selectedRAB.namaProyek}
            </h2>
            <p className="text-gray-600 mb-3">
              Konsumen: <span className="font-medium">{selectedRAB.konsumen}</span>
            </p>

            {/* Detail Table */}
            <table className="min-w-full text-sm text-gray-700 border">
              <thead className="bg-teal-600 text-white">
                <tr>
                  <th className="px-4 py-2">No</th>
                  <th className="px-4 py-2">Uraian Pekerjaan</th>
                  <th className="px-4 py-2">Volume</th>
                  <th className="px-4 py-2">Satuan</th>
                  <th className="px-4 py-2">Harga Satuan</th>
                  <th className="px-4 py-2">Jumlah</th>
                </tr>
              </thead>
              <tbody>
                {selectedRAB.detail.map((item, idx) => (
                  <tr
                    key={idx}
                    className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}
                  >
                    <td className="px-4 py-2 text-center">{idx + 1}</td>
                    <td className="px-4 py-2">{item.nama}</td>
                    <td className="px-4 py-2 text-center">{item.volume}</td>
                    <td className="px-4 py-2 text-center">{item.satuan}</td>
                    <td className="px-4 py-2 text-right">
                      {formatRupiah(item.harga)}
                    </td>
                    <td className="px-4 py-2 text-right">
                      {formatRupiah(item.volume * item.harga)}
                    </td>
                  </tr>
                ))}
                <tr className="bg-gray-100 font-semibold">
                  <td colSpan={5} className="px-4 py-2 text-right">
                    Total Biaya:
                  </td>
                  <td className="px-4 py-2 text-right text-teal-700">
                    {formatRupiah(
                      selectedRAB.detail.reduce(
                        (sum, i) => sum + i.volume * i.harga,
                        0
                      )
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default RencanaAnggaran;
