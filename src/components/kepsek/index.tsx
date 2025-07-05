import React from "react";
import fotoKepsek from "../../assets/pas3/kepsek600x600.webp"; // Ganti path sesuai lokasi foto kamu

const KepalaSekolah: React.FC = () => (
  <div className="min-h-[60vh] flex items-center justify-center bg-gradient-to-b from-gray-100 to-white py-12">
    <div className="max-w-5xl w-full mx-auto flex flex-col md:flex-row items-center gap-10 bg-[#f5f6fa] rounded-xl shadow-lg p-8">
      {/* Foto Kepala Sekolah */}
      <div className="flex-shrink-0">
        <img
          src={fotoKepsek}
          alt="Kepala Sekolah"
          className="w-72 h-96 object-cover rounded-lg shadow"
        />
      </div>
      {/* Deskripsi */}
      <div className="flex-1 text-center md:text-left">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-700 mb-4">
          Kepala Sekolah SMAS Pasundan 3 Bandung
        </h2>
        <p className="text-gray-500 text-lg">
          Pembelajaran e-learning merupakan bagian dari tuntutan kemajuan teknologi dan komunikasi saat ini. 
          It's crafted with the latest trend of design & coded with all modern approaches. 
          It's a robust & multi-dimensional usable template.
        </p>
      </div>
    </div>
  </div>
);

export default KepalaSekolah;
