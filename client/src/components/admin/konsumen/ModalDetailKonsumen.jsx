import React, { useState, useEffect } from "react";
import { HiX } from "react-icons/hi";
import axios from "axios";

const ModalDetailKonsumen = ({ isOpen, onClose, konsumen }) => {
  const [perusahaan, setPerusahaan] = useState(null);
  const [pjw, setPjw] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen || !konsumen) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        if (konsumen.jenis_konsumen === "Perusahaan" && konsumen.id_perusahaan) {
          const res = await axios.get(`http://localhost:3000/perusahaan/${konsumen.id_perusahaan}`);
          setPerusahaan(res.data.data || null);
        } else if (konsumen.jenis_konsumen === "Perseorangan" && konsumen.id_penanggung_jawab) {
          const res = await axios.get(`http://localhost:3000/penanggung-jawab/${konsumen.id_penanggung_jawab}`);
          setPjw(res.data.data || null);
        }
      } catch (err) {
        console.error("Gagal memuat data relasi:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isOpen, konsumen]);

  if (!isOpen || !konsumen) return null;

  // Field utama konsumen
  const mainFields = [
    { label: "ID Konsumen", value: konsumen.id_konsumen },
    { label: "ID Perusahaan", value: konsumen.id_perusahaan },
    { label: "ID Penanggung Jawab", value: konsumen.id_penanggung_jawab },
    { label: "Nama Lengkap", value: konsumen.nama_lengkap },
    { label: "Email", value: konsumen.email },
    { label: "Nomor Telepon", value: konsumen.nomor_telepon },
    { label: "Jenis Kelamin", value: konsumen.jenis_kelamin },
    { label: "Tanggal Lahir", value: konsumen.tanggal_lahir },
    { label: "Nomor Identitas", value: konsumen.nomor_identitas },
    { label: "Nama Perusahaan", value: konsumen.nama_perusahaan },
    { label: "Bidang Usaha", value: konsumen.bidang_usaha },
    { label: "Jabatan / Pekerjaan", value: konsumen.jabatan_pekerjaan },
    { label: "NPWP", value: konsumen.npwp },
    { label: "Alamat", value: konsumen.alamat },
    { label: "Foto URL", value: konsumen.foto },
    { label: "Created At", value: konsumen.created_at },
    { label: "Updated At", value: konsumen.updated_at },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-5xl p-6 relative overflow-y-auto max-h-[90vh]">
        <button
          className="absolute top-4 right-4 btn btn-ghost p-2"
          onClick={onClose}
        >
          <HiX className="w-6 h-6" />
        </button>

        {loading ? (
          <p className="text-center text-gray-500">Memuat data...</p>
        ) : (
          <>
            {/* Header */}
            <div className="flex gap-4 items-center mb-6">
              <img
                src={konsumen.foto || "https://img.daisyui.com/images/profile/demo/superperson@192.webp"}
                alt="Foto Konsumen"
                className="w-28 h-28 object-cover rounded-lg border"
              />
              <div>
                <h2 className="text-2xl font-semibold">
                  {konsumen.nama_lengkap || "-"}
                </h2>
                <p className="text-gray-500">
                  Jenis Konsumen: {konsumen.jenis_konsumen}
                </p>
              </div>
            </div>

            {/* Data Konsumen */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-700">
              {mainFields.map((f) => (
                <p key={f.label}>
                  <strong>{f.label}:</strong> {f.value ?? "-"}
                </p>
              ))}
            </div>

            {/* Data Relasi */}
            {konsumen.jenis_konsumen === "Perusahaan" && perusahaan && (
              <>
                <h3 className="mt-6 font-semibold text-lg border-t pt-3">
                  Data Perusahaan
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-700">
                  {Object.entries(perusahaan).map(([key, val]) => (
                    <p key={key}>
                      <strong>{key.replaceAll("_", " ").replace(/\b\w/g, c => c.toUpperCase())}:</strong> {val ?? "-"}
                    </p>
                  ))}
                </div>
              </>
            )}

            {konsumen.jenis_konsumen === "Perseorangan" && pjw && (
              <>
                <h3 className="mt-6 font-semibold text-lg border-t pt-3">
                  Data Penanggung Jawab
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-700">
                  {Object.entries(pjw).map(([key, val]) => (
                    <p key={key}>
                      <strong>{key.replaceAll("_", " ").replace(/\b\w/g, c => c.toUpperCase())}:</strong> {val ?? "-"}
                    </p>
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ModalDetailKonsumen;
