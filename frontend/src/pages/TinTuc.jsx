import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FiEye, FiCalendar, FiTag, FiSearch, FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import Breadcrumb from '../components/Breadcrumb';
import { useLanguage } from '../context/LanguageContext';

export default function TinTuc() {
  const { t } = useLanguage();
  const n = t.news;
  const [news, setNews] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCat, setSelectedCat] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page, limit: 6 });
      if (selectedCat) params.append('danh_muc', selectedCat);
      const res = await axios.get(`/api/news?${params}`);
      setNews(res.data.data);
      setPagination(res.data.pagination);
    } catch (e) {}
    setLoading(false);
  };

  useEffect(() => {
    axios.get('/api/news/categories').then(r => setCategories(r.data));
  }, []);

  useEffect(() => { fetchNews(); }, [page, selectedCat]);

  const filtered = search
    ? news.filter(nw => nw.tieu_de.toLowerCase().includes(search.toLowerCase()))
    : news;

  return (
    <>
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-navy py-14">
        <div className="max-w-7xl mx-auto px-4">
          <Breadcrumb items={[{ label: n.header.breadcrumb }]} />
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mt-3">{n.header.title}</h1>
          <p className="text-blue-200 mt-2">{n.header.subtitle}</p>
        </div>
      </div>

      <section className="py-10 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Main Content */}
            <div className="flex-1 min-w-0">
              {/* Search */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <div className="relative flex-1">
                  <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input type="text" placeholder={n.searchPlaceholder} value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-accent bg-white" />
                </div>
              </div>

              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="card animate-pulse">
                      <div className="h-48 bg-gray-200 rounded-t-xl" />
                      <div className="p-5 space-y-3">
                        <div className="h-4 bg-gray-200 rounded w-1/3" />
                        <div className="h-5 bg-gray-200 rounded" />
                        <div className="h-4 bg-gray-200 rounded w-2/3" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : filtered.length === 0 ? (
                <div className="text-center py-16 text-gray-400">
                  <div className="text-4xl mb-3">📰</div>
                  <p>{n.noArticles}</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {filtered.map((item) => (
                    <Link key={item.id} to={`/tin-tuc/${item.slug}`} className="news-card card group overflow-hidden bg-white">
                      <div className="overflow-hidden h-48">
                        <img src={item.hinh_anh} alt={item.tieu_de} className="w-full h-full object-cover" />
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="bg-accent/10 text-accent text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                            <FiTag size={10} />{item.danh_muc}
                          </span>
                        </div>
                        <h3 className="font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-accent transition-colors leading-snug">{item.tieu_de}</h3>
                        <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed mb-4">{item.mo_ta}</p>
                        <div className="flex items-center justify-between text-xs text-gray-400">
                          <span className="flex items-center gap-1"><FiCalendar size={11} />{new Date(item.created_at).toLocaleDateString('vi-VN')}</span>
                          <span className="flex items-center gap-1"><FiEye size={11} />{item.luot_xem} {n.views}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {/* Pagination */}
              {pagination.totalPages > 1 && !search && (
                <div className="flex justify-center items-center gap-3 mt-10">
                  <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                    className="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-200 bg-white hover:border-accent hover:text-accent disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
                    <FiChevronLeft size={16} />
                  </button>
                  {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(pg => (
                    <button key={pg} onClick={() => setPage(pg)}
                      className={`w-10 h-10 flex items-center justify-center rounded-xl font-semibold text-sm transition-colors ${
                        page === pg ? 'bg-primary text-white' : 'border border-gray-200 bg-white hover:border-accent hover:text-accent'
                      }`}>{pg}</button>
                  ))}
                  <button onClick={() => setPage(p => Math.min(pagination.totalPages, p + 1))} disabled={page === pagination.totalPages}
                    className="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-200 bg-white hover:border-accent hover:text-accent disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
                    <FiChevronRight size={16} />
                  </button>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="w-full lg:w-72 shrink-0 space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="font-bold text-primary text-base mb-4 pb-3 border-b border-gray-100">{n.categories}</h3>
                <ul className="space-y-2">
                  <li>
                    <button onClick={() => { setSelectedCat(''); setPage(1); }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${!selectedCat ? 'bg-primary text-white font-semibold' : 'text-gray-600 hover:text-accent'}`}>
                      {n.filterAll}
                    </button>
                  </li>
                  {categories.map((cat) => (
                    <li key={cat}>
                      <button onClick={() => { setSelectedCat(cat); setPage(1); }}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${selectedCat === cat ? 'bg-primary text-white font-semibold' : 'text-gray-600 hover:text-accent'}`}>
                        {cat}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact CTA */}
              <div className="bg-primary rounded-2xl p-6 text-white">
                <h3 className="font-bold text-base mb-3">{n.needHelp}</h3>
                <p className="text-blue-200 text-sm mb-4">{n.helpDesc}</p>
                <a href="tel:02466898662" className="block w-full bg-accent hover:bg-accent-dark text-white text-center py-2.5 rounded-lg font-semibold text-sm transition-colors">
                  {n.callBtn}
                </a>
                <Link to="/lien-he" className="block w-full mt-2 border border-white/30 text-white text-center py-2.5 rounded-lg font-semibold text-sm hover:bg-white/10 transition-colors">
                  {n.sendRequest}
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
