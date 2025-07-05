import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface NewsItem {
  _id: string;
  title: string;
  description?: string;
  content: string;
  image?: string;
  author?: string;
  date?: string;
}

const BeritaTerbaru: React.FC = () => {
  const [latestNews, setLatestNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/news')
      .then(res => res.json())
      .then((data: NewsItem[]) => {
        // Ambil 3 berita terbaru
        const sortedNews = data.sort((a, b) => 
          new Date(b.date || '').getTime() - new Date(a.date || '').getTime()
        );
        setLatestNews(sortedNews.slice(0, 3));
      })
      .catch((error: Error) => {
        console.error('Error fetching latest news:', error);
      });
  }, []);

  return (
    <div className="py-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Berita Terbaru</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {latestNews.map((news: NewsItem) => (
          <div key={news._id} className="bg-white rounded-lg shadow-md overflow-hidden">
            {news.image && (
              <img 
                src={news.image} 
                alt={news.title} 
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-2">{news.title}</h3>
              {news.description && (
                <p className="text-gray-600 mb-4">{news.description}</p>
              )}
              <Link 
                to={`/news/${news._id}`}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Baca Selengkapnya
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BeritaTerbaru;