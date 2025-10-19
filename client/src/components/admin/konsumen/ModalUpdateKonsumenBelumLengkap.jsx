// client/src/components/admin/konsumen/ModalUpdateKonsumenBelumLengkap.jsx

import React, { useState, useEffect } from "react";
import axios from "axios";

const ModalUpdateKonsumenBelumLengkap = ({ isOpen, onClose, konsumen, refreshList }) => {
  const [jenis, setJenis] = useState(konsumen?.jenis_konsumen || "");
  const [formData, setFormData] = useState({
    // Perseorangan
    nama_lengkap: konsumen?.nama_lengkap || "",
    nomor_identitas: konsumen?.nomor_identitas || "",
    alamat: konsumen?.alamat || "",
    kontak_person: konsumen?.kontak_person || "", // opsional
    // Perusahaan
    nama_perusahaan: konsumen?.nama_perusahaan || "",
    npwp: konsumen?.npwp || "",
    alamat_kantor: konsumen?.alamat || "",
    bidang_usaha: konsumen?.bidang_usaha || "",
    jabatan_pekerjaan: konsumen?.jabatan_pekerjaan || "",
    email: konsumen?.email || "",
    nomor_telepon: konsumen?.nomor_telepon || "",
  });

  useEffect(() => {
    if (konsumen) {
      setJenis(konsumen.jenis_konsumen || "");
      setFormData({
        nama_lengkap: konsumen.nama_lengkap || "",
        nomor_identitas: konsumen.nomor_identitas || "",
        alamat: konsumen.alamat || "",
        kontak_person: konsumen.kontak_person || "",
        nama_perusahaan: konsumen.nama_perusahaan || "",
        npwp: konsumen.npwp || "",
        alamat_kantor: konsumen.alamat || "",
        bidang_usaha: konsumen.bidang_usaha || "",
        jabatan_pekerjaan: konsumen.jabatan_pekerjaan || "",
        email: konsumen.email || "",
        nomor_telepon: konsumen.nomor_telepon || "",
      });
    }
  }, [konsumen]);

  if (!isOpen || !konsumen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (jenis === "Perseorangan") {
        // POST ke tb_penanggung_jawab
        await axios.post("http://localhost:3000/penanggung-jawab", {
          id_penanggung_jawab: konsumen.id_penanggung_jawab,
          nama_lengkap: formData.nama_lengkap,
          nomor_identitas: formData.nomor_identitas,
          alamat: formData.alamat,
          kontak_person: formData.kontak_person || formData.nama_lengkap,
          status: "Aktif",
          hubungan_dengan_konsumen: "Lainnya",
        });
      } else if (jenis === "Perusahaan") {
        // POST ke tb_perusahaan
        await axios.post("http://localhost:3000/perusahaan", {
          id_perusahaan: konsumen.id_perusahaan,
          nama_perusahaan: formData.nama_perusahaan,
          npwp: formData.npwp,
          alamat_kantor: formData.alamat_kantor,
          kontak_person: formData.nama_lengkap,
          telepon_kontak: formData.nomor_telepon,
        });
      }

      // Tutup modal dan refresh tabel
      refreshList();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Gagal menyimpan data");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/2 p-6 relative">
        <h2 className="text-xl font-bold mb-4">Update Konsumen Belum Lengkap</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Pilih jenis konsumen */}
          <div className="flex flex-col">
            <label className="font-semibold">Jenis Konsumen</label>
            <select
              name="jenis_konsumen"
              value={jenis}
              onChange={(e) => setJenis(e.target.value)}
              className="select select-bordered mt-1"
              required
            >
              <option value="">Pilih jenis</option>
              <option value="Perseorangan">Perseorangan</option>
              <option value="Perusahaan">Perusahaan</option>
            </select>
          </div>

          {jenis === "Perseorangan" && (
            <>
              <div className="flex flex-col">
                <label className="font-semibold">Nama Lengkap</label>
                <input
                  type="text"
                  name="nama_lengkap"
                  value={formData.nama_lengkap}
                  onChange={handleChange}
                  className="input input-bordered mt-1"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label className="font-semibold">Nomor Identitas</label>
                <input
                  type="text"
                  name="nomor_identitas"
                  value={formData.nomor_identitas}
                  onChange={handleChange}
                  className="input input-bordered mt-1"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label className="font-semibold">Alamat</label>
                <textarea
                  name="alamat"
                  value={formData.alamat}
                  onChange={handleChange}
                  className="textarea textarea-bordered mt-1"
                  required
                />
              </div>
            </>
          )}

          {jenis === "Perusahaan" && (
            <>
              <div className="flex flex-col">
                <label className="font-semibold">Nama Perusahaan</label>
                <input
                  type="text"
                  name="nama_perusahaan"
                  value={formData.nama_perusahaan}
                  onChange={handleChange}
                  className="input input-bordered mt-1"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label className="font-semibold">NPWP</label>
                <input
                  type="text"
                  name="npwp"
                  value={formData.npwp}
                  onChange={handleChange}
                  className="input input-bordered mt-1"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label className="font-semibold">Alamat Kantor</label>
                <textarea
                  name="alamat_kantor"
                  value={formData.alamat_kantor}
                  onChange={handleChange}
                  className="textarea textarea-bordered mt-1"
                  required
                />
              </div>
            </>
          )}

          <div className="flex flex-col">
            <label className="font-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="input input-bordered mt-1"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold">Nomor Telepon</label>
            <input
              type="text"
              name="nomor_telepon"
              value={formData.nomor_telepon}
              onChange={handleChange}
              className="input input-bordered mt-1"
              required
            />
          </div>

          <div className="mt-6 flex justify-end gap-2">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Batal
            </button>
            <button type="submit" className="btn btn-primary">
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalUpdateKonsumenBelumLengkap;
