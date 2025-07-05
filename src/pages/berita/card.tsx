import React, { useEffect, useState } from 'react';
import NewCard from './Newcard';
import "../../index.css";

interface NewsItem {
  _id: string;
  title: string;
  description?: string;
  content: string;
  image?: string;
  author?: string;
  date?: string;
  createdAt?: string;
}

const New: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetch('http://localhost:5000/api/news')
      .then(res => {
        if (!res.ok) {
          throw new Error('Gagal memuat data berita');
        }
        return res.json();
      })
      .then((data: NewsItem[]) => {
        setNews(data);
        setLoading(false);
      })
      .catch((error: Error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Memuat Berita...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    );
  }

  // Limit to maximum 6 news items
  const limitedNews = news.slice(0, 6);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className=" text-black py-16">
        <div className="max-w-6xl mx-auto px-4 text-center bg-white rounded-xl shadow-2xl mb-8">
          <h1 className="text-4xl font-bold mb-4">Berita Sekolah</h1>
          <p className="text-xl opacity-90">
            Berita terbaru dari sekolah kami
          </p>
        </div>
      </div>

      {/* News Grid */}
      <div className="max-w-6xl mx-auto px-2 sm:px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {limitedNews.map((item: NewsItem) => (
            <div key={item._id} className="h-full">
              <NewCard {...item} />
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gray-100 py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200">
            <a href="/all-news">liat semua berita</a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default New;