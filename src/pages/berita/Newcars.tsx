import React, { useState } from 'react';

const NewsCard = ({ date, image, title, description, author, content }) => {
  // Ambil tanggal dan bulan dari date
  const d = new Date(date);
  const day = d.getDate();
  const month = d.toLocaleString('id-ID', { month: 'short' });
  const year = d.getFullYear();
  const time = d.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

  // State untuk modal
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div
        className="relative bg-white rounded-xl shadow-md overflow-hidden flex flex-col min-w-[400px] max-w-[400px] cursor-pointer"
        onClick={() => setShowModal(true)}
      >
        {/* Tanggal di pojok kiri atas */}
       
        {/* Gambar */}
        {image && (
          <img
            src={image}
            alt={title}
            className="w-full h-[140px] object-cover"
          />
        )}
        {/* Konten */}
        <div className="p-4 flex flex-col flex-1">
          <h2 className="text-base font-semibold mb-2 line-clamp-2">{title}</h2>
          <p className="text-gray-600 text-sm mb-3 line-clamp-3">{description}</p>
          <div className="flex items-center justify-between mt-auto">
            <span className="text-xs text-gray-400">{author}</span>
            <button
              className="text-blue-600 font-semibold text-xs hover:underline"
              onClick={e => { e.stopPropagation(); setShowModal(true); }}
            >
              Lihat Detail
            </button>
          </div>
          {/* Tanggal di bawah card, tanpa background */}
          <div className="mt-4 text-xs text-gray-500">
            {`${day} ${month} ${year} ${time}`}
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: 'rgba(255,255,255,0.2)' }}
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-[90vw] p-8 relative"
            onClick={e => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
              onClick={() => setShowModal(false)}
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4">{title}</h2>
            <div className="text-sm text-gray-500 mb-4">
              {`${day} ${month} ${year} ${time}`} | {author}
            </div>
            {image && (
              <img src={image} alt={title} className="w-full h-64 object-cover rounded mb-6" />
            )}
            <div className="text-gray-700 text-base">
              {content || description}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NewsCard;