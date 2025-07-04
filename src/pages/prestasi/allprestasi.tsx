import React, { useEffect, useState } from 'react';
import PrestasiCard from './PrestasiCard';

const API = 'http://localhost:5000/api/prestasi';

const AllPrestasi = () => {
  const [prestasi, setPrestasi] = useState([]);
  const [selected, setSelected] = useState<any>(null);

  useEffect(() => {
    fetch(API)
      .then(res => res.json())
      .then(data => setPrestasi(data));
  }, []);

  function formatDateTime(dateString: string) {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: '2-digit', month: 'long', year: 'numeric'
    }) + ' ' + date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  }

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4">
      <h2 className="text-3xl font-bold mb-8 text-center text-slate-800">Semua Prestasi</h2>
      <div className="max-w-5xl mx-auto space-y-4">
        {prestasi.length === 0 && (
          <div className="text-center text-gray-500">Belum ada data prestasi.</div>
        )}
        {prestasi.map(item => (
          <PrestasiCard
            key={item._id}
            title={item.title}
            description={item.description}
            content={item.content}
            image={item.image}
            date={item.createdAt || item.date}
            author={item.author}
            level={item.level}
            onClick={() => setSelected(item)}
          />
        ))}
      </div>

      {/* Modal Detail */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white rounded-xl shadow-lg max-w-lg w-full p-6 relative"
            onClick={e => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-xl text-gray-500 hover:text-red-500"
              onClick={() => setSelected(null)}
            >
              &times;
            </button>
            <img
              src={selected.image}
              alt={selected.title}
              className="w-full h-56 object-cover rounded mb-4"
            />
            <h3 className="text-2xl font-bold mb-2">{selected.title}</h3>
            <div className="text-gray-500 text-sm mb-2">
              {formatDateTime(selected.createdAt || selected.date)}
            </div>
            <div className="mb-2">{selected.description}</div>
            <div className="mb-2 text-sm text-slate-700">{selected.content}</div>
            <div className="text-xs text-gray-600">
              {selected.author && <span>👤 {selected.author}</span>}
              {selected.level && <span className="ml-4">🏆 {selected.level}</span>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllPrestasi;