import React, { useEffect, useState } from "react";
import mockKonsumen from "../../../data/mockKonsumen.json";
import mockProyek from "../../../data/mockProyek.json";

const DaftarKonsumenProyek = () => {
  const [dataGabung, setDataGabung] = useState([]);

  useEffect(() => {
    // Gabungkan data konsumen dengan proyek berdasarkan id_konsumen
    const hasilGabung = mockKonsumen.map((konsumen) => {
      const proyekTerkait = mockProyek.filter((p) =>
        p.id_konsumen.includes(konsumen.id_konsumen)
      );
      return { ...konsumen, proyek: proyekTerkait };
    });
    setDataGabung(hasilGabung);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Daftar Konsumen & Proyek</h1>

      <div className="space-y-4">
        {dataGabung.map((item) => (
          <div
            key={item.id_konsumen}
            className="border border-gray-200 shadow-sm rounded-lg p-4"
          >
            <h2 className="text-xl font-semibold text-gray-800">
              {item.nama_konsumen}
            </h2>
            <p className="text-gray-600">Email: {item.email}</p>
            <p className="text-gray-600">Telepon: {item.telepon}</p>
            <p className="text-gray-600 mb-2">Alamat: {item.alamat}</p>

            {item.proyek.length > 0 ? (
              <div className="mt-3">
                <h3 className="font-medium text-gray-700 mb-2">
                  Proyek yang dimiliki:
                </h3>
                <ul className="list-disc list-inside space-y-1">
                  {item.proyek.map((proyek) => (
                    <li key={proyek.id_proyek}>
                      <span className="font-semibold">{proyek.nama_proyek}</span> {" "}
                      <span className="text-gray-500">
                        ({proyek.jenis_proyek})
                      </span>
                      <p className="text-gray-600 text-sm ml-4">
                        Deskripsi: {proyek.deskripsi}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="text-sm text-gray-500 italic">
                Belum memiliki proyek.
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DaftarKonsumenProyek;
