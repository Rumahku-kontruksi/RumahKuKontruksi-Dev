// client/src/components/admin/proyek/ModalInputProyek.jsx
import React, { useState } from "react";

const ModalInputProyek = ({ onClose, onSave }) => {
  const [form, setForm] = useState({
    id_proyek: "",
    kode_proyek: "",
    nama_proyek: "",
    jenis_proyek: "",
    deskripsi: "",
    id_konsumen: [],
    id_mandor: [],
    id_pengawas: [],
    alamat_lengkap: "",
    kota: "",
    provinsi: "",
    kode_pos: "",
    status_proyek: "",
    tanggal_mulai: "",
    tanggal_selesai: "",
    progress: 0,
    nilai_proyek: 0,
    total_rab: 0,
    metode_pembayaran: "",
    status_pembayaran: "",
    gambar_kerja: [],
    dokumen_rab: [],
    foto_proyek: [],
    catatan: "",
    prioritas: "",
    jenis_kontrak: "",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    created_by: "",
    updated_by: "",
    list_rab: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleArrayChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value.split(",").map((v) => v.trim()) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.kode_proyek || !form.nama_proyek) {
      alert("Kode proyek dan nama proyek wajib diisi!");
      return;
    }
    onSave(form);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl w-11/12 max-w-3xl p-6 shadow-lg overflow-y-auto max-h-[90vh]">
        <h2 className="text-xl font-semibold mb-4">Input Proyek Baru</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="kode_proyek"
              placeholder="Kode Proyek"
              value={form.kode_proyek}
              onChange={handleChange}
              className="border px-3 py-2 rounded w-full"
            />
            <input
              type="text"
              name="nama_proyek"
              placeholder="Nama Proyek"
              value={form.nama_proyek}
              onChange={handleChange}
              className="border px-3 py-2 rounded w-full"
            />
            <input
              type="text"
              name="jenis_proyek"
              placeholder="Jenis Proyek"
              value={form.jenis_proyek}
              onChange={handleChange}
              className="border px-3 py-2 rounded w-full"
            />
            <input
              type="text"
              name="status_proyek"
              placeholder="Status Proyek"
              value={form.status_proyek}
              onChange={handleChange}
              className="border px-3 py-2 rounded w-full"
            />
            <input
              type="text"
              name="prioritas"
              placeholder="Prioritas"
              value={form.prioritas}
              onChange={handleChange}
              className="border px-3 py-2 rounded w-full"
            />
            <input
              type="text"
              name="jenis_kontrak"
              placeholder="Jenis Kontrak"
              value={form.jenis_kontrak}
              onChange={handleChange}
              className="border px-3 py-2 rounded w-full"
            />
            <input
              type="text"
              name="id_konsumen"
              placeholder="ID Konsumen (pisahkan dengan koma)"
              value={form.id_konsumen.join(", ")}
              onChange={handleArrayChange}
              className="border px-3 py-2 rounded w-full"
            />
            <input
              type="text"
              name="id_mandor"
              placeholder="ID Mandor (pisahkan dengan koma)"
              value={form.id_mandor.join(", ")}
              onChange={handleArrayChange}
              className="border px-3 py-2 rounded w-full"
            />
            <input
              type="text"
              name="id_pengawas"
              placeholder="ID Pengawas (pisahkan dengan koma)"
              value={form.id_pengawas.join(", ")}
              onChange={handleArrayChange}
              className="border px-3 py-2 rounded w-full"
            />
            <input
              type="text"
              name="alamat_lengkap"
              placeholder="Alamat Lengkap"
              value={form.alamat_lengkap}
              onChange={handleChange}
              className="border px-3 py-2 rounded w-full col-span-2"
            />
            <input
              type="text"
              name="kota"
              placeholder="Kota"
              value={form.kota}
              onChange={handleChange}
              className="border px-3 py-2 rounded"
            />
            <input
              type="text"
              name="provinsi"
              placeholder="Provinsi"
              value={form.provinsi}
              onChange={handleChange}
              className="border px-3 py-2 rounded"
            />
            <input
              type="text"
              name="kode_pos"
              placeholder="Kode Pos"
              value={form.kode_pos}
              onChange={handleChange}
              className="border px-3 py-2 rounded"
            />
            <input
              type="date"
              name="tanggal_mulai"
              placeholder="Tanggal Mulai"
              value={form.tanggal_mulai}
              onChange={handleChange}
              className="border px-3 py-2 rounded"
            />
            <input
              type="date"
              name="tanggal_selesai"
              placeholder="Tanggal Selesai"
              value={form.tanggal_selesai}
              onChange={handleChange}
              className="border px-3 py-2 rounded"
            />
            <input
              type="number"
              name="progress"
              placeholder="Progress (%)"
              value={form.progress}
              onChange={handleChange}
              className="border px-3 py-2 rounded"
            />
            <input
              type="number"
              name="nilai_proyek"
              placeholder="Nilai Proyek"
              value={form.nilai_proyek}
              onChange={handleChange}
              className="border px-3 py-2 rounded"
            />
            <input
              type="number"
              name="total_rab"
              placeholder="Total RAB"
              value={form.total_rab}
              onChange={handleChange}
              className="border px-3 py-2 rounded"
            />
            <input
              type="text"
              name="metode_pembayaran"
              placeholder="Metode Pembayaran"
              value={form.metode_pembayaran}
              onChange={handleChange}
              className="border px-3 py-2 rounded"
            />
            <input
              type="text"
              name="status_pembayaran"
              placeholder="Status Pembayaran"
              value={form.status_pembayaran}
              onChange={handleChange}
              className="border px-3 py-2 rounded"
            />
            <input
              type="text"
              name="catatan"
              placeholder="Catatan"
              value={form.catatan}
              onChange={handleChange}
              className="border px-3 py-2 rounded col-span-2"
            />
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-teal-600 text-white hover:bg-teal-700"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalInputProyek;
