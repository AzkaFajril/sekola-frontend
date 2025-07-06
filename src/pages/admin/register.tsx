import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminRegister: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch("https://sekola-backend-production.up.railway.app/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      // Check if response is JSON
      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Server tidak merespons dengan JSON. Pastikan server berjalan di port 5000.");
      }

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Registrasi gagal");
      }

      setMessage(data.message || "Registrasi berhasil");
      
      // Redirect ke halaman login setelah 2 detik
      setTimeout(() => {
        navigate("/admin/login");
      }, 2000);
      
    } catch (err: any) {
      console.error("Error:", err);
      setMessage(err.message || "Terjadi kesalahan pada server");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto", padding: 20 }}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{ width: "100%", marginBottom: 10, padding: 8 }}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%", marginBottom: 10, padding: 8 }}
          />
        </div>
        <button type="submit" style={{ width: "100%", padding: 10 }}>
          Register
        </button>
      </form>
      {message && (
        <p style={{ marginTop: 10, color: message.includes("berhasil") ? "green" : "red" }}>
          {message}
        </p>
      )}
    </div>
  );
};

export default AdminRegister;