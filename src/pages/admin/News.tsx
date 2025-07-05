import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

const API = 'http://localhost:5000/api/news';

interface NewsItem {
  _id: string;
  title: string;
  description?: string;
  content: string;
  image?: string;
  author?: string;
  date?: string;
}

interface NewsFormData {
  title: string;
  description: string;
  content: string;
  image: string;
  imageFile: File | null;
  imageType: 'url' | 'file';
}

const Berita: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [form, setForm] = useState<NewsFormData>({
    title: '',
    description: '',
    content: '',
    image: '',
    imageFile: null,
    imageType: 'url'
  });
  const [editId, setEditId] = useState<string | null>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const token = localStorage.getItem('token');

  const fetchNews = (): void => {
    fetch(API)
      .then(res => res.json())
      .then((data: NewsItem[]) => setNews(data))
      .catch((error: Error) => {
        console.error('Error fetching news:', error);
      });
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    if (name === 'imageFile' && 'files' in e.target && e.target.files) {
      setForm({ ...form, imageFile: e.target.files[0], imageType: 'file' });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    if (!token) {
      setError('Token tidak ditemukan. Silakan login kembali.');
      setLoading(false);
      return;
    }

    try {
      let body: FormData | string;
      let headers: Record<string, string> = { 
        Authorization: `Bearer ${token}` 
      };

      if (form.imageType === 'file' && form.imageFile) {
        const formData = new FormData();
        formData.append('title', form.title);
        formData.append('description', form.description);
        formData.append('content', form.content);
        formData.append('image', form.imageFile);
        body = formData;
        // Jangan set Content-Type untuk FormData
      } else {
        body = JSON.stringify({
          title: form.title,
          description: form.description,
          content: form.content,
          image: form.image
        });
        headers['Content-Type'] = 'application/json';
      }

      const res = await fetch(editId ? `${API}/${editId}` : API, {
        method: editId ? 'PUT' : 'POST',
        headers,
        body,
      });

      if (!res.ok) {
        const data = await res.json();
        if (res.status === 401) {
          setError('Token tidak valid. Silakan login kembali.');
          // Jangan hapus token di sini, biarkan user logout manual
        } else {
          setError(data.message || 'Gagal menyimpan');
        }
        setLoading(false);
        return;
      }
      
      setForm({ title: '', description: '', content: '', image: '', imageFile: null, imageType: 'url' });
      setEditId(null);
      fetchNews();
    } catch (error) {
      setError('Terjadi kesalahan');
    }
    setLoading(false);
  };

  const handleEdit = (item: NewsItem): void => {
    setForm({
      title: item.title,
      description: item.description || '',
      content: item.content,
      image: item.image || '',
      imageFile: null,
      imageType: item.image ? 'url' : 'file'
    });
    setEditId(item._id);
  };

  const handleDelete = async (id: string): Promise<void> => {
    if (!window.confirm('Hapus berita ini?')) return;
    
    if (!token) {
      setError('Token tidak ditemukan. Silakan login kembali.');
      return;
    }

    try {
      const res = await fetch(`${API}/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (!res.ok) {
        if (res.status === 401) {
          setError('Token tidak valid. Silakan login kembali.');
          // Jangan hapus token di sini
        }
        return;
      }
      
      fetchNews();
    } catch (error) {
      console.error('Error deleting news:', error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center text-slate-800">Dashboard Admin</h2>
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-md p-8 mb-10 space-y-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="title"
              placeholder="Judul"
              value={form.title}
              onChange={handleChange}
              required
              className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              name="description"
              placeholder="Deskripsi singkat"
              value={form.description}
              onChange={handleChange}
              required
              className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-1">
              <input
                type="radio"
                name="imageType"
                value="url"
                checked={form.imageType === 'url'}
                onChange={handleChange}
              />
              <span className="text-sm">Gambar dari Link</span>
            </label>
            <label className="flex items-center space-x-1">
              <input
                type="radio"
                name="imageType"
                value="file"
                checked={form.imageType === 'file'}
                onChange={handleChange}
              />
              <span className="text-sm">Upload dari Komputer</span>
            </label>
          </div>
          {form.imageType === 'url' ? (
            <input
              name="image"
              placeholder="URL Gambar"
              value={form.image}
              onChange={handleChange}
              className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          ) : (
            <input
              type="file"
              name="imageFile"
              accept="image/*"
              onChange={handleChange}
              className="w-full"
            />
          )}
          <textarea
            name="content"
            placeholder="Konten"
            value={form.content}
            onChange={handleChange}
            required
            rows={4}
            className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <div className="flex space-x-2">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded transition"
              disabled={loading}
            >
              {loading ? 'Tunggu sebentar...' : (editId ? 'Update' : 'Tambah')} Berita
            </button>
            {editId && (
              <button
                type="button"
                onClick={() => {
                  setEditId(null);
                  setForm({ title: '', description: '', content: '', image: '', imageFile: null, imageType: 'url' });
                }}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold px-6 py-2 rounded transition"
              >
                Batal Edit
              </button>
            )}
          </div>
          {error && <div className="text-red-600">{error}</div>}
        </form>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {news.map((item: NewsItem) => (
            <div key={item._id} className="bg-white rounded-xl shadow p-6 flex flex-col space-y-2">
              <div className="flex items-center justify-between">
                <b className="text-lg text-slate-700">{item.title}</b>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded text-xs"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
                  >
                    Hapus
                  </button>
                </div>
              </div>
              <div className="text-gray-500 text-sm mb-1">{item.description}</div>
              {item.image && (
                <img src={item.image} alt={item.title} className="w-full h-32 object-cover rounded mb-2" />
              )}
              <Link
                to={`/news/${item._id}`}
                className="text-blue-600 hover:underline text-sm"
              >
                Lihat Detail
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Berita;