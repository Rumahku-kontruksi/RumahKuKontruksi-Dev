// client/src/pages/admin/TimelineProyekAdmin.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  HiCalendar,
  HiCheckCircle,
  HiClock,
  HiClipboardList,
  HiOutlinePlus,
  HiPencil,
  HiTrash,
  HiX,
} from "react-icons/hi";
import { motion } from "framer-motion";

const TimelineProyekAdmin = () => {
  const { id } = useParams(); // Ambil ID proyek dari URL
  const navigate = useNavigate();

  // Dummy data proyek
  const proyekData = [
    {
      id: "1",
      nama: "Renovasi Rumah Pak Budi",
      lokasi: "Jl. Merdeka No. 21, Bandung",
      timeline: [
        {
          id: 1,
          tahap: "Perencanaan & Desain",
          tanggalMulai: "2025-09-01",
          tanggalSelesai: "2025-09-10",
          status: "Selesai",
          keterangan: "Penyusunan desain dan RAB proyek telah selesai.",
        },
        {
          id: 2,
          tahap: "Pondasi & Struktur",
          tanggalMulai: "2025-09-11",
          tanggalSelesai: "2025-09-25",
          status: "Berjalan",
          keterangan: "Pengerjaan pondasi sedang dilakukan di lapangan.",
        },
      ],
    },
    {
      id: "2",
      nama: "Pembangunan Ruko Bu Sari",
      lokasi: "Jl. Dipatiukur No. 45, Bandung",
      timeline: [
        {
          id: 1,
          tahap: "Survey Lokasi",
          tanggalMulai: "2025-08-10",
          tanggalSelesai: "2025-08-15",
          status: "Selesai",
          keterangan: "Survey lokasi selesai dilakukan.",
        },
        {
          id: 2,
          tahap: "Persetujuan RAB",
          tanggalMulai: "2025-08-16",
          tanggalSelesai: "2025-08-20",
          status: "Selesai",
          keterangan: "RAB disetujui oleh konsumen.",
        },
      ],
    },
  ];

  const [timeline, setTimeline] = useState([]);
  const [proyek, setProyek] = useState(null);

  useEffect(() => {
    const selectedProyek = proyekData.find((p) => p.id === id);
    if (selectedProyek) {
      setProyek(selectedProyek);
      setTimeline(selectedProyek.timeline);
    } else {
      // Kalau ID tidak ada, redirect ke daftar proyek
      navigate("/admin/proyek/daftartimeline");
    }
  }, [id, navigate]);

  // Modal editing dan hapus tetap sama seperti sebelumnya...
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);

  const tambahTahap = () => {
    const tahapBaru = {
      id: timeline.length + 1,
      tahap: "Tahap Baru",
      tanggalMulai: "",
      tanggalSelesai: "",
      status: "Belum Dimulai",
      keterangan: "",
    };
    setTimeline([...timeline, tahapBaru]);
  };

  const bukaEdit = (item) => {
    setEditing(item);
    setShowModal(true);
  };

  const simpanEdit = () => {
    setTimeline((prev) =>
      prev.map((t) => (t.id === editing.id ? editing : t))
    );
    setShowModal(false);
  };

  const hapusTahap = (idTahap) => {
    if (window.confirm("Yakin ingin menghapus tahap ini?")) {
      setTimeline(timeline.filter((item) => item.id !== idTahap));
    }
  };

  if (!proyek) return null; // Tunggu data proyek

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <HiCalendar className="text-teal-600" /> Timeline Proyek: {proyek.nama}
      </h1>

      <button
        onClick={tambahTahap}
        className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg mb-6"
      >
        <HiOutlinePlus /> Tambah Tahap
      </button>

      <div className="relative border-l-4 border-teal-600 ml-6">
        {timeline.map((item, index) => (
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
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">
                  {item.tahap}
                </h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => bukaEdit(item)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <HiPencil />
                  </button>
                  <button
                    onClick={() => hapusTahap(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <HiTrash />
                  </button>
                </div>
              </div>

              <p className="text-sm text-gray-600 mt-2">{item.keterangan}</p>
              <div className="text-sm text-gray-500 mt-3 flex items-center gap-4">
                <span>Mulai: {item.tanggalMulai || "-"}</span>
                <span>Selesai: {item.tanggalSelesai || "-"}</span>
              </div>

              <span
                className={`inline-block mt-3 px-3 py-1 text-sm rounded-full ${
                  item.status === "Selesai"
                    ? "bg-green-100 text-green-700"
                    : item.status === "Berjalan"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {item.status}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal Edit */}
      {showModal && editing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative"
          >
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <HiX />
            </button>

            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              Edit Tahap
            </h2>

            <div className="space-y-3">
              <input
                type="text"
                placeholder="Nama Tahap"
                value={editing.tahap}
                onChange={(e) =>
                  setEditing({ ...editing, tahap: e.target.value })
                }
                className="w-full border rounded-md p-2"
              />
              <textarea
                placeholder="Keterangan"
                value={editing.keterangan}
                onChange={(e) =>
                  setEditing({ ...editing, keterangan: e.target.value })
                }
                className="w-full border rounded-md p-2"
              />
              <div className="flex gap-2">
                <input
                  type="date"
                  value={editing.tanggalMulai}
                  onChange={(e) =>
                    setEditing({ ...editing, tanggalMulai: e.target.value })
                  }
                  className="border rounded-md p-2 w-1/2"
                />
                <input
                  type="date"
                  value={editing.tanggalSelesai}
                  onChange={(e) =>
                    setEditing({ ...editing, tanggalSelesai: e.target.value })
                  }
                  className="border rounded-md p-2 w-1/2"
                />
              </div>

              <select
                value={editing.status}
                onChange={(e) =>
                  setEditing({ ...editing, status: e.target.value })
                }
                className="w-full border rounded-md p-2"
              >
                <option>Belum Dimulai</option>
                <option>Berjalan</option>
                <option>Selesai</option>
              </select>

              <button
                onClick={simpanEdit}
                className="w-full bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700"
              >
                Simpan Perubahan
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default TimelineProyekAdmin;
