import React, { useEffect, useState } from 'react';
import NewsCard from './Newcars'; // Pastikan path sudah benar

const AllNews = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/news')
      .then(res => res.json())
      .then(data => setNews(data));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 to-slate-200 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-slate-800 mb-2 drop-shadow">
          Semua Berita
        </h1>
        <p className="text-center text-slate-500 mb-10">
          Temukan informasi dan update terbaru di sini.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.length === 0 ? (
            <div className="col-span-full text-center text-gray-500 py-20">
              Belum ada berita.
            </div>
          ) : (
            news.map(item => (
              <div
                key={item._id}
                className="transition-transform duration-200 hover:-translate-y-2 hover:shadow-2xl"
              >
                <NewsCard
                  date={item.date}
                  image={item.image}
                  title={item.title}
                  description={item.description || item.content}
                  author={item.author}
                  content={item.content}
                />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AllNews; 