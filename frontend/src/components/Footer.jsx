import { Link } from 'react-router-dom';
import { FiPhone, FiMail, FiMapPin, FiClock } from 'react-icons/fi';
import { FaFacebookF, FaLinkedinIn, FaYoutube } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center text-white font-black text-lg">HK</div>
              <div>
                <div className="font-black text-lg leading-tight">HOÀNG KHANG</div>
                <div className="text-accent text-xs font-medium">XNK & LOGISTICS</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-5">
              Công ty Xuất Nhập Khẩu và Logistics Hoàng Khang – đối tác tin cậy cho mọi nhu cầu vận tải và thương mại quốc tế của doanh nghiệp bạn.
            </p>
            <p className="text-gray-400 text-sm mb-2"><span className="text-gray-300">MST:</span> 0109843985</p>
            <div className="flex items-center gap-3 mt-4">
              <a href="#" className="w-9 h-9 bg-white/10 hover:bg-accent rounded-full flex items-center justify-center transition-colors"><FaFacebookF size={14} /></a>
              <a href="#" className="w-9 h-9 bg-white/10 hover:bg-accent rounded-full flex items-center justify-center transition-colors"><FaLinkedinIn size={14} /></a>
              <a href="#" className="w-9 h-9 bg-white/10 hover:bg-accent rounded-full flex items-center justify-center transition-colors"><FaYoutube size={14} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-base mb-5 pb-2 border-b border-white/20">Liên Kết Nhanh</h4>
            <ul className="space-y-2.5">
              {[
                ['Trang Chủ', '/'],
                ['Giới Thiệu', '/gioi-thieu'],
                ['Sản Phẩm', '/san-pham'],
                ['Dịch Vụ', '/dich-vu'],
                ['Tin Tức Logistics', '/tin-tuc'],
                ['Tuyển Dụng', '/tuyen-dung'],
                ['Liên Hệ', '/lien-he'],
              ].map(([label, path]) => (
                <li key={label}>
                  <Link to={path} className="text-gray-400 hover:text-accent text-sm transition-colors flex items-center gap-2">
                    <span className="text-accent">›</span>{label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-base mb-5 pb-2 border-b border-white/20">Dịch Vụ</h4>
            <ul className="space-y-2.5">
              {[
                'Vận Tải Hàng Không',
                'Vận Tải Đường Biển',
                'Vận Tải Đường Bộ',
                'Vận Tải Cửa Khẩu',
                'Ủy Thác Xuất Nhập Khẩu',
                'Khai Báo Hải Quan',
                'Tìm Nguồn Hàng',
                'Thanh Toán Quốc Tế',
              ].map((s) => (
                <li key={s}>
                  <Link to="/dich-vu" className="text-gray-400 hover:text-accent text-sm transition-colors flex items-center gap-2">
                    <span className="text-accent">›</span>{s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-base mb-5 pb-2 border-b border-white/20">Thông Tin Liên Hệ</h4>
            <ul className="space-y-4">
              <li className="flex gap-3 text-sm">
                <FiMapPin className="text-accent mt-0.5 shrink-0" size={15} />
                <div className="text-gray-400">
                  <p className="font-medium text-gray-300 mb-1">Trụ sở chính:</p>
                  Tầng 4 tòa nhà Sannam, Số 78 Phố Duy Tân, Q. Cầu Giấy, Hà Nội
                </div>
              </li>
              <li className="flex gap-3 text-sm">
                <FiMapPin className="text-accent mt-0.5 shrink-0" size={15} />
                <div className="text-gray-400">
                  <p className="font-medium text-gray-300 mb-1">Văn phòng giao dịch:</p>
                  Số 11 TT16 đường Foresa 8, KĐT Xuân Phương, Q. Nam Từ Liêm, Hà Nội
                </div>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <FiPhone className="text-accent shrink-0" size={15} />
                <a href="tel:02466898662" className="text-gray-400 hover:text-accent transition-colors">024 668 98662</a>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <FiMail className="text-accent shrink-0" size={15} />
                <a href="mailto:info@hoangkhanglogs.com" className="text-gray-400 hover:text-accent transition-colors">info@hoangkhanglogs.com</a>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <FiClock className="text-accent shrink-0" size={15} />
                <span className="text-gray-400">Thứ 2 – Thứ 6: 8:00 – 17:30<br/>Thứ 7: 8:00 – 12:00</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col md:flex-row justify-between items-center gap-3 text-sm text-gray-500">
          <p>© 2024 Hoàng Khang XNK & Logistics. All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <Link to="/lien-he" className="hover:text-accent transition-colors">Chính Sách Bảo Mật</Link>
            <span>|</span>
            <Link to="/lien-he" className="hover:text-accent transition-colors">Điều Khoản Sử Dụng</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
