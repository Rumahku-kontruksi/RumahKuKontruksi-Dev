import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { HiArrowLeft, HiUpload, HiPaperAirplane } from "react-icons/hi";

const DetailCatatanLapangan = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Dummy chat awal dari pengawas
  const [chat, setChat] = useState([
    {
      id: 1,
      pengirim: "Pengawas",
      pesan: "Progress pengecatan lantai selesai, material sudah diterima.",
      lampiran: ["https://placehold.co/400"],
      waktu: "2025-10-12 09:30",
    },
    {
      id: 2,
      pengirim: "Admin",
      pesan: "Baik, pastikan foto sebelum dan sesudah pengecatan dikirim besok.",
      lampiran: [],
      waktu: "2025-10-12 10:00",
    },
  ]);

  const [newPesan, setNewPesan] = useState("");
  const [newLampiran, setNewLampiran] = useState([]);

  // Kirim pesan admin
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

  // Handle lampiran baru upload
  const handleLampiranChange = (e) => {
    const files = Array.from(e.target.files);
    const urls = files.map((file) => URL.createObjectURL(file));
    setNewLampiran([...newLampiran, ...urls]);
  };

  // Hapus lampiran sebelum dikirim
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

      <h1 className="text-2xl font-semibold text-gray-700 mb-4">Detail Catatan Lapangan</h1>

      {/* Chat area */}
      <div className="flex-1 overflow-y-auto mb-4 space-y-4 px-2">
        {chat.map((c) => (
          <div
            key={c.id}
            className={`p-3 rounded-lg shadow max-w-lg ${
              c.pengirim === "Admin"
                ? "bg-teal-100 self-end text-right"
                : "bg-white self-start text-left"
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
                  <HiTrash />
                </button>
              </div>
            ))}
          </div>
        )}
        <button
          onClick={handleKirimPesan}
          className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded shadow"
        >
          <HiPaperAirplane /> Kirim Balasan
        </button>
      </div>
    </div>
  );
};

export default DetailCatatanLapangan;
