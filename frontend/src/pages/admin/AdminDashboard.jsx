import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { FiFileText, FiBriefcase, FiMail, FiClipboard, FiArrowRight } from 'react-icons/fi';

export default function AdminDashboard() {
  const { authHeader, API } = useAdminAuth();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    axios.get(`${API}/admin/stats`, authHeader())
      .then(r => setStats(r.data))
      .catch(() => {});
  }, []);

  const cards = [
    { label: 'Bài viết', value: stats?.news, icon: FiFileText, color: 'bg-blue-500', to: '/admin/tin-tuc' },
    { label: 'Việc làm đang tuyển', value: stats?.jobs, icon: FiBriefcase, color: 'bg-[#e8941a]', to: '/admin/tuyen-dung' },
    { label: 'Liên hệ mới', value: stats?.contacts, icon: FiMail, color: 'bg-green-500', to: '/admin/lien-he' },
    { label: 'Đơn ứng tuyển', value: stats?.applications, icon: FiClipboard, color: 'bg-purple-500', to: '/admin/don-ung-tuyen' },
  ];

  const quickLinks = [
    { to: '/admin/tin-tuc', label: '+ Thêm bài viết mới', color: 'text-blue-600' },
    { to: '/admin/tuyen-dung', label: '+ Đăng tin tuyển dụng', color: 'text-orange-600' },
    { to: '/admin/lien-he', label: '→ Xem liên hệ', color: 'text-green-600' },
    { to: '/admin/don-ung-tuyen', label: '→ Xem đơn ứng tuyển', color: 'text-purple-600' },
  ];

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-black text-[#1e3a6e]">Tổng quan</h1>
        <p className="text-gray-500 text-sm mt-1">Quản lý nội dung website Hoàng Khang XNK & Logistics</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {cards.map(card => {
          const Icon = card.icon;
          return (
            <Link key={card.to} to={card.to}
              className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition group">
              <div className={`w-10 h-10 ${card.color} rounded-lg flex items-center justify-center mb-3`}>
                <Icon size={19} className="text-white" />
              </div>
              <div className="text-2xl font-black text-gray-800 mb-0.5">
                {stats ? stats[card.label === 'Bài viết' ? 'news' : card.label === 'Việc làm đang tuyển' ? 'jobs' : card.label === 'Liên hệ mới' ? 'contacts' : 'applications'] : '—'}
              </div>
              <div className="text-xs text-gray-500 font-medium">{card.label}</div>
              <div className="flex items-center gap-1 mt-2 text-xs text-gray-400 group-hover:text-blue-500 transition">
                Xem chi tiết <FiArrowRight size={12} />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Quick links */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="font-bold text-gray-700 text-sm mb-4 uppercase tracking-wide">Thao tác nhanh</h2>
        <div className="grid grid-cols-2 gap-3">
          {quickLinks.map(l => (
            <Link key={l.to} to={l.to}
              className={`${l.color} text-sm font-semibold hover:underline`}>
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
