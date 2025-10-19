import React, { useState } from "react";
import { HiX } from "react-icons/hi";
import axios from "axios";

const TambahKonsumen = ({ isOpen, onClose, refreshList }) => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    nama_lengkap: "",
    password_konsumen: "",
    email: "",
    nomor_telepon: "",
    jenis_kelamin: "",
    tanggal_lahir: "",
    nomor_identitas: "",
    nama_perusahaan: "",
    bidang_usaha: "",
    jabatan_pekerjaan: "",
    npwp: "",
    alamat: "",
    foto: "",
  });

  const API_KONSUMEN = "http://localhost:3000/konsumen";

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["nomor_telepon", "npwp", "nomor_identitas"].includes(name)) {
      setFormData((prev) => ({ ...prev, [name]: value.replace(/\D/g, "") }));
      return;
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(API_KONSUMEN, formData);
      alert("✅ Konsumen berhasil ditambahkan!");
      refreshList?.();
      onClose();
    } catch (error) {
      console.error("❌ Error saat menambah konsumen:", error.response?.data || error.message);
      alert("❌ Gagal menambahkan konsumen. Periksa konsol untuk detail error.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const fotoPreview = formData.foto || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-lg w-11/12 md:w-4/5 lg:w-2/3 p-6 relative overflow-y-auto max-h-[90vh]">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          <HiX size={28} />
        </button>

        <h2 className="text-2xl font-bold mb-6">Tambah Konsumen</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-8">
          <div className="flex flex-col gap-3">
            <label>
              Nama Lengkap *
              <input type="text" name="nama_lengkap" value={formData.nama_lengkap} onChange={handleChange} className="input input-bordered w-full mt-1" required />
            </label>
            <label>
              Password *
              <input type="password" name="password_konsumen" value={formData.password_konsumen} onChange={handleChange} className="input input-bordered w-full mt-1" required />
            </label>
            <label>
              Jenis Kelamin
              <select name="jenis_kelamin" value={formData.jenis_kelamin} onChange={handleChange} className="input input-bordered w-full mt-1">
                <option value="">-- Pilih --</option>
                <option value="Laki-laki">Laki-laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>
            </label>
            <label>
              Tanggal Lahir
              <input type="date" name="tanggal_lahir" value={formData.tanggal_lahir} onChange={handleChange} className="input input-bordered w-full mt-1" />
            </label>
            <label>
              Nomor Identitas (NIK)
              <input type="text" name="nomor_identitas" value={formData.nomor_identitas} onChange={handleChange} className="input input-bordered w-full mt-1" />
            </label>
            <label>
              Nama Perusahaan
              <input type="text" name="nama_perusahaan" value={formData.nama_perusahaan} onChange={handleChange} className="input input-bordered w-full mt-1" />
            </label>
            <label>
              Bidang Usaha
              <input type="text" name="bidang_usaha" value={formData.bidang_usaha} onChange={handleChange} className="input input-bordered w-full mt-1" />
            </label>
            <label>
              Jabatan / Pekerjaan
              <input type="text" name="jabatan_pekerjaan" value={formData.jabatan_pekerjaan} onChange={handleChange} className="input input-bordered w-full mt-1" />
            </label>
          </div>

          <div className="flex flex-col gap-3 justify-between">
            <label>
              NPWP
              <input type="text" name="npwp" value={formData.npwp} onChange={handleChange} className="input input-bordered w-full mt-1" />
            </label>
            <label>
              Email *
              <input type="email" name="email" value={formData.email} onChange={handleChange} className="input input-bordered w-full mt-1" required />
            </label>
            <label>
              Nomor Telepon *
              <input type="text" name="nomor_telepon" value={formData.nomor_telepon} onChange={handleChange} className="input input-bordered w-full mt-1" required />
            </label>
            <label>
              Alamat
              <textarea name="alamat" value={formData.alamat} onChange={handleChange} className="textarea textarea-bordered w-full mt-1" />
            </label>
            <label>
              Foto (URL)
              <input type="text" name="foto" value={formData.foto} onChange={handleChange} className="input input-bordered w-full mt-1" placeholder="https://contoh.com/foto.jpg" />
            </label>

            <div className="mt-4 flex flex-col items-center justify-center border rounded-xl p-4 bg-gray-50 shadow-inner">
              <h4 className="font-medium text-gray-700 mb-2">Preview Foto Konsumen</h4>
              <img src={fotoPreview} alt="Preview Foto" className="w-40 h-40 rounded-full object-cover shadow-md border" />
            </div>
          </div>

          <div className="col-span-2 flex justify-end mt-4">
            <button type="submit" className={`btn btn-primary ${loading ? "loading" : ""}`} disabled={loading}>
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TambahKonsumen;
