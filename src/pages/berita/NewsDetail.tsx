import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface NewsItem {
  _id: string;
  title: string;
  description?: string;
  content: string;
  image?: string;
  author?: string;
  date?: string;
}

const NewsDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [news, setNews] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (!id) return;

    fetch(`http://localhost:5000/api/news/${id}`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Berita tidak ditemukan');
        }
        return res.json();
      })
      .then((data: NewsItem) => {
        setNews(data);
        setLoading(false);
      })
      .catch((error: Error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Memuat...</div>
      </div>
    );
  }

  if (error || !news) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-600">{error || 'Berita tidak ditemukan'}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <article className="bg-white rounded-lg shadow-md overflow-hidden">
          {news.image && (
            <img 
              src={news.image} 
              alt={news.title} 
              className="w-full h-96 object-cover"
            />
          )}
          <div className="p-8">
            <h1 className="text-3xl font-bold mb-4 text-gray-800">{news.title}</h1>
            {news.description && (
              <p className="text-xl text-gray-600 mb-6">{news.description}</p>
            )}
            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed">{news.content}</p>
            </div>
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex justify-between items-center text-sm text-gray-500">
                {news.author && <span>Oleh: {news.author}</span>}
                {news.date && (
                  <span>
                    {new Date(news.date).toLocaleDateString('id-ID', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </span>
                )}
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default NewsDetail;