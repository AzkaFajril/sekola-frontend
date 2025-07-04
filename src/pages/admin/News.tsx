import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const API = 'http://localhost:5000/api/news';

const Berita = () => {
  const [news, setNews] = useState([]);
  const [form, setForm] = useState({
    title: '',
    description: '',
    content: '',
    image: '',
    imageFile: null,
    imageType: 'url'
  });
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem('token');

  const fetchNews = () => {
    fetch(API)
      .then(res => res.json())
      .then(data => setNews(data));
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleChange = e => {
    const { name, value, files } = e.target;
    if (name === 'imageFile') {
      setForm({ ...form, imageFile: files[0], imageType: 'file' });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      let body;
      let headers = { Authorization: `Bearer ${token}` };

      if (form.imageType === 'file' && form.imageFile) {
        body = new FormData();
        body.append('title', form.title);
        body.append('description', form.description);
        body.append('content', form.content);
        body.append('image', form.imageFile);
        headers = { Authorization: `Bearer ${token}` };
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
        setError(data.message || 'Gagal menyimpan');
        setLoading(false);
        return;
      }
      setForm({ title: '', description: '', content: '', image: '', imageFile: null, imageType: 'url' });
      setEditId(null);
      fetchNews();
    } catch {
      setError('Terjadi kesalahan');
    }
    setLoading(false);
  };

  const handleEdit = item => {
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

  const handleDelete = async id => {
    if (!window.confirm('Hapus berita ini?')) return;
    try {
      await fetch(`${API}/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchNews();
    } catch {}
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
          {news.map(item => (
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