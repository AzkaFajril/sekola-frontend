import React from 'react';
import { Link } from 'react-router-dom';

interface PrestasiCardProps {
  _id: string;
  title: string;
  description?: string;
  content: string;
  image?: string;
  author?: string;
  date?: string;
  createdAt?: string;
}

const PrestasiCard: React.FC<PrestasiCardProps> = ({
  _id,
  title,
  description,
  image,
  author,
  date,
  createdAt,
}) => {
  const formatDate = (dateString: string): string => {
    if (!dateString) return '';
    const dateObj = new Date(dateString);
    return dateObj.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <div className="flex rounded-lg shadow-md overflow-hidden mb-6">
      {/* Bagian Gambar */}
      <div className="w-1/3 bg-gray-100 flex items-center justify-center min-h-[140px]">
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-56 object-cover rounded"
          />
        ) : (
          <div className="w-full h-36 flex items-center justify-center text-gray-400">
            Tidak ada gambar
          </div>
        )}
      </div>
      {/* Bagian Konten */}
      <div className="w-2/3 p-6 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-bold text-blue-900 mb-2">{title}</h3>
          {description && (
            <p className="text-gray-700 mb-2">{description}</p>
          )}
        </div>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-4">
          <div className="text-sm text-gray-500">
            {author && <>Oleh: {author} | </>}
            {formatDate(date || createdAt || '')}
          </div>
          <Link
            to={`/prestasi/${_id}`}
            className="mt-2 md:mt-0 text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
          >
            Lihat Detail →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PrestasiCard;