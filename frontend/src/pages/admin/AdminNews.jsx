import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { FiPlus, FiEdit2, FiTrash2, FiX, FiEye } from 'react-icons/fi';

const CATEGORIES = ['Tin công ty', 'Thị trường logistics', 'Kiến thức XNK', 'Tin tức thế giới', 'Khác'];

const EMPTY = {
  tieu_de: '', slug: '', mo_ta: '', noi_dung: '',
  hinh_anh: '', danh_muc: CATEGORIES[0], tac_gia: 'Admin',
};

const slugify = (str) =>
  str.toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim().replace(/\s+/g, '-')
    .substring(0, 100);

export default function AdminNews() {
  const { authHeader, API } = useAdminAuth();
  const [news, setNews] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState(EMPTY);
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [deleteId, setDeleteId] = useState(null);

  const LIMIT = 10;

  const fetchNews = useCallback(async () => {
    setLoading(true);
    try {
      const r = await axios.get(`${API}/admin/news?page=${page}&limit=${LIMIT}`, authHeader());
      setNews(r.data.data);
      setTotal(r.data.total);
    } catch {}
    setLoading(false);
  }, [page]);

  useEffect(() => { fetchNews(); }, [fetchNews]);

  const openAdd = () => {
    setForm(EMPTY);
    setEditId(null);
    setError('');
    setModal(true);
  };

  const openEdit = (item) => {
    setForm({
      tieu_de: item.tieu_de, slug: item.slug, mo_ta: item.mo_ta || '',
      noi_dung: item.noi_dung || '', hinh_anh: item.hinh_anh || '',
      danh_muc: item.danh_muc || CATEGORIES[0], tac_gia: item.tac_gia || 'Admin',
    });
    setEditId(item.id);
    setError('');
    setModal(true);
  };

  const handleTitleChange = (val) => {
    setForm(f => ({
      ...f,
      tieu_de: val,
      slug: editId ? f.slug : slugify(val),
    }));
  };

  const handleSave = async () => {
    if (!form.tieu_de.trim()) { setError('Tiêu đề không được để trống.'); return; }
    setSaving(true);
    setError('');
    try {
      if (editId) {
        await axios.put(`${API}/admin/news/${editId}`, form, authHeader());
      } else {
        await axios.post(`${API}/admin/news`, form, authHeader());
      }
      setModal(false);
      fetchNews();
    } catch (err) {
      setError(err.response?.data?.message || 'Lỗi server.');
    }
    setSaving(false);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await axios.delete(`${API}/admin/news/${deleteId}`, authHeader());
      setDeleteId(null);
      fetchNews();
    } catch {}
  };

  const totalPages = Math.ceil(total / LIMIT);

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-[#1e3a6e]">Tin tức</h1>
          <p className="text-gray-500 text-sm mt-0.5">{total} bài viết</p>
        </div>
        <button onClick={openAdd}
          className="flex items-center gap-2 bg-[#1e3a6e] hover:bg-[#0d2040] text-white px-4 py-2 rounded-lg text-sm font-semibold transition">
          <FiPlus size={16} /> Thêm bài viết
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-10 text-center text-gray-400 text-sm">Đang tải...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wide">Tiêu đề</th>
                  <th className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wide hidden md:table-cell">Danh mục</th>
                  <th className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wide hidden lg:table-cell">Lượt xem</th>
                  <th className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wide hidden lg:table-cell">Ngày đăng</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {news.map(item => (
                  <tr key={item.id} className="hover:bg-gray-50/50 transition">
                    <td className="px-4 py-3.5">
                      <div className="font-semibold text-gray-800 line-clamp-1">{item.tieu_de}</div>
                      <div className="text-xs text-gray-400 mt-0.5 line-clamp-1">{item.slug}</div>
                    </td>
                    <td className="px-4 py-3.5 hidden md:table-cell">
                      <span className="bg-blue-50 text-blue-700 text-xs font-medium px-2 py-0.5 rounded-full">{item.danh_muc}</span>
                    </td>
                    <td className="px-4 py-3.5 text-gray-500 hidden lg:table-cell">{item.luot_xem}</td>
                    <td className="px-4 py-3.5 text-gray-400 text-xs hidden lg:table-cell">
                      {new Date(item.created_at).toLocaleDateString('vi-VN')}
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-1 justify-end">
                        <a href={`/tin-tuc/${item.slug}`} target="_blank" rel="noopener noreferrer"
                          className="p-1.5 text-gray-400 hover:text-blue-500 transition" title="Xem bài viết">
                          <FiEye size={15} />
                        </a>
                        <button onClick={() => openEdit(item)}
                          className="p-1.5 text-gray-400 hover:text-[#e8941a] transition">
                          <FiEdit2 size={15} />
                        </button>
                        <button onClick={() => setDeleteId(item.id)}
                          className="p-1.5 text-gray-400 hover:text-red-500 transition">
                          <FiTrash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {news.length === 0 && (
                  <tr><td colSpan={5} className="text-center py-10 text-gray-400">Chưa có bài viết nào.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
            <span className="text-xs text-gray-400">Trang {page}/{totalPages}</span>
            <div className="flex gap-1">
              <button disabled={page === 1} onClick={() => setPage(p => p - 1)}
                className="px-3 py-1.5 rounded border text-sm disabled:opacity-40 hover:bg-gray-50 transition">‹</button>
              <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)}
                className="px-3 py-1.5 rounded border text-sm disabled:opacity-40 hover:bg-gray-50 transition">›</button>
            </div>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 bg-black/50 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl my-6">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="font-bold text-gray-800">{editId ? 'Sửa bài viết' : 'Thêm bài viết mới'}</h2>
              <button onClick={() => setModal(false)} className="text-gray-400 hover:text-gray-600"><FiX size={20} /></button>
            </div>

            <div className="px-6 py-5 space-y-4">
              {error && <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-3 py-2.5 rounded-lg">{error}</div>}

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Tiêu đề <span className="text-red-500">*</span></label>
                <input type="text" value={form.tieu_de}
                  onChange={e => handleTitleChange(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#1e3a6e] focus:ring-2 focus:ring-[#1e3a6e]/20 transition"
                  placeholder="Nhập tiêu đề bài viết..." />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Slug (URL)</label>
                  <input type="text" value={form.slug}
                    onChange={e => setForm(f => ({ ...f, slug: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#1e3a6e] focus:ring-2 focus:ring-[#1e3a6e]/20 transition font-mono"
                    placeholder="tu-dong-tu-tieu-de" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Danh mục</label>
                  <select value={form.danh_muc}
                    onChange={e => setForm(f => ({ ...f, danh_muc: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#1e3a6e] focus:ring-2 focus:ring-[#1e3a6e]/20 transition bg-white">
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Tác giả</label>
                  <input type="text" value={form.tac_gia}
                    onChange={e => setForm(f => ({ ...f, tac_gia: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#1e3a6e] focus:ring-2 focus:ring-[#1e3a6e]/20 transition" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">URL hình ảnh</label>
                  <input type="text" value={form.hinh_anh}
                    onChange={e => setForm(f => ({ ...f, hinh_anh: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#1e3a6e] focus:ring-2 focus:ring-[#1e3a6e]/20 transition"
                    placeholder="https://..." />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Mô tả ngắn</label>
                <textarea rows={2} value={form.mo_ta}
                  onChange={e => setForm(f => ({ ...f, mo_ta: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#1e3a6e] focus:ring-2 focus:ring-[#1e3a6e]/20 transition resize-none"
                  placeholder="Tóm tắt nội dung bài viết..." />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Nội dung (HTML)</label>
                <textarea rows={8} value={form.noi_dung}
                  onChange={e => setForm(f => ({ ...f, noi_dung: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#1e3a6e] focus:ring-2 focus:ring-[#1e3a6e]/20 transition font-mono"
                  placeholder="<p>Nội dung bài viết...</p>" />
              </div>
            </div>

            <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-100">
              <button onClick={() => setModal(false)}
                className="px-5 py-2 rounded-lg border text-sm text-gray-600 hover:bg-gray-50 transition">
                Hủy
              </button>
              <button onClick={handleSave} disabled={saving}
                className="px-5 py-2 rounded-lg bg-[#1e3a6e] hover:bg-[#0d2040] disabled:opacity-60 text-white text-sm font-semibold transition">
                {saving ? 'Đang lưu...' : editId ? 'Cập nhật' : 'Thêm bài viết'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm">
            <h3 className="font-bold text-gray-800 mb-2">Xác nhận xóa</h3>
            <p className="text-sm text-gray-500 mb-5">Bài viết này sẽ bị xóa vĩnh viễn. Không thể hoàn tác.</p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setDeleteId(null)}
                className="px-4 py-2 rounded-lg border text-sm text-gray-600 hover:bg-gray-50 transition">Hủy</button>
              <button onClick={handleDelete}
                className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm font-semibold transition">Xóa</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
