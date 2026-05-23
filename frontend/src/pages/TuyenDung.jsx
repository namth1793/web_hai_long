import { useState, useEffect } from 'react';
import axios from 'axios';
import { FiMapPin, FiClock, FiUsers, FiBriefcase, FiDollarSign, FiCalendar, FiChevronDown, FiChevronUp, FiSend, FiCheckCircle } from 'react-icons/fi';
import Breadcrumb from '../components/Breadcrumb';

function JobCard({ job }) {
  const [open, setOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ ho_ten: '', email: '', dien_thoai: '', gioi_thieu: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('/api/jobs/apply', {
        ...form, job_id: job.id, vi_tri: job.vi_tri
      });
      if (res.data.success) {
        setSuccess(true);
        setForm({ ho_ten: '', email: '', dien_thoai: '', gioi_thieu: '' });
      }
    } catch (err) {}
    setLoading(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow overflow-hidden">
      {/* Header */}
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-green-100 text-green-700 text-xs font-semibold px-2.5 py-1 rounded-full">Đang Tuyển</span>
              <span className="bg-primary/10 text-primary text-xs font-semibold px-2.5 py-1 rounded-full">{job.phong_ban}</span>
            </div>
            <h3 className="text-xl font-bold text-primary mb-3">{job.vi_tri}</h3>
            <div className="flex flex-wrap gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1.5"><FiMapPin size={13} className="text-accent" />{job.dia_diem}</span>
              <span className="flex items-center gap-1.5"><FiClock size={13} className="text-accent" />{job.loai_hinh}</span>
              <span className="flex items-center gap-1.5"><FiUsers size={13} className="text-accent" />{job.so_luong} vị trí</span>
              <span className="flex items-center gap-1.5"><FiDollarSign size={13} className="text-accent" />{job.muc_luong}</span>
              <span className="flex items-center gap-1.5"><FiCalendar size={13} className="text-accent" />Hạn: {job.han_nop}</span>
            </div>
          </div>
          <button
            onClick={() => setOpen(!open)}
            className="shrink-0 w-10 h-10 bg-gray-100 hover:bg-accent hover:text-white rounded-xl flex items-center justify-center transition-colors"
          >
            {open ? <FiChevronUp /> : <FiChevronDown />}
          </button>
        </div>
      </div>

      {/* Details */}
      {open && (
        <div className="border-t border-gray-100 p-6 space-y-6 bg-gray-50">
          <div>
            <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
              <FiBriefcase className="text-accent" size={16} />Mô Tả Công Việc
            </h4>
            <div className="text-sm text-gray-600 leading-relaxed [&_ul]:list-none [&_ul]:space-y-1.5 [&_li]:flex [&_li]:gap-2 [&_li]:items-start"
              dangerouslySetInnerHTML={{ __html: job.mo_ta?.replace(/<li>/g, '<li>• ') }} />
          </div>

          <div>
            <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
              <FiCheckCircle className="text-accent" size={16} />Yêu Cầu
            </h4>
            <div className="text-sm text-gray-600 leading-relaxed [&_ul]:list-none [&_ul]:space-y-1.5"
              dangerouslySetInnerHTML={{ __html: job.yeu_cau?.replace(/<li>/g, '<li>✓ ') }} />
          </div>

          <div>
            <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
              <FiDollarSign className="text-accent" size={16} />Quyền Lợi
            </h4>
            <div className="text-sm text-gray-600 leading-relaxed [&_ul]:list-none [&_ul]:space-y-1.5"
              dangerouslySetInnerHTML={{ __html: job.quyen_loi?.replace(/<li>/g, '<li>★ ') }} />
          </div>

          {/* Apply Button */}
          {!showForm && !success && (
            <button
              onClick={() => setShowForm(true)}
              className="btn-primary w-full justify-center"
            >
              <FiSend size={15} /> Ứng Tuyển Vị Trí Này
            </button>
          )}

          {/* Apply Form */}
          {showForm && !success && (
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h4 className="font-bold text-primary text-base mb-4">Form Ứng Tuyển – {job.vi_tri}</h4>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-gray-600 block mb-1">Họ và tên *</label>
                    <input
                      type="text" required
                      value={form.ho_ten}
                      onChange={e => setForm(f => ({ ...f, ho_ten: e.target.value }))}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-accent"
                      placeholder="Nguyễn Văn A"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-600 block mb-1">Email *</label>
                    <input
                      type="email" required
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-accent"
                      placeholder="email@example.com"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-600 block mb-1">Số điện thoại</label>
                    <input
                      type="tel"
                      value={form.dien_thoai}
                      onChange={e => setForm(f => ({ ...f, dien_thoai: e.target.value }))}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-accent"
                      placeholder="0912 345 678"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600 block mb-1">Giới thiệu bản thân</label>
                  <textarea
                    value={form.gioi_thieu}
                    onChange={e => setForm(f => ({ ...f, gioi_thieu: e.target.value }))}
                    rows={4}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-accent resize-none"
                    placeholder="Tóm tắt kinh nghiệm và lý do bạn phù hợp với vị trí này..."
                  />
                </div>
                <div className="flex gap-3">
                  <button type="submit" disabled={loading} className="btn-primary flex-1 justify-center">
                    {loading ? 'Đang gửi...' : <><FiSend size={14} /> Gửi Hồ Sơ</>}
                  </button>
                  <button type="button" onClick={() => setShowForm(false)} className="px-4 py-3 border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
                    Hủy
                  </button>
                </div>
              </form>
            </div>
          )}

          {success && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-5 flex items-center gap-3 text-green-700">
              <FiCheckCircle size={20} />
              <div>
                <p className="font-semibold">Gửi hồ sơ thành công!</p>
                <p className="text-sm">Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function TuyenDung() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/jobs')
      .then(r => setJobs(r.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-navy py-14">
        <div className="max-w-7xl mx-auto px-4">
          <Breadcrumb items={[{ label: 'Tuyển Dụng' }]} />
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mt-3">Cơ Hội Việc Làm</h1>
          <p className="text-blue-200 mt-2">Gia nhập đội ngũ chuyên gia logistics của Hoàng Khang</p>
        </div>
      </div>

      {/* Why Work With Us */}
      <section className="py-9 md:py-14 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-black text-primary mb-2">Tại Sao Làm Việc Tại Hoàng Khang?</h2>
            <p className="text-gray-500 text-sm">Chúng tôi không chỉ cung cấp một công việc – chúng tôi tạo ra môi trường để bạn phát triển</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: '🚀', title: 'Môi Trường Năng Động', desc: 'Làm việc với đội ngũ trẻ, nhiệt huyết và đam mê' },
              { icon: '📈', title: 'Cơ Hội Thăng Tiến', desc: 'Lộ trình phát triển nghề nghiệp rõ ràng và minh bạch' },
              { icon: '🌍', title: 'Tiếp Xúc Quốc Tế', desc: 'Làm việc với đối tác và khách hàng từ nhiều quốc gia' },
              { icon: '💰', title: 'Thu Nhập Cạnh Tranh', desc: 'Lương thưởng xứng đáng cùng nhiều phúc lợi hấp dẫn' },
            ].map((b, i) => (
              <div key={i} className="text-center p-6 rounded-2xl border border-gray-100 hover:border-accent hover:shadow-md transition-all">
                <div className="text-4xl mb-3">{b.icon}</div>
                <h4 className="font-bold text-gray-800 mb-2 text-sm">{b.title}</h4>
                <p className="text-xs text-gray-500">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Jobs List */}
      <section className="py-10 md:py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-black text-primary">Vị Trí Đang Tuyển</h2>
              <p className="text-gray-500 text-sm mt-1">{jobs.length} vị trí đang tuyển dụng</p>
            </div>
          </div>

          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-white rounded-2xl p-6 animate-pulse shadow-md">
                  <div className="h-5 bg-gray-200 rounded w-1/2 mb-3" />
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                  <div className="h-4 bg-gray-200 rounded w-1/3" />
                </div>
              ))}
            </div>
          ) : jobs.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl shadow-md">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-gray-700 mb-2">Hiện chưa có vị trí tuyển dụng</h3>
              <p className="text-gray-500 text-sm">Vui lòng gửi CV của bạn để chúng tôi liên hệ khi có nhu cầu</p>
            </div>
          ) : (
            <div className="space-y-6">
              {jobs.map(job => <JobCard key={job.id} job={job} />)}
            </div>
          )}

          {/* General CV submission */}
          <div className="mt-10 bg-primary rounded-2xl p-8 text-white text-center">
            <h3 className="text-xl font-bold mb-3">Không Tìm Thấy Vị Trí Phù Hợp?</h3>
            <p className="text-blue-200 mb-6 text-sm">Gửi CV của bạn để chúng tôi lưu lại và liên hệ khi có vị trí phù hợp</p>
            <a
              href="mailto:info@hoangkhanglogs.com?subject=Gửi CV ứng tuyển"
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white px-6 py-3 rounded-xl font-semibold transition-colors"
            >
              <FiSend size={16} /> Gửi CV Tổng Quát
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
