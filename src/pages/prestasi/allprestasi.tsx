import React, { useEffect, useState } from 'react';
import PrestasiCard from './PrestasiCard';
import Navbar from '../../components/navbar';

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

const AllPrestasi: React.FC = () => {
  const [prestasi, setPrestasi] = useState<PrestasiItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetch('http://localhost:5000/api/prestasi')
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
    <div className="relative min-h-screen bg-blue-900 pt-20 ">
      <Navbar/>
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Semua Prestasi</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {prestasi.length === 0 ? (
            <div className="col-span-full text-center text-gray-500 py-8">
              Belum ada prestasi.
            </div>
          ) : (
            prestasi.map((item: PrestasiItem) => (
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
            ))
          )}
        </div>
      </div>
    </div>
    </div>
  );
};

export default AllPrestasi;