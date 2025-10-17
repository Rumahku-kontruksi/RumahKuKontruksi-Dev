import React, { useState, useEffect } from "react";
import axios from "axios";

const ModalKonsumen = ({ isOpen, onClose, initialData, refreshList }) => {
  const [formData, setFormData] = useState({
    jenis_konsumen: "Personal",
    nama_lengkap: "",
    password_konsumen: "",
    jenis_kelamin: "Laki-laki",
    tanggal_lahir: "",
    nomor_identitas: "",
    alamat: "",
    nomor_telepon: "",
    email: "",
    foto: "",
    nama_perusahaan: "",
    bidang_usaha: "",
    jabatan_pekerjaan: "",
    npwp: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_URL = "http://localhost:3000/konsumen";

  useEffect(() => {
    if (initialData) {
      const jenis = initialData.jenis_konsumen?.startsWith("PR") ? "Personal" : "Perusahaan";
      setFormData({
        ...initialData,
        jenis_konsumen: jenis,
        tanggal_lahir: initialData.tanggal_lahir?.split("T")[0] || "",
        password_konsumen: "",
        foto: initialData.foto || "",
      });
    } else {
      setFormData(prev => ({ ...prev, password_konsumen: "", foto: "" }));
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const payload = { ...formData };
      const jenisParam = formData.jenis_konsumen === "Personal" ? "perseorangan" : "perusahaan";
      const id = initialData?.id_konsumen || initialData?.id_perseorangan || initialData?.id_perusahaan;

      if (initialData) {
        await axios.put(`${API_URL}/${jenisParam}/${id}`, payload);
      } else {
        await axios.post(`${API_URL}/${jenisParam}`, payload);
      }

      refreshList();
      onClose();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "Terjadi kesalahan server.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-3xl relative">
        <button className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4" onClick={onClose}>✕</button>
        <h3 className="font-bold text-xl mb-4">{initialData ? "Update Konsumen" : "Tambah Konsumen"}</h3>

        {error && <p className="text-red-500 mb-2">{error}</p>}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="col-span-1 md:col-span-2 flex gap-2 mb-2">
            <label>
              <input type="radio" name="jenis_konsumen" value="Personal" checked={formData.jenis_konsumen === "Personal"} onChange={handleChange} /> Personal
            </label>
            <label>
              <input type="radio" name="jenis_konsumen" value="Perusahaan" checked={formData.jenis_konsumen === "Perusahaan"} onChange={handleChange} /> Perusahaan
            </label>
          </div>

          {formData.jenis_konsumen === "Personal" && (
            <>
              <input type="text" name="nama_lengkap" value={formData.nama_lengkap} onChange={handleChange} placeholder="Nama Lengkap" className="input input-bordered w-full" required />
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="input input-bordered w-full" required />
              <input type="text" name="nomor_telepon" value={formData.nomor_telepon} onChange={handleChange} placeholder="Nomor Telepon" className="input input-bordered w-full" />
              <select name="jenis_kelamin" value={formData.jenis_kelamin} onChange={handleChange} className="select select-bordered w-full">
                <option value="Laki-laki">Laki-laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>
              <input type="date" name="tanggal_lahir" value={formData.tanggal_lahir} onChange={handleChange} className="input input-bordered w-full" />
              <input type="text" name="nomor_identitas" value={formData.nomor_identitas} onChange={handleChange} placeholder="Nomor Identitas (NIK)" className="input input-bordered w-full" />
              {!initialData && <input type="password" name="password_konsumen" value={formData.password_konsumen} onChange={handleChange} placeholder="Password" className="input input-bordered w-full" required />}
            </>
          )}

          {formData.jenis_konsumen === "Perusahaan" && (
            <>
              <input type="text" name="nama_perusahaan" value={formData.nama_perusahaan} onChange={handleChange} placeholder="Nama Perusahaan" className="input input-bordered w-full" required />
              <input type="text" name="bidang_usaha" value={formData.bidang_usaha} onChange={handleChange} placeholder="Bidang Usaha" className="input input-bordered w-full" />
              <input type="text" name="jabatan_pekerjaan" value={formData.jabatan_pekerjaan} onChange={handleChange} placeholder="Jabatan" className="input input-bordered w-full" />
              <input type="text" name="npwp" value={formData.npwp} onChange={handleChange} placeholder="NPWP" className="input input-bordered w-full" />
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="input input-bordered w-full" />
              <input type="text" name="nomor_telepon" value={formData.nomor_telepon} onChange={handleChange} placeholder="Nomor Telepon" className="input input-bordered w-full" />
            </>
          )}

          <input type="text" name="alamat" value={formData.alamat} onChange={handleChange} placeholder="Alamat" className="input input-bordered w-full md:col-span-2" />
          <input type="text" name="foto" value={formData.foto} onChange={handleChange} placeholder="Foto (URL)" className="input input-bordered w-full md:col-span-2" />
          {formData.foto && <img src={formData.foto} alt="Preview" className="w-32 h-32 object-cover rounded-md border mt-2" />}

          <div className="col-span-1 md:col-span-2 flex justify-end gap-2 mt-4">
            <button type="button" onClick={onClose} className="btn btn-ghost">Batal</button>
            <button type="submit" className={`btn btn-primary ${loading ? "loading" : ""}`} disabled={loading}>{initialData ? "Update" : "Simpan"}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalKonsumen;
