import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface PrestasiItem {
  _id: string;
  title: string;
  description?: string;
  content: string;
  image?: string;
  author?: string;
  date?: string;
  createdAt?: string;
}

const PrestasiDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [prestasi, setPrestasi] = useState<PrestasiItem | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (!id) return;

    fetch(`https://sekola-backend-production.up.railway.app/api/prestasi/${id}`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Prestasi tidak ditemukan');
        }
        return res.json();
      })
      .then((data: PrestasiItem) => {
        setPrestasi(data);
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

  if (error || !prestasi) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-600">{error || 'Prestasi tidak ditemukan'}</div>
      </div>
    );
  }

  const formatDate = (dateString: string): string => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <article className="bg-white rounded-lg shadow-md overflow-hidden">
          {prestasi.image && (
            <img 
              src={prestasi.image} 
              alt={prestasi.title} 
              className="w-full h-96 object-cover"
            />
          )}
          <div className="p-8">
            <div className="flex items-center mb-4">
              <div className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-semibold mr-4">
                Prestasi
              </div>
              {(prestasi.date || prestasi.createdAt) && (
                <span className="text-sm text-gray-500">
                  {formatDate(prestasi.date || prestasi.createdAt || '')}
                </span>
              )}
            </div>
            <h1 className="text-3xl font-bold mb-4 text-gray-800">{prestasi.title}</h1>
            {prestasi.description && (
              <p className="text-xl text-gray-600 mb-6">{prestasi.description}</p>
            )}
            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed">{prestasi.content}</p>
            </div>
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex justify-between items-center text-sm text-gray-500">
                {prestasi.author && <span>Oleh: {prestasi.author}</span>}
                {prestasi.createdAt && (
                  <span>
                    Dibuat: {formatDate(prestasi.createdAt)}
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

export default PrestasiDetail;