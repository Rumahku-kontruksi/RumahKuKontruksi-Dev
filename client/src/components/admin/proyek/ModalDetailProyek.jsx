// client/src/components/admin/proyek/ModalDetailProyek.jsx
import React from "react";
import { HiX } from "react-icons/hi";

const ModalDetailProyek = ({ proyek, onClose }) => {
  if (!proyek) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start pt-20 z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-3xl p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <HiX size={24} />
        </button>

        <h2 className="text-xl font-semibold mb-4">Detail Proyek</h2>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600 font-medium">ID Proyek</p>
            <p>{proyek.id_proyek}</p>
          </div>

          <div>
            <p className="text-gray-600 font-medium">Nama Proyek</p>
            <p>{proyek.nama_proyek}</p>
          </div>

          <div>
            <p className="text-gray-600 font-medium">Konsumen</p>
            <p>{proyek.konsumenNama || "-"}</p>
          </div>

          <div>
            <p className="text-gray-600 font-medium">Mandor</p>
            <p>{proyek.mandorNama || "-"}</p>
          </div>

          <div>
            <p className="text-gray-600 font-medium">Pengawas</p>
            <p>{proyek.pengawasNama || "-"}</p>
          </div>
          <div>
            <p className="text-gray-600 font-medium">RAB</p>
            <p>{proyek.id_rab || "-"}</p>
          </div>

          <div>
            <p className="text-gray-600 font-medium">Alamat</p>
            <p>{proyek.alamat || "-"}</p>
          </div>

          <div>
            <p className="text-gray-600 font-medium">Lokasi</p>
            <p>{proyek.lokasi || "-"}</p>
          </div>

          <div>
            <p className="text-gray-600 font-medium">Tanggal Mulai</p>
            <p>{proyek.tanggal_mulai || "-"}</p>
          </div>

          <div>
            <p className="text-gray-600 font-medium">Tanggal Selesai</p>
            <p>{proyek.tanggal_selesai || "-"}</p>
          </div>

          <div>
            <p className="text-gray-600 font-medium">Status Proyek</p>
            <p>{proyek.status_proyek || "-"}</p>
          </div>

          <div>
            <p className="text-gray-600 font-medium">Anggaran</p>
            <p>{proyek.anggaran?.toLocaleString("id-ID") || "-"}</p>
          </div>

          <div className="col-span-2">
            <p className="text-gray-600 font-medium">Catatan</p>
            <p>{proyek.catatan || "-"}</p>
          </div>

          <div>
            <p className="text-gray-600 font-medium">Created By</p>
            <p>{proyek.created_by || "-"}</p>
          </div>

          <div>
            <p className="text-gray-600 font-medium">Updated By</p>
            <p>{proyek.updated_by || "-"}</p>
          </div>

          <div>
            <p className="text-gray-600 font-medium">Created At</p>
            <p>{proyek.created_at || "-"}</p>
          </div>

          <div>
            <p className="text-gray-600 font-medium">Updated At</p>
            <p>{proyek.updated_at || "-"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalDetailProyek;
