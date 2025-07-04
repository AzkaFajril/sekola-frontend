import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ModernNewsCard from '../../components/ModernNewsCard';

const API = 'http://localhost:5000/api/news';

const BeritaTerbaru = () => {
  const [news, setNews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(API)
      .then(res => res.json())
      .then(data => setNews(data));
  }, []);

  return (
    <div className="min-h-screen bg-[#002147] py-10 px-2 sm:px-4">
      <h2 className="text-3xl font-bold mb-8 text-center text-white">Berita Terbaru</h2>
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.slice(0, 6).map(item => (
          <ModernNewsCard
            key={item._id}
            image={item.image}
            title={item.title}
            description={item.description || item.content}
            date={item.date}
            author={item.author}
            onClick={() => navigate(`/berita/${item._id}`)}
          />
        ))}
      </div>
      {news.length > 6 && (
        <div className="flex justify-center mt-8">
          <button
            onClick={() => navigate('/berita/all')}
            className="border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-[#002147] font-semibold px-6 py-2 rounded transition"
          >
            TAMPILKAN SEMUA BERITA
          </button>
        </div>
      )}
    </div>
  );
};

export default BeritaTerbaru; 