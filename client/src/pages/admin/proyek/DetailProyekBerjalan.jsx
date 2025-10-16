import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { HiArrowLeft, HiDocumentText, HiFolder, HiUpload, HiChat } from "react-icons/hi";

const DetailProyekBerjalan = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Dummy data proyek
  const proyek = {
    id,
    nama: id === "1" ? "Renovasi Rumah Pak Budi" : "Pembangunan Rumah Ibu Sari",
    lokasi: id === "1" ? "Jl. Merdeka No.12" : "Jl. Melati No.7",
    tanggalMulai: "2025-10-01",
    tanggalSelesai: "2025-11-15",
    mandor: "Pak Anton",
    pengawas: "Pak Joko",
    status: "Sedang Berjalan",
    progress: 45,
    dokumen: ["https://placehold.co/200x150", "https://placehold.co/200x150"],
    revisi: [
      { id: 1, catatan: "Periksa kualitas pengecatan", tanggal: "2025-10-05" },
      { id: 2, catatan: "Tambahkan pagar sementara", tanggal: "2025-10-08" },
    ],
    catatanLapangan: [
      {
        id: 1,
        pengirim: "Pengawas",
        pesan: "Progress pondasi selesai.",
        lampiran: ["https://placehold.co/400"],
        waktu: "2025-10-03 09:00",
      },
      {
        id: 2,
        pengirim: "Admin",
        pesan: "Baik, pastikan foto berikutnya lengkap.",
        lampiran: [],
        waktu: "2025-10-03 10:00",
      },
    ],
  };

  const [chat, setChat] = useState(proyek.catatanLapangan);
  const [newPesan, setNewPesan] = useState("");
  const [newLampiran, setNewLampiran] = useState([]);

  const handleKirimPesan = () => {
    if (!newPesan && newLampiran.length === 0) return;

    const newChat = {
      id: chat.length + 1,
      pengirim: "Admin",
      pesan: newPesan,
      lampiran: newLampiran,
      waktu: new Date().toISOString().slice(0, 16).replace("T", " "),
    };
    setChat([...chat, newChat]);
    setNewPesan("");
    setNewLampiran([]);
  };

  const handleLampiranChange = (e) => {
    const files = Array.from(e.target.files);
    const urls = files.map((file) => URL.createObjectURL(file));
    setNewLampiran([...newLampiran, ...urls]);
  };

  const handleHapusLampiran = (index) => {
    setNewLampiran(newLampiran.filter((_, idx) => idx !== index));
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
      <p className="text-gray-600 mb-4">Pengawas: {proyek.pengawas}</p>

      {/* Progress Bar */}
      <div className="mb-4">
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

      {/* Catatan Lapangan (Chat) */}
      <section className="flex-1 flex flex-col">
        <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
          <HiChat /> Komunikasi Admin & Pengawas
        </h2>

        <div className="flex-1 overflow-y-auto mb-4 space-y-4 px-2">
          {chat.map((c) => (
            <div
              key={c.id}
              className={`p-3 rounded-lg shadow max-w-lg ${
                c.pengirim === "Admin" ? "bg-teal-100 self-end text-right" : "bg-white self-start text-left"
              }`}
            >
              <div className="text-sm text-gray-500 mb-1">{c.pengirim} - {c.waktu}</div>
              <div className="text-gray-700 whitespace-pre-wrap">{c.pesan}</div>
              {c.lampiran.length > 0 && (
                <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2">
                  {c.lampiran.map((img, idx) => (
                    <img key={idx} src={img} alt="Lampiran" className="w-full h-40 object-cover rounded shadow" />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Form balas admin */}
        <div className="bg-white p-4 rounded-lg shadow space-y-2">
          <textarea
            value={newPesan}
            onChange={(e) => setNewPesan(e.target.value)}
            placeholder="Tulis balasan..."
            className="w-full border border-gray-300 rounded p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
            rows={3}
          />
          <div className="flex items-center gap-2">
            <input
              type="file"
              multiple
              onChange={handleLampiranChange}
              className="border border-gray-300 rounded px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <HiUpload className="text-teal-600 text-2xl" />
          </div>
          {newLampiran.length > 0 && (
            <div className="flex gap-2 overflow-x-auto mb-2">
              {newLampiran.map((img, idx) => (
                <div key={idx} className="relative">
                  <img src={img} alt="Preview" className="w-32 h-32 object-cover rounded shadow" />
                  <button
                    onClick={() => handleHapusLampiran(idx)}
                    className="absolute top-1 right-1 bg-red-100 text-red-700 rounded p-1 hover:bg-red-200"
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          )}
          <button
            onClick={handleKirimPesan}
            className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded shadow"
          >
            Kirim Balasan
          </button>
        </div>
      </section>
    </div>
  );
};

export default DetailProyekBerjalan;
