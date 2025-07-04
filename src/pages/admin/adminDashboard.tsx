import React, { useState } from "react";
import Berita from "./News";
import Prestasi from "../prestasi";
import AdminPrestasi from "./prestasi";

    
const menuItems = [
  { key: "home", label: "/" },
  { key: "news", label: "News Edit" },
  { key: "prestasi", label: "Prestasi Edit" },
  { key: "kurikulum", label: "Kurikulum" },
];

const AdminDashboard: React.FC = () => {
  const [selectedMenu, setSelectedMenu] = useState("news");

  // Fungsi logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload(); // atau redirect ke halaman login jika ada
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-6 font-bold text-xl border-b">Admin Dashboard</div>
        <nav className="mt-4">
          {menuItems.map((item) => (
            <button
              key={item.key}
              className={`block w-full text-left px-6 py-3 hover:bg-blue-100 ${
                selectedMenu === item.key ? "bg-blue-200 font-semibold" : ""
              }`}
              onClick={() => setSelectedMenu(item.key)}
            >
              {item.label}
            </button>
          ))}
          {/* Tombol Logout */}
          <button
            className="block w-full text-left px-6 py-3 mt-8 bg-red-100 hover:bg-red-200 text-red-700 font-semibold"
            onClick={handleLogout}
          >
            Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {selectedMenu === "home" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Home</h2>
            <p>Selamat datang di Admin Dashboard!</p>
          </div>
        )}
        {selectedMenu === "news" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Edit News</h2>
            {/* Konten edit news di sini */}
            <Berita/>
          </div>
        )}
        {selectedMenu === "prestasi" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Edit Prestasi</h2>
            <AdminPrestasi/>
            {/* Konten edit prestasi di sini */}
            <p>Form edit prestasi...</p>
          </div>
        )}
        {selectedMenu === "kurikulum" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Kurikulum</h2>
            {/* Konten kurikulum di sini */}
            <p>Data kurikulum...</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
