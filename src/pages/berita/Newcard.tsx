import React from 'react';
import { Link } from 'react-router-dom';

interface NewCard {
  _id: string;
  title: string;
  description?: string;
  content: string;
  image?: string;
  author?: string;
  date?: string;
  createdAt?: string;
}

const NewCard: React.FC<NewCard> = ({ 
  _id, 
  title, 
  description, 
  image, 
  author, 
  date, 
  createdAt 
}) => {
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
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {image && (
        <div className="relative">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-48 object-cover"
          />
        
        </div>
      )}
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
        {description && (
          <p className="text-gray-600 mb-4">{description}</p>
        )}
        <div className="flex justify-between items-center">
          <Link 
            to={`/News/${_id}`}
            className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
          >
            Lihat Detail →
          </Link>
          {(date || createdAt) && (
            <span className="text-sm text-gray-500">
              {formatDate(date || createdAt || '')}
            </span>
          )}
        </div>
        {author && (
          <div className="mt-2 text-sm text-gray-500">
            Oleh: {author}
          </div>
        )}
      </div>
    </div>
  );
};

export default NewCard;