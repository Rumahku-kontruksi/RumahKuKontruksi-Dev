// client/src/pages/mandor/ProyekSaya.jsx
import React from "react";
import { HiCheckCircle, HiDocumentText } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const ProyekSaya = () => {
    const navigate = useNavigate();

    // Data dummy proyek mandor sedang dikerjakan
    const proyek = [
        {
            nama: "Renovasi Rumah Pak Budi",
            lokasi: "Jl. Merdeka No. 12, Jakarta",
            progress: 75,
            keterangan: "Renovasi rumah tinggal 2 lantai",
            gambar: "https://placehold.co/600x400",
        },
        {
            nama: "Bangun Ruko Bu Sari",
            lokasi: "Jl. Raya Bogor No. 45, Depok",
            progress: 40,
            keterangan: "Pembangunan ruko 3 lantai",
            gambar: "https://placehold.co/600x400",
        },
    ];

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Proyek Saya</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {proyek.map((p, idx) => (
                    <div
                        key={idx}
                        className="card bg-white shadow-md rounded-xl overflow-hidden hover:shadow-xl transition"
                    >
                        {/* Gambar proyek */}
                        <img src={p.gambar} alt={p.nama} className="w-full h-48 object-cover" />

                        <div className="p-6 space-y-3">
                            <div className="flex justify-between items-center">
                                <h3 className="text-xl font-bold text-gray-800">{p.nama}</h3>
                                <span className="badge badge-success flex items-center gap-1">
                                    <HiCheckCircle /> {p.progress}%
                                </span>
                            </div>

                            <p className="text-gray-600"><span className="font-semibold">Alamat:</span> {p.lokasi}</p>
                            <p className="text-gray-600"><span className="font-semibold">Keterangan:</span> {p.keterangan}</p>

                            {/* Tombol Detail / Buat Laporan */}
                            <button
                                className="btn btn-teal w-full mt-2 flex items-center justify-center gap-2"
                                onClick={() => navigate(`/mandor/progres-proyek/${idx}`)}
                            >
                                <HiDocumentText /> Detail / Buat Laporan
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProyekSaya;
