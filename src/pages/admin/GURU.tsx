import React, { useEffect, useState } from "react";

type StaffGuru = {
  _id: string;
  nama: string;
  jabatan: string;
  foto?: string;
};

const API = "https://sekola-backend-production.up.railway.app/api/staff-guru";

const AdminStaffGuru: React.FC = () => {
  const [list, setList] = useState<StaffGuru[]>([]);
  const [form, setForm] = useState<{ nama: string; jabatan: string; foto: File | null }>({
    nama: "",
    jabatan: "",
    foto: null,
  });
  const [editId, setEditId] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Fetch data
  const fetchList = async () => {
    const res = await fetch(API);
    const data = await res.json();
    setList(data);
  };

  useEffect(() => {
    fetchList();
  }, []);

  // Handle input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "foto" && e.target.files) {
      setForm({ ...form, foto: e.target.files[0] });
      setPreview(URL.createObjectURL(e.target.files[0]));
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  // Handle submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    let jabatan = form.jabatan;
    if (jabatan && !jabatan.toLowerCase().startsWith("guru") && !jabatan.toLowerCase().includes("staff")) {
      jabatan = "Guru " + jabatan;
    }

    const formData = new FormData();
    formData.append("nama", form.nama);
    formData.append("jabatan", jabatan);
    if (form.foto) formData.append("foto", form.foto);

    try {
      let res;
      if (editId) {
        res = await fetch(`${API}/${editId}`, {
          method: "PUT",
          body: formData,
        });
      } else {
        res = await fetch(API, {
          method: "POST",
          body: formData,
        });
      }
      if (res.ok) {
        setMessage(editId ? "Data berhasil diupdate!" : "Data berhasil ditambah!");
        setForm({ nama: "", jabatan: "", foto: null });
        setPreview(null);
        setEditId(null);
        fetchList();
      } else {
        const data = await res.json();
        setMessage(data.error || "Gagal menyimpan data");
      }
    } catch {
      setMessage("Terjadi kesalahan");
    }
    setLoading(false);
  };

  // Handle edit
  const handleEdit = (item: StaffGuru) => {
    setEditId(item._id);
    setForm({ nama: item.nama, jabatan: item.jabatan, foto: null });
    setPreview(item.foto || null);
    setMessage(null);
  };

  // Cancel edit
  const handleCancel = () => {
    setEditId(null);
    setForm({ nama: "", jabatan: "", foto: null });
    setPreview(null);
    setMessage(null);
  };

  const handleSelect = (id: string) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleDeleteSelected = async () => {
    if (selectedIds.length === 0) return;
    if (!window.confirm("Hapus data terpilih?")) return;
    setLoading(true);
    try {
      for (const id of selectedIds) {
        await fetch(`${API}/${id}`, { method: "DELETE" });
      }
      setMessage("Data berhasil dihapus!");
      setSelectedIds([]);
      fetchList();
    } catch {
      setMessage("Terjadi kesalahan");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto py-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">
        {editId ? "Edit Guru/Staff" : "Tambah Guru/Staff"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow">
        <input
          type="text"
          name="nama"
          placeholder="Nama"
          value={form.nama}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
        />
        <input
          type="text"
          name="jabatan"
          placeholder="Sebagai Guru"
          value={form.jabatan}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
        />
        <input
          type="file"
          name="foto"
          accept="image/*"
          onChange={handleChange}
          className="w-full"
        />
        {preview && (
          <img src={preview} alt="Preview" className="w-32 h-32 object-cover rounded-full border mx-auto" />
        )}
        <div className="flex gap-2">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
          >
            {loading ? "Menyimpan..." : editId ? "Simpan Perubahan" : "Tambah"}
          </button>
          {editId && (
            <button
              type="button"
              onClick={handleCancel}
              className="flex-1 py-2 px-4 bg-gray-300 text-gray-800 font-semibold rounded-lg hover:bg-gray-400 transition"
            >
              Batal
            </button>
          )}
        </div>
        {message && (
          <div className={`text-center mt-2 ${message.includes("berhasil") ? "text-green-600" : "text-red-600"}`}>
            {message}
          </div>
        )}
      </form>

      {/* List Guru & Staff */}
      <div className="mt-10">
        <h3 className="text-xl font-bold mb-4 text-blue-700">Daftar Guru & Staff</h3>
        <div className="space-y-4">
          {list.map(item => (
            <div
              key={item._id}
              className={`flex items-center gap-4 p-4 bg-gray-50 rounded-lg shadow border-2 cursor-pointer ${
                selectedIds.includes(item._id) ? "border-blue-500" : "border-transparent"
              }`}
              onClick={() => handleSelect(item._id)}
            >
              <input
                type="checkbox"
                checked={selectedIds.includes(item._id)}
                onChange={e => {
                  e.stopPropagation();
                  handleSelect(item._id);
                }}
                className="accent-blue-600"
              />
              <img src={item.foto} alt={item.nama} className="w-20 h-20 object-cover rounded-full border" />
              <div className="flex-1">
                <div className="font-semibold">{item.nama}</div>
                <div className="text-sm text-gray-600">{item.jabatan}</div>
              </div>
              <button
                onClick={e => {
                  e.stopPropagation();
                  handleEdit(item);
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

export default AdminStaffGuru;
