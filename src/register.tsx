import React, { useState } from 'react';

const Register = ({ onRegister }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess('Registrasi berhasil! Silakan login.');
        if (onRegister) onRegister();
      } else {
        setError(data.message || 'Registrasi gagal');
      }
    } catch {
      setError('Terjadi kesalahan');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register Admin</h2>
      {error && <div style={{color:'red'}}>{error}</div>}
      {success && <div style={{color:'green'}}>{success}</div>}
      <input type="text" placeholder="Username" value={username} onChange={e=>setUsername(e.target.value)} required />
      <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} required />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;