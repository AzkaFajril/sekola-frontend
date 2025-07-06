import PpdbLogo from "../../assets/pas3/ppdblogo.webp";

export default function BannerPpdb() {
  return (
    <div className="w-full flex justify-center items-center py-6 sm:py-12 bg-gradient-to-b from-[#f6f8ff] to-white">
      <div className="w-[98%] sm:w-[90%] max-w-7xl rounded-3xl bg-[#c9d9f7] flex flex-col sm:flex-row items-center px-4 sm:px-12 py-6 sm:py-10 shadow-lg relative overflow-hidden">
        {/* Logo & Tahun */}
        <div className="flex flex-col items-center mb-4 sm:mb-0 sm:mr-10">
          <img
            src={PpdbLogo}
            alt="Logo PPDB Jabar"
            className="w-24 h-14 sm:w-32 sm:h-20 object-contain mb-2"
          />
          <span className="text-xs text-[#7a7a7a] font-semibold">2024</span>
        </div>
        {/* Teks */}
        <div className="flex-1 text-center sm:text-left">
          <h1 className="text-xl sm:text-3xl font-bold text-[#1a174b] mb-2">
            Penerimaan Peserta Didik Baru 2025.
          </h1>
          <p className="text-sm sm:text-base text-[#1a174b] opacity-80">
            Portal penerimaan peserta didik baru yang sesuai dengan petunjuk teknis dari dinas pendidikan provinsi Jawa Barat.
          </p>
        </div>
        {/* Tombol */}
        <div className="mt-4 sm:mt-0 sm:ml-10 w-full sm:w-auto flex justify-center sm:block">
          <button className="w-full sm:w-auto bg-[#ffc400] hover:bg-[#ffb300] text-[#1a174b] font-semibold px-8 py-3 shadow transition rounded-3xl">
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
