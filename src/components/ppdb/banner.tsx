import PpdbLogo from "../../assets/pas3/ppdblogo.webp";

export default function BannerPpdb() {
  return (
    <div className="w-full flex justify-center items-center py-12 bg-gradient-to-b from-[#f6f8ff] to-white">
      <div className="w-[90%] max-w-7xl rounded-3xl bg-[#c9d9f7] flex items-center px-12 py-10 shadow-lg relative overflow-hidden">
        {/* Logo & Tahun */}
        <div className="flex flex-col items-center mr-10">
          <img
            src={PpdbLogo}
            alt="Logo PPDB Jabar"
            className="w-32 h-20 object-contain mb-2"
          />
          <span className="text-xs text-[#7a7a7a] font-semibold">2024</span>
        </div>
        {/* Teks */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-[#1a174b] mb-2">
            Penerimaan Peserta Didik Baru 2025.
          </h1>
          <p className="text-base text-[#1a174b] opacity-80">
            Portal penerimaan peserta didik baru yang sesuai dengan petunjuk teknis dari dinas pendidikan provinsi Jawa Barat.
          </p>
        </div>
        {/* Tombol */}
        <div className="ml-10">
          <button className=" bg-[#ffc400] hover:bg-[#ffb300] text-[#1a174b] font-semibold px-8 py-3 shadow transition  ">
            <a href="/ppdb" className="text-white">PPDB 2025</a>
          </button>
        </div>
        {/* Ornamen SVG */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 1200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 100 Q300 0 600 100 T1200 100"
            stroke="#e3eaff"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M0 200 Q400 100 800 200 T1200 200"
            stroke="#e3eaff"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </div>
    </div>
  );
}
