import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
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

function ScrollRestorer() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollRestorer />
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
    </BrowserRouter>
  );
}
