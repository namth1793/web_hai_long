import { useEffect } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { useAdminAuth } from '../../context/AdminAuthContext';
import {
  FiGrid, FiFileText, FiBriefcase, FiMail, FiClipboard,
  FiLogOut, FiExternalLink, FiMenu, FiX
} from 'react-icons/fi';
import { useState } from 'react';

const NAV = [
  { to: '/admin',              icon: FiGrid,      label: 'Tổng quan',       exact: true },
  { to: '/admin/tin-tuc',      icon: FiFileText,  label: 'Tin tức' },
  { to: '/admin/tuyen-dung',   icon: FiBriefcase, label: 'Tuyển dụng' },
  { to: '/admin/lien-he',      icon: FiMail,      label: 'Liên hệ' },
  { to: '/admin/don-ung-tuyen',icon: FiClipboard, label: 'Đơn ứng tuyển' },
];

export default function AdminLayout() {
  const { admin, loading, logout } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!loading && !admin) navigate('/admin/login', { replace: true });
  }, [admin, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0d2040] flex items-center justify-center">
        <div className="text-white text-sm">Đang tải...</div>
      </div>
    );
  }
  if (!admin) return null;

  const isActive = (item) =>
    item.exact ? location.pathname === item.to : location.pathname.startsWith(item.to);

  const handleLogout = () => {
    logout();
    navigate('/admin/login', { replace: true });
  };

  const Sidebar = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-[#e8941a] rounded-lg flex items-center justify-center text-white font-black text-sm">HK</div>
          <div>
            <div className="text-white font-black text-sm leading-tight">HOÀNG KHANG</div>
            <div className="text-[#e8941a] text-[10px] font-semibold">ADMIN PANEL</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {NAV.map(item => {
          const Icon = item.icon;
          const active = isActive(item);
          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                active
                  ? 'bg-[#e8941a] text-white'
                  : 'text-blue-200 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Icon size={17} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t border-white/10 space-y-1">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-blue-200 hover:bg-white/10 hover:text-white transition"
        >
          <FiExternalLink size={16} />Xem website
        </a>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-blue-200 hover:bg-red-500/20 hover:text-red-300 transition"
        >
          <FiLogOut size={16} />Đăng xuất
        </button>
        <div className="px-3 pt-2 text-xs text-blue-300/60">
          Xin chào, <span className="text-blue-200 font-semibold">{admin.username}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-56 bg-[#0d2040] shrink-0">
        <Sidebar />
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <aside className="relative z-10 flex flex-col w-56 bg-[#0d2040]">
            <button
              onClick={() => setSidebarOpen(false)}
              className="absolute top-4 right-4 text-white/60 hover:text-white"
            >
              <FiX size={20} />
            </button>
            <Sidebar />
          </aside>
        </div>
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar (mobile) */}
        <div className="lg:hidden flex items-center gap-3 px-4 py-3 bg-white border-b border-gray-200">
          <button onClick={() => setSidebarOpen(true)} className="text-gray-600">
            <FiMenu size={22} />
          </button>
          <span className="font-bold text-[#1e3a6e] text-sm">Admin Panel</span>
        </div>

        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
