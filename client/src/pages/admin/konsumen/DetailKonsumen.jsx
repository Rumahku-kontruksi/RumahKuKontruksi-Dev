// client/src/pages/admin/konsumen/DetailKonsumen.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { HiArrowLeft } from "react-icons/hi";
import konsumenData from "../../../data/mockKonsumen.json";

const DetailKonsumen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [konsumen, setKonsumen] = useState(null);

  useEffect(() => {
    const found = konsumenData.find((k) => k.id === id);
    setKonsumen(found || null);
  }, [id]);

  if (!konsumen) {
    return (
      <div className="p-6">
        <button
          className="btn btn-ghost mb-4 flex items-center gap-2"
          onClick={() => navigate(-1)}
        >
          <HiArrowLeft /> Kembali
        </button>
        <p className="text-gray-500">Konsumen tidak ditemukan.</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-xl shadow-md max-w-4xl mx-auto">
      <button
        className="btn btn-ghost mb-6 flex items-center gap-2"
        onClick={() => navigate(-1)}
      >
        <HiArrowLeft /> Kembali
      </button>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Foto */}
        <div className="w-48 h-48 flex-shrink-0">
          <img
            src={konsumen.foto}
            alt={konsumen.nama_lengkap || konsumen.nama_perusahaan}
            className="w-full h-full object-cover rounded-xl border"
          />
        </div>

        {/* Info */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-2">
            {konsumen.nama_lengkap || konsumen.nama_perusahaan}
          </h2>
          <p className="text-gray-600 mb-4">
            <strong>Jenis Konsumen:</strong> {konsumen.jenis_konsumen}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-gray-700">
            {/* Informasi Personal */}
            {konsumen.tanggal_lahir && (
              <p>
                <strong>Tanggal Lahir:</strong> {konsumen.tanggal_lahir}
              </p>
            )}
            {konsumen.jenis_kelamin && (
              <p>
                <strong>Jenis Kelamin:</strong> {konsumen.jenis_kelamin}
              </p>
            )}
            <p>
              <strong>Email:</strong> {konsumen.email}
            </p>
            <p>
              <strong>Telepon:</strong> {konsumen.nomor_telepon}
            </p>
            <p className="col-span-2">
              <strong>Alamat:</strong> {konsumen.alamat}
            </p>
            <p className="col-span-2">
              <strong>Alamat Pengiriman:</strong> {konsumen.alamat_pengiriman}
            </p>
            <p className="col-span-2">
              <strong>ID Proyek:</strong>{" "}
              {konsumen.id_proyek && konsumen.id_proyek.length > 0
                ? konsumen.id_proyek.join(", ")
                : "-"}
            </p>

            {/* Informasi Perusahaan */}
            {konsumen.jenis_konsumen === "Perusahaan" && (
              <>
                <p>
                  <strong>Nama Perusahaan:</strong> {konsumen.nama_perusahaan}
                </p>
                <p>
                  <strong>Bidang Usaha:</strong> {konsumen.bidang_usaha}
                </p>
                <p>
                  <strong>Jabatan Kontak:</strong> {konsumen.jabatan_kontak}
                </p>
                <p>
                  <strong>NPWP Perusahaan:</strong> {konsumen.npwp_perusahaan}
                </p>
              </>
            )}

            {/* Informasi Identitas */}
            {konsumen.nomor_identitas && (
              <p className="col-span-2">
                <strong>Nomor Identitas:</strong> {konsumen.nomor_identitas}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailKonsumen;
