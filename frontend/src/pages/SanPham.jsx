import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiPackage, FiPhone } from 'react-icons/fi';
import Breadcrumb from '../components/Breadcrumb';

const PRODUCTS_NHAP = [
  {
    emoji: '⚙️',
    name: 'Máy Móc & Thiết Bị Công Nghiệp',
    items: ['Máy sản xuất', 'Dây chuyền tự động', 'Thiết bị nâng hạ', 'Máy móc xây dựng', 'Thiết bị y tế', 'Máy nông nghiệp'],
    img: 'https://images.unsplash.com/photo-1533073526757-2c8ca1df9f1c?w=600&q=80',
    desc: 'Nhập khẩu toàn bộ máy móc, thiết bị công nghiệp từ Trung Quốc, Hàn Quốc, Nhật Bản và châu Âu. Chúng tôi hỗ trợ từ khâu tìm nguồn hàng, đàm phán giá đến thông quan và vận chuyển đến nhà máy.',
    origin: ['Trung Quốc', 'Hàn Quốc', 'Nhật Bản', 'Đức', 'Đài Loan'],
  },
  {
    emoji: '🏭',
    name: 'Nguyên Liệu Sản Xuất',
    items: ['Hóa chất công nghiệp', 'Nguyên liệu nhựa', 'Kim loại & thép', 'Phụ liệu dệt may', 'Bao bì đóng gói', 'Phân bón & thuốc BVTV'],
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    desc: 'Cung cấp đa dạng nguyên liệu đầu vào cho các ngành sản xuất trong nước. Nguồn hàng ổn định, giá cạnh tranh, chất lượng đảm bảo theo tiêu chuẩn quốc tế.',
    origin: ['Trung Quốc', 'Ấn Độ', 'Thái Lan', 'Malaysia'],
  },
  {
    emoji: '🛍️',
    name: 'Hàng Tiêu Dùng & Gia Dụng',
    items: ['Đồ điện gia dụng', 'Đồ nội thất', 'Đồ chơi trẻ em', 'Mỹ phẩm', 'Thực phẩm đóng gói', 'Dụng cụ nhà bếp'],
    img: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=600&q=80',
    desc: 'Nhập khẩu hàng tiêu dùng cho thị trường nội địa Việt Nam. Đảm bảo tuân thủ đầy đủ quy định về kiểm tra chất lượng, nhãn hiệu và công bố sản phẩm.',
    origin: ['Trung Quốc', 'Hàn Quốc', 'Nhật Bản', 'Thái Lan'],
  },
  {
    emoji: '🔧',
    name: 'Phụ Tùng & Linh Kiện',
    items: ['Linh kiện điện tử', 'Phụ tùng ô tô & xe máy', 'Thiết bị điện', 'Linh kiện máy móc', 'Phụ kiện điện thoại', 'Thiết bị viễn thông'],
    img: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&q=80',
    desc: 'Nhập khẩu phụ tùng, linh kiện phục vụ ngành sản xuất và sửa chữa trong nước. Đảm bảo chứng từ xuất xứ rõ ràng, tuân thủ quy định sở hữu trí tuệ.',
    origin: ['Trung Quốc', 'Nhật Bản', 'Hàn Quốc', 'Đài Loan', 'Đức'],
  },
  {
    emoji: '🌿',
    name: 'Thực Phẩm & Nông Sản Nhập Khẩu',
    items: ['Trái cây nhập khẩu', 'Thực phẩm chế biến', 'Đồ uống & rượu', 'Gia vị & hương liệu', 'Hạt khô & bánh kẹo', 'Sản phẩm sữa'],
    img: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600&q=80',
    desc: 'Nhập khẩu thực phẩm, đồ uống và nông sản đạt tiêu chuẩn an toàn thực phẩm. Hỗ trợ kiểm dịch, kiểm tra vệ sinh an toàn thực phẩm và đăng ký lưu hành.',
    origin: ['Mỹ', 'Úc', 'New Zealand', 'Thái Lan', 'Pháp', 'Ý'],
  },
  {
    emoji: '💊',
    name: 'Thiết Bị Y Tế & Dược Phẩm',
    items: ['Thiết bị chẩn đoán', 'Dụng cụ phẫu thuật', 'Vật tư tiêu hao', 'Thiết bị phòng thí nghiệm', 'Bảo hộ y tế', 'Thực phẩm chức năng'],
    img: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80',
    desc: 'Nhập khẩu thiết bị y tế và dược phẩm đạt chuẩn quốc tế. Hỗ trợ đầy đủ thủ tục cấp phép lưu hành, kiểm định chất lượng và khai báo hải quan chuyên dụng.',
    origin: ['Đức', 'Mỹ', 'Nhật Bản', 'Hàn Quốc', 'Trung Quốc'],
  },
];

const PRODUCTS_XUAT = [
  {
    emoji: '🎨',
    name: 'Thủ Công Mỹ Nghệ',
    items: ['Đồ gỗ mỹ nghệ', 'Gốm sứ Bát Tràng', 'Mây tre đan', 'Sơn mài', 'Hàng thêu tay', 'Đồ trang trí nội thất'],
    img: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&q=80',
    desc: 'Xuất khẩu hàng thủ công mỹ nghệ Việt Nam sang châu Âu, Mỹ và Nhật Bản. Hỗ trợ chuẩn hóa sản phẩm theo yêu cầu thị trường nhập khẩu.',
    markets: ['EU', 'Mỹ', 'Nhật Bản', 'Úc', 'Canada'],
  },
  {
    emoji: '👔',
    name: 'Dệt May & Thời Trang',
    items: ['Quần áo may sẵn', 'Vải các loại', 'Phụ liệu may mặc', 'Đồ lót & đồ ngủ', 'Đồng phục', 'Đồ thể thao'],
    img: 'https://images.unsplash.com/photo-1558171813-2daf2d9cd6e2?w=600&q=80',
    desc: 'Ngành dệt may là một trong những mũi nhọn xuất khẩu của Việt Nam. Hoàng Khang hỗ trợ xuất khẩu dệt may với đầy đủ chứng từ CO, kiểm tra chất lượng và tối ưu thuế FTA.',
    markets: ['EU', 'Mỹ', 'Nhật Bản', 'Hàn Quốc', 'Canada'],
  },
  {
    emoji: '🌾',
    name: 'Nông Sản Việt Nam',
    items: ['Cà phê Robusta/Arabica', 'Gạo thơm ST25', 'Hạt điều', 'Hồ tiêu', 'Cao su', 'Rau quả tươi & đông lạnh'],
    img: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=600&q=80',
    desc: 'Việt Nam là một trong những nước xuất khẩu nông sản lớn nhất thế giới. Hoàng Khang có kinh nghiệm xuất khẩu đa dạng nông sản sang nhiều thị trường với đầy đủ chứng nhận chất lượng.',
    markets: ['Trung Quốc', 'EU', 'Mỹ', 'Trung Đông', 'ASEAN'],
  },
  {
    emoji: '💆',
    name: 'Tóc Giả & Lông Mi',
    items: ['Tóc thật nguyên liệu', 'Tóc giả các loại', 'Lông mi giả', 'Phụ kiện tóc', 'Tóc giá gia công', 'Sản phẩm làm tóc'],
    img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80',
    desc: 'Tóc giả và lông mi là mặt hàng xuất khẩu đặc thù của Việt Nam, được ưa chuộng tại thị trường Mỹ và châu Âu. Hoàng Khang có chuyên môn cao trong việc xuất khẩu mặt hàng này.',
    markets: ['Mỹ', 'EU', 'Nigeria', 'South Africa', 'Brazil'],
  },
  {
    emoji: '🐟',
    name: 'Thủy Sản Xuất Khẩu',
    items: ['Tôm đông lạnh', 'Cá tra/basa', 'Mực & bạch tuộc', 'Cua & tôm hùm', 'Cá ngừ', 'Thủy sản chế biến'],
    img: 'https://images.unsplash.com/photo-1559583985-c80d8ad9b29f?w=600&q=80',
    desc: 'Thủy sản Việt Nam đạt tiêu chuẩn xuất khẩu châu Âu và Mỹ. Chúng tôi hỗ trợ toàn bộ thủ tục kiểm dịch, chứng nhận vệ sinh an toàn thực phẩm và xuất khẩu nhanh chóng.',
    markets: ['EU', 'Nhật Bản', 'Mỹ', 'Hàn Quốc', 'Trung Quốc'],
  },
  {
    emoji: '🪵',
    name: 'Gỗ & Sản Phẩm Gỗ',
    items: ['Đồ nội thất gỗ', 'Ván sàn gỗ', 'Gỗ xây dựng', 'Đồ trang trí gỗ', 'Pallet gỗ', 'Gỗ nguyên liệu'],
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    desc: 'Xuất khẩu đồ gỗ và sản phẩm gỗ với đầy đủ chứng nhận nguồn gốc hợp pháp (FLEGT, FSC). Đảm bảo tuân thủ quy định EUDR và pháp luật nước nhập khẩu.',
    markets: ['EU', 'Mỹ', 'Nhật Bản', 'Úc', 'Hàn Quốc'],
  },
];

export default function SanPham() {
  const [tab, setTab] = useState('nhap');
  const [selected, setSelected] = useState(null);
  const products = tab === 'nhap' ? PRODUCTS_NHAP : PRODUCTS_XUAT;

  return (
    <>
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-navy py-14">
        <div className="max-w-7xl mx-auto px-4">
          <Breadcrumb items={[{ label: 'Sản Phẩm' }]} />
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mt-3">Danh Mục Hàng Hóa</h1>
          <p className="text-blue-200 mt-2">Hoàng Khang xử lý đa dạng hàng hóa xuất nhập khẩu</p>
        </div>
      </div>

      <section className="py-10 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          {/* Tabs */}
          <div className="flex flex-col sm:flex-row items-center justify-between mb-12 gap-6">
            <div>
              <h2 className="text-2xl font-black text-primary">Hàng Hóa Xuất Nhập Khẩu</h2>
              <p className="text-gray-500 text-sm mt-1">Chọn danh mục để xem chi tiết</p>
            </div>
            <div className="bg-gray-100 rounded-xl p-1.5 inline-flex">
              {[['nhap', '📦 Hàng Nhập Khẩu'], ['xuat', '🚢 Hàng Xuất Khẩu']].map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => { setTab(key); setSelected(null); }}
                  className={`px-5 py-2.5 rounded-lg font-semibold text-sm transition-all ${
                    tab === key ? 'bg-primary text-white shadow-md' : 'text-gray-600 hover:text-primary'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((p, i) => (
              <div
                key={i}
                className={`card overflow-hidden cursor-pointer group transition-all duration-300 ${selected === i ? 'ring-2 ring-accent' : ''}`}
                onClick={() => setSelected(selected === i ? null : i)}
              >
                <div className="overflow-hidden h-48 relative">
                  <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-3 left-3 text-3xl">{p.emoji}</div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-gray-800 text-lg mb-3 group-hover:text-accent transition-colors">{p.name}</h3>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {p.items.slice(0, 4).map((item) => (
                      <span key={item} className="bg-primary/10 text-primary text-xs px-2.5 py-1 rounded-full font-medium">{item}</span>
                    ))}
                    {p.items.length > 4 && (
                      <span className="bg-gray-100 text-gray-500 text-xs px-2.5 py-1 rounded-full">+{p.items.length - 4}</span>
                    )}
                  </div>

                  {selected === i && (
                    <div className="border-t border-gray-100 pt-4 mt-2 animate-fadeIn">
                      <p className="text-sm text-gray-600 leading-relaxed mb-4">{p.desc}</p>
                      <div className="mb-4">
                        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                          {tab === 'nhap' ? 'Quốc gia nhập khẩu:' : 'Thị trường xuất khẩu:'}
                        </span>
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {(p.origin || p.markets).map((m) => (
                            <span key={m} className="bg-accent/10 text-accent text-xs px-2.5 py-1 rounded-full font-medium">{m}</span>
                          ))}
                        </div>
                      </div>
                      <Link to="/lien-he" className="flex items-center gap-2 text-accent font-semibold text-sm hover:gap-3 transition-all">
                        Yêu Cầu Báo Giá <FiArrowRight size={14} />
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-black text-primary">Quy Trình Làm Việc Của Chúng Tôi</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Tiếp Nhận Yêu Cầu', desc: 'Khách hàng liên hệ, mô tả nhu cầu hàng hóa và yêu cầu cụ thể' },
              { step: '02', title: 'Tư Vấn & Báo Giá', desc: 'Đội ngũ chuyên gia tư vấn, nghiên cứu nguồn hàng và báo giá chi tiết' },
              { step: '03', title: 'Thực Hiện Dịch Vụ', desc: 'Tiến hành tìm nguồn hàng, vận chuyển và làm thủ tục hải quan' },
              { step: '04', title: 'Giao Hàng & Hậu Mãi', desc: 'Giao hàng đúng tiến độ, thanh toán và hỗ trợ sau dịch vụ' },
            ].map((s, i) => (
              <div key={i} className="relative text-center p-6 bg-white rounded-2xl shadow-sm">
                <div className="w-14 h-14 bg-accent text-white rounded-2xl flex items-center justify-center text-xl font-black mx-auto mb-4">
                  {s.step}
                </div>
                <h4 className="font-bold text-primary mb-2">{s.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
                {i < 3 && (
                  <div className="hidden md:block absolute top-14 -right-3 text-gray-300 text-2xl">›</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-10 md:py-16 bg-primary">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <FiPackage size={40} className="text-accent mx-auto mb-4" />
          <h2 className="text-2xl md:text-3xl font-black mb-4">Không Tìm Thấy Sản Phẩm Bạn Cần?</h2>
          <p className="text-blue-200 mb-8">Liên hệ với chúng tôi – Hoàng Khang có thể xử lý hầu hết các loại hàng hóa xuất nhập khẩu theo yêu cầu của bạn</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/lien-he" className="btn-primary">Yêu Cầu Tư Vấn <FiArrowRight /></Link>
            <a href="tel:02466898662" className="btn-outline"><FiPhone /> 024 668 98662</a>
          </div>
        </div>
      </section>
    </>
  );
}
