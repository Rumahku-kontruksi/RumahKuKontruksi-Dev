// client/src/pages/mandor/DaftarProyekMandor.jsx
import React from "react";
import { HiClipboardList, HiDocumentText, HiPhotograph } from "react-icons/hi";

const DaftarProyekMandor = () => {
  // Data dummy proyek yang siap diambil
  const proyekTersedia = [
    {
      nama: "Renovasi Rumah Pak Budi",
      lokasi: "Jl. Merdeka No. 12, Jakarta",
      anggaran: "Rp 50.000.000",
      keterangan: "Renovasi rumah tinggal 2 lantai",
      gambar: "https://placehold.co/600x400",
    },
    {
      nama: "Bangun Ruko Bu Sari",
      lokasi: "Jl. Raya Bogor No. 45, Depok",
      anggaran: "Rp 120.000.000",
      keterangan: "Pembangunan ruko 3 lantai",
      gambar: "https://placehold.co/600x400",
    },
    {
      nama: "Pondasi Villa Pak Andi",
      lokasi: "Jl. Puncak Indah No. 7, Bogor",
      anggaran: "Rp 80.000.000",
      keterangan: "Pekerjaan pondasi villa 1 lantai",
      gambar: "https://placehold.co/600x400",
    },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Daftar Proyek Tersedia</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {proyekTersedia.map((p, idx) => (
          <div
            key={idx}
            className="card bg-white shadow-md rounded-xl overflow-hidden hover:shadow-xl transition"
          >
            {/* Gambar proyek */}
            <img src={p.gambar} alt={p.nama} className="w-full h-48 object-cover" />

            <div className="p-6 space-y-3">
              <h3 className="text-xl font-bold text-gray-800">{p.nama}</h3>
              <p className="text-gray-600"><span className="font-semibold">Alamat:</span> {p.lokasi}</p>
              <p className="text-gray-600"><span className="font-semibold">Keterangan:</span> {p.keterangan}</p>
              <p className="text-gray-600"><span className="font-semibold">Anggaran:</span> {p.anggaran}</p>

              {/* Tombol Lihat RAB & Lihat Gambar Kerja sejajar */}
              <div className="flex gap-3 mt-2">
                <button className="btn btn-sm btn-info flex-1 flex items-center justify-center gap-2">
                  <HiDocumentText /> Lihat RAB
                </button>
                <button className="btn btn-sm btn-warning flex-1 flex items-center justify-center gap-2">
                  <HiPhotograph /> Lihat Gambar Kerja
                </button>
              </div>

              {/* Tombol Ambil Pekerjaan */}
              <button className="btn btn-teal w-full mt-3 flex items-center justify-center gap-2">
                <HiClipboardList /> Ambil Pekerjaan
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DaftarProyekMandor;
