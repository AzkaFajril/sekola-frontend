import React, { useState } from 'react';


const AdminLogin = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('token', data.token);
        onLogin();
      } else {
        setError(data.message || 'Login gagal');
      }
    } catch {
      setError('Terjadi kesalahan');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login Admin</h2>
      {error && <div style={{color:'red'}}>{error}</div>}
      <input type="text" placeholder="Username" value={username} onChange={e=>setUsername(e.target.value)} required />
      <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} required />
      <button type="submit">Login</button>
    </form>
  );
};

export default AdminLogin; 