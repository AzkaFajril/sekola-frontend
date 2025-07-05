import React from "react";

type LinkTerkaitItem = {
  name: string;
  img: string;
  url: string;
};

const links: LinkTerkaitItem[] = [
  {
    name: "Lambang Tut Wuri Handayani",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgKG1wjtDbqk3PkBptkQHJbqBuQnC67t0VQg&s",
    url: "https://www.kemendikdasmen.go.id/",
  },
  {
    name: "JABAR NEWS",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvdid2qRSeIxcSjtD_DlCo-ogMTkYUPpUHug&s",
    url: "https://www.jabarnews.com/",
  },
  {
    name: "PPDB JABAR",
    img: "https://ppdb-slb.jabarprov.go.id/static/media/ppdb-logo.727d7d10.png",
    url: "https://spmb.jabarprov.go.id/",
  },
  {
    name: "SISDIK JABAR",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYjKHnptujQx_o3QyaKuBAS5w5Lvh_omYdTw&s",
    url: "https://disdik.jabarprov.go.id/",
  },
  {
    name: "SIAP JABAR",
    img: "https://sman1bdg.sch.id/wp-content/uploads/2022/11/logo-siap-jabar.png",
    url: "https://siap.jabarprov.go.id/",
  },
];

const LinkTerkait: React.FC = () => (
  <div className="py-50 bg-white">
    <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-blue-900">Link Terkait</h2>
    <div className="flex flex-wrap justify-center gap-9 p-5x`">
      {links.map((link, idx) => (
        <a
          key={idx}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="w-40 sm:w-48 bg-white border border-gray-300 rounded-xl flex flex-col items-center py-6 px-4 shadow hover:shadow-lg transition"
        >
          <div className="w-24 h-24 flex items-center justify-center mb-4">
            <div className="relative">
              <img
                src={link.img}
                alt={link.name}
                className="w-24 h-24 object-contain rounded-full border"
              />
              {/* Titik kuning di kiri */}
              <span className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-yellow-400 rounded-full border-2 border-white -ml-2"></span>
            </div>
          </div>
          <div className="text-center text-xs sm:text-sm font-bold text-blue-900">{link.name}</div>
        </a>
      ))}
    </div>
  </div>
);

export default LinkTerkait;
