import React, { useState } from "react";
import KepsekImg from "../../assets/pas3/kepsek600x600.webp";
import Navbar from "../navbar";
const kepalaSekolahList = [
  {
    tahun: "2023 - SEKARANG",
    nama: "Wisma Lesmana, Drs., M.M.Pd., M.Si., PhD, S.H., M.M",
    foto: KepsekImg,
    periode: "KEPALA SEKOLAH TAHUN 2023-SEKARANG",
  },
  {
    tahun: "Juni 2015",
    nama: "Drs. Ahmad Suryana, M.Pd.",
    foto: "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png",
    periode: "KEPALA SEKOLAH TAHUN 2015-2023",
  },
  {
    tahun: "Juni 2010",
    nama: "Hj. Siti Aminah, S.Pd., M.Pd.",
    foto: "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png",
    periode: "KEPALA SEKOLAH TAHUN 2010-2015",
  },
  {
    tahun: "Juni 2005",
    nama: "Drs. Bambang Sutrisno",
    foto: "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png",
    periode: "KEPALA SEKOLAH TAHUN 2005-2010",
  },
];

const RiwayatKepalaSekolah: React.FC = () => {
  const [selected, setSelected] = useState(0);

  return (
    <div className="relative min-h-screen bg-blue-900 pt-20 ">
            <Navbar/>
    <div className="min-h-screen bg-gray-50 pt-10">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-6 md:p-10 flex flex-col md:flex-row gap-8">
        {/* Sidebar Tahun */}
        <div className="md:w-1/4 flex flex-col items-center md:items-start">
          <h2 className="text-lg font-bold mb-6 text-blue-900">List Kepala Sekolah</h2>
          {kepalaSekolahList.map((item, idx) => (
            <button
              key={item.tahun}
              onClick={() => setSelected(idx)}
              className={`w-40 text-left px-4 py-2 mb-2 rounded-lg font-semibold transition
                ${selected === idx ? "bg-blue-600 text-white" : "text-blue-600 hover:bg-blue-100"}
              `}
            >
              {item.tahun}
            </button>
          ))}
        </div>
        {/* Detail Kepala Sekolah */}
        <div className="flex-1 flex flex-col items-center">
          <div className="relative mb-4">
            <img
              src={kepalaSekolahList[selected].foto}
              alt={kepalaSekolahList[selected].nama}
              className="w-40 h-40 object-cover rounded-full border-4 border-white shadow-lg"
            />
            {/* Titik kuning di kiri atas */}
            <span className="absolute -left-3 top-1/2 -translate-y-1/2 w-4 h-4 bg-yellow-400 rounded-full border-2 border-white"></span>
            {/* Lingkaran putus-putus */}
            <span className="absolute inset-0 rounded-full border-2 border-dashed border-gray-300 pointer-events-none"></span>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-blue-900 mb-1">{kepalaSekolahList[selected].nama}</div>
            <div className="text-gray-700 text-sm mb-2">{kepalaSekolahList[selected].periode}</div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default RiwayatKepalaSekolah;
