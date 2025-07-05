import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/adminDashboard';
import Berita from './pages/admin/News';
import Prestasi from './pages/prestasi';
import AllPrestasi from './pages/prestasi/allprestasi';
import AdminRegister from './pages/admin/register';
import AllNew from './pages/berita/AllNews';
import ConfigLayout from './components/configLayout';
import NewsDetail from './pages/berita/NewsDetail';
import PrestasiDetail from './pages/prestasi/PrestasiDetail';
import VisiMisi from './components/visidanmisi';
import RiwayatKepalaSekolah from './components/riwayat-kepala-sekola';
import GuruStaff from './components/staff-guru';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  const handleLogin = () => setIsLoggedIn(true);

  return (
    <Router>
    <Routes>
      <Route path="/" element={<ConfigLayout />} />
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
      <Route path="/news/:id" element={<NewsDetail />} />
      <Route path="/prestasi/:id" element={<PrestasiDetail />} />
      <Route path="/Berita" element={<Berita />} />
      <Route path="/Prestasi" element={<Prestasi />} />
      <Route path="/allprestasi" element={<AllPrestasi />} />
      <Route path="/profile/Visi-Misi" element={<VisiMisi />} />
      <Route path="/profile/Riwayat-Kepala-Sekolah" element={<RiwayatKepalaSekolah />} />
      <Route path="/profile/staff" element={<GuruStaff />} />

    </Routes>
  </Router>
  );
}

export default App;