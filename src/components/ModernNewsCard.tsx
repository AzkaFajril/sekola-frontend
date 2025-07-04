import React from 'react';

interface ModernNewsCardProps {
  image: string;
  title: string;
  description: string;
  date: string;
  author?: string;
  onClick?: () => void;
}

function formatDate(dateString: string) {
  if (!dateString) return { day: '', month: '', year: '' };
  const d = new Date(dateString);
  return {
    day: d.getDate().toString().padStart(2, '0'),
    month: d.toLocaleString('id-ID', { month: 'short' }),
    year: d.getFullYear()
  };
}

const ModernNewsCard: React.FC<ModernNewsCardProps> = ({
  image,
  title,
  description,
  date,
  author,
  onClick,
}) => {
  const { day, month, year } = formatDate(date);
  return (
    <div
      className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col cursor-pointer hover:ring-2 hover:ring-blue-400 transition h-full"
      onClick={onClick}
    >
      <div className="relative w-full h-40">
        <img src={image} alt={title} className="w-full h-full object-cover" />
        <div className="absolute top-2 left-2 bg-blue-700 text-white rounded-lg px-3 py-1 flex flex-col items-center shadow">
          <span className="text-lg font-bold leading-none">{day}</span>
          <span className="text-xs uppercase leading-none">{month}</span>
          <span className="text-[10px]">{year}</span>
        </div>
      </div>
      <div className="flex flex-col flex-1 p-4">
        <h3 className="text-base font-bold text-slate-800 mb-1 line-clamp-2">{title}</h3>
        <p className="text-sm text-gray-600 mb-2 line-clamp-3">{description}</p>
        <div className="flex items-center mt-auto">
          {author && (
            <span className="text-xs text-gray-500">By {author}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModernNewsCard; 