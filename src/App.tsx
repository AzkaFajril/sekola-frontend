import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/adminDashboard';
import Berita from './pages/admin/News';
import Prestasi from './pages/prestasi';
import Home from "./components/Home/Index"
import AllPrestasi from './pages/prestasi/allprestasi';
import AdminRegister from './pages/admin/register';
import AllNew from './pages/berita/AllNews';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  const handleLogin = () => setIsLoggedIn(true);

  return (
    <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/admin/login"
        element={
          isLoggedIn
            ? <Navigate to="/admin/dashboard" replace />
            : <AdminLogin onLogin={handleLogin} />
        }
      />
      <Route
        path="/admin/dashboard"
        element={
          isLoggedIn
            ? <AdminDashboard />
            : <Navigate to="/admin/login" replace />
        }
      />
      <Route path="/admin/register" element={<AdminRegister />} />
      <Route path="/all-news" element={<AllNew />} />
      <Route path="/Berita" element={<Berita />} />
      <Route path="/Prestasi" element={<Prestasi />} />
      <Route path="/allprestasi" element={<AllPrestasi />} />

    </Routes>
  </Router>
  );
}

export default App;