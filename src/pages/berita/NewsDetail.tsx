import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NewsCard from './Newcars';

const AllNews = () => {
  const [news, setNews] = useState([]);
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/api/news')
      .then(res => res.json())
      .then(data => setNews(data));
  }, []);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -360, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 360, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative py-8 px-2">
      <h1 className="text-3xl font-bold text-center mb-8">Berita</h1>
      {/* Tombol geser kiri */}
      
      <div
        className="grid grid-cols-1 md:grid-cols-3 gap-6 px-14 pb-4 scroll-smooth"
        ref={scrollRef}
      >
        {news.slice(0, 6).map(item => (
          <NewsCard
            key={item._id}
            date={item.date}
            image={item.image}
            title={item.title}
            description={item.description || item.content}
            author={item.author}
          />
        ))}
      </div>
      {/* Tombol View All */}
      {news.length > 6 && (
        <div className="flex justify-center mt-8">
          <button
            onClick={() => navigate('/all-news')}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg shadow transition"
          >
            View All
          </button>
        </div>
      )}
    </div>
  );
};

export default AllNews; 