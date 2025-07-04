import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Komponen News Edit (bisa dipecah ke file terpisah)
const NewsEdit = ({ token }) => {
  const API = 'http://localhost:5000/api/news';
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
        return;
      }
      setForm({ title: '', description: '', content: '', image: '', imageFile: null, imageType: 'url' });
      setEditId(null);
      fetchNews();
    } catch {
      setError('Terjadi kesalahan');
    }
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
    <div>
      <h2 className="text-2xl font-bold mb-6">Edit Berita</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-md p-6 mb-8 space-y-4"
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
          >
            {editId ? 'Update' : 'Tambah'} Berita
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
  );
};

// Placeholder untuk menu lain
const AtletEdit = () => (
  <div>
    <h2 className="text-2xl font-bold mb-6">Edit Atlet</h2>
    <div className="bg-white rounded-xl shadow-md p-8">Fitur edit atlet di sini...</div>
  </div>
);

const Kurikulum = () => (
  <div>
    <h2 className="text-2xl font-bold mb-6">Kurikulum</h2>
    <div className="bg-white rounded-xl shadow-md p-8">Fitur kurikulum di sini...</div>
  </div>
);

const AdminDashboard = () => {
  const [menu, setMenu] = useState('news');
  const token = localStorage.getItem('token');

  return (
    <div className="min-h-screen flex bg-slate-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg flex flex-col py-8 px-4">
        <h1 className="text-2xl font-bold text-blue-700 mb-10 text-center">Admin Panel</h1>
        <nav className="flex flex-col gap-2">
          <button
            className={`text-left px-4 py-2 rounded transition font-semibold ${
              menu === 'news' ? 'bg-blue-600 text-white' : 'hover:bg-blue-100 text-blue-700'
            }`}
            onClick={() => setMenu('news')}
          >
            News Edit
          </button>
          <button
            className={`text-left px-4 py-2 rounded transition font-semibold ${
              menu === 'atlet' ? 'bg-blue-600 text-white' : 'hover:bg-blue-100 text-blue-700'
            }`}
            onClick={() => setMenu('atlet')}
          >
            Atlet Edit
          </button>
          <button
            className={`text-left px-4 py-2 rounded transition font-semibold ${
              menu === 'kurikulum' ? 'bg-blue-600 text-white' : 'hover:bg-blue-100 text-blue-700'
            }`}
            onClick={() => setMenu('kurikulum')}
          >
            Kurikulum
          </button>
        </nav>
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-8">
        {menu === 'news' && <NewsEdit token={token} />}
        {menu === 'atlet' && <AtletEdit />}
        {menu === 'kurikulum' && <Kurikulum />}
      </main>
    </div>
  );
};

export default AdminDashboard; 