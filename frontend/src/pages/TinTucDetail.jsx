import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { FiCalendar, FiEye, FiUser, FiArrowLeft, FiTag, FiPhone, FiArrowRight } from 'react-icons/fi';
import Breadcrumb from '../components/Breadcrumb';

export default function TinTucDetail() {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get(`/api/news/${slug}`)
      .then(r => { setArticle(r.data); setLoading(false); })
      .catch(() => { setNotFound(true); setLoading(false); });
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <div className="text-6xl">📰</div>
        <h2 className="text-2xl font-bold text-gray-700">Bài viết không tồn tại</h2>
        <Link to="/tin-tuc" className="btn-primary">Quay Lại Tin Tức</Link>
      </div>
    );
  }

  return (
    <>
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-navy py-12">
        <div className="max-w-7xl mx-auto px-4">
          <Breadcrumb items={[{ label: 'Tin Tức', path: '/tin-tuc' }, { label: article.tieu_de.substring(0, 40) + '...' }]} />
        </div>
      </div>

      <section className="py-9 md:py-14 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Article */}
            <article className="flex-1 min-w-0">
              <div className="bg-white rounded-2xl overflow-hidden shadow-md">
                {/* Featured Image */}
                <img src={article.hinh_anh} alt={article.tieu_de} className="w-full h-64 md:h-80 object-cover" />

                <div className="p-8 md:p-10">
                  {/* Meta */}
                  <div className="flex flex-wrap items-center gap-4 mb-5 text-sm text-gray-500">
                    <span className="bg-accent/10 text-accent font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                      <FiTag size={11} />{article.danh_muc}
                    </span>
                    <span className="flex items-center gap-1"><FiCalendar size={13} />{new Date(article.created_at).toLocaleDateString('vi-VN')}</span>
                    <span className="flex items-center gap-1"><FiUser size={13} />{article.tac_gia}</span>
                    <span className="flex items-center gap-1"><FiEye size={13} />{article.luot_xem} lượt xem</span>
                  </div>

                  {/* Title */}
                  <h1 className="text-2xl md:text-3xl font-black text-primary mb-5 leading-tight">{article.tieu_de}</h1>

                  {/* Intro */}
                  <p className="text-gray-600 text-base leading-relaxed mb-6 border-l-4 border-accent pl-4 italic bg-accent/5 py-3 pr-4 rounded-r-lg">
                    {article.mo_ta}
                  </p>

                  {/* Content */}
                  <div
                    className="prose prose-lg max-w-none text-gray-700 leading-relaxed
                      [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-primary [&_h3]:mt-8 [&_h3]:mb-3
                      [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_li]:mb-1
                      [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4
                      [&_strong]:text-gray-900 [&_strong]:font-semibold"
                    dangerouslySetInnerHTML={{ __html: article.noi_dung }}
                  />

                  {/* Tags */}
                  <div className="mt-8 pt-6 border-t border-gray-100 flex items-center gap-3 flex-wrap">
                    <span className="text-sm font-semibold text-gray-500">Tags:</span>
                    {['Logistics', 'Xuất Nhập Khẩu', 'Hoàng Khang', article.danh_muc].map(tag => (
                      <span key={tag} className="bg-gray-100 text-gray-600 text-xs px-3 py-1.5 rounded-full">{tag}</span>
                    ))}
                  </div>

                  {/* Back button */}
                  <div className="mt-6">
                    <Link to="/tin-tuc" className="flex items-center gap-2 text-primary font-semibold hover:text-accent transition-colors text-sm">
                      <FiArrowLeft size={14} /> Quay Lại Tin Tức
                    </Link>
                  </div>
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="w-full lg:w-72 shrink-0 space-y-6">
              {/* Related */}
              {article.related?.length > 0 && (
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <h3 className="font-bold text-primary text-base mb-4 pb-3 border-b border-gray-100">Bài Viết Liên Quan</h3>
                  <div className="space-y-4">
                    {article.related.map((rel) => (
                      <Link key={rel.id} to={`/tin-tuc/${rel.slug}`} className="flex gap-3 group">
                        <img src={rel.hinh_anh} alt={rel.tieu_de} className="w-16 h-14 object-cover rounded-lg shrink-0" />
                        <div className="min-w-0">
                          <p className="text-sm text-gray-700 font-medium line-clamp-2 group-hover:text-accent transition-colors leading-snug">{rel.tieu_de}</p>
                          <p className="text-xs text-gray-400 mt-1">{new Date(rel.created_at).toLocaleDateString('vi-VN')}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Contact CTA */}
              <div className="bg-primary rounded-2xl p-6 text-white">
                <h3 className="font-bold text-base mb-3">Cần Tư Vấn Logistics?</h3>
                <p className="text-blue-200 text-sm mb-4">Liên hệ ngay để được tư vấn miễn phí và báo giá nhanh nhất</p>
                <a href="tel:02466898662" className="flex items-center justify-center gap-2 w-full bg-accent hover:bg-accent-dark text-white py-2.5 rounded-lg font-semibold text-sm transition-colors mb-2">
                  <FiPhone size={14} /> 024 668 98662
                </a>
                <Link to="/lien-he" className="flex items-center justify-center gap-2 w-full border border-white/30 text-white py-2.5 rounded-lg font-semibold text-sm hover:bg-white/10 transition-colors">
                  Gửi Yêu Cầu <FiArrowRight size={14} />
                </Link>
              </div>

              {/* Services Quick */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="font-bold text-primary text-base mb-4 pb-3 border-b border-gray-100">Dịch Vụ Của Chúng Tôi</h3>
                <ul className="space-y-2">
                  {['Vận Tải Hàng Không', 'Vận Tải Đường Biển', 'Vận Tải Đường Bộ', 'Ủy Thác Xuất Nhập Khẩu', 'Thủ Tục Hải Quan'].map(s => (
                    <li key={s}>
                      <Link to="/dich-vu" className="flex items-center gap-2 text-sm text-gray-600 hover:text-accent transition-colors">
                        <span className="text-accent text-base">›</span>{s}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
