import { Link } from 'react-router-dom';
import { FiArrowRight, FiPhone, FiCheckCircle } from 'react-icons/fi';
import { MdAirplanemodeActive, MdDirectionsBoat, MdDirectionsBus } from 'react-icons/md';
import { FiGlobe, FiFileText, FiTruck, FiDollarSign, FiSearch, FiUser } from 'react-icons/fi';
import Breadcrumb from '../components/Breadcrumb';

const VAN_TAI = [
  {
    icon: <MdAirplanemodeActive size={32} />,
    title: 'Vận Tải Hàng Không',
    desc: 'Dịch vụ vận chuyển hàng không nhanh chóng, an toàn phù hợp cho hàng có giá trị cao, hàng gấp và hàng đặc biệt. Kết nối với hơn 50 hãng hàng không uy tín toàn cầu.',
    features: ['Nhanh và đáng tin cậy', 'Phù hợp hàng giá trị cao', 'Theo dõi lô hàng real-time', 'Thủ tục thông quan ưu tiên'],
    color: 'bg-blue-600',
  },
  {
    icon: <MdDirectionsBoat size={32} />,
    title: 'Vận Tải Đường Biển',
    desc: 'Vận chuyển hàng hóa bằng đường biển FCL (nguyên container) và LCL (hàng lẻ). Tối ưu chi phí cho hàng khối lượng lớn với mạng lưới hãng tàu rộng khắp.',
    features: ['Chi phí tối ưu nhất', 'FCL & LCL linh hoạt', 'Tuyến Á – Âu, Á – Mỹ', 'Theo dõi lịch trình thực'],
    color: 'bg-teal-600',
  },
  {
    icon: <MdDirectionsBus size={32} />,
    title: 'Vận Tải Đường Bộ',
    desc: 'Vận chuyển hàng bộ qua các tuyến trong khu vực Đông Nam Á và Trung Quốc. Linh hoạt, phù hợp với đặc thù từng loại hàng hóa.',
    features: ['Linh hoạt về lịch trình', 'Door-to-door delivery', 'Hàng nguy hiểm có phép', 'Theo dõi GPS trực tiếp'],
    color: 'bg-orange-600',
  },
  {
    icon: <FiTruck size={32} />,
    title: 'Vận Tải Cửa Khẩu',
    desc: 'Chuyên biệt tuyến Việt Nam – Trung Quốc qua các cửa khẩu: Lạng Sơn, Lào Cai, Móng Cái. Dịch vụ chính ngạch và tiểu ngạch theo yêu cầu khách hàng.',
    features: ['Cửa khẩu Lạng Sơn, Lào Cai', 'Xuất chính ngạch nhanh', 'Hỗ trợ thanh toán CNY', 'Kho bãi tại cửa khẩu'],
    color: 'bg-green-700',
  },
];

const UY_THAC = [
  {
    icon: <FiSearch size={24} />,
    title: 'Tìm Kiếm Nguồn Hàng',
    desc: 'Hỗ trợ doanh nghiệp tìm kiếm nhà cung cấp uy tín tại Trung Quốc, Hàn Quốc, Nhật Bản và các quốc gia khác. Đánh giá chất lượng, giá cả và độ tin cậy của nhà cung cấp.',
    steps: ['Nhận yêu cầu và thông số sản phẩm', 'Tìm kiếm và đánh giá nhà cung cấp', 'Lấy mẫu và kiểm tra chất lượng', 'Đàm phán giá và điều kiện giao hàng'],
  },
  {
    icon: <FiDollarSign size={24} />,
    title: 'Thanh Toán Quốc Tế',
    desc: 'Hỗ trợ thanh toán quốc tế cho doanh nghiệp chưa có tài khoản ngoại tệ hoặc chưa đủ điều kiện mở L/C. Đảm bảo an toàn và tuân thủ quy định ngân hàng.',
    steps: ['Tư vấn phương thức thanh toán phù hợp', 'Mở và xử lý L/C, T/T, D/P', 'Kiểm tra chứng từ thanh toán', 'Xử lý tranh chấp thanh toán nếu có'],
  },
  {
    icon: <FiGlobe size={24} />,
    title: 'Ủy Thác Nhập Khẩu Toàn Phần',
    desc: 'Thực hiện toàn bộ quy trình nhập khẩu thay cho doanh nghiệp: từ ký hợp đồng, vận chuyển, hải quan đến giao hàng tại kho của khách hàng.',
    steps: ['Ký hợp đồng ủy thác', 'Thực hiện ký hợp đồng mua bán', 'Vận chuyển và thủ tục hải quan', 'Giao hàng tại kho khách hàng'],
  },
  {
    icon: <FiUser size={24} />,
    title: 'Ủy Thác Xuất Khẩu Toàn Phần',
    desc: 'Đại diện doanh nghiệp xuất khẩu hàng hóa ra nước ngoài: từ tìm kiếm khách hàng, đàm phán hợp đồng, vận chuyển đến thu tiền hàng.',
    steps: ['Tư vấn thị trường xuất khẩu', 'Chuẩn bị chứng từ và bao bì', 'Làm thủ tục xuất khẩu', 'Thu tiền hàng và báo cáo'],
  },
];

const HAI_QUAN = [
  { title: 'Khai Báo Hải Quan Điện Tử', desc: 'Thực hiện khai báo hải quan trên hệ thống VNACCS/VCIS nhanh chóng, chính xác, giảm thiểu thời gian thông quan.' },
  { title: 'Phân Loại Mã HS Code', desc: 'Tư vấn phân loại hàng hóa theo HS Code chính xác, tối ưu thuế nhập khẩu trong khuôn khổ pháp luật.' },
  { title: 'Kiểm Tra Trước Thông Quan', desc: 'Kiểm tra toàn bộ hồ sơ, chứng từ trước khi khai báo, đảm bảo thông quan lần đầu thành công.' },
  { title: 'Xử Lý Hàng Ách Tắc', desc: 'Hỗ trợ xử lý lô hàng bị giữ, vướng mắc hải quan. Đại diện làm việc với cơ quan hải quan khi cần.' },
  { title: 'Tư Vấn Chính Sách Thuế', desc: 'Tư vấn áp dụng thuế ưu đãi FTA (AFTA, VKFTA, EVFTA, RCEP) để tiết kiệm chi phí nhập khẩu.' },
  { title: 'Giám Định Hàng Hóa', desc: 'Phối hợp với các cơ quan kiểm định, kiểm dịch động thực vật, an toàn thực phẩm khi hàng cần kiểm tra chuyên ngành.' },
];

export default function DichVu() {
  return (
    <>
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-navy py-14">
        <div className="max-w-7xl mx-auto px-4">
          <Breadcrumb items={[{ label: 'Dịch Vụ' }]} />
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mt-3">Dịch Vụ Của Chúng Tôi</h1>
          <p className="text-blue-200 mt-2">Giải pháp logistics và xuất nhập khẩu toàn diện</p>
        </div>
      </div>

      {/* Service 1: Vận Tải */}
      <section id="van-tai" className="py-12 md:py-20 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <div className="text-accent font-semibold text-sm uppercase tracking-wider mb-2">Dịch Vụ 01</div>
            <h2 className="text-3xl font-black text-primary mb-4">Vận Tải Quốc Tế</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Hệ thống vận tải đa phương thức, kết nối Việt Nam với hơn 50 điểm đến trên thế giới với chi phí tối ưu và độ tin cậy cao
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {VAN_TAI.map((s, i) => (
              <div key={i} className="service-card card overflow-hidden">
                <div className={`${s.color} p-6 text-white`}>
                  <div className="mb-3">{s.icon}</div>
                  <h3 className="font-bold text-lg">{s.title}</h3>
                </div>
                <div className="p-6">
                  <p className="text-sm text-gray-500 leading-relaxed mb-4">{s.desc}</p>
                  <ul className="space-y-1.5">
                    {s.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-xs text-gray-600">
                        <FiCheckCircle className="text-accent shrink-0" size={12} />{f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service 2: Ủy Thác */}
      <section id="uy-thac" className="py-12 md:py-20 bg-gray-50 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <div className="text-accent font-semibold text-sm uppercase tracking-wider mb-2">Dịch Vụ 02</div>
            <h2 className="text-3xl font-black text-primary mb-4">Ủy Thác Xuất Nhập Khẩu</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Dịch vụ ủy thác XNK trọn gói – doanh nghiệp chỉ cần nêu nhu cầu, Hoàng Khang thực hiện toàn bộ quy trình còn lại
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {UY_THAC.map((s, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-shadow group">
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 bg-primary/10 text-primary group-hover:bg-accent group-hover:text-white rounded-xl flex items-center justify-center shrink-0 transition-all">
                    {s.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-primary text-lg mb-2 group-hover:text-accent transition-colors">{s.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed mb-4">{s.desc}</p>
                    <div>
                      <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Quy trình:</span>
                      <ol className="mt-2 space-y-1">
                        {s.steps.map((step, si) => (
                          <li key={si} className="flex items-center gap-2 text-xs text-gray-600">
                            <span className="w-4 h-4 rounded-full bg-accent/20 text-accent font-bold text-[10px] flex items-center justify-center shrink-0">{si + 1}</span>
                            {step}
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service 3: Hải Quan */}
      <section id="hai-quan" className="py-12 md:py-20 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-accent font-semibold text-sm uppercase tracking-wider mb-2">Dịch Vụ 03</div>
              <h2 className="text-3xl font-black text-primary mb-5">Thủ Tục Hải Quan</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Với đội ngũ chuyên gia hải quan giàu kinh nghiệm, am hiểu đầy đủ pháp luật hải quan và chính sách thuế XNK, Hoàng Khang đảm bảo thủ tục thông quan nhanh chóng, chính xác và tiết kiệm chi phí nhất cho khách hàng.
              </p>
              <div className="space-y-4">
                {HAI_QUAN.map((h, i) => (
                  <div key={i} className="flex gap-4 p-4 rounded-xl border border-gray-100 hover:border-accent hover:shadow-sm transition-all group">
                    <div className="w-8 h-8 bg-accent/10 text-accent rounded-lg flex items-center justify-center font-bold text-sm shrink-0 group-hover:bg-accent group-hover:text-white transition-all">
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 text-sm mb-1">{h.title}</h4>
                      <p className="text-xs text-gray-500 leading-relaxed">{h.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <img src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=700&q=80" alt="Hải quan" className="rounded-2xl w-full h-60 object-cover shadow-xl" />
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-primary rounded-2xl p-6 text-white text-center">
                  <div className="text-3xl font-black text-accent mb-1">100%</div>
                  <div className="text-sm text-blue-200">Thông quan thành công</div>
                </div>
                <div className="bg-accent rounded-2xl p-6 text-white text-center">
                  <div className="text-3xl font-black mb-1">24h</div>
                  <div className="text-sm text-orange-100">Thời gian thông quan TB</div>
                </div>
              </div>
              <div className="bg-gray-50 rounded-2xl p-6">
                <h4 className="font-bold text-primary mb-3">Các FTA áp dụng</h4>
                <div className="flex flex-wrap gap-2">
                  {['AFTA', 'VKFTA', 'VJEPA', 'EVFTA', 'RCEP', 'CPTPP', 'UKVFTA'].map(fta => (
                    <span key={fta} className="bg-white text-primary text-xs px-3 py-1 rounded-full border border-primary/20 font-semibold">{fta}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Price Note */}
      <section className="py-10 md:py-16 bg-gray-50 border-y border-gray-200">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-white rounded-2xl p-10 shadow-md">
            <FiFileText size={40} className="text-accent mx-auto mb-4" />
            <h2 className="text-2xl font-black text-primary mb-4">Báo Giá Nhanh & Minh Bạch</h2>
            <p className="text-gray-600 mb-2">
              Cước phí dịch vụ thay đổi theo từng lô hàng (khối lượng, tuyến đường, loại hàng, thời điểm). Hoàng Khang cam kết báo giá <strong>minh bạch, không phát sinh chi phí ẩn</strong>.
            </p>
            <p className="text-gray-600 mb-8">Liên hệ ngay để được tư vấn và báo giá trong vòng <strong className="text-accent">30 phút</strong>.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/lien-he" className="btn-primary">Yêu Cầu Báo Giá <FiArrowRight /></Link>
              <a href="tel:02466898662" className="btn-primary bg-green-600 hover:bg-green-700">
                <FiPhone /> 024 668 98662
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
