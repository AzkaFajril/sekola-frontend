import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PrestasiCard from './PrestasiCard';

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

const Prestasi: React.FC = () => {
  const [prestasi, setPrestasi] = useState<PrestasiItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetch('https://sekola-backend-production.up.railway.app/api/prestasi')
      .then(res => {
        if (!res.ok) {
          throw new Error('Gagal memuat data prestasi');
        }
        return res.json();
      })
      .then((data: PrestasiItem[]) => {
        setPrestasi(data);
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
        <div className="text-xl">Memuat prestasi...</div>
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
      <div className="bg-yellow-500 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Prestasi Sekolah</h1>
          <p className="text-xl opacity-90">
            Prestasi dan pencapaian membanggakan siswa-siswi kami
          </p>
        </div>
      </div>

      {/* Prestasi Grid */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {prestasi.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-500 text-xl mb-4">Belum ada prestasi</div>
            <p className="text-gray-400">Prestasi akan muncul di sini</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8">
            {prestasi.slice(0, 5).map((item: PrestasiItem) => (
              <PrestasiCard
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
            ))}
          </div>
        )}
      </div>

      {/* Call to Action */}
      <div className="bg-white py-12">
        <div className="max-w-4xl mx-auto px-2 text-center">
          <Link
            to="/allprestasi"
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200 inline-block"
          >
            Lihat semua Prestasi
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Prestasi;