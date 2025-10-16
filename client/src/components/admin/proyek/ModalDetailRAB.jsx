// client/src/components/admin/proyek/ModalDetailRAB.jsx
import React from "react";
import { HiX } from "react-icons/hi";

const ModalDetailRAB = ({ proyek, onClose }) => {
  if (!proyek) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl shadow-xl w-11/12 md:w-3/4 lg:w-1/2 max-h-[90vh] overflow-y-auto p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition"
        >
          <HiX size={24} />
        </button>

        {/* Header */}
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Detail RAB Proyek</h2>
        <hr className="mb-6 border-gray-200" />

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
          <div>
            <p className="font-medium">Kode Proyek:</p>
            <p>{proyek.kode_proyek}</p>
          </div>
          <div>
            <p className="font-medium">Nama Proyek:</p>
            <p>{proyek.nama_proyek}</p>
          </div>
          <div>
            <p className="font-medium">Jenis Proyek:</p>
            <p>{proyek.jenis_proyek}</p>
          </div>
          <div>
            <p className="font-medium">Status Pembayaran:</p>
            <p>{proyek.status_pembayaran}</p>
          </div>
          <div>
            <p className="font-medium">Metode Pembayaran:</p>
            <p>{proyek.metode_pembayaran}</p>
          </div>
          <div>
            <p className="font-medium">Nilai Proyek:</p>
            <p>{proyek.nilai_proyek?.toLocaleString("id-ID") || "-"}</p>
          </div>
          <div>
            <p className="font-medium">Total RAB:</p>
            <p>{proyek.total_rab?.toLocaleString("id-ID") || "-"}</p>
          </div>
          <div>
            <p className="font-medium">Prioritas:</p>
            <p>{proyek.prioritas}</p>
          </div>
          <div className="md:col-span-2">
            <p className="font-medium">Alamat:</p>
            <p>{proyek.alamat_lengkap}</p>
          </div>
          <div className="md:col-span-2">
            <p className="font-medium">Catatan:</p>
            <p>{proyek.catatan || "-"}</p>
          </div>
          <div className="md:col-span-2">
            <p className="font-medium mb-1">Progress:</p>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className={`h-4 rounded-full transition-all ${
                  proyek.progress === 100
                    ? "bg-green-600"
                    : proyek.progress >= 50
                    ? "bg-yellow-400"
                    : "bg-red-500"
                }`}
                style={{ width: `${proyek.progress || 0}%` }}
              ></div>
            </div>
            <p className="text-sm mt-1">{proyek.progress || 0}%</p>
          </div>
          <div className="md:col-span-2">
            <p className="font-medium mb-1">List RAB:</p>
            <p>{proyek.list_rab && proyek.list_rab.length > 0 ? proyek.list_rab.join(", ") : "-"}</p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalDetailRAB;
