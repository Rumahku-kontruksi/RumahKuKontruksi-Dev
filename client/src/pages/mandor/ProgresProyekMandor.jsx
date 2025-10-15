// client/src/pages/mandor/ProgresProyekMandor.jsx
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { HiCheckCircle, HiCamera } from "react-icons/hi";

const ProgresProyekMandor = () => {
  const { id } = useParams(); // ambil ID proyek dari route
  const [pekerjaan, setPekerjaan] = useState([
    { nama: "Pondasi", selesai: false },
    { nama: "Struktur Beton", selesai: false },
    { nama: "Dinding", selesai: false },
    { nama: "Atap", selesai: false },
    { nama: "Finishing", selesai: false },
  ]);
  const [catatan, setCatatan] = useState("");
  const [foto, setFoto] = useState([]);

  const toggleChecklist = (index) => {
    const newPekerjaan = [...pekerjaan];
    newPekerjaan[index].selesai = !newPekerjaan[index].selesai;
    setPekerjaan(newPekerjaan);
  };

  const handleFotoUpload = (e) => {
    setFoto([...foto, ...Array.from(e.target.files)]);
  };

  const handleSubmit = () => {
    // disini nanti bisa kirim data ke backend
    alert("Laporan berhasil dikirim!");
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Progres Proyek</h2>

      <div className="space-y-4">
        {pekerjaan.map((p, idx) => (
          <div
            key={idx}
            className={`flex items-center justify-between p-4 rounded-lg border ${
              p.selesai ? "bg-green-50 border-green-300" : "bg-gray-50 border-gray-200"
            }`}
          >
            <div className="flex items-center gap-2">
              {p.selesai ? <HiCheckCircle className="text-green-500" /> : <span className="w-5 h-5 border rounded-full"></span>}
              <span className={p.selesai ? "line-through text-gray-500" : ""}>{p.nama}</span>
            </div>
            <input
              type="checkbox"
              checked={p.selesai}
              onChange={() => toggleChecklist(idx)}
              className="checkbox checkbox-success"
            />
          </div>
        ))}
      </div>

      {/* Upload Foto */}
      <div className="space-y-2">
        <label className="font-semibold text-gray-700 flex items-center gap-2">
          <HiCamera /> Upload Foto Hasil Kerja
        </label>
        <input type="file" multiple onChange={handleFotoUpload} className="file-input file-input-bordered w-full" />
        <div className="flex gap-2 flex-wrap">
          {foto.map((f, idx) => (
            <img
              key={idx}
              src={URL.createObjectURL(f)}
              alt={`foto-${idx}`}
              className="w-24 h-24 object-cover rounded-lg"
            />
          ))}
        </div>
      </div>

      {/* Catatan */}
      <div>
        <label className="font-semibold text-gray-700">Catatan Mingguan</label>
        <textarea
          className="textarea textarea-bordered w-full"
          placeholder="Tulis catatan disini..."
          value={catatan}
          onChange={(e) => setCatatan(e.target.value)}
        ></textarea>
      </div>

      {/* Tombol Submit */}
      <button
        className="btn btn-teal flex items-center gap-2"
        onClick={handleSubmit}
      >
        <HiCheckCircle /> Kirim Laporan
      </button>
    </div>
  );
};

export default ProgresProyekMandor;
