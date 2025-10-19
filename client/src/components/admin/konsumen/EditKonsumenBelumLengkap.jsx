// client/src/components/EditKonsumenBelumLengkap.jsx
import React, { useEffect, useState } from "react";
import { HiX } from "react-icons/hi";
import axios from "axios";

const EditKonsumenBelumLengkap = ({ isOpen, onClose, selectedKonsumen, refreshList }) => {
  const [konsumenData, setKonsumenData] = useState({});
  const [perusahaanData, setPerusahaanData] = useState({
    nama_perusahaan: "",
    npwp: "",
    alamat_kantor: "",
    kontak_person: "",
    telepon_kontak: "",
  });
  const [pjwData, setPjwData] = useState({
    nama_lengkap: "",
    nomor_identitas: "",
    alamat: "",
    kontak_person: "",
    status: "",
    hubungan_dengan_konsumen: "",
  });
  const [loading, setLoading] = useState(false);

  const API_KONSUMEN = "http://localhost:3000/konsumen";
  const API_PERUSAHAAN = "http://localhost:3000/perusahaan";
  const API_PJW = "http://localhost:3000/penanggung-jawab";

  // 🔄 Saat modal dibuka, load data konsumen + relasinya
  useEffect(() => {
    if (isOpen && selectedKonsumen) {
      loadData(selectedKonsumen);
    }
  }, [isOpen, selectedKonsumen]);

  const loadData = async (data) => {
    setKonsumenData({
      ...data,
      jenis_konsumen: data.jenis_konsumen || "",
    });

    try {
      if (data.jenis_konsumen === "Perusahaan" && data.id_perusahaan) {
        const res = await axios.get(`${API_PERUSAHAAN}/${data.id_perusahaan}`);
        setPerusahaanData(res.data?.data || {});
      } else if (data.jenis_konsumen === "Perseorangan" && data.id_penanggung_jawab) {
        const res = await axios.get(`${API_PJW}/${data.id_penanggung_jawab}`);
        setPjwData(res.data?.data || {});
      }
    } catch (err) {
      console.error(err);
      alert("❌ Gagal memuat data tambahan.");
    }
  };

  const handleChange = (e, type = "konsumen") => {
    const { name, value } = e.target;
    if (type === "konsumen") setKonsumenData((prev) => ({ ...prev, [name]: value }));
    else if (type === "perusahaan") setPerusahaanData((prev) => ({ ...prev, [name]: value }));
    else setPjwData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let idPerusahaan = konsumenData.id_perusahaan || null;
      let idPjw = konsumenData.id_penanggung_jawab || null;

      // 🏢 Jika jenis = Perusahaan
      if (konsumenData.jenis_konsumen === "Perusahaan") {
        const { nama_perusahaan, npwp, alamat_kantor, kontak_person, telepon_kontak } = perusahaanData;

        // Validasi isi data
        if (!nama_perusahaan || !npwp || !alamat_kantor || !kontak_person || !telepon_kontak) {
          alert("⚠️ Semua field perusahaan wajib diisi sebelum menyimpan!");
          setLoading(false);
          return;
        }

        if (idPerusahaan) {
          const res = await axios.put(`${API_PERUSAHAAN}/${idPerusahaan}`, perusahaanData);
          idPerusahaan = res.data.data.id_perusahaan;
        } else {
          const res = await axios.post(`${API_PERUSAHAAN}`, perusahaanData);
          idPerusahaan = res.data.data.id_perusahaan;
        }
        idPjw = null;
      }

      // 🙋‍♂️ Jika jenis = Perseorangan
      else if (konsumenData.jenis_konsumen === "Perseorangan") {
        const { nama_lengkap, nomor_identitas, alamat, kontak_person, status, hubungan_dengan_konsumen } = pjwData;

        // Validasi isi data
        if (!nama_lengkap || !nomor_identitas || !alamat || !kontak_person) {
          alert("⚠️ Semua field penanggung jawab wajib diisi sebelum menyimpan!");
          setLoading(false);
          return;
        }

        if (idPjw) {
          const res = await axios.put(`${API_PJW}/${idPjw}`, pjwData);
          idPjw = res.data.data.id_penanggung_jawab;
        } else {
          const res = await axios.post(`${API_PJW}`, pjwData);
          idPjw = res.data.data.id_penanggung_jawab;
        }
        idPerusahaan = null;
      }

      // 💾 Update tb_konsumen
      await axios.put(`${API_KONSUMEN}/${konsumenData.id_konsumen}`, {
        jenis_konsumen: konsumenData.jenis_konsumen,
        id_perusahaan: idPerusahaan,
        id_penanggung_jawab: idPjw,
      });

      refreshList();
      alert("✅ Data konsumen berhasil diperbarui!");
      onClose();
    } catch (err) {
      console.error("❌ Error handleSubmit:", err);
      alert("❌ Gagal memperbarui data. Periksa kembali input Anda.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-lg w-11/12 md:w-4/5 lg:w-2/3 p-6 max-h-[90vh] overflow-y-auto relative">
        <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-800" onClick={onClose}>
          <HiX size={28} />
        </button>

        <h2 className="text-2xl font-bold mb-6">Edit Konsumen Belum Lengkap</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-8">
          {/* KIRI: Data Konsumen read-only */}
          <div className="flex flex-col gap-3">
            <h3 className="text-lg font-semibold mb-2 border-b pb-1">Data Konsumen</h3>
            <label>ID Konsumen
              <input type="text" value={konsumenData.id_konsumen || ""} className="input input-bordered w-full mt-1" disabled />
            </label>
            <label>Nama Lengkap
              <input type="text" value={konsumenData.nama_lengkap || ""} className="input input-bordered w-full mt-1" disabled />
            </label>
            <label>Email
              <input type="text" value={konsumenData.email || ""} className="input input-bordered w-full mt-1" disabled />
            </label>
          </div>

          {/* KANAN: Form update */}
          <div className="flex flex-col gap-3">
            <h3 className="text-lg font-semibold mb-2 border-b pb-1">Update Data</h3>
            <label>Jenis Konsumen
              <select
                name="jenis_konsumen"
                value={konsumenData.jenis_konsumen || ""}
                onChange={(e) => handleChange(e)}
                className="input input-bordered w-full mt-1"
              >
                <option value="">-- Pilih Jenis Konsumen --</option>
                <option value="Perseorangan">Perseorangan</option>
                <option value="Perusahaan">Perusahaan</option>
              </select>
            </label>

            {/* Jika jenis perusahaan */}
            {konsumenData.jenis_konsumen === "Perusahaan" && (
              <>
                <label>Nama Perusahaan
                  <input type="text" name="nama_perusahaan" value={perusahaanData.nama_perusahaan || ""} onChange={(e) => handleChange(e, "perusahaan")} className="input input-bordered w-full mt-1" />
                </label>
                <label>NPWP
                  <input type="text" name="npwp" value={perusahaanData.npwp || ""} onChange={(e) => handleChange(e, "perusahaan")} className="input input-bordered w-full mt-1" />
                </label>
                <label>Alamat Kantor
                  <textarea name="alamat_kantor" value={perusahaanData.alamat_kantor || ""} onChange={(e) => handleChange(e, "perusahaan")} className="textarea textarea-bordered w-full mt-1" />
                </label>
                <label>Kontak Person
                  <input type="text" name="kontak_person" value={perusahaanData.kontak_person || ""} onChange={(e) => handleChange(e, "perusahaan")} className="input input-bordered w-full mt-1" />
                </label>
                <label>Telepon Kontak
                  <input type="text" name="telepon_kontak" value={perusahaanData.telepon_kontak || ""} onChange={(e) => handleChange(e, "perusahaan")} className="input input-bordered w-full mt-1" />
                </label>
              </>
            )}

            {/* Jika jenis perseorangan */}
            {konsumenData.jenis_konsumen === "Perseorangan" && (
              <>
                <label>Nama Penanggung Jawab
                  <input type="text" name="nama_lengkap" value={pjwData.nama_lengkap || ""} onChange={(e) => handleChange(e, "pjw")} className="input input-bordered w-full mt-1" />
                </label>
                <label>Nomor Identitas
                  <input type="text" name="nomor_identitas" value={pjwData.nomor_identitas || ""} onChange={(e) => handleChange(e, "pjw")} className="input input-bordered w-full mt-1" />
                </label>
                <label>Alamat
                  <textarea name="alamat" value={pjwData.alamat || ""} onChange={(e) => handleChange(e, "pjw")} className="textarea textarea-bordered w-full mt-1" />
                </label>
                <label>Kontak Person
                  <input type="text" name="kontak_person" value={pjwData.kontak_person || ""} onChange={(e) => handleChange(e, "pjw")} className="input input-bordered w-full mt-1" />
                </label>
                <label>Status
                  <input type="text" name="status" value={pjwData.status || ""} onChange={(e) => handleChange(e, "pjw")} className="input input-bordered w-full mt-1" />
                </label>
                <label>Hubungan dengan Konsumen
                  <input type="text" name="hubungan_dengan_konsumen" value={pjwData.hubungan_dengan_konsumen || ""} onChange={(e) => handleChange(e, "pjw")} className="input input-bordered w-full mt-1" />
                </label>
              </>
            )}
          </div>

          <div className="col-span-2 flex justify-end mt-4">
            <button type="submit" className={`btn btn-primary ${loading ? "loading" : ""}`} disabled={loading}>
              {loading ? "Menyimpan..." : "Simpan Perubahan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditKonsumenBelumLengkap;
