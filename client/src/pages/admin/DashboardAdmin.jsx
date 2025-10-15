// client/src/pages/admin/DashboardAdmin.jsx
import React from "react";
import { HiOutlineClipboardList, HiOutlineUserGroup, HiOutlineUser, HiOutlineCash, HiOutlineCheckCircle } from "react-icons/hi";

const DashboardAdmin = () => {
  // Dummy data ringkasan
  const summary = [
    { name: "Proyek Aktif", value: 12, icon: <HiOutlineClipboardList size={24} />, color: "bg-blue-500" },
    { name: "Konsumen", value: 45, icon: <HiOutlineUserGroup size={24} />, color: "bg-green-500" },
    { name: "Mandor", value: 8, icon: <HiOutlineUser size={24} />, color: "bg-yellow-500" },
    { name: "Pengawas", value: 5, icon: <HiOutlineCheckCircle size={24} />, color: "bg-teal-500" },
    { name: "Pembayaran Pending", value: 3, icon: <HiOutlineCash size={24} />, color: "bg-red-500" },
  ];

  // Dummy data progres proyek
  const proyekProgress = [
    { name: "Renovasi Rumah Pak Budi", progress: 70 },
    { name: "Bangun Ruko Bu Ani", progress: 40 },
    { name: "Renovasi Kantor CV Maju", progress: 90 },
  ];

  return (
    <div className="space-y-6">
      {/* ===== Summary Cards ===== */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {summary.map((item, idx) => (
          <div key={idx} className={`flex items-center p-4 rounded-xl shadow-lg ${item.color} text-white`}>
            <div className="mr-4">{item.icon}</div>
            <div>
              <p className="text-lg font-semibold">{item.value}</p>
              <p className="text-sm">{item.name}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ===== Progress Proyek ===== */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-4">Progres Proyek Aktif</h2>
        <div className="space-y-3">
          {proyekProgress.map((p, idx) => (
            <div key={idx}>
              <div className="flex justify-between mb-1">
                <span className="font-medium">{p.name}</span>
                <span className="text-sm font-medium">{p.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-teal-500 h-3 rounded-full" style={{ width: `${p.progress}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ===== Notifikasi / Alert ===== */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg shadow">
        <h3 className="font-bold text-yellow-800">Perhatian</h3>
        <p className="text-yellow-700">
          Terdapat 2 proyek yang belum ditunjuk pengawas. Segera lakukan penunjukan!
        </p>
      </div>
    </div>
  );
};

export default DashboardAdmin;
