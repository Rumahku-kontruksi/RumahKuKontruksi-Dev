// client/src/pages/admin/TambahProyekAdmin.jsx
import React, { useState } from "react";

const TambahProyekAdmin = () => {
  const [form, setForm] = useState({
    namaProyek: "",
    alamatProyek: "",
    konsumen: "",
    pengawas: "",
    nilaiProyek: "",
    tanggalMulai: "",
    tanggalSelesai: "",
    status: "Pending",
    rabFile: null,
    gambarKerjaFile: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setForm({ ...form, [name]: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Data Proyek:", form);
    alert("Proyek berhasil ditambahkan!");
    setForm({
      namaProyek: "",
      alamatProyek: "",
      konsumen: "",
      pengawas: "",
      nilaiProyek: "",
      tanggalMulai: "",
      tanggalSelesai: "",
      status: "Pending",
      rabFile: null,
      gambarKerjaFile: null,
    });
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow max-w-4xl mx-auto mt-6">
      <h2 className="text-2xl font-bold mb-6">Tambah Proyek Baru</h2>

      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Nama Proyek */}
        <div>
          <label className="label">
            <span className="label-text">Nama Proyek</span>
          </label>
          <input
            type="text"
            name="namaProyek"
            value={form.namaProyek}
            onChange={handleChange}
            placeholder="Masukkan nama proyek"
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Alamat Proyek */}
        <div>
          <label className="label">
            <span className="label-text">Alamat Proyek</span>
          </label>
          <input
            type="text"
            name="alamatProyek"
            value={form.alamatProyek}
            onChange={handleChange}
            placeholder="Masukkan alamat proyek"
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Konsumen */}
        <div>
          <label className="label">
            <span className="label-text">Konsumen</span>
          </label>
          <input
            type="text"
            name="konsumen"
            value={form.konsumen}
            onChange={handleChange}
            placeholder="Masukkan nama konsumen"
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Pengawas */}
        <div>
          <label className="label">
            <span className="label-text">Pengawas</span>
          </label>
          <input
            type="text"
            name="pengawas"
            value={form.pengawas}
            onChange={handleChange}
            placeholder="Masukkan nama pengawas"
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Nilai Proyek */}
        <div>
          <label className="label">
            <span className="label-text">Nilai Proyek (Rp)</span>
          </label>
          <input
            type="number"
            name="nilaiProyek"
            value={form.nilaiProyek}
            onChange={handleChange}
            placeholder="Masukkan nilai proyek"
            className="input input-bordered w-full"
            required
            min={0}
          />
        </div>

        {/* Tanggal Mulai & Estimasi Selesai */}
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="label">
              <span className="label-text">Tanggal Mulai</span>
            </label>
            <input
              type="date"
              name="tanggalMulai"
              value={form.tanggalMulai}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>
          <div className="flex-1">
            <label className="label">
              <span className="label-text">Estimasi Tanggal Selesai</span>
            </label>
            <input
              type="date"
              name="tanggalSelesai"
              value={form.tanggalSelesai}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>
        </div>

        {/* Status Proyek */}
        <div>
          <label className="label">
            <span className="label-text">Status Proyek</span>
          </label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="select select-bordered w-full"
          >
            <option>Pending</option>
            <option>Berjalan</option>
            <option>Selesai</option>
          </select>
        </div>

        {/* Upload RAB */}
        <div>
          <label className="label">
            <span className="label-text">Upload RAB (PDF)</span>
          </label>
          <input
            type="file"
            name="rabFile"
            accept=".pdf"
            onChange={handleChange}
            className="file-input file-input-bordered w-full"
          />
        </div>

        {/* Upload Gambar Kerja */}
        <div>
          <label className="label">
            <span className="label-text">Upload Gambar Kerja (PDF / Foto)</span>
          </label>
          <input
            type="file"
            name="gambarKerjaFile"
            accept=".pdf,image/*"
            onChange={handleChange}
            className="file-input file-input-bordered w-full"
          />
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button type="submit" className="btn btn-primary w-full">
            Tambah Proyek
          </button>
        </div>
      </form>
    </div>
  );
};

export default TambahProyekAdmin;
