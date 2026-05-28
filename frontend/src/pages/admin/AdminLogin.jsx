import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { FiArrowLeft } from 'react-icons/fi';

export default function AdminLogin() {
  const { login } = useAdminAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(form.username, form.password);
      navigate('/admin');
    } catch (err) {
      setError(err.response?.data?.message || 'Đăng nhập thất bại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d2040] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-8">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-8 justify-center">
          <div className="w-11 h-11 bg-[#1e3a6e] rounded-xl flex items-center justify-center text-white font-black text-lg">HK</div>
          <div>
            <div className="font-black text-[#1e3a6e] text-lg leading-tight">HOÀNG KHANG</div>
            <div className="text-[#e8941a] text-xs font-semibold tracking-wide">ADMIN PANEL</div>
          </div>
        </div>

        <h1 className="text-center text-gray-700 font-bold text-lg mb-6">Đăng nhập quản trị</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Tên đăng nhập</label>
            <input
              type="text"
              value={form.username}
              onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#1e3a6e] focus:ring-2 focus:ring-[#1e3a6e]/20 transition"
              placeholder="admin"
              autoFocus
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Mật khẩu</label>
            <input
              type="password"
              value={form.password}
              onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#1e3a6e] focus:ring-2 focus:ring-[#1e3a6e]/20 transition"
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-3 py-2.5 rounded-lg">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#1e3a6e] hover:bg-[#0d2040] disabled:opacity-60 text-white font-bold py-2.5 rounded-lg transition text-sm mt-2"
          >
            {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </button>
        </form>

        <button
          onClick={() => navigate('/')}
          className="mt-5 w-full flex items-center justify-center gap-1.5 text-sm text-gray-400 hover:text-gray-600 transition"
        >
          <FiArrowLeft size={14} /> Quay về trang chủ
        </button>
      </div>
    </div>
  );
}
