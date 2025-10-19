// client/src/components/admin/konsumen/ModalDetailBelumLengkap.jsx
import React from "react";

const ModalDetailBelumLengkap = ({ isOpen, onClose, konsumen }) => {
  if (!isOpen || !konsumen) return null;

  const importantColumns = [
    { key: "jenis_konsumen", label: "Jenis Konsumen" },
    { key: "id_perusahaan", label: "ID Perusahaan" },
    { key: "nama_perusahaan", label: "Nama Perusahaan" },
    { key: "id_penanggung_jawab", label: "ID Penanggung Jawab" },
    { key: "nama_lengkap", label: "Nama Lengkap" },
    { key: "email", label: "Email" },
    { key: "nomor_telepon", label: "Nomor Telepon" },
    { key: "alamat", label: "Alamat" },
    { key: "tanggal_lahir", label: "Tanggal Lahir" },
    { key: "npwp", label: "NPWP" },
    { key: "jabatan_pekerjaan", label: "Jabatan / Pekerjaan" },
    { key: "bidang_usaha", label: "Bidang Usaha" },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/2 p-6 relative">
        <h2 className="text-xl font-bold mb-4">Detail Konsumen</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {importantColumns.map((col) => (
            <div key={col.key} className="flex flex-col">
              <span className="font-semibold">{col.label}</span>
              <span
                className={`mt-1 p-1 rounded ${
                  !konsumen[col.key] ? "bg-red-100 text-red-600" : ""
                }`}
              >
                {konsumen[col.key] || "-"}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button className="btn btn-secondary" onClick={onClose}>
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalDetailBelumLengkap;
