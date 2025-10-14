// client/src/pages/konsumen/TimelineProyek.jsx
import React from "react";
import TLProyek from "../../components/konsumen/TLProyek";

const TimelineProyek = () => {
  // Mulai proyek (awal untuk menghitung tanggal tiap tahap)
  const startDate = new Date("2025-09-01");

  // Durasi (hari) per tahapan — bisa disesuaikan nanti
  const durasiHari = [5, 5, 7, 7, 6, 5, 5, 6, 7, 5, 4, 3, 3];

  // Nilai per tahapan berdasarkan data RAB yang kamu kirim (angka sudah diambil dari teks)
  const tahapanBiaya = [
    3496999.95,   // I
    5673183.88,   // II
    3663700.0,    // III
    13274324.71,  // IV
    17109405.25,  // V
    10085055.59,  // VI
    6448224.27,   // VII
    6742546.94,   // VIII
    7807936.50,   // IX (gabungan a + b + c)
    22990710.45,  // X
    1236058.00,   // XI (a)
    1823001.00,   // XII
    5431999.94    // XIII
  ];

  // Helper: menambah hari ke date -> format YYYY-MM-DD
  const addDays = (date, days) => {
    const d = new Date(date);
    d.setDate(d.getDate() + days);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  // Buat array timeline dari RAB (13 tahapan), isi pekerjaan ringkas tiap tahapan
  const timeline = [
    {
      kode: "I",
      judul: "PEKERJAAN PERSIAPAN",
      pekerjaan: [
        "Pembersihan Lokasi Manual",
        "Pas bouwplank Kayu Alba",
        "Koordinasi lapangan"
      ],
      biayaTotal: tahapanBiaya[0]
    },
    {
      kode: "II",
      judul: "PEKERJAAN TANAH",
      pekerjaan: [
        "Pekerjaan galian tanah untuk pondasi",
        "Urugan tanah kembali pondasi",
        "Urugan tanah peninggian lantai"
      ],
      biayaTotal: tahapanBiaya[1]
    },
    {
      kode: "III",
      judul: "PEKERJAAN PONDASI",
      pekerjaan: [
        "Aanstamping batu kali",
        "Pondasi batu kali 1:5",
        "Rolagh bata"
      ],
      biayaTotal: tahapanBiaya[2]
    },
    {
      kode: "IV",
      judul: "PEKERJAAN BETON",
      pekerjaan: [
        "Sloof beton",
        "Kolom utama & kolom praktis",
        "Ringbalk, balok, plat"
      ],
      biayaTotal: tahapanBiaya[3]
    },
    {
      kode: "V",
      judul: "PEKERJAAN PASANGAN DINDING",
      pekerjaan: [
        "Dinding Bata Ringan / Heble",
        "Plesteran + Aci 1:5"
      ],
      biayaTotal: tahapanBiaya[4]
    },
    {
      kode: "VI",
      judul: "RANGKA ATAP & PENUTUP",
      pekerjaan: [
        "Rangka atap baja ringan",
        "Pemasangan genteng beton",
        "Lisplank & tumpangsari GRC"
      ],
      biayaTotal: tahapanBiaya[5]
    },
    {
      kode: "VII",
      judul: "PEKERJAAN PLAFOND",
      pekerjaan: [
        "Plafond GRC teras",
        "Plafond gypsum",
        "List plafond"
      ],
      biayaTotal: tahapanBiaya[6]
    },
    {
      kode: "VIII",
      judul: "LANTAI & DINDING KERAMIK",
      pekerjaan: [
        "Lantai keramik ruang utama",
        "Lantai teras & KM",
        "Dinding keramik KM"
      ],
      biayaTotal: tahapanBiaya[7]
    },
    {
      kode: "IX",
      judul: "KUSEN, PINTU & FINISHING INTERIOR (A–C)",
      pekerjaan: [
        "Kusen/pintu (bahan & finishing)",
        "Engsel, kunci & aksesori",
        "Finishing cat furniture & melamik"
      ],
      biayaTotal: tahapanBiaya[8]
    },
    {
      kode: "X",
      judul: "PEKERJAAN PENGECATAN & WATERPROOFING",
      pekerjaan: [
        "Pengecatan dinding",
        "Pengecatan plafon",
        "Waterproofing"
      ],
      biayaTotal: tahapanBiaya[9]
    },
    {
      kode: "XI",
      judul: "PLUMBING – AIR BERSIH & INSTALASI",
      pekerjaan: [
        "Instalasi air bersih PVC",
        "Peralatan & fitting",
        "Instalasi air kotor / septic"
      ],
      biayaTotal: tahapanBiaya[10]
    },
    {
      kode: "XII",
      judul: "SANITASI & PERLENGKAPAN KM",
      pekerjaan: [
        "Perlengkapan KM (kran, floor drain, roof drain)",
        "Bak & fitting"
      ],
      biayaTotal: tahapanBiaya[11]
    },
    {
      kode: "XIII",
      judul: "INSTALASI LISTRIK",
      pekerjaan: [
        "Panel, titik lampu & stop kontak",
        "Instalasi panel MCB & pentanahan"
      ],
      biayaTotal: tahapanBiaya[12]
    }
  ];

  // Bangun timeline lengkap: tanggalMulai, tanggalSelesai, foto (placeholder), biaya breakdown (mock terbayar)
  let cursorDate = new Date(startDate);
  const projekTimeline = timeline.map((t, i) => {
    const dur = durasiHari[i] || 7;
    const tanggalMulai = addDays(cursorDate, 0);
    const tanggalSelesai = addDays(cursorDate, dur - 1);
    // mock terbayar: kalau tahap index < 3 => 60% terbayar (anggap sudah lewat), else 20% terbayar
    const terbayar = Math.round(t.biayaTotal * (i < 3 ? 0.6 : 0.2));
    // buat array foto placeholder (jumlah random antara 3-8)
    const fotoCount = Math.min(10, Math.max(3, Math.floor(3 + Math.random() * 6)));
    const fotos = Array.from({ length: fotoCount }, () => "https://placehold.co/600x400");

    // maju cursorDate untuk tahap selanjutnya (next day after selesai)
    cursorDate = new Date(tanggalSelesai);
    cursorDate.setDate(cursorDate.getDate() + 1);

    return {
      minggu: i + 1,
      kode: t.kode,
      judul: t.judul,
      pekerjaan: t.pekerjaan,
      tanggalMulai,
      tanggalSelesai,
      durasiHari: dur,
      foto: fotos,
      biaya: {
        harusDibayar: Math.round(t.biayaTotal),
        terbayar: terbayar
      },
      verifikasi: i < 3, // mock: tahapan pertama 3 sudah diverifikasi
      catatan: i < 3 ? "Pekerjaan sesuai rencana" : "Menunggu realisasi di lapangan"
    };
  });

  // total nilai proyek adalah jumlah tahapan
  const nilaiProyek = Math.round(tahapanBiaya.reduce((a, b) => a + b, 0));
  const totalTerbayar = projekTimeline.reduce((a, b) => a + b.biaya.terbayar, 0);
  const sisaUang = nilaiProyek - totalTerbayar;

  return (
    <div className="container mx-auto px-6 py-10 space-y-10">
      {/* Section 1 — gambar 3D */}
      <div className="rounded-lg overflow-hidden shadow-lg">
        <img
          src="https://placehold.co/1200x500"
          alt={projekTimeline[0].judul}
          className="w-full h-auto object-cover"
        />
      </div>

      {/* Section 2 — tim proyek sejajar + info nilai */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center gap-6 flex-col md:flex-row">
          {/* Mandor */}
          <div className="flex items-center gap-4">
            <img src="https://img.daisyui.com/images/profile/demo/distracted1@192.webp" alt="mandor" className="w-20 h-20 rounded-full border-2 border-teal-600" />
            <div>
              <div className="text-sm text-teal-700 font-semibold">Mandor</div>
              <div className="text-gray-700">Budi Santoso</div>
            </div>
          </div>

          {/* Pengawas */}
          <div className="flex items-center gap-4">
            <img src="https://img.daisyui.com/images/profile/demo/distracted3@192.webp" alt="pengawas" className="w-20 h-20 rounded-full border-2 border-teal-600" />
            <div>
              <div className="text-sm text-teal-700 font-semibold">Pengawas</div>
              <div className="text-gray-700">Ahmad Fauzi</div>
            </div>
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Info nilai proyek */}
          <div className="text-right space-y-1">
            <div className="text-sm text-gray-600">Nilai Proyek</div>
            <div className="text-lg font-bold text-teal-700">Rp {nilaiProyek.toLocaleString()}</div>
            <div className="text-sm text-gray-700">Terbayar: <span className="font-semibold text-green-600">Rp {totalTerbayar.toLocaleString()}</span></div>
            <div className="text-sm text-gray-700">Sisa: <span className="font-semibold text-red-600">Rp {sisaUang.toLocaleString()}</span></div>

            <div className="mt-3 flex gap-3 justify-end">
              <button className="btn btn-sm bg-teal-600 hover:bg-teal-700 text-white border-none">Lihat RAB</button>
              <button className="btn btn-sm btn-outline border-teal-600 text-teal-700 hover:bg-teal-600 hover:text-white">Lihat Gambar Kerja</button>
            </div>
          </div>
        </div>
      </div>

      {/* Section 3 — timeline component */}
      <TLProyek timeline={projekTimeline} />
    </div>
  );
};

export default TimelineProyek;
