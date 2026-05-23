import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiPhone, FiMail, FiChevronDown, FiMenu, FiX, FiGlobe } from 'react-icons/fi';
import { FaFacebookF, FaLinkedinIn } from 'react-icons/fa';

const MENU = [
  { label: 'Trang Chủ', path: '/' },
  { label: 'Giới Thiệu', path: '/gioi-thieu' },
  {
    label: 'Sản Phẩm', path: '/san-pham',
    children: [
      { label: 'Hàng Nhập Khẩu', path: '/san-pham?tab=nhap' },
      { label: 'Hàng Xuất Khẩu', path: '/san-pham?tab=xuat' },
    ],
  },
  {
    label: 'Dịch Vụ', path: '/dich-vu',
    children: [
      { label: 'Vận Tải Quốc Tế', path: '/dich-vu#van-tai' },
      { label: 'Ủy Thác Xuất Nhập Khẩu', path: '/dich-vu#uy-thac' },
      { label: 'Thủ Tục Hải Quan', path: '/dich-vu#hai-quan' },
    ],
  },
  { label: 'Tin Tức', path: '/tin-tuc' },
  { label: 'Tuyển Dụng', path: '/tuyen-dung' },
  { label: 'Liên Hệ', path: '/lien-he' },
];

export default function Navbar() {
  const [scrolled, setScrolled]       = useState(false);
  const [mobileOpen, setMobileOpen]   = useState(false);
  const [activeDD, setActiveDD]       = useState(null);
  const [mobileExp, setMobileExp]     = useState(null);
  const location  = useLocation();
  const timerRef  = useRef(null);

  /* scroll shadow */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* close on route change */
  useEffect(() => {
    setMobileOpen(false);
    setActiveDD(null);
  }, [location]);

  /* body scroll lock */
  useEffect(() => {
    if (mobileOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
    return () => document.body.classList.remove('menu-open');
  }, [mobileOpen]);

  const openDD  = (lbl) => { clearTimeout(timerRef.current); setActiveDD(lbl); };
  const closeDD = ()    => { timerRef.current = setTimeout(() => setActiveDD(null), 150); };

  return (
    <>
      {/* ── Top bar (desktop only) ── */}
      <div className="bg-navy text-white text-sm py-2 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <a href="tel:02466898662" className="flex items-center gap-2 hover:text-accent transition-colors">
              <FiPhone size={14} /><span>024 668 98662</span>
            </a>
            <a href="mailto:info@hoangkhanglogs.com" className="flex items-center gap-2 hover:text-accent transition-colors">
              <FiMail size={14} /><span>info@hoangkhanglogs.com</span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-accent transition-colors"><FaFacebookF size={14} /></a>
            <a href="#" className="hover:text-accent transition-colors"><FaLinkedinIn size={14} /></a>
            <div className="flex items-center gap-1 text-accent cursor-pointer">
              <FiGlobe size={14} /><span className="font-semibold">VI</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main header ── */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-lg' : 'bg-white shadow-sm'}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-14 md:h-20">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 shrink-0">
              <div className="w-9 h-9 md:w-12 md:h-12 bg-primary rounded-lg flex items-center justify-center text-white font-black text-sm md:text-lg leading-none">
                HK
              </div>
              <div>
                <div className="text-primary font-black text-base md:text-xl leading-tight">HOÀNG KHANG</div>
                <div className="text-accent text-[10px] md:text-sm font-medium tracking-wide">XNK & LOGISTICS</div>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-0.5">
              {MENU.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.children && openDD(item.label)}
                  onMouseLeave={closeDD}
                >
                  <Link
                    to={item.path}
                    className={`flex items-center gap-1 px-3 py-2 rounded text-sm font-semibold transition-colors ${
                      location.pathname === item.path ? 'text-accent' : 'text-gray-700 hover:text-accent'
                    }`}
                  >
                    {item.label}
                    {item.children && (
                      <FiChevronDown size={13} className={`transition-transform duration-200 ${activeDD === item.label ? 'rotate-180' : ''}`} />
                    )}
                  </Link>
                  {item.children && activeDD === item.label && (
                    <div className="dropdown-menu absolute top-full left-0 bg-white shadow-xl rounded-xl py-2 min-w-[220px] border border-gray-100 z-50">
                      {item.children.map((c) => (
                        <Link key={c.label} to={c.path}
                          className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-primary hover:text-white transition-colors">
                          {c.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Desktop CTA */}
            <a href="tel:02466898662"
              className="hidden lg:flex items-center gap-2 bg-accent hover:bg-accent-dark text-white px-5 py-2.5 rounded-lg font-semibold text-sm transition-colors shrink-0">
              <FiPhone size={15} /><span>Tư Vấn Ngay</span>
            </a>

            {/* Mobile right side */}
            <div className="flex items-center gap-2 lg:hidden">
              <a href="tel:02466898662"
                className="flex items-center gap-1.5 bg-accent text-white px-3 py-2 rounded-lg text-xs font-bold">
                <FiPhone size={13} /><span>Gọi Ngay</span>
              </a>
              <button
                className="p-2 text-primary rounded-lg hover:bg-gray-100 transition-colors"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* ── Mobile menu ── */}
        {mobileOpen && (
          <div className="mobile-menu-enter lg:hidden bg-white border-t border-gray-100 shadow-xl max-h-[80vh] overflow-y-auto">
            {MENU.map((item) => (
              <div key={item.label} className="border-b border-gray-100 last:border-0">
                {item.children ? (
                  <>
                    <button
                      className="w-full flex justify-between items-center px-5 py-4 text-gray-800 font-semibold text-sm active:bg-gray-50"
                      onClick={() => setMobileExp(mobileExp === item.label ? null : item.label)}
                    >
                      <span>{item.label}</span>
                      <FiChevronDown size={16} className={`text-gray-400 transition-transform duration-200 ${mobileExp === item.label ? 'rotate-180' : ''}`} />
                    </button>
                    {mobileExp === item.label && (
                      <div className="bg-gray-50 border-t border-gray-100">
                        {item.children.map((c) => (
                          <Link key={c.label} to={c.path}
                            className="flex items-center gap-2 px-8 py-3.5 text-sm text-gray-600 hover:text-accent active:bg-gray-100 transition-colors">
                            <span className="text-accent text-base leading-none">›</span>{c.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link to={item.path}
                    className={`block px-5 py-4 text-sm font-semibold active:bg-gray-50 transition-colors ${
                      location.pathname === item.path ? 'text-accent' : 'text-gray-800 hover:text-accent'
                    }`}>
                    {item.label}
                  </Link>
                )}
              </div>
            ))}

            {/* Mobile menu footer */}
            <div className="p-4 bg-navy">
              <a href="tel:02466898662"
                className="flex items-center justify-center gap-2 w-full bg-accent text-white py-3.5 rounded-xl font-bold text-sm">
                <FiPhone size={16} /> 024 668 98662 — Gọi Miễn Phí
              </a>
              <a href="mailto:info@hoangkhanglogs.com"
                className="flex items-center justify-center gap-2 w-full mt-2 text-blue-300 text-xs py-2">
                <FiMail size={12} /> info@hoangkhanglogs.com
              </a>
            </div>
          </div>
        )}
      </header>

      {/* ── Floating phone bar (mobile, bottom) ── */}
      <div className="float-phone">
        <a href="tel:02466898662"
          className="flex items-center gap-2 bg-accent text-white px-6 py-3 rounded-full shadow-2xl font-bold text-sm animate-bounce">
          <FiPhone size={16} className="shrink-0" />
          <span>024 668 98662</span>
        </a>
      </div>
    </>
  );
}
