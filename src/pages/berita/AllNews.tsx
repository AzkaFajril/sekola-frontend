import React, { useEffect, useState } from 'react';
import NewsCard from './Newcard';

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

const AllNews: React.FC = () => {
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
        <div className="text-xl">Memuat berita...</div>
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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Semua Berita</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.length === 0 ? (
            <div className="col-span-full text-center text-gray-500 py-8">
              Belum ada berita.
            </div>
          ) : (
            news.map((item: NewsItem) => (
              <NewsCard
                key={item._id}
                _id={item._id}
                title={item.title}
                description={item.description}
                content={item.content}
                image={item.image}
                author={item.author}
                date={item.date}
                createdAt={item.createdAt}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AllNews;