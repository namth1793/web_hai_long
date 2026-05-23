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
    ]
  },
  {
    label: 'Dịch Vụ', path: '/dich-vu',
    children: [
      { label: 'Vận Tải Quốc Tế', path: '/dich-vu#van-tai' },
      { label: 'Ủy Thác Xuất Nhập Khẩu', path: '/dich-vu#uy-thac' },
      { label: 'Thủ Tục Hải Quan', path: '/dich-vu#hai-quan' },
    ]
  },
  { label: 'Tin Tức', path: '/tin-tuc' },
  { label: 'Tuyển Dụng', path: '/tuyen-dung' },
  { label: 'Liên Hệ', path: '/lien-he' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const location = useLocation();
  const timerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
  }, [location]);

  const handleMouseEnter = (label) => {
    clearTimeout(timerRef.current);
    setActiveDropdown(label);
  };
  const handleMouseLeave = () => {
    timerRef.current = setTimeout(() => setActiveDropdown(null), 150);
  };

  return (
    <>
      {/* Top bar */}
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

      {/* Main Navbar */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-lg' : 'bg-white shadow-sm'}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-primary rounded-lg flex items-center justify-center text-white font-black text-lg leading-none">
                HK
              </div>
              <div>
                <div className="text-primary font-black text-lg md:text-xl leading-tight">HOÀNG KHANG</div>
                <div className="text-accent text-xs md:text-sm font-medium tracking-wide">XNK & LOGISTICS</div>
              </div>
            </Link>

            {/* Desktop Menu */}
            <nav className="hidden lg:flex items-center gap-1">
              {MENU.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.children && handleMouseEnter(item.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    to={item.path}
                    className={`flex items-center gap-1 px-3 py-2 rounded text-sm font-semibold transition-colors ${
                      location.pathname === item.path
                        ? 'text-accent'
                        : 'text-gray-700 hover:text-accent'
                    }`}
                  >
                    {item.label}
                    {item.children && <FiChevronDown size={14} className={`transition-transform ${activeDropdown === item.label ? 'rotate-180' : ''}`} />}
                  </Link>
                  {item.children && activeDropdown === item.label && (
                    <div className="dropdown-menu absolute top-full left-0 bg-white shadow-xl rounded-lg py-2 min-w-[220px] border border-gray-100">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          to={child.path}
                          className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-primary hover:text-white transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* CTA Button */}
            <a href="tel:02466898662" className="hidden lg:flex items-center gap-2 bg-accent hover:bg-accent-dark text-white px-5 py-2.5 rounded-lg font-semibold text-sm transition-colors">
              <FiPhone size={15} />
              <span>Tư Vấn Ngay</span>
            </a>

            {/* Mobile Hamburger */}
            <button
              className="lg:hidden p-2 text-primary"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg">
            <div className="px-4 py-3 flex items-center gap-4 bg-navy text-white text-sm">
              <a href="tel:02466898662" className="flex items-center gap-1"><FiPhone size={13} /><span>024 668 98662</span></a>
            </div>
            {MENU.map((item) => (
              <div key={item.label} className="border-b border-gray-100 last:border-0">
                {item.children ? (
                  <>
                    <button
                      className="w-full flex justify-between items-center px-4 py-3 text-gray-800 font-semibold text-sm"
                      onClick={() => setMobileExpanded(mobileExpanded === item.label ? null : item.label)}
                    >
                      <span>{item.label}</span>
                      <FiChevronDown className={`transition-transform ${mobileExpanded === item.label ? 'rotate-180' : ''}`} />
                    </button>
                    {mobileExpanded === item.label && (
                      <div className="bg-gray-50">
                        {item.children.map((child) => (
                          <Link key={child.label} to={child.path} className="block px-8 py-2.5 text-sm text-gray-600 hover:text-accent">
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link to={item.path} className="block px-4 py-3 text-gray-800 font-semibold text-sm hover:text-accent">
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </div>
        )}
      </header>
    </>
  );
}
