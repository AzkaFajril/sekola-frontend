import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomeCard from './pages/berita/card';
import NewsDetail from './pages/berita/NewsDetail';
import AdminLogin from './pages/AdminLogin';
import AllNews from './pages/viewalll';
import AdminDashboard from './pages/admin/adminDashboard';
import Berita from './pages/admin/News';
import Prestasi from './pages/prestasi';
import Home from "./components/Home"
import AllPrestasi from './pages/prestasi/allprestasi';
import NewsCard from './pages/berita/Newcars';


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
      <Route path="/all-news" element={<AllNews />} />
      <Route path="/Berita" element={<Berita />} />
      <Route path="/Prestasi" element={<Prestasi />} />
      <Route path="/allprestasi" element={<AllPrestasi />} />
      <Route path="/NewsCard" element={<NewsCard />} />

    </Routes>
  </Router>
  );
}

export default App;
