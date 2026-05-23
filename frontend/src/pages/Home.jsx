import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import axios from 'axios';
import {
  FiArrowRight, FiPhone, FiCheckCircle, FiTruck, FiGlobe, FiFileText,
  FiPackage, FiAward, FiUsers, FiBarChart2, FiClock, FiStar, FiChevronRight
} from 'react-icons/fi';
import { MdAirplanemodeActive, MdDirectionsBoat, MdDirectionsBus } from 'react-icons/md';

// ─── HERO SLIDER ───────────────────────────────────────────────────────────────
const SLIDES = [
  {
    bg: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1600&q=80',
    tag: 'Giải Pháp Logistics Toàn Diện',
    title: 'Vận Chuyển Hàng Hóa\nQuốc Tế Uy Tín',
    desc: 'Kết nối doanh nghiệp Việt Nam với thị trường thế giới qua hệ thống vận tải đa phương thức: hàng không, đường biển, đường bộ và cửa khẩu.',
  },
  {
    bg: 'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=1600&q=80',
    tag: 'Xuất Nhập Khẩu Chính Ngạch',
    title: 'Ủy Thác Xuất Nhập Khẩu\nTrọn Gói',
    desc: 'Từ tìm nguồn hàng, đàm phán giá, thanh toán quốc tế đến thông quan – Hoàng Khang đảm nhiệm toàn bộ quy trình cho doanh nghiệp của bạn.',
  },
  {
    bg: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1600&q=80',
    tag: 'Thủ Tục Hải Quan Nhanh Chóng',
    title: 'Khai Báo Hải Quan\nChuyên Nghiệp',
    desc: 'Đội ngũ nhân viên hải quan giàu kinh nghiệm, am hiểu pháp luật, đảm bảo thông quan nhanh chóng và chính xác cho mọi lô hàng.',
  },
];

// ─── STATS ────────────────────────────────────────────────────────────────────
const STATS = [
  { icon: <FiUsers size={28} />, value: 20, suffix: '+', label: 'Nhân viên chuyên nghiệp' },
  { icon: <FiClock size={28} />, value: 5, suffix: '+', label: 'Năm kinh nghiệm' },
  { icon: <FiGlobe size={28} />, value: 50, suffix: '+', label: 'Điểm đến toàn cầu' },
  { icon: <FiPackage size={28} />, value: 300, suffix: '+', label: 'Đơn hàng mỗi tháng' },
];

// ─── SERVICES ─────────────────────────────────────────────────────────────────
const SERVICES = [
  {
    icon: <FiTruck size={36} />,
    title: 'Vận Tải Quốc Tế',
    desc: 'Hệ thống vận chuyển đa phương thức toàn cầu: hàng không, đường biển, đường bộ và cửa khẩu – đảm bảo tối ưu chi phí và thời gian.',
    items: ['Vận tải hàng không', 'Vận tải đường biển', 'Vận tải đường bộ', 'Vận tải cửa khẩu'],
    link: '/dich-vu#van-tai',
    color: 'from-blue-600 to-blue-800',
  },
  {
    icon: <FiGlobe size={36} />,
    title: 'Ủy Thác Xuất Nhập Khẩu',
    desc: 'Dịch vụ ủy thác XNK toàn diện: tìm nguồn hàng, đàm phán giá, thanh toán quốc tế và xử lý toàn bộ thủ tục pháp lý.',
    items: ['Tìm kiếm nguồn hàng', 'Thanh toán quốc tế', 'Ủy thác xuất khẩu', 'Ủy thác nhập khẩu'],
    link: '/dich-vu#uy-thac',
    color: 'from-accent to-accent-dark',
  },
  {
    icon: <FiFileText size={36} />,
    title: 'Thủ Tục Hải Quan',
    desc: 'Khai báo hải quan điện tử nhanh chóng, chính xác. Tư vấn phân loại hàng hóa, HS Code và tối ưu thuế nhập khẩu hợp pháp.',
    items: ['Khai báo hải quan điện tử', 'Phân loại HS Code', 'Tư vấn thuế XNK', 'Kiểm tra chất lượng hàng'],
    link: '/dich-vu#hai-quan',
    color: 'from-green-600 to-green-800',
  },
];

// ─── PRODUCTS ─────────────────────────────────────────────────────────────────
const PRODUCTS_NHAP = [
  { icon: '⚙️', name: 'Máy Móc & Thiết Bị', desc: 'Máy sản xuất, dây chuyền công nghiệp, thiết bị chuyên dụng' },
  { icon: '🏭', name: 'Nguyên Liệu Sản Xuất', desc: 'Hóa chất, nhựa, kim loại, phụ liệu dệt may' },
  { icon: '🛍️', name: 'Hàng Tiêu Dùng', desc: 'Đồ gia dụng, điện tử, thực phẩm đóng gói' },
  { icon: '🔧', name: 'Phụ Tùng & Linh Kiện', desc: 'Linh kiện điện tử, phụ tùng ô tô, thiết bị điện' },
];

const PRODUCTS_XUAT = [
  { icon: '🎨', name: 'Thủ Công Mỹ Nghệ', desc: 'Đồ gỗ mỹ nghệ, gốm sứ, mây tre đan, sơn mài' },
  { icon: '👔', name: 'Dệt May & Thời Trang', desc: 'Quần áo, vải vóc, phụ liệu may mặc xuất khẩu' },
  { icon: '🌾', name: 'Nông Sản Việt Nam', desc: 'Cà phê, gạo, hạt điều, hải sản, rau quả tươi' },
  { icon: '💆', name: 'Tóc Giả & Lông Mi', desc: 'Tóc thật, tóc giả, lông mi giả xuất sang Mỹ & châu Âu' },
];

// ─── PARTNERS ─────────────────────────────────────────────────────────────────
const PARTNERS = [
  { name: 'Vietnam Airlines', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Vietnam_Airlines_logo.svg/200px-Vietnam_Airlines_logo.svg.png' },
  { name: 'Vietjet', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/VietJet_Air_logo.svg/200px-VietJet_Air_logo.svg.png' },
  { name: 'Emirates', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Emirates_logo.svg/200px-Emirates_logo.svg.png' },
  { name: 'Singapore Airlines', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Singapore_Airlines_logo_2.svg/200px-Singapore_Airlines_logo_2.svg.png' },
  { name: 'Maersk', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Maersk_Logo.svg/200px-Maersk_Logo.svg.png' },
  { name: 'DHL', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/DHL_Logo.svg/200px-DHL_Logo.svg.png' },
];

// ─── WHY US ───────────────────────────────────────────────────────────────────
const WHY_US = [
  { icon: <FiAward />, title: 'Được Cấp Phép Đầy Đủ', desc: 'Giấy phép kinh doanh XNK, đại lý hải quan và đầy đủ chứng nhận hoạt động hợp pháp.' },
  { icon: <FiBarChart2 />, title: 'Tối Ưu Chi Phí', desc: 'Hệ thống đối tác rộng khắp giúp tối ưu cước phí và chi phí dịch vụ cho khách hàng.' },
  { icon: <FiUsers />, title: 'Đội Ngũ Chuyên Nghiệp', desc: 'Hơn 20 chuyên gia có kinh nghiệm trong ngành logistics và xuất nhập khẩu quốc tế.' },
  { icon: <FiGlobe />, title: 'Mạng Lưới Toàn Cầu', desc: 'Thành viên WCA, VLA, JCtrans – kết nối với hàng nghìn đối tác tại hơn 180 quốc gia.' },
  { icon: <FiCheckCircle />, title: 'Uy Tín & Minh Bạch', desc: 'Cam kết minh bạch về giá cả, thời gian giao hàng và tình trạng lô hàng 24/7.' },
  { icon: <FiStar />, title: 'Hỗ Trợ 24/7', desc: 'Đội ngũ chăm sóc khách hàng luôn sẵn sàng hỗ trợ mọi lúc, mọi nơi.' },
];

// ─── TRANSPORT MODES ──────────────────────────────────────────────────────────
const TRANSPORT_MODES = [
  { icon: <MdAirplanemodeActive size={32} />, name: 'Hàng Không', desc: 'Nhanh, an toàn, phù hợp hàng giá trị cao' },
  { icon: <MdDirectionsBoat size={32} />, name: 'Đường Biển', desc: 'Tối ưu chi phí cho hàng khối lượng lớn' },
  { icon: <MdDirectionsBus size={32} />, name: 'Đường Bộ', desc: 'Linh hoạt, phù hợp các tuyến trong khu vực' },
  { icon: <FiPackage size={32} />, name: 'Cửa Khẩu', desc: 'Chuyên tuyến Trung Quốc – Việt Nam' },
];

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function Home() {
  const [news, setNews] = useState([]);
  const [activeProductTab, setActiveProductTab] = useState('nhap');
  const { ref: statsRef, inView: statsInView } = useInView({ triggerOnce: true, threshold: 0.2 });

  useEffect(() => {
    axios.get('/api/news/latest').then(r => setNews(r.data)).catch(() => {});
  }, []);

  const heroSettings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true,
    arrows: false,
    appendDots: dots => (
      <div style={{ bottom: '20px' }}>
        <ul style={{ margin: 0 }}>{dots}</ul>
      </div>
    ),
  };

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative">
        <Slider {...heroSettings}>
          {SLIDES.map((slide, i) => (
            <div key={i} className="hero-slide">
              <div
                className="relative h-[520px] md:h-[620px] lg:h-[680px] bg-cover bg-center"
                style={{ backgroundImage: `url('${slide.bg}')` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/70 to-transparent" />
                <div className="relative z-10 h-full flex items-center">
                  <div className="max-w-7xl mx-auto px-4 w-full">
                    <div className="max-w-2xl text-white">
                      <div className="inline-flex items-center gap-2 bg-accent/20 border border-accent/40 text-accent px-4 py-1.5 rounded-full text-sm font-semibold mb-5">
                        <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                        {slide.tag}
                      </div>
                      <h1 className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight mb-5 whitespace-pre-line">
                        {slide.title}
                      </h1>
                      <p className="text-gray-200 text-base md:text-lg leading-relaxed mb-8">
                        {slide.desc}
                      </p>
                      <div className="flex flex-wrap gap-4">
                        <Link to="/dich-vu" className="btn-primary text-base">
                          Khám Phá Dịch Vụ <FiArrowRight />
                        </Link>
                        <Link to="/lien-he" className="btn-outline text-base">
                          <FiPhone /> Tư Vấn Miễn Phí
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>

        {/* Transport Mode Strip */}
        <div className="bg-white shadow-lg relative z-10">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-100">
              {TRANSPORT_MODES.map((m, i) => (
                <div key={i} className="flex flex-col md:flex-row items-center gap-3 p-4 md:p-6 hover:bg-gray-50 cursor-pointer group">
                  <div className="text-primary group-hover:text-accent transition-colors">{m.icon}</div>
                  <div className="text-center md:text-left">
                    <div className="font-bold text-gray-800 text-sm md:text-base">{m.name}</div>
                    <div className="text-xs text-gray-500 hidden md:block">{m.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT SNIPPET ── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=800&q=80"
                alt="Hoàng Khang Logistics"
                className="rounded-2xl shadow-2xl w-full object-cover h-[420px]"
              />
              <div className="absolute -bottom-6 -right-6 bg-accent text-white rounded-2xl p-6 shadow-xl">
                <div className="text-3xl font-black">5+</div>
                <div className="text-sm font-medium">Năm Kinh Nghiệm</div>
              </div>
              <div className="absolute top-6 -left-6 bg-primary text-white rounded-xl p-4 shadow-xl">
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <FiAward /><span>WCA Member</span>
                </div>
              </div>
            </div>
            <div>
              <div className="text-accent font-semibold text-sm uppercase tracking-wider mb-2">Về Chúng Tôi</div>
              <h2 className="text-3xl md:text-4xl font-black text-primary mb-6 leading-tight">
                Đối Tác Logistics Đáng Tin Cậy Của Doanh Nghiệp Bạn
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Công ty Xuất Nhập Khẩu và Logistics Hoàng Khang được thành lập năm 2021, chuyên cung cấp các giải pháp logistics toàn diện giúp doanh nghiệp Việt Nam tiếp cận thị trường quốc tế một cách hiệu quả và tiết kiệm nhất.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Với đội ngũ hơn 20 chuyên gia giàu kinh nghiệm, Hoàng Khang là thành viên của các mạng lưới logistics quốc tế uy tín như WCA, VLA và JCtrans, đảm bảo kết nối toàn diện tới hơn 50 điểm đến trên thế giới.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  'Vận tải đa phương thức',
                  'Ủy thác XNK chính ngạch',
                  'Thủ tục hải quan nhanh',
                  'Hỗ trợ 24/7',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-gray-700">
                    <FiCheckCircle className="text-accent shrink-0" size={16} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <Link to="/gioi-thieu" className="btn-primary">
                Tìm Hiểu Thêm <FiArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section ref={statsRef} className="py-16 bg-primary">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((s, i) => (
              <div key={i} className="text-center text-white">
                <div className="flex justify-center mb-3 text-accent">{s.icon}</div>
                <div className="text-4xl md:text-5xl font-black mb-2">
                  {statsInView ? (
                    <CountUp end={s.value} duration={2.5} suffix={s.suffix} />
                  ) : '0'}
                </div>
                <div className="text-blue-200 text-sm font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="py-20 bg-white" id="services">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <div className="text-accent font-semibold text-sm uppercase tracking-wider mb-2">Dịch Vụ Của Chúng Tôi</div>
            <h2 className="section-title text-center">Giải Pháp Logistics Toàn Diện</h2>
            <p className="section-subtitle">
              Hoàng Khang cung cấp đầy đủ các dịch vụ xuất nhập khẩu và logistics, giúp doanh nghiệp của bạn tiếp cận thị trường toàn cầu
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SERVICES.map((s, i) => (
              <div key={i} className="service-card card overflow-hidden group">
                <div className={`bg-gradient-to-br ${s.color} p-8 text-white`}>
                  <div className="mb-4">{s.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{s.title}</h3>
                  <p className="text-white/80 text-sm leading-relaxed">{s.desc}</p>
                </div>
                <div className="p-6">
                  <ul className="space-y-2 mb-6">
                    {s.items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
                        <FiCheckCircle className="text-accent shrink-0" size={14} />{item}
                      </li>
                    ))}
                  </ul>
                  <Link to={s.link} className="flex items-center gap-2 text-accent font-semibold text-sm hover:gap-3 transition-all">
                    Xem Chi Tiết <FiArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRODUCTS ── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <div className="text-accent font-semibold text-sm uppercase tracking-wider mb-2">Danh Mục Hàng Hóa</div>
            <h2 className="section-title text-center">Hàng Xuất Nhập Khẩu</h2>
            <p className="section-subtitle">Hoàng Khang có kinh nghiệm xử lý đa dạng loại hàng hóa xuất nhập khẩu</p>
          </div>
          {/* Tabs */}
          <div className="flex justify-center mb-10">
            <div className="bg-white rounded-xl p-1.5 shadow-md inline-flex">
              {[['nhap', 'Hàng Nhập Khẩu'], ['xuat', 'Hàng Xuất Khẩu']].map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setActiveProductTab(key)}
                  className={`px-6 py-2.5 rounded-lg font-semibold text-sm transition-all ${
                    activeProductTab === key
                      ? 'bg-primary text-white shadow-md'
                      : 'text-gray-600 hover:text-primary'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {(activeProductTab === 'nhap' ? PRODUCTS_NHAP : PRODUCTS_XUAT).map((p, i) => (
              <div key={i} className="card p-6 text-center group hover:border-accent border-2 border-transparent transition-all">
                <div className="text-5xl mb-4">{p.icon}</div>
                <h4 className="font-bold text-gray-800 mb-2 group-hover:text-accent transition-colors">{p.name}</h4>
                <p className="text-sm text-gray-500 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/san-pham" className="btn-primary">
              Xem Tất Cả Sản Phẩm <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* ── WHY US ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <div className="text-accent font-semibold text-sm uppercase tracking-wider mb-2">Tại Sao Chọn Chúng Tôi</div>
            <h2 className="section-title text-center">Ưu Điểm Của Hoàng Khang</h2>
            <p className="section-subtitle">6 lý do doanh nghiệp lựa chọn Hoàng Khang là đối tác logistics tin cậy</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {WHY_US.map((item, i) => (
              <div key={i} className="flex gap-4 p-6 rounded-xl hover:bg-gray-50 transition-colors group">
                <div className="w-12 h-12 bg-primary/10 text-primary group-hover:bg-accent group-hover:text-white rounded-xl flex items-center justify-center shrink-0 transition-all text-lg">
                  {item.icon}
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-2 group-hover:text-accent transition-colors">{item.title}</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PARTNERS ── */}
      <section className="py-16 bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <div className="text-accent font-semibold text-sm uppercase tracking-wider mb-2">Đối Tác</div>
            <h2 className="text-2xl font-bold text-primary">Đối Tác Chiến Lược</h2>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-6 items-center">
            {PARTNERS.map((p, i) => (
              <div key={i} className="bg-white rounded-xl p-4 flex items-center justify-center h-20 shadow-sm hover:shadow-md transition-shadow group">
                <img
                  src={p.logo}
                  alt={p.name}
                  className="max-h-10 max-w-full object-contain filter grayscale group-hover:grayscale-0 transition-all opacity-70 group-hover:opacity-100"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentNode.innerHTML = `<span class="text-xs font-bold text-gray-400">${p.name}</span>`;
                  }}
                />
              </div>
            ))}
          </div>
          {/* Memberships */}
          <div className="mt-12 flex flex-wrap justify-center gap-6">
            {['WCA Member', 'VLA Member', 'JCtrans Member'].map((m) => (
              <div key={m} className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-full text-sm font-semibold">
                <FiAward size={14} className="text-accent" />{m}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEWS ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
            <div>
              <div className="text-accent font-semibold text-sm uppercase tracking-wider mb-2">Tin Tức</div>
              <h2 className="section-title mb-0">Tin Tức Logistics Mới Nhất</h2>
            </div>
            <Link to="/tin-tuc" className="mt-4 md:mt-0 flex items-center gap-2 text-accent font-semibold hover:gap-3 transition-all">
              Xem Tất Cả <FiArrowRight />
            </Link>
          </div>

          {news.length === 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1,2,3].map(i => (
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
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {news.map((n) => (
                <Link key={n.id} to={`/tin-tuc/${n.slug}`} className="news-card card group overflow-hidden">
                  <div className="overflow-hidden h-48">
                    <img
                      src={n.hinh_anh}
                      alt={n.tieu_de}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="bg-accent/10 text-accent text-xs font-semibold px-3 py-1 rounded-full">{n.danh_muc}</span>
                      <span className="text-gray-400 text-xs">
                        {new Date(n.created_at).toLocaleDateString('vi-VN')}
                      </span>
                    </div>
                    <h3 className="font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-accent transition-colors leading-snug">
                      {n.tieu_de}
                    </h3>
                    <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">{n.mo_ta}</p>
                    <div className="mt-4 flex items-center gap-2 text-accent text-sm font-semibold">
                      Đọc Thêm <FiChevronRight size={14} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        className="py-20 relative bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=1600&q=80')" }}
      >
        <div className="absolute inset-0 bg-navy/85" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white">
          <div className="text-accent font-semibold text-sm uppercase tracking-wider mb-3">Bắt Đầu Ngay</div>
          <h2 className="text-3xl md:text-4xl font-black mb-5 leading-tight">
            Sẵn Sàng Mở Rộng Thị Trường Xuất Nhập Khẩu?
          </h2>
          <p className="text-gray-300 text-lg mb-10 leading-relaxed">
            Hãy để Hoàng Khang đồng hành cùng doanh nghiệp bạn trên con đường chinh phục thị trường quốc tế. Tư vấn miễn phí – Báo giá nhanh chóng.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/lien-he" className="btn-primary text-base px-8 py-4">
              Nhận Tư Vấn Miễn Phí <FiArrowRight />
            </Link>
            <a href="tel:02466898662" className="btn-outline text-base px-8 py-4">
              <FiPhone /> 024 668 98662
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
