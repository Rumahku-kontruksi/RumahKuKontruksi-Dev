import React, { useEffect, useState } from "react";
import { HiX } from "react-icons/hi";
import axios from "axios";

const EditKonsumen = ({ isOpen, onClose, selectedKonsumen, refreshList }) => {
  const [formData, setFormData] = useState({
    id_konsumen: "",
    jenis_konsumen: "Perseorangan",
    id_perusahaan: "",
    id_penanggung_jawab: "",
    nama_lengkap: "",
    password_konsumen: "",
    jenis_kelamin: "",
    tanggal_lahir: "",
    nomor_identitas: "",
    email: "",
    nomor_telepon: "",
    alamat: "",
    foto: "",
  });

  const [perusahaanData, setPerusahaanData] = useState({
    nama_perusahaan: "",
    npwp: "",
    alamat_kantor: "",
    kontak_person: "",
    telepon_kontak: "",
    bidang_usaha: "",
    jabatan_pekerjaan: "",
    id_proyek: "",
  });

  const [pjwData, setPjwData] = useState({
    nama_lengkap: "",
    nomor_identitas: "",
    alamat: "",
    kontak_person: "",
    hubungan_dengan_konsumen: "",
  });

  const [loading, setLoading] = useState(false);

  const API_KONSUMEN = "http://localhost:3000/konsumen";
  const API_PERUSAHAAN = "http://localhost:3000/perusahaan";
  const API_PJW = "http://localhost:3000/penanggung-jawab";

  // === Load Data Konsumen saat Modal dibuka ===
  useEffect(() => {
    if (isOpen && selectedKonsumen) {
      loadExistingData(selectedKonsumen);
    }
  }, [isOpen, selectedKonsumen]);

  const loadExistingData = async (data) => {
    try {
      setFormData({
        id_konsumen: data.id_konsumen || "",
        jenis_konsumen: data.jenis_konsumen || "Perseorangan",
        id_perusahaan: data.id_perusahaan || "",
        id_penanggung_jawab: data.id_penanggung_jawab || "",
        nama_lengkap: data.nama_lengkap || "",
        password_konsumen: data.password_konsumen || "",
        jenis_kelamin: data.jenis_kelamin || "",
        tanggal_lahir: data.tanggal_lahir
          ? data.tanggal_lahir.split("T")[0]
          : "",
        nomor_identitas: data.nomor_identitas || "",
        email: data.email || "",
        nomor_telepon: data.nomor_telepon || "",
        alamat: data.alamat || "",
        foto: data.foto || "",
      });

      if (data.jenis_konsumen === "Perusahaan" && data.id_perusahaan) {
        const res = await axios.get(`${API_PERUSAHAAN}/${data.id_perusahaan}`);
        const p = res.data?.data || {};
        setPerusahaanData({
          nama_perusahaan: p.nama_perusahaan || "",
          npwp: p.npwp || "",
          alamat_kantor: p.alamat_kantor || "",
          kontak_person: p.kontak_person || "",
          telepon_kontak: p.telepon_kontak || "",
          bidang_usaha: p.bidang_usaha || "",
          jabatan_pekerjaan: p.jabatan_pekerjaan || "",
          id_proyek: p.id_proyek || "",
        });
      }

      if (data.jenis_konsumen === "Perseorangan" && data.id_penanggung_jawab) {
        const res = await axios.get(
          `${API_PJW}/${data.id_penanggung_jawab}`
        );
        const pjw = res.data?.data || {};
        setPjwData({
          nama_lengkap: pjw.nama_lengkap || "",
          nomor_identitas: pjw.nomor_identitas || "",
          alamat: pjw.alamat || "",
          kontak_person: pjw.kontak_person || "",
          hubungan_dengan_konsumen: pjw.hubungan_dengan_konsumen || "",
        });
      }
    } catch (err) {
      console.error(err);
      alert("Gagal memuat data konsumen");
    }
  };

  // === Handle Input Change (Konsumen / Perusahaan / PJW) ===
  const handleChange = (e) => {
    const { name, value } = e.target;
    const cleanValue = value ?? "";

    if (Object.prototype.hasOwnProperty.call(formData, name)) {
      setFormData((prev) => ({ ...prev, [name]: cleanValue }));
    } else if (Object.prototype.hasOwnProperty.call(perusahaanData, name)) {
      setPerusahaanData((prev) => ({ ...prev, [name]: cleanValue }));
    } else if (Object.prototype.hasOwnProperty.call(pjwData, name)) {
      setPjwData((prev) => ({ ...prev, [name]: cleanValue }));
    }
  };

  // === Submit Form ===
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Update perusahaan / penanggung jawab terlebih dahulu
      if (formData.jenis_konsumen === "Perusahaan" && formData.id_perusahaan) {
        await axios.put(
          `${API_PERUSAHAAN}/${formData.id_perusahaan}`,
          perusahaanData
        );
      } else if (
        formData.jenis_konsumen === "Perseorangan" &&
        formData.id_penanggung_jawab
      ) {
        await axios.put(
          `${API_PJW}/${formData.id_penanggung_jawab}`,
          pjwData
        );
      }

      // Update konsumen utama
      await axios.put(`${API_KONSUMEN}/${formData.id_konsumen}`, formData);

      refreshList();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Gagal memperbarui data konsumen!");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const fotoPreview =
    formData.foto || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";

  // === UI ===
  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-lg w-11/12 md:w-4/5 lg:w-2/3 p-6 relative overflow-y-auto max-h-[90vh]">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          <HiX size={28} />
        </button>

        <h2 className="text-2xl font-bold mb-6">Edit Konsumen</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-8">
          {/* ================= KIRI - Data Konsumen ================= */}
          <div className="flex flex-col gap-3">
            <h3 className="text-lg font-semibold mb-2 border-b pb-1">
              Data Konsumen
            </h3>

            <label>
              Jenis Konsumen
              <select
                name="jenis_konsumen"
                value={formData.jenis_konsumen || ""}
                onChange={handleChange}
                className="input input-bordered w-full mt-1"
                disabled
              >
                <option value="Perseorangan">Perseorangan</option>
                <option value="Perusahaan">Perusahaan</option>
              </select>
            </label>

            <label>
              Nama Lengkap
              <input
                type="text"
                name="nama_lengkap"
                value={formData.nama_lengkap || ""}
                onChange={handleChange}
                className="input input-bordered w-full mt-1"
              />
            </label>

            <label>
              Password
              <input
                type="text"
                name="password_konsumen"
                value={formData.password_konsumen || ""}
                onChange={handleChange}
                className="input input-bordered w-full mt-1"
              />
            </label>

            <label>
              Jenis Kelamin
              <select
                name="jenis_kelamin"
                value={formData.jenis_kelamin || ""}
                onChange={handleChange}
                className="input input-bordered w-full mt-1"
              >
                <option value="">-- Pilih --</option>
                <option value="Laki-laki">Laki-laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>
            </label>

            <label>
              Tanggal Lahir
              <input
                type="date"
                name="tanggal_lahir"
                value={formData.tanggal_lahir || ""}
                onChange={handleChange}
                className="input input-bordered w-full mt-1"
              />
            </label>

            <label>
              Nomor Identitas
              <input
                type="text"
                name="nomor_identitas"
                value={formData.nomor_identitas || ""}
                onChange={handleChange}
                className="input input-bordered w-full mt-1"
              />
            </label>

            <label>
              Email
              <input
                type="email"
                name="email"
                value={formData.email || ""}
                onChange={handleChange}
                className="input input-bordered w-full mt-1"
              />
            </label>

            <label>
              Nomor Telepon
              <input
                type="text"
                name="nomor_telepon"
                value={formData.nomor_telepon || ""}
                onChange={handleChange}
                className="input input-bordered w-full mt-1"
              />
            </label>

            <label>
              Alamat
              <textarea
                name="alamat"
                value={formData.alamat || ""}
                onChange={handleChange}
                className="textarea textarea-bordered w-full mt-1"
              />
            </label>

            <label>
              Foto (URL)
              <input
                type="text"
                name="foto"
                value={formData.foto || ""}
                onChange={handleChange}
                className="input input-bordered w-full mt-1"
                placeholder="https://contoh.com/foto.jpg"
              />
            </label>
          </div>

          {/* ================= KANAN - Data Perusahaan / PJW ================= */}
          <div className="flex flex-col gap-3 justify-between">
            {formData.jenis_konsumen === "Perusahaan" ? (
              <>
                <h3 className="text-lg font-semibold mb-2 border-b pb-1">
                  Data Perusahaan
                </h3>

                <label>
                  Nama Perusahaan
                  <input
                    type="text"
                    name="nama_perusahaan"
                    value={perusahaanData.nama_perusahaan || ""}
                    onChange={handleChange}
                    className="input input-bordered w-full mt-1"
                  />
                </label>

                <label>
                  NPWP
                  <input
                    type="text"
                    name="npwp"
                    value={perusahaanData.npwp || ""}
                    onChange={handleChange}
                    className="input input-bordered w-full mt-1"
                  />
                </label>

                <label>
                  Alamat Kantor
                  <textarea
                    name="alamat_kantor"
                    value={perusahaanData.alamat_kantor || ""}
                    onChange={handleChange}
                    className="textarea textarea-bordered w-full mt-1"
                  />
                </label>

                <label>
                  Kontak Person
                  <input
                    type="text"
                    name="kontak_person"
                    value={perusahaanData.kontak_person || ""}
                    onChange={handleChange}
                    className="input input-bordered w-full mt-1"
                  />
                </label>

                <label>
                  Telepon Kontak
                  <input
                    type="text"
                    name="telepon_kontak"
                    value={perusahaanData.telepon_kontak || ""}
                    onChange={handleChange}
                    className="input input-bordered w-full mt-1"
                  />
                </label>

                <label>
                  Bidang Usaha
                  <input
                    type="text"
                    name="bidang_usaha"
                    value={perusahaanData.bidang_usaha || ""}
                    onChange={handleChange}
                    className="input input-bordered w-full mt-1"
                  />
                </label>

                <label>
                  Jabatan Pekerjaan
                  <input
                    type="text"
                    name="jabatan_pekerjaan"
                    value={perusahaanData.jabatan_pekerjaan || ""}
                    onChange={handleChange}
                    className="input input-bordered w-full mt-1"
                  />
                </label>
              </>
            ) : (
              <>
                <h3 className="text-lg font-semibold mb-2 border-b pb-1">
                  Data Penanggung Jawab
                </h3>

                <label>
                  Nama Lengkap
                  <input
                    type="text"
                    name="nama_lengkap"
                    value={pjwData.nama_lengkap || ""}
                    onChange={handleChange}
                    className="input input-bordered w-full mt-1"
                  />
                </label>

                <label>
                  Nomor Identitas
                  <input
                    type="text"
                    name="nomor_identitas"
                    value={pjwData.nomor_identitas || ""}
                    onChange={handleChange}
                    className="input input-bordered w-full mt-1"
                  />
                </label>

                <label>
                  Alamat
                  <textarea
                    name="alamat"
                    value={pjwData.alamat || ""}
                    onChange={handleChange}
                    className="textarea textarea-bordered w-full mt-1"
                  />
                </label>

                <label>
                  Kontak Person
                  <input
                    type="text"
                    name="kontak_person"
                    value={pjwData.kontak_person || ""}
                    onChange={handleChange}
                    className="input input-bordered w-full mt-1"
                  />
                </label>

                <label>
                  Hubungan dengan Konsumen
                  <input
                    type="text"
                    name="hubungan_dengan_konsumen"
                    value={pjwData.hubungan_dengan_konsumen || ""}
                    onChange={handleChange}
                    className="input input-bordered w-full mt-1"
                  />
                </label>
              </>
            )}

            {/* Preview Foto */}
            <div className="mt-4 flex flex-col items-center justify-center border rounded-xl p-4 bg-gray-50 shadow-inner">
              <h4 className="font-medium text-gray-700 mb-2">
                Preview Foto Konsumen
              </h4>
              <img
                src={fotoPreview}
                alt="Preview Foto"
                className="w-40 h-40 rounded-full object-cover shadow-md border"
                onError={(e) =>
                  (e.target.src =
                    "https://cdn-icons-png.flaticon.com/512/3135/3135715.png")
                }
              />
            </div>
          </div>

          {/* Tombol Simpan */}
          <div className="col-span-2 flex justify-end mt-4">
            <button
              type="submit"
              className={`btn btn-primary ${loading ? "loading" : ""}`}
              disabled={loading}
            >
              Simpan Perubahan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditKonsumen;
