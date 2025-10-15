import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { HiArrowLeft } from "react-icons/hi";

const DetailDokumentasiProyek = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Dummy data detail per proyek
  const [detailDokumen] = useState({
    id,
    namaProyek: id === "1" ? "Renovasi Rumah Pak Budi" : "Pembangunan Rumah Ibu Sari",
    tanggal: "2025-10-10",
    foto: [
      "https://placehold.co/400x300",
      "https://placehold.co/400x300",
      "https://placehold.co/400x300",
    ],
    deskripsi: "Dokumentasi progres pembangunan proyek secara lengkap dari awal sampai akhir.",
  });

  return (
    <div className="p-6">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-6 text-teal-700 hover:text-teal-900 font-medium"
      >
        <HiArrowLeft /> Kembali
      </button>

      <h1 className="text-2xl font-semibold text-gray-700 mb-3">{detailDokumen.namaProyek}</h1>
      <p className="text-gray-600 mb-6">Tanggal: {detailDokumen.tanggal}</p>
      <p className="text-gray-700 mb-6">{detailDokumen.deskripsi}</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {detailDokumen.foto.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`Dokumentasi ${idx + 1}`}
            className="w-full h-64 object-cover rounded shadow"
          />
        ))}
      </div>
    </div>
  );
};

export default DetailDokumentasiProyek;
