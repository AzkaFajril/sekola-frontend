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

const News: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetch('http://localhost:5000/api/news')
      .then(res => {
        if (!res.ok) {
          throw new Error('Gagal memuat berita');
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
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className=" text-black py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Berita Sekolah</h1>
          <p className="text-xl opacity-90">
            Temukan informasi terbaru seputar kegiatan dan prestasi sekolah kami
          </p>
        </div>
      </div>

      {/* News Grid */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {news.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-500 text-xl mb-4">Belum ada berita</div>
            <p className="text-gray-400">Berita akan muncul di sini</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((item: NewsItem) => (
              <div key={item._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                {item.image && (
                  <div className="relative">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-48 object-cover transition-transform duration-300 ease-in-out hover:scale-110"
                    />
                    <div className="absolute top-0 left-0 b text-white px-3 py-1 text-sm">
                      Berita
                    </div>
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-gray-800 line-clamp-2">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {item.description}
                    </p>
                  )}
                  <div className="flex justify-between items-center">
                    <Link 
                      to={`/news/${item._id}`}
                      className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
                    >
                      Baca Selengkapnya →
                    </Link>
                    {item.date && (
                      <span className="text-sm text-gray-500">
                        {new Date(item.date).toLocaleDateString('id-ID', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </span>
                    )}
                  </div>
                  {item.author && (
                    <div className="mt-2 text-sm text-gray-500">
                      Oleh: {item.author}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Call to Action */}
      <div className="bg-gray-100 py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          
          <Link 
            to="/all-news"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200"
          >
            Liat Semua
          </Link>
        </div>
      </div>
    </div>
  );
};

export default News;