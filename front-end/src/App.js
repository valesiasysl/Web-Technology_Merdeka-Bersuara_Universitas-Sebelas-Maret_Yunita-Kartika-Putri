import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import HomePage from './pages/HomePage';
import LaporPage from './pages/LaporPage';
import KonsultasiPage from './pages/KonsultasiPage';
import ChatKonsulPage from './pages/ChatKonsulPage';
import PasalPintarPage from './pages/PasalPintarPage';
import ChatBotPage from './pages/ChatBotPage';
import ArticlePage from './pages/ArticlePage';
import ArticleDetailPage from './pages/ArticleDetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

import Dashboard from './pages/admin/Dashboard';
import Users from './pages/admin/Users';
import Advokats from './pages/admin/Advokats';
import LaporanAdminPage from './pages/admin/LaporanAdminPage';
import ArtikelAdminPage from './pages/admin/ArtikelAdminPage';
import ChatBotAdminPage from './pages/admin/ChatBotAdminPage';

import RadarRakyat1 from './pages/RadarRakyat1';
import MapComponent from './components/MapComponent';
import FormLaporanKasus from './components/FormLaporanKasus';
import PetaKasusHAM from './pages/PetaKasus';
import PetaAdvokat from './pages/PetaAdvokat';
import FormAdvokat from './components/FormAdvokat';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public Pages */}
          <Route path="/" element={<HomePage />} />
          <Route path="/laporin" element={<LaporPage />} />
          <Route path="/konsultasi" element={<KonsultasiPage />} />
          <Route path="/chatkonsultasi" element={<ChatKonsulPage />} />
          <Route path="/pasalpintar" element={<PasalPintarPage />} />
          <Route path="/map" element={<RadarRakyat1 />} />
          <Route path="/chatbot" element={<ChatBotPage />} />
          <Route path="/artikel" element={<ArticlePage />} />
          <Route path="/article/:id" element={<ArticleDetailPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Admin Pages */}
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/users" element={<Users />} />
          <Route path="/admin/advokats" element={<Advokats />} />
          <Route path="/admin/laporan" element={<LaporanAdminPage />} />
          <Route path="/admin/artikel" element={<ArtikelAdminPage />} />
          <Route path="/admin/chatbot" element={<ChatBotAdminPage />} />

          {/* Components / Features */}
          <Route path="/map11" element={<MapComponent />} />
          <Route path="/formadvokat" element={<FormAdvokat />} />
          <Route path="/asformlapor" element={<FormLaporanKasus />} />
          <Route path="/peta-kasus" element={<PetaKasusHAM />} />
          <Route path="/peta-advokat" element={<PetaAdvokat />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
