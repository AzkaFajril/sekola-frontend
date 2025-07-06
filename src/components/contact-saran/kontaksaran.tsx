import React, { useState } from "react";

const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1391113913835192331/SnuiJ7lVWoWIhMdqnoo9zaOMMmusbelZLC4DpF70wVuzLpp-xy7XlChHYXDRV6IpwGZf"; // Ganti dengan webhook kamu

const KotakSaran: React.FC = () => {
  const [form, setForm] = useState({
    nama: "",
    email: "",
    telepon: "",
    pesan: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    // Format pesan untuk Discord
    const content = `**Kotak Saran Website**\n
**Nama:** ${form.nama}
**Email:** ${form.email}
**Telepon:** ${form.telepon}
**Pesan:** ${form.pesan}`;

    try {
      const res = await fetch(DISCORD_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });
      if (res.ok) {
        setMessage("Saran berhasil dikirim!");
        setForm({ nama: "", email: "", telepon: "", pesan: "" });
      } else {
        setMessage("Gagal mengirim saran.");
      }
    } catch {
      setMessage("Terjadi kesalahan saat mengirim.");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-xl font-bold mb-4 text-blue-900">Kotak Saran</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="text"
          name="nama"
          placeholder="Nama"
          value={form.nama}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          type="text"
          name="telepon"
          placeholder="Nomor Telepon"
          value={form.telepon}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
        <textarea
          name="pesan"
          placeholder="Pesan"
          value={form.pesan}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          rows={4}
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-700 hover:bg-blue-800 text-white font-bold px-6 py-2 rounded transition"
        >
          {loading ? "Mengirim..." : "KIRIM PESAN"}
        </button>
        {message && (
          <div className={`mt-2 text-center font-semibold ${message.includes("berhasil") ? "text-green-600" : "text-red-600"}`}>
            {message}
          </div>
        )}
      </form>
    </div>
  );
};

export default KotakSaran;
