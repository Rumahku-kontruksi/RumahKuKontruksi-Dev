import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { HiCheckCircle, HiClock, HiClipboardList, HiDocumentText } from "react-icons/hi";
import { motion } from "framer-motion";

const DetailLaporanProyekAdmin = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Dummy data proyek
  const proyekData = [
    {
      id: "1",
      nama: "Renovasi Rumah Pak Budi",
      lokasi: "Jl. Merdeka No. 21, Bandung",
      catatan: "Proyek berjalan lancar, tidak ada kendala signifikan.",
      timeline: [
        {
          id: 1,
          tahap: "Perencanaan & Desain",
          tanggalMulai: "2025-09-01",
          tanggalSelesai: "2025-09-10",
          status: "Selesai",
        },
        {
          id: 2,
          tahap: "Pondasi & Struktur",
          tanggalMulai: "2025-09-11",
          tanggalSelesai: "2025-09-25",
          status: "Berjalan",
        },
        {
          id: 3,
          tahap: "Pemasangan Dinding & Atap",
          tanggalMulai: "2025-09-26",
          tanggalSelesai: "2025-10-15",
          status: "Belum Dimulai",
        },
      ],
    },
    {
      id: "2",
      nama: "Pembangunan Ruko Bu Sari",
      lokasi: "Jl. Dipatiukur No. 45, Bandung",
      catatan: "Semua tahap selesai tepat waktu.",
      timeline: [
        {
          id: 1,
          tahap: "Survey Lokasi",
          tanggalMulai: "2025-08-10",
          tanggalSelesai: "2025-08-15",
          status: "Selesai",
        },
        {
          id: 2,
          tahap: "Persetujuan RAB",
          tanggalMulai: "2025-08-16",
          tanggalSelesai: "2025-08-20",
          status: "Selesai",
        },
      ],
    },
  ];

  const [proyek, setProyek] = useState(null);

  useEffect(() => {
    const selectedProyek = proyekData.find((p) => p.id === id);
    if (selectedProyek) {
      setProyek(selectedProyek);
    } else {
      navigate("/admin/laporan-proyek");
    }
  }, [id, navigate]);

  if (!proyek) return null;

  const getStatusStyle = (status) => {
    switch (status) {
      case "Selesai":
        return "bg-green-100 text-green-700";
      case "Berjalan":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const calculateProgress = (status) => {
    switch (status) {
      case "Selesai":
        return 100;
      case "Berjalan":
        return 50;
      default:
        return 0;
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <HiDocumentText className="text-teal-600 text-2xl" />
        <h1 className="text-2xl font-bold text-gray-800">Laporan Proyek: {proyek.nama}</h1>
      </div>

      <p className="mb-4 text-gray-700 font-medium">Lokasi: {proyek.lokasi}</p>
      <p className="mb-6 text-gray-600">{proyek.catatan}</p>

      <div className="relative border-l-4 border-teal-600 ml-6">
        {proyek.timeline.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="mb-10 ml-4"
          >
            <div className="absolute -left-6 flex items-center justify-center w-10 h-10 bg-white border-4 border-teal-600 rounded-full">
              {item.status === "Selesai" ? (
                <HiCheckCircle className="text-green-600 text-2xl" />
              ) : item.status === "Berjalan" ? (
                <HiClock className="text-yellow-500 text-2xl" />
              ) : (
                <HiClipboardList className="text-gray-400 text-2xl" />
              )}
            </div>

            <div className="bg-white shadow-md rounded-lg p-5">
              <h3 className="text-lg font-semibold text-gray-800">{item.tahap}</h3>
              <div className="text-sm text-gray-500 mt-2 flex items-center gap-4">
                <span>Mulai: {item.tanggalMulai}</span>
                <span>Selesai: {item.tanggalSelesai}</span>
              </div>

              <div className="mt-2 w-full bg-gray-200 rounded-full h-3">
                <div
                  className={`h-3 rounded-full ${getStatusStyle(item.status)}`}
                  style={{ width: `${calculateProgress(item.status)}%` }}
                ></div>
              </div>

              <span
                className={`inline-block mt-2 px-3 py-1 text-sm rounded-full ${getStatusStyle(item.status)}`}
              >
                {item.status}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default DetailLaporanProyekAdmin;
