import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { AdminAuthProvider } from './context/AdminAuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import GioiThieu from './pages/GioiThieu';
import SanPham from './pages/SanPham';
import DichVu from './pages/DichVu';
import TinTuc from './pages/TinTuc';
import TinTucDetail from './pages/TinTucDetail';
import TuyenDung from './pages/TuyenDung';
import LienHe from './pages/LienHe';

// Admin pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminNews from './pages/admin/AdminNews';
import AdminJobs from './pages/admin/AdminJobs';
import AdminContacts from './pages/admin/AdminContacts';
import AdminApplications from './pages/admin/AdminApplications';

function ScrollRestorer() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function PublicApp() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gioi-thieu" element={<GioiThieu />} />
        <Route path="/san-pham" element={<SanPham />} />
        <Route path="/dich-vu" element={<DichVu />} />
        <Route path="/tin-tuc" element={<TinTuc />} />
        <Route path="/tin-tuc/:slug" element={<TinTucDetail />} />
        <Route path="/tuyen-dung" element={<TuyenDung />} />
        <Route path="/lien-he" element={<LienHe />} />
      </Routes>
      <Footer />
      <ScrollToTop />
    </>
  );
}

function AdminApp() {
  return (
    <Routes>
      <Route path="login" element={<AdminLogin />} />
      <Route element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="tin-tuc" element={<AdminNews />} />
        <Route path="tuyen-dung" element={<AdminJobs />} />
        <Route path="lien-he" element={<AdminContacts />} />
        <Route path="don-ung-tuyen" element={<AdminApplications />} />
      </Route>
    </Routes>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AdminAuthProvider>
        <BrowserRouter>
          <ScrollRestorer />
          <Routes>
            <Route path="/admin/*" element={<AdminApp />} />
            <Route path="/*" element={<PublicApp />} />
          </Routes>
        </BrowserRouter>
      </AdminAuthProvider>
    </LanguageProvider>
  );
}
