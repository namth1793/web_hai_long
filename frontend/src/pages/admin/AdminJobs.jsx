import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { FiPlus, FiEdit2, FiTrash2, FiX, FiToggleLeft, FiToggleRight } from 'react-icons/fi';

const EMPTY = {
  vi_tri: '', phong_ban: '', dia_diem: 'Hà Nội',
  loai_hinh: 'Toàn thời gian', muc_luong: '', so_luong: '1',
  mo_ta: '', yeu_cau: '', quyen_loi: '', han_nop: '', trang_thai: 1,
};

export default function AdminJobs() {
  const { authHeader, API } = useAdminAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState(EMPTY);
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [deleteId, setDeleteId] = useState(null);

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    try {
      const r = await axios.get(`${API}/admin/jobs`, authHeader());
      setJobs(r.data);
    } catch {}
    setLoading(false);
  }, []);

  useEffect(() => { fetchJobs(); }, [fetchJobs]);

  const openAdd = () => {
    setForm(EMPTY);
    setEditId(null);
    setError('');
    setModal(true);
  };

  const openEdit = (item) => {
    setForm({
      vi_tri: item.vi_tri, phong_ban: item.phong_ban || '',
      dia_diem: item.dia_diem || 'Hà Nội', loai_hinh: item.loai_hinh || 'Toàn thời gian',
      muc_luong: item.muc_luong || '', so_luong: String(item.so_luong || 1),
      mo_ta: item.mo_ta || '', yeu_cau: item.yeu_cau || '',
      quyen_loi: item.quyen_loi || '', han_nop: item.han_nop || '',
      trang_thai: item.trang_thai,
    });
    setEditId(item.id);
    setError('');
    setModal(true);
  };

  const toggleStatus = async (item) => {
    try {
      await axios.put(`${API}/admin/jobs/${item.id}`,
        { ...item, trang_thai: item.trang_thai ? 0 : 1 }, authHeader());
      fetchJobs();
    } catch {}
  };

  const handleSave = async () => {
    if (!form.vi_tri.trim()) { setError('Vị trí không được để trống.'); return; }
    setSaving(true);
    setError('');
    try {
      if (editId) {
        await axios.put(`${API}/admin/jobs/${editId}`, form, authHeader());
      } else {
        await axios.post(`${API}/admin/jobs`, form, authHeader());
      }
      setModal(false);
      fetchJobs();
    } catch (err) {
      setError(err.response?.data?.message || 'Lỗi server.');
    }
    setSaving(false);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await axios.delete(`${API}/admin/jobs/${deleteId}`, authHeader());
      setDeleteId(null);
      fetchJobs();
    } catch {}
  };

  const Field = ({ label, children }) => (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1.5">{label}</label>
      {children}
    </div>
  );

  const inp = "w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#1e3a6e] focus:ring-2 focus:ring-[#1e3a6e]/20 transition";

  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-[#1e3a6e]">Tuyển dụng</h1>
          <p className="text-gray-500 text-sm mt-0.5">{jobs.length} vị trí</p>
        </div>
        <button onClick={openAdd}
          className="flex items-center gap-2 bg-[#1e3a6e] hover:bg-[#0d2040] text-white px-4 py-2 rounded-lg text-sm font-semibold transition">
          <FiPlus size={16} /> Thêm vị trí
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-10 text-center text-gray-400 text-sm">Đang tải...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wide">Vị trí</th>
                  <th className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wide hidden md:table-cell">Phòng ban</th>
                  <th className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wide hidden md:table-cell">Mức lương</th>
                  <th className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wide">Trạng thái</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {jobs.map(item => (
                  <tr key={item.id} className="hover:bg-gray-50/50 transition">
                    <td className="px-4 py-3.5">
                      <div className="font-semibold text-gray-800">{item.vi_tri}</div>
                      <div className="text-xs text-gray-400 mt-0.5">{item.dia_diem} · {item.loai_hinh}</div>
                    </td>
                    <td className="px-4 py-3.5 text-gray-600 hidden md:table-cell">{item.phong_ban}</td>
                    <td className="px-4 py-3.5 text-gray-600 hidden md:table-cell">{item.muc_luong}</td>
                    <td className="px-4 py-3.5">
                      <button onClick={() => toggleStatus(item)}
                        className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full transition ${
                          item.trang_thai ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                        }`}>
                        {item.trang_thai ? <FiToggleRight size={14} /> : <FiToggleLeft size={14} />}
                        {item.trang_thai ? 'Đang tuyển' : 'Tạm dừng'}
                      </button>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-1 justify-end">
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
                {jobs.length === 0 && (
                  <tr><td colSpan={5} className="text-center py-10 text-gray-400">Chưa có vị trí tuyển dụng nào.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 bg-black/50 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl my-6">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="font-bold text-gray-800">{editId ? 'Sửa vị trí' : 'Thêm vị trí mới'}</h2>
              <button onClick={() => setModal(false)} className="text-gray-400 hover:text-gray-600"><FiX size={20} /></button>
            </div>

            <div className="px-6 py-5 space-y-4">
              {error && <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-3 py-2.5 rounded-lg">{error}</div>}

              <Field label={<>Vị trí <span className="text-red-500">*</span></>}>
                <input type="text" value={form.vi_tri}
                  onChange={e => setForm(f => ({ ...f, vi_tri: e.target.value }))}
                  className={inp} placeholder="VD: Nhân Viên Kinh Doanh Quốc Tế" />
              </Field>

              <div className="grid grid-cols-2 gap-4">
                <Field label="Phòng ban">
                  <input type="text" value={form.phong_ban}
                    onChange={e => setForm(f => ({ ...f, phong_ban: e.target.value }))}
                    className={inp} placeholder="Phòng Kinh Doanh" />
                </Field>
                <Field label="Địa điểm">
                  <input type="text" value={form.dia_diem}
                    onChange={e => setForm(f => ({ ...f, dia_diem: e.target.value }))}
                    className={inp} />
                </Field>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Field label="Loại hình">
                  <select value={form.loai_hinh}
                    onChange={e => setForm(f => ({ ...f, loai_hinh: e.target.value }))}
                    className={inp + ' bg-white'}>
                    <option>Toàn thời gian</option>
                    <option>Bán thời gian</option>
                    <option>Thực tập</option>
                    <option>Remote</option>
                  </select>
                </Field>
                <Field label="Mức lương">
                  <input type="text" value={form.muc_luong}
                    onChange={e => setForm(f => ({ ...f, muc_luong: e.target.value }))}
                    className={inp} placeholder="VD: 15 - 25 triệu VNĐ" />
                </Field>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Field label="Số lượng">
                  <input type="number" min="1" value={form.so_luong}
                    onChange={e => setForm(f => ({ ...f, so_luong: e.target.value }))}
                    className={inp} />
                </Field>
                <Field label="Hạn nộp">
                  <input type="text" value={form.han_nop}
                    onChange={e => setForm(f => ({ ...f, han_nop: e.target.value }))}
                    className={inp} placeholder="VD: 30/06/2025" />
                </Field>
              </div>

              <Field label="Mô tả công việc (HTML)">
                <textarea rows={4} value={form.mo_ta}
                  onChange={e => setForm(f => ({ ...f, mo_ta: e.target.value }))}
                  className={inp + ' resize-none font-mono'}
                  placeholder="<ul><li>Mô tả...</li></ul>" />
              </Field>

              <Field label="Yêu cầu (HTML)">
                <textarea rows={4} value={form.yeu_cau}
                  onChange={e => setForm(f => ({ ...f, yeu_cau: e.target.value }))}
                  className={inp + ' resize-none font-mono'}
                  placeholder="<ul><li>Yêu cầu...</li></ul>" />
              </Field>

              <Field label="Quyền lợi (HTML)">
                <textarea rows={4} value={form.quyen_loi}
                  onChange={e => setForm(f => ({ ...f, quyen_loi: e.target.value }))}
                  className={inp + ' resize-none font-mono'}
                  placeholder="<ul><li>Quyền lợi...</li></ul>" />
              </Field>

              <Field label="Trạng thái">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={form.trang_thai === 1}
                    onChange={e => setForm(f => ({ ...f, trang_thai: e.target.checked ? 1 : 0 }))}
                    className="w-4 h-4 accent-[#1e3a6e]" />
                  <span className="text-sm text-gray-700">Đang tuyển dụng</span>
                </label>
              </Field>
            </div>

            <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-100">
              <button onClick={() => setModal(false)}
                className="px-5 py-2 rounded-lg border text-sm text-gray-600 hover:bg-gray-50 transition">Hủy</button>
              <button onClick={handleSave} disabled={saving}
                className="px-5 py-2 rounded-lg bg-[#1e3a6e] hover:bg-[#0d2040] disabled:opacity-60 text-white text-sm font-semibold transition">
                {saving ? 'Đang lưu...' : editId ? 'Cập nhật' : 'Thêm vị trí'}
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
            <p className="text-sm text-gray-500 mb-5">Vị trí tuyển dụng này sẽ bị xóa vĩnh viễn.</p>
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
