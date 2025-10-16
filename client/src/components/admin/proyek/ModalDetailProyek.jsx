// client/src/components/admin/proyek/ModalDetailProyek.jsx
import React from "react";
import { HiX } from "react-icons/hi";

const ModalDetailProyek = ({ proyek, onClose }) => {
  const isFilled = (value) =>
    value && value !== "Belum penunjukan" && value !== "Belum tender" && value !== "draft" && value !== "";

  const getRABColor = (status) => {
    if (status === "draft") return "bg-red-100 text-red-700";
    if (status === "Proses") return "bg-yellow-100 text-yellow-700";
    if (status === "Selesai") return "bg-green-100 text-green-700";
    return "bg-gray-100 text-gray-500";
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-11/12 md:w-2/3 lg:w-1/2 rounded-xl shadow-lg p-6 relative overflow-y-auto max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-600 hover:text-gray-800"
        >
          <HiX size={24} />
        </button>

        <h2 className="text-2xl font-semibold mb-6 text-center">{proyek.nama}</h2>

        {/* Grid layout for sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Informasi Dasar */}
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm space-y-2">
            <h3 className="font-semibold text-gray-700 mb-2">Informasi Proyek</h3>
            <p className={isFilled(proyek.nilai) ? "text-green-600" : "text-red-600"}>
              Nilai Proyek: {proyek.nilai ? proyek.nilai.toLocaleString("id-ID") : "Belum diisi"}
            </p>
            <p className={isFilled(proyek.pemilik) ? "text-green-600" : "text-red-600"}>
              Pemilik: {proyek.pemilik || "Belum diisi"}
            </p>
            <p className={isFilled(proyek.lokasi) ? "text-green-600" : "text-red-600"}>
              Lokasi: {proyek.lokasi || "Belum diisi"}
            </p>
            <p className={isFilled(proyek.mandor) ? "text-green-600" : "text-red-600"}>
              Mandor: {proyek.mandor}
            </p>
            <p className={isFilled(proyek.pengawas) ? "text-green-600" : "text-red-600"}>
              Pengawas: {proyek.pengawas}
            </p>
            <p>
              RAB: <span className={`px-2 py-1 rounded-full text-sm ${getRABColor(proyek.rab)}`}>{proyek.rab}</span>
            </p>
          </div>

          {/* Dokumen */}
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm space-y-2">
            <h3 className="font-semibold text-gray-700 mb-2">Dokumen</h3>
            <p className={proyek.dokumen.rab === "Sudah upload" ? "text-green-600" : "text-red-600"}>
              Dokumen RAB: {proyek.dokumen.rab}
            </p>
            {proyek.dokumen.rab === "Sudah upload" && (
              <img
                src={proyek.dokumen.rab}
                alt="RAB"
                className="w-full h-40 object-cover rounded shadow-sm"
              />
            )}
            <p className={proyek.dokumen.gambarKerja === "Sudah upload" ? "text-green-600" : "text-red-600"}>
              Gambar Kerja: {proyek.dokumen.gambarKerja}
            </p>
            {proyek.dokumen.gambarKerja === "Sudah upload" && (
              <img
                src={proyek.dokumen.gambarKerja}
                alt="Gambar Kerja"
                className="w-full h-40 object-cover rounded shadow-sm"
              />
            )}
          </div>
        </div>

        {/* Progress */}
        <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow-sm">
          <h3 className="font-semibold text-gray-700 mb-2">Progress Proyek</h3>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className={`h-4 rounded-full ${
                proyek.progress === 100
                  ? "bg-green-600"
                  : proyek.progress >= 50
                  ? "bg-yellow-400"
                  : "bg-red-500"
              }`}
              style={{ width: `${proyek.progress}%` }}
            ></div>
          </div>
          <span className="text-sm">{proyek.progress}%</span>
        </div>
      </div>
    </div>
  );
};

export default ModalDetailProyek;
