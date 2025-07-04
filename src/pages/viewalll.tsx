import React, { useEffect, useState } from 'react';
import NewsCard from './berita/Newcars'; // Pastikan path sudah benar

const AllNews = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/news')
      .then(res => res.json())
      .then(data => setNews(data));
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Semua Berita</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center">
        {news.length === 0 ? (
          <div className="col-span-full text-center text-gray-500">Belum ada berita.</div>
        ) : (
          news.map(item => (
            <NewsCard
              key={item._id}
              date={item.date}
              image={item.image}
              title={item.title}
              description={item.description || item.content}
              author={item.author}
              content={item.content}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default AllNews;
