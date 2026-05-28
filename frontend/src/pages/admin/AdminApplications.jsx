import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { FiTrash2, FiMail, FiPhone, FiUser } from 'react-icons/fi';

export default function AdminApplications() {
  const { authHeader, API } = useAdminAuth();
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);
  const [expanded, setExpanded] = useState(null);

  const fetchApps = useCallback(async () => {
    setLoading(true);
    try {
      const r = await axios.get(`${API}/admin/applications`, authHeader());
      setApps(r.data);
    } catch {}
    setLoading(false);
  }, []);

  useEffect(() => { fetchApps(); }, [fetchApps]);

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await axios.delete(`${API}/admin/applications/${deleteId}`, authHeader());
      setDeleteId(null);
      fetchApps();
    } catch {}
  };

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-black text-[#1e3a6e]">Đơn ứng tuyển</h1>
        <p className="text-gray-500 text-sm mt-0.5">{apps.length} đơn đã nhận</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-10 text-center text-gray-400 text-sm">Đang tải...</div>
        ) : apps.length === 0 ? (
          <div className="p-10 text-center text-gray-400 text-sm">Chưa có đơn ứng tuyển nào.</div>
        ) : (
          <div className="divide-y divide-gray-50">
            {apps.map(item => (
              <div key={item.id} className="px-5 py-4 hover:bg-gray-50/50 transition">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="flex items-center gap-1.5 font-semibold text-gray-800 text-sm">
                        <FiUser size={13} className="text-gray-400" />{item.ho_ten}
                      </span>
                      {(item.vi_tri || item.job_title) && (
                        <span className="bg-orange-50 text-orange-700 text-xs px-2 py-0.5 rounded-full font-medium">
                          {item.vi_tri || item.job_title}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-4 mt-1.5 flex-wrap">
                      <a href={`mailto:${item.email}`}
                        className="flex items-center gap-1 text-xs text-blue-600 hover:underline">
                        <FiMail size={12} />{item.email}
                      </a>
                      {item.dien_thoai && (
                        <a href={`tel:${item.dien_thoai}`}
                          className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700">
                          <FiPhone size={12} />{item.dien_thoai}
                        </a>
                      )}
                      <span className="text-xs text-gray-400">
                        {new Date(item.created_at).toLocaleString('vi-VN')}
                      </span>
                    </div>
                    {item.gioi_thieu && (
                      <div className="mt-2">
                        <button
                          onClick={() => setExpanded(expanded === item.id ? null : item.id)}
                          className="text-xs text-blue-500 hover:underline">
                          {expanded === item.id ? 'Ẩn giới thiệu' : 'Xem giới thiệu bản thân'}
                        </button>
                        {expanded === item.id && (
                          <p className="mt-1.5 text-sm text-gray-600 bg-gray-50 rounded-lg p-3 whitespace-pre-wrap">
                            {item.gioi_thieu}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                  <button onClick={() => setDeleteId(item.id)}
                    className="text-gray-300 hover:text-red-400 transition shrink-0 mt-0.5">
                    <FiTrash2 size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm">
            <h3 className="font-bold text-gray-800 mb-2">Xác nhận xóa</h3>
            <p className="text-sm text-gray-500 mb-5">Đơn ứng tuyển này sẽ bị xóa vĩnh viễn.</p>
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
