import { Link } from 'react-router-dom';
import { FiArrowRight, FiCheckCircle, FiTarget, FiEye, FiHeart, FiAward } from 'react-icons/fi';
import Breadcrumb from '../components/Breadcrumb';

const TIMELINE = [
  { year: '2021', title: 'Thành Lập Công Ty', desc: 'Công ty Xuất Nhập Khẩu và Logistics Hoàng Khang được thành lập, bắt đầu hoạt động với lĩnh vực vận tải quốc tế và khai báo hải quan.' },
  { year: '2022', title: 'Mở Rộng Dịch Vụ', desc: 'Phát triển thêm mảng ủy thác xuất nhập khẩu toàn phần, tìm kiếm nguồn hàng và thanh toán quốc tế. Tăng quy mô lên 15 nhân sự.' },
  { year: '2023', title: 'Gia Nhập Mạng Lưới Quốc Tế', desc: 'Chính thức gia nhập WCA (World Cargo Alliance), VLA (Hiệp hội Logistics VN) và JCtrans – kết nối với hàng nghìn đối tác tại 180+ quốc gia.' },
  { year: '2024', title: 'Phát Triển Bền Vững', desc: 'Hơn 300 đơn hàng mỗi tháng, phủ sóng 50+ điểm đến toàn cầu. Đội ngũ 20+ chuyên gia. Liên tục nâng cao chất lượng dịch vụ.' },
];

const CORE_VALUES = [
  { icon: <FiCheckCircle size={22} />, title: 'Uy Tín', desc: 'Cam kết minh bạch, trung thực trong mọi giao dịch với khách hàng và đối tác.' },
  { icon: <FiTarget size={22} />, title: 'Chuyên Nghiệp', desc: 'Đội ngũ được đào tạo chuyên sâu, am hiểu pháp luật và quy trình quốc tế.' },
  { icon: <FiHeart size={22} />, title: 'Tận Tâm', desc: 'Đặt lợi ích khách hàng lên hàng đầu, hỗ trợ tận tình và nhanh chóng 24/7.' },
  { icon: <FiAward size={22} />, title: 'Đổi Mới', desc: 'Không ngừng cải tiến quy trình, ứng dụng công nghệ để nâng cao hiệu quả dịch vụ.' },
];

const TEAM = [
  { name: 'Nguyễn Hoàng Khang', role: 'Giám Đốc Điều Hành', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80', desc: '10+ năm kinh nghiệm trong ngành logistics và xuất nhập khẩu quốc tế.' },
  { name: 'Trần Minh Phương', role: 'Giám Đốc Kinh Doanh', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80', desc: 'Chuyên gia phát triển thị trường và quản lý mối quan hệ đối tác quốc tế.' },
  { name: 'Lê Thị Thu Hà', role: 'Trưởng Phòng Hải Quan', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80', desc: '8 năm kinh nghiệm khai báo hải quan, am hiểu Luật Hải quan và biểu thuế XNK.' },
  { name: 'Phạm Văn Đức', role: 'Trưởng Phòng Vận Tải', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80', desc: 'Chuyên gia vận tải đa phương thức, có mạng lưới hãng tàu và hãng bay rộng khắp.' },
];

export default function GioiThieu() {
  return (
    <>
      {/* Page Header */}
      <div className="bg-gradient-to-r from-primary to-navy py-14">
        <div className="max-w-7xl mx-auto px-4">
          <Breadcrumb items={[{ label: 'Giới Thiệu' }]} />
          <h1 className="text-3xl md:text-4xl font-black text-white mt-4">Giới Thiệu Về Hoàng Khang</h1>
          <p className="text-blue-200 mt-2">Công ty Xuất Nhập Khẩu & Logistics hàng đầu tại Hà Nội</p>
        </div>
      </div>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div>
              <div className="text-accent font-semibold text-sm uppercase tracking-wider mb-2">Câu Chuyện Của Chúng Tôi</div>
              <h2 className="text-3xl font-black text-primary mb-6 leading-tight">
                Hoàng Khang – Nơi Kết Nối Doanh Nghiệp Việt Với Thế Giới
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Được thành lập vào năm 2021 tại Hà Nội, Công ty Xuất Nhập Khẩu và Logistics Hoàng Khang ra đời với sứ mệnh trở thành cầu nối tin cậy giữa doanh nghiệp Việt Nam và thị trường quốc tế.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Xuất phát điểm từ một nhóm chuyên gia có nhiều năm kinh nghiệm trong ngành logistics, chúng tôi hiểu rõ những thách thức mà doanh nghiệp Việt Nam phải đối mặt khi bước vào thương trường quốc tế: từ rào cản ngôn ngữ, thủ tục hải quan phức tạp đến việc tìm kiếm đối tác vận tải đáng tin cậy.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Hoàng Khang cung cấp giải pháp toàn diện, giúp doanh nghiệp tập trung vào hoạt động cốt lõi trong khi chúng tôi xử lý toàn bộ quy trình logistics – từ vận chuyển, khai báo hải quan đến ủy thác xuất nhập khẩu.
              </p>
              <div className="grid grid-cols-2 gap-3 mb-8">
                {['MST: 0109843985', 'Thành lập: 2021', 'Hội viên WCA', 'Hội viên VLA', '20+ nhân sự', '50+ điểm đến'].map(item => (
                  <div key={item} className="flex items-center gap-2 text-sm text-gray-700">
                    <FiCheckCircle className="text-accent shrink-0" size={15} />{item}
                  </div>
                ))}
              </div>
              <Link to="/lien-he" className="btn-primary">Liên Hệ Ngay <FiArrowRight /></Link>
            </div>
            <div className="space-y-4">
              <img src="https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=700&q=80" alt="Kho hàng" className="rounded-2xl w-full h-56 object-cover shadow-lg" />
              <div className="grid grid-cols-2 gap-4">
                <img src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&q=80" alt="Container" className="rounded-xl h-44 object-cover shadow-md w-full" />
                <img src="https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=400&q=80" alt="Vận chuyển" className="rounded-xl h-44 object-cover shadow-md w-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-black text-primary mb-4">Tầm Nhìn & Sứ Mệnh</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-md border-t-4 border-primary">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary"><FiEye size={22} /></div>
                <h3 className="text-xl font-bold text-primary">Tầm Nhìn</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Trở thành công ty xuất nhập khẩu và logistics hàng đầu Việt Nam, được tin tưởng bởi hàng nghìn doanh nghiệp trong nước và quốc tế. Xây dựng mạng lưới đối tác trải rộng khắp toàn cầu, đưa hàng hóa Việt Nam vươn xa đến mọi thị trường.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-md border-t-4 border-accent">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-accent"><FiTarget size={22} /></div>
                <h3 className="text-xl font-bold text-primary">Sứ Mệnh</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Cung cấp giải pháp logistics và xuất nhập khẩu toàn diện, chuyên nghiệp và tiết kiệm chi phí nhất cho doanh nghiệp Việt Nam. Tạo ra giá trị bền vững cho khách hàng, đối tác và cộng đồng thông qua dịch vụ đỉnh cao và sự tận tâm không ngừng nghỉ.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <div className="text-accent font-semibold text-sm uppercase tracking-wider mb-2">Giá Trị</div>
            <h2 className="text-3xl font-black text-primary">Giá Trị Cốt Lõi</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {CORE_VALUES.map((v, i) => (
              <div key={i} className="text-center p-8 rounded-2xl border-2 border-gray-100 hover:border-accent hover:shadow-lg transition-all group">
                <div className="w-14 h-14 bg-primary/10 group-hover:bg-accent text-primary group-hover:text-white rounded-2xl flex items-center justify-center mx-auto mb-5 transition-all">
                  {v.icon}
                </div>
                <h4 className="font-bold text-xl text-gray-800 mb-3 group-hover:text-accent transition-colors">{v.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-14">
            <div className="text-accent font-semibold text-sm uppercase tracking-wider mb-2">Lịch Sử</div>
            <h2 className="text-3xl font-black text-primary">Hành Trình Phát Triển</h2>
          </div>
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 transform md:-translate-x-px" />
            {TIMELINE.map((t, i) => (
              <div key={i} className={`relative flex flex-col md:flex-row items-start md:items-center gap-6 mb-12 ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                <div className="w-full md:w-1/2 pl-12 md:pl-0 md:pr-8">
                  <div className={`bg-white rounded-2xl p-6 shadow-md ${i % 2 === 1 ? 'md:ml-8' : 'md:mr-8'}`}>
                    <div className="text-accent font-black text-2xl mb-1">{t.year}</div>
                    <h4 className="font-bold text-primary text-lg mb-2">{t.title}</h4>
                    <p className="text-gray-500 text-sm leading-relaxed">{t.desc}</p>
                  </div>
                </div>
                <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-8 h-8 bg-accent rounded-full border-4 border-white shadow-md flex items-center justify-center">
                  <div className="w-2.5 h-2.5 bg-white rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <div className="text-accent font-semibold text-sm uppercase tracking-wider mb-2">Đội Ngũ</div>
            <h2 className="text-3xl font-black text-primary">Ban Lãnh Đạo</h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">Đội ngũ lãnh đạo giàu kinh nghiệm, nhiệt huyết và tận tâm vì sự phát triển của công ty và khách hàng</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {TEAM.map((m, i) => (
              <div key={i} className="card overflow-hidden group text-center">
                <div className="overflow-hidden h-56">
                  <img src={m.img} alt={m.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5">
                  <h4 className="font-bold text-gray-800 text-base">{m.name}</h4>
                  <div className="text-accent text-sm font-semibold mb-2">{m.role}</div>
                  <p className="text-gray-500 text-xs leading-relaxed">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Memberships */}
      <section className="py-16 bg-primary">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-black text-white mb-3">Thành Viên Các Tổ Chức Quốc Tế</h2>
          <p className="text-blue-200 mb-10">Hoàng Khang là thành viên chính thức của các hiệp hội logistics uy tín trên thế giới</p>
          <div className="flex flex-wrap justify-center gap-6">
            {[
              { name: 'WCA', full: 'World Cargo Alliance', year: '2023' },
              { name: 'VLA', full: 'Vietnam Logistics Business Association', year: '2023' },
              { name: 'JCtrans', full: 'JCtrans Global Logistics Alliance', year: '2024' },
            ].map((org) => (
              <div key={org.name} className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-6 text-white min-w-[200px]">
                <div className="text-3xl font-black text-accent mb-1">{org.name}</div>
                <div className="text-sm text-blue-200">{org.full}</div>
                <div className="text-xs text-blue-300 mt-2">Thành viên từ {org.year}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
