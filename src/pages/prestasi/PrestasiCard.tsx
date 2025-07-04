import React from 'react';

interface PrestasiCardProps {
  title: string;
  description: string;
  content?: string;
  image: string;
  date?: string;
  author?: string;
  level?: string;
  onClick?: () => void;
}

function formatDateTime(dateString: string) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('id-ID', {
    day: '2-digit', month: 'long', year: 'numeric'
  }) + ' ' + date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

const PrestasiCard: React.FC<PrestasiCardProps> = ({
  title,
  description,
  content,
  image,
  date,
  author,
  level,
  onClick
}) => (
  <div
    className="flex bg-white rounded-xl shadow p-4 cursor-pointer hover:ring-2 hover:ring-blue-400 transition"
    onClick={onClick}
  >
    <div className="w-1/3 flex items-center justify-center">
      <img
        src={image}
        alt={title}
        className="rounded-xl object-cover w-full h-40"
        style={{ background: '#222' }}
      />
    </div>
    <div className="w-2/3 pl-6 flex flex-col justify-center">
      <b className="text-lg text-slate-700 mb-2">{title}</b>
      <div className="text-gray-500 text-sm mb-1">{formatDateTime(date)}</div>
      <div className="mb-1">{description}</div>
      <div className="text-xs text-gray-600">
        {author && <span>👤 {author}</span>}
        {level && <span className="ml-4">🏆 {level}</span>}
      </div>
      {content && (
        <div className="mt-2 text-sm text-slate-700">{content}</div>
      )}
    </div>
  </div>
);

export default PrestasiCard;