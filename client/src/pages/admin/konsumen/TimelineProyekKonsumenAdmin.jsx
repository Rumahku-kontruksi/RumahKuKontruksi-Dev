import React, { useState } from "react";
import {
  HiClock,
  HiCheckCircle,
  HiXCircle,
  HiCalendar,
  HiClipboardList,
} from "react-icons/hi";

const TimelineProyekKonsumenAdmin = () => {
  // ====== DAFTAR PROYEK (DUMMY) ======
  const proyekList = [
    {
      id: 1,
      nama: "Renovasi Rumah Pak Budi",
      konsumen: "Pak Budi",
      timeline: [
        {
          tahap: "Perencanaan Awal",
          deskripsi:
            "Konsumen dan tim perencana melakukan survei lokasi dan pembuatan RAB awal.",
          tanggal: "2025-09-15",
          status: "Selesai",
        },
        {
          tahap: "Penunjukan Pengawas",
          deskripsi: "Admin menunjuk pengawas untuk mengawasi proyek.",
          tanggal: "2025-09-20",
          status: "Selesai",
        },
        {
          tahap: "Pengajuan Mandor",
          deskripsi:
            "Mandor yang sesuai ditunjuk untuk mengerjakan proyek berdasarkan hasil RAB.",
          tanggal: "2025-09-25",
          status: "Berjalan",
        },
        {
          tahap: "Pelaksanaan Proyek",
          deskripsi: "Proyek sedang berjalan dan dimonitor oleh pengawas.",
          tanggal: "2025-10-01",
          status: "Berjalan",
        },
        {
          tahap: "Selesai & Serah Terima",
          deskripsi: "Proyek diselesaikan dan dilakukan serah terima.",
          tanggal: "2025-12-01",
          status: "Belum Dimulai",
        },
      ],
    },
    {
      id: 2,
      nama: "Pembangunan Ruko Ibu Siti",
      konsumen: "Ibu Siti",
      timeline: [
        {
          tahap: "Perencanaan Awal",
          deskripsi: "Tim melakukan survei dan perhitungan anggaran.",
          tanggal: "2025-08-05",
          status: "Selesai",
        },
        {
          tahap: "Penunjukan Pengawas",
          deskripsi: "Admin menunjuk pengawas proyek ruko.",
          tanggal: "2025-08-10",
          status: "Selesai",
        },
        {
          tahap: "Pengajuan Mandor",
          deskripsi:
            "Mandor dipilih berdasarkan spesialisasi konstruksi bertingkat.",
          tanggal: "2025-08-15",
          status: "Selesai",
        },
        {
          tahap: "Pelaksanaan Proyek",
          deskripsi: "Proyek sedang berlangsung dengan progres cepat.",
          tanggal: "2025-09-01",
          status: "Berjalan",
        },
        {
          tahap: "Selesai & Serah Terima",
          deskripsi:
            "Tahap akhir pengerjaan finishing sebelum serah terima ke konsumen.",
          tanggal: "2025-11-01",
          status: "Belum Dimulai",
        },
      ],
    },
  ];

  // ====== STATE ======
  const [selectedProyek, setSelectedProyek] = useState(proyekList[0]);

  // ====== EVENT: GANTI PROYEK ======
  const handleProyekChange = (e) => {
    const proyek = proyekList.find((p) => p.id === parseInt(e.target.value));
    setSelectedProyek(proyek);
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      {/* HEADER & FILTER */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <HiClipboardList className="text-teal-600" /> Timeline Proyek
            Konsumen
          </h2>
          <p className="text-gray-500 text-sm">
            Pantau setiap tahap progres proyek konsumen
          </p>
        </div>

        {/* Dropdown Pilih Proyek */}
        <div className="flex gap-2 items-center">
          <label className="text-gray-700 font-semibold">Pilih Proyek:</label>
          <select
            className="select select-bordered select-sm"
            onChange={handleProyekChange}
            value={selectedProyek.id}
          >
            {proyekList.map((p) => (
              <option key={p.id} value={p.id}>
                {p.nama}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* INFO PROYEK */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
        <p>
          <strong>Nama Proyek:</strong> {selectedProyek.nama}
        </p>
        <p>
          <strong>Konsumen:</strong> {selectedProyek.konsumen}
        </p>
      </div>

      {/* TIMELINE */}
      <ul className="timeline timeline-vertical">
        {selectedProyek.timeline.map((item, index) => (
          <li key={index}>
            {index !== 0 && <hr />}
            <div className="timeline-start">
              <p className="text-sm text-gray-500">
                <HiCalendar className="inline mr-1" /> {item.tanggal}
              </p>
            </div>

            {/* Icon status */}
            <div
              className={`timeline-middle text-xl ${
                item.status === "Selesai"
                  ? "text-green-500"
                  : item.status === "Berjalan"
                  ? "text-blue-500 animate-pulse"
                  : "text-gray-400"
              }`}
            >
              {item.status === "Selesai" ? (
                <HiCheckCircle />
              ) : item.status === "Berjalan" ? (
                <HiClock />
              ) : (
                <HiXCircle />
              )}
            </div>

            {/* Kartu detail */}
            <div className="timeline-end timeline-box bg-white border border-gray-200 shadow-sm">
              <h3 className="font-bold text-lg text-teal-700">{item.tahap}</h3>
              <p className="text-sm text-gray-600 mt-1">{item.deskripsi}</p>
              <p
                className={`mt-2 text-xs font-semibold px-2 py-1 rounded-full inline-block ${
                  item.status === "Selesai"
                    ? "bg-green-100 text-green-700"
                    : item.status === "Berjalan"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {item.status}
              </p>
            </div>
            {index !== selectedProyek.timeline.length - 1 && <hr />}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TimelineProyekKonsumenAdmin;
