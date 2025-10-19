// client/src/pages/admin/konsumen/DaftarBelumLengkap.jsx

import React, { useEffect, useState } from "react";
import { HiEye, HiPencil, HiTrash } from "react-icons/hi";
import axios from "axios";
import ModalDetailBelumLengkap from "../../../components/admin/konsumen/ModalDetailBelumLengkap";
import EditKonsumenBelumLengkap from "../../../components/admin/konsumen/EditKonsumenBelumLengkap";

const DaftarBelumLengkap = () => {
  const [konsumenList, setKonsumenList] = useState([]);
  const [detailOpen, setDetailOpen] = useState(false);
  const [detailKonsumen, setDetailKonsumen] = useState(null);

  const [editOpen, setEditOpen] = useState(false);
  const [editKonsumen, setEditKonsumen] = useState(null);

  const API_KONSUMEN = "http://localhost:3000/konsumen/belum-lengkap";

  const importantColumns = [
    "jenis_konsumen",
    "id_perusahaan",
    "id_penanggung_jawab",
    "email",
    "nomor_telepon",
    "alamat",
    "tanggal_lahir",
    "npwp",
    "jabatan_pekerjaan",
    "bidang_usaha",
  ];

  const fetchKonsumen = async () => {
    try {
      const res = await axios.get(API_KONSUMEN);
      const data = res.data.data || res.data;
      setKonsumenList(data);
    } catch (err) {
      console.error(err);
      alert("Gagal mengambil data konsumen");
    }
  };

  useEffect(() => {
    fetchKonsumen();
  }, []);

  const getProgress = (k) => {
    const total = importantColumns.length;
    const filled = importantColumns.reduce(
      (acc, col) => (k[col] ? acc + 1 : acc),
      0
    );
    const percent = Math.round((filled / total) * 100);

    let colorClass = "bg-red-500";
    if (percent >= 80) colorClass = "bg-green-500";
    else if (percent >= 50) colorClass = "bg-yellow-400";

    return { filled, total, percent, colorClass };
  };

  // Buka modal detail
  const openDetail = (k) => {
    setDetailKonsumen(k);
    setDetailOpen(true);
  };

  // Buka modal edit
  const openEdit = (k) => {
    setEditKonsumen(k);
    setEditOpen(true);
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Daftar Konsumen Belum Lengkap</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead className="bg-teal-600 text-white">
            <tr>
              <th>No</th>
              <th>ID Konsumen</th>
              <th>Nama Lengkap</th>
              <th>Jenis Konsumen</th>
              <th>Progres</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {konsumenList.length > 0 ? (
              konsumenList.map((k, i) => {
                const { filled, total, percent, colorClass } = getProgress(k);
                return (
                  <tr key={k.id_konsumen}>
                    <td>{i + 1}</td>
                    <td>{k.id_konsumen}</td>
                    <td>{k.nama_lengkap}</td>
                    <td>{k.jenis_konsumen || "-"}</td>
                    <td className="w-40">
                      <div className="bg-gray-200 h-3 rounded-full overflow-hidden">
                        <div
                          className={`${colorClass} h-3`}
                          style={{ width: `${percent}%` }}
                        ></div>
                      </div>
                      <span className="text-xs">{`${filled}/${total}`}</span>
                    </td>
                    <td className="flex gap-2 flex-wrap">
                      <button
                        className="btn btn-sm btn-info"
                        title="Lihat Detail"
                        onClick={() => openDetail(k)}
                      >
                        <HiEye />
                      </button>
                      <button
                        className="btn btn-sm btn-warning"
                        title="Edit"
                        onClick={() => openEdit(k)}
                      >
                        <HiPencil />
                      </button>
                      <button className="btn btn-sm btn-error" title="Hapus">
                        <HiTrash />
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  Tidak ada konsumen belum lengkap.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Detail Konsumen Belum Lengkap */}
      {detailOpen && detailKonsumen && (
        <ModalDetailBelumLengkap
          isOpen={detailOpen}
          onClose={() => setDetailOpen(false)}
          konsumen={detailKonsumen}
        />
      )}

      {/* Modal Update Konsumen Belum Lengkap */}
      {editOpen && editKonsumen && (
        <EditKonsumenBelumLengkap
          isOpen={editOpen}
          onClose={() => setEditOpen(false)}
          selectedKonsumen={editKonsumen}
          refreshList={fetchKonsumen}
        />
      )}
    </div>
  );
};

export default DaftarBelumLengkap;
