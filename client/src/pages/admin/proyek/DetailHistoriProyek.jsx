// client/src/pages/admin/proyek/DetailHistoriProyek.jsx

import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { HiArrowLeft, HiDocumentText, HiFolder, HiClock } from "react-icons/hi";

const DetailHistoriProyek = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Dummy data histori proyek
  const proyek = {
    id,
    nama: id === "1" ? "Renovasi Rumah Pak Budi" : "Pembangunan Rumah Ibu Sari",
    lokasi: id === "1" ? "Jl. Merdeka No.12" : "Jl. Melati No.7",
    tanggalMulai: "2025-07-01",
    tanggalSelesai: "2025-08-15",
    mandor: "Pak Anton",
    pengawas: "Pak Joko",
    status: "Selesai",
    progress: 100,
    dokumen: [
      "https://placehold.co/200x150",
      "https://placehold.co/200x150",
      "https://placehold.co/200x150",
    ],
    revisi: [
      { id: 1, catatan: "Periksa kualitas pengecatan", tanggal: "2025-07-05" },
      { id: 2, catatan: "Tambahkan pagar sementara", tanggal: "2025-07-08" },
    ],
    laporanAkhir: [
      { id: 1, nama: "Laporan Keuangan", link: "https://placehold.co/400x300" },
      { id: 2, nama: "Laporan Progress", link: "https://placehold.co/400x300" },
    ],
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen flex flex-col">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-4 text-teal-700 hover:text-teal-900 font-medium"
      >
        <HiArrowLeft /> Kembali
      </button>

      <h1 className="text-2xl font-semibold text-gray-700 mb-2">{proyek.nama}</h1>
      <p className="text-gray-600 mb-1">Lokasi: {proyek.lokasi}</p>
      <p className="text-gray-600 mb-1">
        Durasi: {proyek.tanggalMulai} - {proyek.tanggalSelesai}
      </p>
      <p className="text-gray-600 mb-1">Mandor: {proyek.mandor}</p>
      <p className="text-gray-600 mb-1">Pengawas: {proyek.pengawas}</p>
      <p className="text-gray-600 mb-4">Status: {proyek.status}</p>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className="bg-teal-600 h-4 rounded-full"
            style={{ width: `${proyek.progress}%` }}
          ></div>
        </div>
        <span className="text-sm text-gray-700">{proyek.progress}% selesai</span>
      </div>

      {/* Dokumentasi */}
      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
          <HiFolder /> Dokumentasi Proyek
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {proyek.dokumen.map((doc, idx) => (
            <img key={idx} src={doc} alt={`Dokumen ${idx + 1}`} className="w-full h-32 object-cover rounded shadow" />
          ))}
        </div>
      </section>

      {/* Revisi */}
      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
          <HiDocumentText /> Revisi Proyek
        </h2>
        <ul className="space-y-1">
          {proyek.revisi.map((rev) => (
            <li key={rev.id} className="bg-white p-3 rounded shadow flex justify-between items-center">
              <span>{rev.tanggal}: {rev.catatan}</span>
              <button
                onClick={() => alert("Detail revisi (placeholder)")}
                className="text-teal-600 hover:text-teal-800"
              >
                Lihat Detail
              </button>
            </li>
          ))}
        </ul>
      </section>

      {/* Laporan Akhir */}
      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
          <HiClock /> Laporan Akhir
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {proyek.laporanAkhir.map((lap) => (
            <div key={lap.id} className="bg-white p-3 rounded shadow flex flex-col items-start">
              <span className="font-medium">{lap.nama}</span>
              <img src={lap.link} alt={lap.nama} className="mt-2 w-full h-48 object-cover rounded shadow" />
              <a
                href={lap.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 text-teal-600 hover:text-teal-800"
              >
                Unduh / Lihat
              </a>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default DetailHistoriProyek;
