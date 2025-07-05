import React, { useEffect, useState } from "react";
import BgGuru from "../../assets/pas3/gurustaff.jpg";
import Navbar from "../navbar";
// Import foto guru/staff lokal jika ada
// import fotoGuru1 from "../../assets/guru1.jpg";
// import fotoGuru2 from "../../assets/guru2.jpg";
// dst...

type StaffGuru = {
  _id: string;
  nama: string;
  jabatan: string;
  foto?: string;
};

const GuruStaff: React.FC = () => {
  const [guruStaffList, setGuruStaffList] = useState<StaffGuru[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGuruStaff = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/staff-guru");
        const data = await res.json();
        setGuruStaffList(data);
      } catch (err) {
        setGuruStaffList([]);
      }
      setLoading(false);
    };
    fetchGuruStaff();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-64 md:h-80 flex items-center justify-center bg-gray-800">
        <Navbar />
        <img
          src={BgGuru}
          alt="Guru & Staff"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="relative z-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Guru & Staff</h1>
          <h2 className="text-xl md:text-2xl font-bold text-white">SMA PASUNDAN 3 BANDUNG</h2>
        </div>
      </div>

      {/* Card Guru & Staff */}
      <div className="max-w-6xl mx-auto py-12 px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {loading ? (
          <div className="col-span-3 text-center text-gray-500">Memuat data...</div>
        ) : guruStaffList.length === 0 ? (
          <div className="col-span-3 text-center text-gray-500">Belum ada data guru & staff.</div>
        ) : (
          guruStaffList.map((guru) => (
            <div
              key={guru._id}
              className="bg-white rounded-xl shadow-md flex flex-col items-center py-8 px-4 relative border"
            >
              <div className="relative mb-4">
                <img
                  src={guru.foto}
                  alt={guru.nama}
                  className="w-32 h-32 object-cover rounded-full border-4 border-white shadow"
                />
                {/* Titik kuning di kiri atas */}
                <span className="absolute -left-3 top-1/2 -translate-y-1/2 w-3 h-3 bg-yellow-400 rounded-full border-2 border-white"></span>
                {/* Lingkaran putus-putus */}
                <span className="absolute inset-0 rounded-full border-2 border-dashed border-gray-300 pointer-events-none"></span>
              </div>
              <div className="text-center">
                <div className="font-bold text-blue-900">{guru.nama}</div>
                <div className="text-gray-600 text-sm">{guru.jabatan}</div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default GuruStaff;
