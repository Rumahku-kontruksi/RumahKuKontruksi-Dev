import React from "react";
import { HiX } from "react-icons/hi";

const ModalDetailKonsumen = ({ isOpen, onClose, konsumen }) => {
  if (!isOpen || !konsumen) return null;

  // Tentukan jenis konsumen
  const jenisKonsumen = konsumen.jenis_konsumen?.startsWith("PR") ? "Perseorangan" : "Perusahaan";

  // Field untuk masing-masing jenis
  const fieldsPerseorangan = {
    nama_lengkap: "Nama Lengkap",
    email: "Email",
    nomor_telepon: "Nomor Telepon",
    alamat_rumah: "Alamat",
    jenis_kelamin: "Jenis Kelamin",
    tanggal_lahir: "Tanggal Lahir",
    nomor_identitas: "Nomor Identitas (NIK)",
  };

  const fieldsPerusahaan = {
    nama_perusahaan: "Nama Perusahaan",
    bidang_usaha: "Bidang Usaha",
    jabatan_pekerjaan: "Jabatan",
    npwp: "NPWP",
    email: "Email",
    nomor_telepon: "Nomor Telepon",
    alamat_kantor: "Alamat Kantor",
  };

  const formatValue = (key, value) => {
    if (!value) return "-";
    if (key === "tanggal_lahir") return new Date(value).toLocaleDateString("id-ID");
    if (key === "jenis_kelamin") return value;
    if (key === "foto") return <img src={value} alt="Foto" className="w-32 h-32 object-cover rounded-md border" />;
    return value;
  };

  const fieldList = jenisKonsumen === "Perseorangan" ? fieldsPerseorangan : fieldsPerusahaan;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-4xl p-6 relative overflow-y-auto max-h-[90vh]">
        <button className="absolute top-4 right-4 btn btn-ghost p-2" onClick={onClose}>
          <HiX className="w-6 h-6" />
        </button>

        <div className="flex gap-4 items-center mb-4">
          {konsumen.foto && (
            <img
              src={konsumen.foto || "https://img.daisyui.com/images/profile/demo/superperson@192.webp"}
              alt="Foto"
              className="w-32 h-32 object-cover rounded-md border"
            />
          )}
          <h2 className="text-2xl font-bold">{konsumen.nama_lengkap || konsumen.nama_perusahaan}</h2>
        </div>

        <p className="font-semibold mb-4">Jenis Konsumen: {jenisKonsumen}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
          {Object.entries(fieldList).map(([key, label]) => (
            <p key={key}>
              <strong>{label}:</strong> {formatValue(key, konsumen[key])}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModalDetailKonsumen;
