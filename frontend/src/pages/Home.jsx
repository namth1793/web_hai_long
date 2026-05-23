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

/* ─── DATA ────────────────────────────────────────────────────────────── */
const SLIDES = [
  {
    bg: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1400&q=80',
    tag: 'Giải Pháp Logistics Toàn Diện',
    title: 'Vận Chuyển Hàng Hóa\nQuốc Tế Uy Tín',
    desc: 'Kết nối doanh nghiệp Việt Nam với thị trường thế giới qua hệ thống vận tải đa phương thức toàn cầu.',
  },
  {
    bg: 'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=1400&q=80',
    tag: 'Xuất Nhập Khẩu Chính Ngạch',
    title: 'Ủy Thác Xuất Nhập Khẩu\nTrọn Gói',
    desc: 'Từ tìm nguồn hàng, thanh toán quốc tế đến thông quan – Hoàng Khang đảm nhiệm toàn bộ quy trình.',
  },
  {
    bg: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1400&q=80',
    tag: 'Thủ Tục Hải Quan Nhanh',
    title: 'Khai Báo Hải Quan\nChuyên Nghiệp',
    desc: 'Đội ngũ hải quan giàu kinh nghiệm, đảm bảo thông quan nhanh chóng và chính xác cho mọi lô hàng.',
  },
];

const STATS = [
  { icon: <FiUsers size={24} />, value: 20, suffix: '+', label: 'Nhân viên' },
  { icon: <FiClock size={24} />, value: 5, suffix: '+', label: 'Năm kinh nghiệm' },
  { icon: <FiGlobe size={24} />, value: 50, suffix: '+', label: 'Điểm đến' },
  { icon: <FiPackage size={24} />, value: 300, suffix: '+', label: 'Đơn/tháng' },
];

const SERVICES = [
  {
    icon: <FiTruck size={32} />,
    title: 'Vận Tải Quốc Tế',
    desc: 'Hàng không, đường biển, đường bộ và cửa khẩu – tối ưu chi phí và thời gian.',
    items: ['Vận tải hàng không', 'Vận tải đường biển', 'Vận tải đường bộ', 'Vận tải cửa khẩu'],
    link: '/dich-vu#van-tai',
    color: 'from-blue-600 to-blue-800',
  },
  {
    icon: <FiGlobe size={32} />,
    title: 'Ủy Thác XNK',
    desc: 'Tìm nguồn hàng, đàm phán giá, thanh toán quốc tế và xử lý toàn bộ thủ tục pháp lý.',
    items: ['Tìm kiếm nguồn hàng', 'Thanh toán quốc tế', 'Ủy thác xuất khẩu', 'Ủy thác nhập khẩu'],
    link: '/dich-vu#uy-thac',
    color: 'from-amber-500 to-orange-600',
  },
  {
    icon: <FiFileText size={32} />,
    title: 'Thủ Tục Hải Quan',
    desc: 'Khai báo điện tử nhanh, tư vấn HS Code, tối ưu thuế nhập khẩu hợp pháp.',
    items: ['Khai báo hải quan', 'Phân loại HS Code', 'Tư vấn thuế XNK', 'Kiểm tra hàng hóa'],
    link: '/dich-vu#hai-quan',
    color: 'from-green-600 to-emerald-700',
  },
];

const PRODUCTS_NHAP = [
  { icon: '⚙️', name: 'Máy Móc & Thiết Bị', desc: 'Dây chuyền sản xuất, thiết bị chuyên dụng' },
  { icon: '🏭', name: 'Nguyên Liệu Sản Xuất', desc: 'Hóa chất, nhựa, kim loại, phụ liệu' },
  { icon: '🛍️', name: 'Hàng Tiêu Dùng', desc: 'Đồ gia dụng, điện tử, thực phẩm đóng gói' },
  { icon: '🔧', name: 'Phụ Tùng & Linh Kiện', desc: 'Linh kiện điện tử, phụ tùng ô tô, thiết bị điện' },
];

const PRODUCTS_XUAT = [
  { icon: '🎨', name: 'Thủ Công Mỹ Nghệ', desc: 'Đồ gỗ, gốm sứ, mây tre đan, sơn mài' },
  { icon: '👔', name: 'Dệt May', desc: 'Quần áo, vải vóc, phụ liệu may mặc' },
  { icon: '🌾', name: 'Nông Sản', desc: 'Cà phê, gạo, hạt điều, hải sản' },
  { icon: '💆', name: 'Tóc Giả & Lông Mi', desc: 'Tóc thật, tóc giả, lông mi xuất khẩu' },
];

const PARTNERS = [
  { name: 'Vietnam Airlines', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Vietnam_Airlines_logo.svg/200px-Vietnam_Airlines_logo.svg.png' },
  { name: 'Vietjet', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/VietJet_Air_logo.svg/200px-VietJet_Air_logo.svg.png' },
  { name: 'Emirates', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Emirates_logo.svg/200px-Emirates_logo.svg.png' },
  { name: 'Singapore Airlines', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Singapore_Airlines_logo_2.svg/200px-Singapore_Airlines_logo_2.svg.png' },
  { name: 'Maersk', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Maersk_Logo.svg/200px-Maersk_Logo.svg.png' },
  { name: 'DHL', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/DHL_Logo.svg/200px-DHL_Logo.svg.png' },
];

const WHY_US = [
  { icon: <FiAward />, title: 'Được Cấp Phép Đầy Đủ', desc: 'Giấy phép XNK, đại lý hải quan và đầy đủ chứng nhận hợp pháp.' },
  { icon: <FiBarChart2 />, title: 'Tối Ưu Chi Phí', desc: 'Mạng lưới đối tác rộng giúp tối ưu cước phí cho khách hàng.' },
  { icon: <FiUsers />, title: 'Đội Ngũ Chuyên Nghiệp', desc: 'Hơn 20 chuyên gia giàu kinh nghiệm logistics quốc tế.' },
  { icon: <FiGlobe />, title: 'Mạng Lưới Toàn Cầu', desc: 'Thành viên WCA, VLA, JCtrans – 180+ quốc gia.' },
  { icon: <FiCheckCircle />, title: 'Uy Tín & Minh Bạch', desc: 'Cam kết minh bạch giá cả, theo dõi lô hàng 24/7.' },
  { icon: <FiStar />, title: 'Hỗ Trợ 24/7', desc: 'Chăm sóc khách hàng luôn sẵn sàng mọi lúc, mọi nơi.' },
];

const TRANSPORT_MODES = [
  { icon: <MdAirplanemodeActive size={28} />, name: 'Hàng Không', desc: 'Nhanh, an toàn' },
  { icon: <MdDirectionsBoat size={28} />, name: 'Đường Biển', desc: 'Tối ưu chi phí' },
  { icon: <MdDirectionsBus size={28} />, name: 'Đường Bộ', desc: 'Linh hoạt' },
  { icon: <FiPackage size={28} />, name: 'Cửa Khẩu', desc: 'Trung Quốc – VN' },
];

/* ─── COMPONENT ───────────────────────────────────────────────────────── */
export default function Home() {
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
    appendDots: dots => (
      <div style={{ bottom: '16px' }}><ul style={{ margin: 0 }}>{dots}</ul></div>
    ),
  };

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative">
        <Slider {...heroSettings}>
          {SLIDES.map((slide, i) => (
            <div key={i}>
              <div
                className="relative h-[380px] sm:h-[480px] md:h-[580px] lg:h-[660px] bg-cover bg-center"
                style={{ backgroundImage: `url('${slide.bg}')` }}
              >
                {/* stronger gradient on mobile for readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/80 to-navy/30 sm:from-navy/90 sm:via-navy/70 sm:to-transparent" />
                <div className="relative z-10 h-full flex items-center">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
                    <div className="max-w-xl text-white">
                      {/* Tag */}
                      <div className="inline-flex items-center gap-2 bg-accent/20 border border-accent/40 text-accent px-3 py-1 rounded-full text-xs font-semibold mb-3 sm:mb-4">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse shrink-0" />
                        <span className="leading-none">{slide.tag}</span>
                      </div>
                      {/* Title */}
                      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-tight mb-3 sm:mb-4 whitespace-pre-line">
                        {slide.title}
                      </h1>
                      {/* Description — hide on very small screens */}
                      <p className="hidden sm:block text-gray-200 text-sm md:text-base leading-relaxed mb-6">
                        {slide.desc}
                      </p>
                      {/* Buttons */}
                      <div className="flex flex-col xs:flex-row gap-3 sm:gap-4">
                        <Link to="/dich-vu" className="btn-primary text-sm sm:text-base w-full xs:w-auto">
                          Khám Phá Dịch Vụ <FiArrowRight size={15} />
                        </Link>
                        <Link to="/lien-he" className="btn-outline text-sm sm:text-base w-full xs:w-auto">
                          <FiPhone size={15} /> Tư Vấn Miễn Phí
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
              {TRANSPORT_MODES.map((m, i) => (
                <Link key={i} to="/dich-vu"
                  className="flex flex-col items-center gap-1.5 p-3 sm:p-5 hover:bg-gray-50 group transition-colors">
                  <div className="text-primary group-hover:text-accent transition-colors">{m.icon}</div>
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
            {/* Image — shown BELOW text on mobile (order-last), on desktop left */}
            <div className="relative order-last lg:order-first">
              <img
                src="https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=800&q=80"
                alt="Hoàng Khang Logistics"
                className="rounded-2xl shadow-xl w-full object-cover h-56 sm:h-72 lg:h-[400px]"
              />
              {/* Badges — safe positioning, no overflow */}
              <div className="absolute bottom-4 right-4 bg-accent text-white rounded-xl p-3 sm:p-4 shadow-xl">
                <div className="text-2xl sm:text-3xl font-black leading-none">5+</div>
                <div className="text-xs sm:text-sm font-medium">Năm KN</div>
              </div>
              <div className="absolute top-4 left-4 bg-primary text-white rounded-xl px-3 py-2 shadow-xl">
                <div className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold">
                  <FiAward size={13} /><span>WCA Member</span>
                </div>
              </div>
            </div>

            {/* Text */}
            <div>
              <div className="text-accent font-semibold text-xs uppercase tracking-wider mb-2">Về Chúng Tôi</div>
              <h2 className="text-2xl sm:text-3xl font-black text-primary mb-4 leading-tight">
                Đối Tác Logistics Đáng Tin Cậy Của Doanh Nghiệp Bạn
              </h2>
              <p className="text-gray-600 leading-relaxed mb-3 text-sm sm:text-base">
                Công ty XNK và Logistics Hoàng Khang thành lập năm 2021, cung cấp giải pháp logistics toàn diện giúp doanh nghiệp Việt Nam tiếp cận thị trường quốc tế hiệu quả nhất.
              </p>
              <p className="text-gray-600 leading-relaxed mb-5 text-sm sm:text-base">
                Thành viên của WCA, VLA và JCtrans – kết nối toàn diện tới hơn 50 điểm đến trên thế giới.
              </p>
              <div className="grid grid-cols-2 gap-2.5 mb-6">
                {['Vận tải đa phương thức', 'Ủy thác XNK chính ngạch', 'Thủ tục hải quan nhanh', 'Hỗ trợ 24/7'].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-xs sm:text-sm text-gray-700">
                    <FiCheckCircle className="text-accent shrink-0" size={14} /><span>{item}</span>
                  </div>
                ))}
              </div>
              <Link to="/gioi-thieu" className="btn-primary w-full sm:w-auto">
                Tìm Hiểu Thêm <FiArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ────────────────────────────────────────── */}
      <section ref={statsRef} className="py-10 md:py-14 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {STATS.map((s, i) => (
              <div key={i} className="text-center text-white">
                <div className="flex justify-center mb-2 text-accent">{s.icon}</div>
                <div className="text-3xl sm:text-4xl md:text-5xl font-black mb-1">
                  {statsInView ? <CountUp end={s.value} duration={2.5} suffix={s.suffix} /> : '0'}
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
            <div className="text-accent font-semibold text-xs uppercase tracking-wider mb-2">Dịch Vụ</div>
            <h2 className="section-title text-center">Giải Pháp Logistics Toàn Diện</h2>
            <p className="section-subtitle">Hoàng Khang cung cấp đầy đủ dịch vụ XNK và logistics cho doanh nghiệp</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
            {SERVICES.map((s, i) => (
              <div key={i} className="service-card card overflow-hidden group">
                <div className={`bg-gradient-to-br ${s.color} p-6 sm:p-8 text-white`}>
                  <div className="mb-3">{s.icon}</div>
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
                  <Link to={s.link} className="flex items-center gap-1.5 text-accent font-semibold text-sm">
                    Xem Chi Tiết <FiArrowRight size={13} />
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
            <div className="text-accent font-semibold text-xs uppercase tracking-wider mb-2">Hàng Hóa</div>
            <h2 className="section-title text-center">Hàng Xuất Nhập Khẩu</h2>
          </div>
          {/* Tabs */}
          <div className="flex justify-center mb-8">
            <div className="bg-white rounded-xl p-1 shadow-md inline-flex w-full max-w-xs sm:max-w-sm">
              {[['nhap', '📦 Hàng Nhập'], ['xuat', '🚢 Hàng Xuất']].map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`flex-1 px-4 py-2.5 rounded-lg font-semibold text-xs sm:text-sm transition-all ${
                    activeTab === key ? 'bg-primary text-white shadow-md' : 'text-gray-600 hover:text-primary'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {(activeTab === 'nhap' ? PRODUCTS_NHAP : PRODUCTS_XUAT).map((p, i) => (
              <div key={i} className="card p-4 sm:p-6 text-center group hover:border-accent border-2 border-transparent transition-all">
                <div className="text-3xl sm:text-4xl mb-3">{p.icon}</div>
                <h4 className="font-bold text-gray-800 text-xs sm:text-sm mb-1.5 group-hover:text-accent transition-colors leading-snug">{p.name}</h4>
                <p className="text-xs text-gray-500 leading-relaxed hidden sm:block">{p.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/san-pham" className="btn-primary w-full sm:w-auto">
              Xem Tất Cả Sản Phẩm <FiArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── WHY US ───────────────────────────────────────── */}
      <section className="section-py bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <div className="text-accent font-semibold text-xs uppercase tracking-wider mb-2">Tại Sao Chọn Chúng Tôi</div>
            <h2 className="section-title text-center">Ưu Điểm Của Hoàng Khang</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {WHY_US.map((item, i) => (
              <div key={i} className="flex gap-3 sm:gap-4 p-4 sm:p-6 rounded-xl hover:bg-gray-50 transition-colors group">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 text-primary group-hover:bg-accent group-hover:text-white rounded-xl flex items-center justify-center shrink-0 transition-all text-base sm:text-lg">
                  {item.icon}
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
            <div className="text-accent font-semibold text-xs uppercase tracking-wider mb-2">Đối Tác</div>
            <h2 className="text-xl sm:text-2xl font-bold text-primary">Đối Tác Chiến Lược</h2>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4 items-center">
            {PARTNERS.map((p, i) => (
              <div key={i} className="bg-white rounded-xl p-3 sm:p-4 flex items-center justify-center h-14 sm:h-18 md:h-20 shadow-sm hover:shadow-md transition-shadow group">
                <img
                  src={p.logo} alt={p.name}
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
              <div className="text-accent font-semibold text-xs uppercase tracking-wider mb-1.5">Tin Tức</div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-primary">Tin Tức Mới Nhất</h2>
            </div>
            <Link to="/tin-tuc" className="flex items-center gap-1 text-accent font-semibold text-sm shrink-0 ml-4">
              Tất cả <FiChevronRight size={14} />
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
                    <h3 className="font-bold text-gray-800 text-sm sm:text-base line-clamp-2 group-hover:text-accent transition-colors leading-snug mb-1">
                      {n.tieu_de}
                    </h3>
                    <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed hidden sm:block">{n.mo_ta}</p>
                    <div className="mt-3 flex items-center gap-1 text-accent text-xs font-semibold">
                      Đọc thêm <FiChevronRight size={12} />
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
          <div className="text-accent font-semibold text-xs uppercase tracking-wider mb-3">Bắt Đầu Ngay</div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-4 leading-tight">
            Sẵn Sàng Mở Rộng Thị Trường Xuất Nhập Khẩu?
          </h2>
          <p className="text-gray-300 text-sm sm:text-base md:text-lg mb-8 leading-relaxed">
            Tư vấn miễn phí – Báo giá nhanh chóng. Hãy để Hoàng Khang đồng hành cùng doanh nghiệp bạn.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            <Link to="/lien-he" className="btn-primary text-sm sm:text-base px-6 sm:px-8 py-3.5 w-full sm:w-auto">
              Nhận Tư Vấn Miễn Phí <FiArrowRight size={15} />
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
