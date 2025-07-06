import React, { useState, useEffect } from "react";

type Banner = {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
};

const BannerAdmin: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const [banners, setBanners] = useState<Banner[]>([]);
  const [editId, setEditId] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Fetch all banners
  const fetchBanners = async () => {
    try {
      const res = await fetch("https://sekola-backend-production.up.railway.app/api/banner");
      const data = await res.json();
      setBanners(data);
    } catch (err) {
      setMessage("Gagal mengambil data banner");
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  // Handle image preview
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  // Handle create or update
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image && !editId) {
      setMessage("Pilih gambar terlebih dahulu!");
      return;
    }
    setLoading(true);
    setMessage(null);

    const formData = new FormData();
    if (image) formData.append("image", image);

    try {
      let res;
      if (editId) {
        // Update banner
        res = await fetch(`http://localhost:5000/api/banner/${editId}`, {
          method: "PUT",
          body: formData,
        });
      } else {
        // Create banner
        res = await fetch("http://localhost:5000/api/banner", {
          method: "POST",
          body: formData,
        });
      }
      if (res.ok) {
        setMessage(editId ? "Banner berhasil diupdate!" : "Banner berhasil diupload!");
        setImage(null);
        setPreview(null);
        setEditId(null);
        fetchBanners();
      } else {
        const data = await res.json();
        setMessage(data.error || "Gagal upload/update banner");
      }
    } catch (err) {
      setMessage("Terjadi kesalahan saat upload/update");
    } finally {
      setLoading(false);
    }
  };

  // Handle edit
  const handleEdit = (banner: Banner) => {
    setEditId(banner._id);
    setPreview(banner.imageUrl);
    setImage(null);
    setMessage(null);
  };

  // Multi-select
  const handleSelect = (id: string) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  // Multi-delete
  const handleDeleteSelected = async () => {
    if (selectedIds.length === 0) return;
    if (!window.confirm("Hapus banner terpilih?")) return;
    setLoading(true);
    try {
      for (const id of selectedIds) {
        await fetch(`http://localhost:5000/api/banner/${id}`, {
          method: "DELETE",
        });
      }
      setMessage("Banner terpilih berhasil dihapus!");
      setSelectedIds([]);
      fetchBanners();
    } catch (err) {
      setMessage("Terjadi kesalahan saat menghapus");
    } finally {
      setLoading(false);
    }
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    setEditId(null);
    setImage(null);
    setPreview(null);
    setMessage(null);
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-8 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">
        {editId ? "Edit Banner" : "Upload Banner"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {editId ? "Ganti Gambar (opsional)" : "Gambar Banner"}
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            required={!editId}
          />
        </div>
        {preview && (
          <div className="mb-2">
            <img src={preview} alt="Preview" className="w-full h-48 object-cover rounded-lg border" />
          </div>
        )}
        <div className="flex gap-2">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-200 disabled:opacity-60"
          >
            {loading ? (editId ? "Menyimpan..." : "Mengupload...") : (editId ? "Simpan Perubahan" : "Upload Banner")}
          </button>
          {editId && (
            <button
              type="button"
              onClick={handleCancelEdit}
              className="flex-1 py-2 px-4 bg-gray-300 text-gray-800 font-semibold rounded-lg shadow-md hover:bg-gray-400 transition duration-200"
            >
              Batal
            </button>
          )}
        </div>
      </form>
      {message && (
        <div
          className={`mt-4 text-center font-medium ${
            message.includes("berhasil") ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </div>
      )}

      {/* List Banner */}
      <div className="mt-10">
        <h3 className="text-xl font-bold mb-4 text-blue-700">Daftar Banner</h3>
        <div className="space-y-4">
          {banners.map(banner => (
            <div
              key={banner._id}
              className={`flex items-center gap-4 p-4 bg-gray-50 rounded-lg shadow border-2 cursor-pointer ${
                selectedIds.includes(banner._id) ? "border-blue-500" : "border-transparent"
              }`}
              onClick={() => handleSelect(banner._id)}
            >
              <input
                type="checkbox"
                checked={selectedIds.includes(banner._id)}
                onChange={e => {
                  e.stopPropagation();
                  handleSelect(banner._id);
                }}
                className="accent-blue-600"
              />
              <img src={banner.imageUrl} alt={banner.title} className="w-24 h-16 object-cover rounded border" />
              <div className="flex-1">
                <div className="font-semibold">{banner.title}</div>
                <div className="text-sm text-gray-600">{banner.description}</div>
              </div>
              <button
                onClick={e => {
                  e.stopPropagation();
                  handleEdit(banner);
                }}
                className="px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500 mr-2"
              >
                Edit
              </button>
            </div>
          ))}
        </div>
        {/* Tombol hapus massal */}
        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={handleDeleteSelected}
            disabled={selectedIds.length === 0}
            className={`px-6 py-2 rounded font-semibold transition ${
              selectedIds.length > 0
                ? "bg-red-500 hover:bg-red-600 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Hapus Terpilih
          </button>
        </div>
      </div>
    </div>
  );
};

export default BannerAdmin;
