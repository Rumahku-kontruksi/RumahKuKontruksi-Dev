// client/src/components/konsumen/TLProyek.jsx
import React from "react";

/**
 * TLProyek
 * Props:
 *  - timeline: array of { minggu, kode, judul, pekerjaan[], tanggalMulai, tanggalSelesai, durasiHari, foto[], biaya: {harusDibayar, terbayar}, verifikasi, catatan }
 */
const TLProyek = ({ timeline = [] }) => {
  // helper hitung hari berjalan (dari tanggalMulai sampai hari ini) hanya jika sudah mulai
  const hitungHariBerjalan = (tanggalMulaiISO, tanggalSelesaiISO) => {
    const mulai = new Date(tanggalMulaiISO);
    const selesai = new Date(tanggalSelesaiISO);
    const now = new Date();
    if (now < mulai) return 0;
    const akhir = now > selesai ? selesai : now;
    const diff = Math.floor((akhir - mulai) / (1000 * 60 * 60 * 24)) + 1;
    return diff;
  };

  return (
    <div className="bg-gray-50 p-6 rounded-xl shadow-inner">
      <h2 className="text-2xl font-bold text-teal-700 mb-6 text-center">Timeline Proyek</h2>

      {/* DaisyUI timeline with icon snapped to start */}
      <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
        {timeline.map((minggu, idx) => {
          const hariBerjalan = hitungHariBerjalan(minggu.tanggalMulai, minggu.tanggalSelesai);

          return (
            <li key={idx}>
              <div className="timeline-middle">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 text-teal-600">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                </svg>
              </div>

              {/* posisi bergantian start/end */}
              <div className={`${idx % 2 === 0 ? "timeline-start md:text-end" : "timeline-end md:text-start"} mb-10`}>
                {/* tanggal bold */}
                <time className="font-mono font-bold italic text-gray-800">
                  {minggu.kode} — {minggu.judul} — {minggu.tanggalMulai} → {minggu.tanggalSelesai} ({minggu.durasiHari} hari)
                </time>

                {/* pekerjaan sebagai list */}
                <ul className="mt-2 list-disc list-inside">
                  {minggu.pekerjaan.map((p, i) => (
                    <li key={i} className="text-sm font-semibold text-gray-700">
                      {p}
                    </li>
                  ))}
                </ul>

                {/* foto dokumentasi grid (maks 10) */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2 my-3">
                  {minggu.foto.slice(0, 10).map((f, i) => (
                    <img
                      key={i}
                      src={f}
                      alt={`Foto Minggu ${minggu.minggu} #${i + 1}`}
                      className="w-full h-24 object-cover rounded-xl shadow"
                    />
                  ))}
                </div>

                {/* biaya, hari berjalan, verifikasi */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <p className="text-sm text-gray-700">
                    💰 Biaya Tahap: <strong>Rp {minggu.biaya.harusDibayar.toLocaleString()}</strong> — Terbayar: <strong className="text-green-600">Rp {minggu.biaya.terbayar.toLocaleString()}</strong>
                  </p>

                  <div className="text-sm text-gray-700">
                    {hariBerjalan > 0 ? <span>⏳ Hari berjalan: <strong>{hariBerjalan} hari</strong></span> : <span>⏳ Belum dimulai</span>}
                  </div>
                </div>

                <p className={`text-sm font-semibold mt-1 ${minggu.verifikasi ? "text-green-600" : "text-red-600"}`}>
                  {minggu.verifikasi ? "✅ Telah Diverifikasi Pengawas" : "❌ Belum Diverifikasi"}
                </p>

                <p className="text-sm text-gray-600 mt-1">{minggu.catatan}</p>

                {/* tombol di bawah tengah (posisi kanan untuk even index, kiri untuk odd index) */}
                <div className={`mt-4 flex gap-3 ${idx % 2 === 0 ? "justify-end" : "justify-start"}`}>
                  <button className="btn btn-sm bg-teal-600 hover:bg-teal-700 text-white border-none">Lihat Detail</button>
                  <button className="btn btn-sm btn-outline border-teal-600 text-teal-700 hover:bg-teal-600 hover:text-white">Komentar</button>
                </div>
              </div>

              <hr className="bg-teal-300" />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TLProyek;
