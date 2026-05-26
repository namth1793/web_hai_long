import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import axios from 'axios';
import {
  FiArrowRight, FiPhone, FiCheckCircle, FiTruck, FiGlobe, FiFileText,
  FiPackage, FiAward, FiUsers, FiBarChart2, FiClock, FiStar, FiChevronRight,
} from 'react-icons/fi';
import { MdAirplanemodeActive, MdDirectionsBoat, MdDirectionsBus } from 'react-icons/md';
import { useLanguage } from '../context/LanguageContext';

const STATS_ICONS = [<FiUsers size={24} />, <FiClock size={24} />, <FiGlobe size={24} />, <FiPackage size={24} />];
const STATS_VALUES = [20, 5, 50, 300];
const TRANSPORT_ICONS = [<MdAirplanemodeActive size={28} />, <MdDirectionsBoat size={28} />, <MdDirectionsBus size={28} />, <FiPackage size={28} />];
const SERVICE_ICONS = [<FiTruck size={32} />, <FiGlobe size={32} />, <FiFileText size={32} />];
const SERVICE_COLORS = ['from-blue-600 to-blue-800', 'from-amber-500 to-orange-600', 'from-green-600 to-emerald-700'];
const SERVICE_LINKS = ['/dich-vu#van-tai', '/dich-vu#uy-thac', '/dich-vu#hai-quan'];
const WHY_ICONS = [<FiAward />, <FiBarChart2 />, <FiUsers />, <FiGlobe />, <FiCheckCircle />, <FiStar />];

const PARTNERS = [
  { name: 'Vietnam Airlines', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Vietnam_Airlines_logo.svg/200px-Vietnam_Airlines_logo.svg.png' },
  { name: 'Vietjet', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/VietJet_Air_logo.svg/200px-VietJet_Air_logo.svg.png' },
  { name: 'Emirates', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Emirates_logo.svg/200px-Emirates_logo.svg.png' },
  { name: 'Singapore Airlines', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Singapore_Airlines_logo_2.svg/200px-Singapore_Airlines_logo_2.svg.png' },
  { name: 'Maersk', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Maersk_Logo.svg/200px-Maersk_Logo.svg.png' },
  { name: 'DHL', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/DHL_Logo.svg/200px-DHL_Logo.svg.png' },
];

export default function Home() {
  const { t, lang } = useLanguage();
  const h = t.home;
  const [news, setNews] = useState([]);
  const [activeTab, setActiveTab] = useState('nhap');
  const { ref: statsRef, inView: statsInView } = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    axios.get('/api/news/latest').then(r => setNews(r.data)).catch(() => {});
  }, []);

  const heroSettings = {
    dots: true, infinite: true, speed: 800,
    slidesToShow: 1, slidesToScroll: 1,
    autoplay: true, autoplaySpeed: 5000,
    fade: true, arrows: false,
    appendDots: dots => (<div style={{ bottom: '16px' }}><ul style={{ margin: 0 }}>{dots}</ul></div>),
  };

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative">
        <Slider {...heroSettings}>
          {h.slides.map((slide, i) => (
            <div key={i}>
              <div
                className="relative h-[380px] sm:h-[480px] md:h-[580px] lg:h-[660px] bg-cover bg-center"
                style={{ backgroundImage: `url('${['https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1400&q=80','https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=1400&q=80','https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1400&q=80'][i]}')` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/80 to-navy/30 sm:from-navy/90 sm:via-navy/70 sm:to-transparent" />
                <div className="relative z-10 h-full flex items-center">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
                    <div className="max-w-xl text-white">
                      <div className="inline-flex items-center gap-2 bg-accent/20 border border-accent/40 text-accent px-3 py-1 rounded-full text-xs font-semibold mb-3 sm:mb-4">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse shrink-0" />
                        <span className="leading-none">{slide.tag}</span>
                      </div>
                      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-tight mb-3 sm:mb-4 whitespace-pre-line">
                        {slide.title}
                      </h1>
                      <p className="hidden sm:block text-gray-200 text-sm md:text-base leading-relaxed mb-6">{slide.desc}</p>
                      <div className="flex flex-col xs:flex-row gap-3 sm:gap-4">
                        <Link to="/dich-vu" className="btn-primary text-sm sm:text-base w-full xs:w-auto">
                          {lang === 'en' ? 'Explore Services' : 'Khám Phá Dịch Vụ'} <FiArrowRight size={15} />
                        </Link>
                        <Link to="/lien-he" className="btn-outline text-sm sm:text-base w-full xs:w-auto">
                          <FiPhone size={15} /> {lang === 'en' ? 'Free Consultation' : 'Tư Vấn Miễn Phí'}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>

        {/* Transport mode strip */}
        <div className="bg-white shadow-lg relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-4 divide-x divide-gray-100">
              {h.transport.map((m, i) => (
                <Link key={i} to="/dich-vu"
                  className="flex flex-col items-center gap-1.5 p-3 sm:p-5 hover:bg-gray-50 group transition-colors">
                  <div className="text-primary group-hover:text-accent transition-colors">{TRANSPORT_ICONS[i]}</div>
                  <div className="text-center">
                    <div className="font-bold text-gray-800 text-xs sm:text-sm">{m.name}</div>
                    <div className="text-[10px] sm:text-xs text-gray-400 hidden xs:block">{m.desc}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT ────────────────────────────────────────── */}
      <section className="section-py bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="relative order-last lg:order-first">
              <img src="https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=800&q=80"
                alt="Hoàng Khang Logistics"
                className="rounded-2xl shadow-xl w-full object-cover h-56 sm:h-72 lg:h-[400px]" />
              <div className="absolute bottom-4 right-4 bg-accent text-white rounded-xl p-3 sm:p-4 shadow-xl">
                <div className="text-2xl sm:text-3xl font-black leading-none">5+</div>
                <div className="text-xs sm:text-sm font-medium">{h.about.yearsLabel}</div>
              </div>
              <div className="absolute top-4 left-4 bg-primary text-white rounded-xl px-3 py-2 shadow-xl">
                <div className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold">
                  <FiAward size={13} /><span>WCA Member</span>
                </div>
              </div>
            </div>
            <div>
              <div className="text-accent font-semibold text-xs uppercase tracking-wider mb-2">{h.about.badge}</div>
              <h2 className="text-2xl sm:text-3xl font-black text-primary mb-4 leading-tight">{h.about.title}</h2>
              <p className="text-gray-600 leading-relaxed mb-3 text-sm sm:text-base">{h.about.p1}</p>
              <p className="text-gray-600 leading-relaxed mb-5 text-sm sm:text-base">{h.about.p2}</p>
              <div className="grid grid-cols-2 gap-2.5 mb-6">
                {h.about.features.map((item) => (
                  <div key={item} className="flex items-center gap-2 text-xs sm:text-sm text-gray-700">
                    <FiCheckCircle className="text-accent shrink-0" size={14} /><span>{item}</span>
                  </div>
                ))}
              </div>
              <Link to="/gioi-thieu" className="btn-primary w-full sm:w-auto">
                {h.about.cta} <FiArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ────────────────────────────────────────── */}
      <section ref={statsRef} className="py-10 md:py-14 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {h.stats.map((s, i) => (
              <div key={i} className="text-center text-white">
                <div className="flex justify-center mb-2 text-accent">{STATS_ICONS[i]}</div>
                <div className="text-3xl sm:text-4xl md:text-5xl font-black mb-1">
                  {statsInView ? <CountUp end={STATS_VALUES[i]} duration={2.5} suffix="+" /> : '0'}
                </div>
                <div className="text-blue-200 text-xs sm:text-sm font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ─────────────────────────────────────── */}
      <section className="section-py bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <div className="text-accent font-semibold text-xs uppercase tracking-wider mb-2">{h.services.badge}</div>
            <h2 className="section-title text-center">{h.services.title}</h2>
            <p className="section-subtitle">{h.services.subtitle}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
            {h.services.list.map((s, i) => (
              <div key={i} className="service-card card overflow-hidden group">
                <div className={`bg-gradient-to-br ${SERVICE_COLORS[i]} p-6 sm:p-8 text-white`}>
                  <div className="mb-3">{SERVICE_ICONS[i]}</div>
                  <h3 className="text-lg sm:text-xl font-bold mb-2">{s.title}</h3>
                  <p className="text-white/80 text-xs sm:text-sm leading-relaxed">{s.desc}</p>
                </div>
                <div className="p-5 sm:p-6">
                  <ul className="space-y-1.5 mb-5">
                    {s.items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                        <FiCheckCircle className="text-accent shrink-0" size={13} />{item}
                      </li>
                    ))}
                  </ul>
                  <Link to={SERVICE_LINKS[i]} className="flex items-center gap-1.5 text-accent font-semibold text-sm">
                    {h.services.viewDetail} <FiArrowRight size={13} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRODUCTS ─────────────────────────────────────── */}
      <section className="section-py bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <div className="text-accent font-semibold text-xs uppercase tracking-wider mb-2">{h.products.badge}</div>
            <h2 className="section-title text-center">{h.products.title}</h2>
          </div>
          <div className="flex justify-center mb-8">
            <div className="bg-white rounded-xl p-1 shadow-md inline-flex w-full max-w-xs sm:max-w-sm">
              {[['nhap', h.products.tabImport], ['xuat', h.products.tabExport]].map(([key, label]) => (
                <button key={key} onClick={() => setActiveTab(key)}
                  className={`flex-1 px-4 py-2.5 rounded-lg font-semibold text-xs sm:text-sm transition-all ${
                    activeTab === key ? 'bg-primary text-white shadow-md' : 'text-gray-600 hover:text-primary'
                  }`}>
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {(activeTab === 'nhap' ? h.products.nhap : h.products.xuat).map((p, i) => (
              <div key={i} className="card p-4 sm:p-6 text-center group hover:border-accent border-2 border-transparent transition-all">
                <div className="text-3xl sm:text-4xl mb-3">{p.icon}</div>
                <h4 className="font-bold text-gray-800 text-xs sm:text-sm mb-1.5 group-hover:text-accent transition-colors leading-snug">{p.name}</h4>
                <p className="text-xs text-gray-500 leading-relaxed hidden sm:block">{p.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/san-pham" className="btn-primary w-full sm:w-auto">
              {h.products.viewAll} <FiArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── WHY US ───────────────────────────────────────── */}
      <section className="section-py bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <div className="text-accent font-semibold text-xs uppercase tracking-wider mb-2">{h.whyUs.badge}</div>
            <h2 className="section-title text-center">{h.whyUs.title}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {h.whyUs.list.map((item, i) => (
              <div key={i} className="flex gap-3 sm:gap-4 p-4 sm:p-6 rounded-xl hover:bg-gray-50 transition-colors group">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 text-primary group-hover:bg-accent group-hover:text-white rounded-xl flex items-center justify-center shrink-0 transition-all text-base sm:text-lg">
                  {WHY_ICONS[i]}
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 text-sm sm:text-base mb-1 group-hover:text-accent transition-colors">{item.title}</h4>
                  <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PARTNERS ─────────────────────────────────────── */}
      <section className="py-10 md:py-14 bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <div className="text-accent font-semibold text-xs uppercase tracking-wider mb-2">{h.partners.badge}</div>
            <h2 className="text-xl sm:text-2xl font-bold text-primary">{h.partners.title}</h2>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4 items-center">
            {PARTNERS.map((p, i) => (
              <div key={i} className="bg-white rounded-xl p-3 sm:p-4 flex items-center justify-center h-14 sm:h-18 md:h-20 shadow-sm hover:shadow-md transition-shadow group">
                <img src={p.logo} alt={p.name}
                  className="max-h-7 sm:max-h-9 max-w-full object-contain grayscale group-hover:grayscale-0 transition-all opacity-60 group-hover:opacity-100"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentNode.innerHTML = `<span class="text-[9px] font-bold text-gray-400 text-center leading-tight">${p.name}</span>`;
                  }}
                />
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {['WCA Member', 'VLA Member', 'JCtrans Member'].map((m) => (
              <div key={m} className="flex items-center gap-1.5 bg-primary text-white px-4 py-2 rounded-full text-xs sm:text-sm font-semibold">
                <FiAward size={12} className="text-accent" />{m}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEWS ─────────────────────────────────────────── */}
      <section className="section-py bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between mb-8">
            <div>
              <div className="text-accent font-semibold text-xs uppercase tracking-wider mb-1.5">{h.news.badge}</div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-primary">{h.news.title}</h2>
            </div>
            <Link to="/tin-tuc" className="flex items-center gap-1 text-accent font-semibold text-sm shrink-0 ml-4">
              {h.news.viewAll} <FiChevronRight size={14} />
            </Link>
          </div>

          {news.length === 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {[1, 2, 3].map(i => (
                <div key={i} className="card animate-pulse">
                  <div className="h-40 bg-gray-200 rounded-t-xl" />
                  <div className="p-4 space-y-2">
                    <div className="h-3 bg-gray-200 rounded w-1/3" />
                    <div className="h-4 bg-gray-200 rounded" />
                    <div className="h-3 bg-gray-200 rounded w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
              {news.map((n) => (
                <Link key={n.id} to={`/tin-tuc/${n.slug}`} className="news-card card group overflow-hidden">
                  <div className="overflow-hidden h-44 sm:h-48">
                    <img src={n.hinh_anh} alt={n.tieu_de} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-4 sm:p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-accent/10 text-accent text-[10px] font-semibold px-2.5 py-1 rounded-full">{n.danh_muc}</span>
                      <span className="text-gray-400 text-[10px]">{new Date(n.created_at).toLocaleDateString('vi-VN')}</span>
                    </div>
                    <h3 className="font-bold text-gray-800 text-sm sm:text-base line-clamp-2 group-hover:text-accent transition-colors leading-snug mb-1">{n.tieu_de}</h3>
                    <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed hidden sm:block">{n.mo_ta}</p>
                    <div className="mt-3 flex items-center gap-1 text-accent text-xs font-semibold">
                      {h.news.readMore} <FiChevronRight size={12} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section
        className="section-py relative bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=1400&q=80')" }}
      >
        <div className="absolute inset-0 bg-navy/88" />
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center text-white">
          <div className="text-accent font-semibold text-xs uppercase tracking-wider mb-3">{h.cta.badge}</div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-4 leading-tight">{h.cta.title}</h2>
          <p className="text-gray-300 text-sm sm:text-base md:text-lg mb-8 leading-relaxed">{h.cta.subtitle}</p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            <Link to="/lien-he" className="btn-primary text-sm sm:text-base px-6 sm:px-8 py-3.5 w-full sm:w-auto">
              {h.cta.btnConsult} <FiArrowRight size={15} />
            </Link>
            <a href="tel:02466898662" className="btn-outline text-sm sm:text-base px-6 sm:px-8 py-3.5 w-full sm:w-auto">
              <FiPhone size={15} /> 024 668 98662
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
