const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

const dataDir = path.join(__dirname, '..', 'data');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

const db = new Database(path.join(dataDir, 'hoangkhang.db'));

db.exec(`
  CREATE TABLE IF NOT EXISTS admins (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ho_ten TEXT NOT NULL,
    email TEXT NOT NULL,
    dien_thoai TEXT,
    cong_ty TEXT,
    dich_vu TEXT,
    noi_dung TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS news (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tieu_de TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    mo_ta TEXT,
    noi_dung TEXT,
    hinh_anh TEXT,
    danh_muc TEXT,
    tac_gia TEXT DEFAULT 'Admin',
    luot_xem INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS jobs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    vi_tri TEXT NOT NULL,
    phong_ban TEXT,
    dia_diem TEXT DEFAULT 'Hà Nội',
    loai_hinh TEXT DEFAULT 'Toàn thời gian',
    muc_luong TEXT,
    so_luong INTEGER DEFAULT 1,
    mo_ta TEXT,
    yeu_cau TEXT,
    quyen_loi TEXT,
    han_nop TEXT,
    trang_thai INTEGER DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS job_applications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    job_id INTEGER,
    ho_ten TEXT NOT NULL,
    email TEXT NOT NULL,
    dien_thoai TEXT,
    vi_tri TEXT,
    gioi_thieu TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (job_id) REFERENCES jobs(id)
  );
`);

// Seed admin
const crypto = require('crypto');
const sha256 = (s) => crypto.createHash('sha256').update(s).digest('hex');
const adminCount = db.prepare('SELECT COUNT(*) as c FROM admins').get().c;
if (adminCount === 0) {
  db.prepare('INSERT INTO admins (username, password_hash) VALUES (?, ?)').run('admin', sha256('admin123'));
}

// Seed news
const newsCount = db.prepare('SELECT COUNT(*) as c FROM news').get().c;
if (newsCount === 0) {
  const insertNews = db.prepare(`
    INSERT INTO news (tieu_de, slug, mo_ta, noi_dung, hinh_anh, danh_muc, tac_gia, luot_xem, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const newsData = [
    {
      tieu_de: 'Hoàng Khang chính thức gia nhập mạng lưới WCA – World Cargo Alliance',
      slug: 'hoang-khang-gia-nhap-wca-world-cargo-alliance',
      mo_ta: 'Hoàng Khang tự hào thông báo đã chính thức trở thành thành viên của WCA – World Cargo Alliance, một trong những mạng lưới giao nhận hàng hóa lớn nhất thế giới.',
      noi_dung: `<p>Công ty Xuất Nhập Khẩu và Logistics Hoàng Khang vừa chính thức được kết nạp vào mạng lưới WCA (World Cargo Alliance) – một trong những liên minh giao nhận hàng hóa quốc tế lớn và uy tín nhất thế giới hiện nay.</p>
<p>WCA đặt ra các tiêu chí đánh giá nghiêm ngặt đối với các thành viên, bao gồm: năng lực tài chính, kinh nghiệm hoạt động, hệ thống quản lý chất lượng, và cam kết dịch vụ khách hàng. Việc Hoàng Khang được chấp thuận gia nhập WCA là minh chứng rõ ràng cho năng lực và uy tín của công ty trên thị trường logistics quốc tế.</p>
<p>Thông qua mạng lưới WCA với hơn 10.000 thành viên tại hơn 180 quốc gia, Hoàng Khang có thể cung cấp cho khách hàng những giải pháp vận tải quốc tế toàn diện hơn, với chi phí tối ưu và độ tin cậy cao hơn.</p>
<p><strong>Ban Giám đốc Hoàng Khang</strong> chia sẻ: "Đây là bước tiến quan trọng trong chiến lược phát triển của công ty. Chúng tôi cam kết mang đến cho khách hàng những dịch vụ logistics chất lượng cao, kết nối với mạng lưới đối tác toàn cầu đáng tin cậy."</p>`,
      hinh_anh: 'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=800&q=80',
      danh_muc: 'Tin công ty',
      tac_gia: 'Admin',
      luot_xem: 342,
      created_at: '2024-03-15 08:30:00'
    },
    {
      tieu_de: 'Hoàng Khang gia nhập VLA – Hiệp hội Doanh nghiệp Logistics Việt Nam',
      slug: 'hoang-khang-gia-nhap-vla-hiep-hoi-logistics',
      mo_ta: 'Công ty Hoàng Khang vừa chính thức trở thành thành viên của VLA (Vietnam Logistics Business Association) – Hiệp hội Doanh nghiệp Logistics Việt Nam.',
      noi_dung: `<p>Công ty Xuất Nhập Khẩu và Logistics Hoàng Khang vừa chính thức được kết nạp vào VLA – Hiệp hội Doanh nghiệp Logistics Việt Nam, tổ chức được thành lập từ năm 1993 và là đại diện cho cộng đồng doanh nghiệp logistics trong nước.</p>
<p>VLA hiện có hơn 400 doanh nghiệp thành viên, hoạt động trong các lĩnh vực: giao nhận vận tải, kho bãi, hải quan, vận tải đường bộ, đường thủy và hàng không. Tư cách thành viên VLA mang lại cho Hoàng Khang nhiều cơ hội kết nối với các đối tác trong ngành và cập nhật các chính sách logistics mới nhất của Nhà nước.</p>
<p>Việc gia nhập VLA cũng thể hiện cam kết của Hoàng Khang trong việc tuân thủ các quy định pháp luật, nâng cao năng lực cạnh tranh và góp phần phát triển ngành logistics Việt Nam.</p>`,
      hinh_anh: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80',
      danh_muc: 'Tin công ty',
      tac_gia: 'Admin',
      luot_xem: 215,
      created_at: '2024-02-20 09:00:00'
    },
    {
      tieu_de: 'Thị trường vận tải biển toàn cầu đối mặt với những thách thức mới',
      slug: 'thi-truong-van-tai-bien-toan-cau-doi-mat-thach-thuc',
      mo_ta: 'Trong bối cảnh tình hình địa chính trị thế giới phức tạp, thị trường vận tải biển toàn cầu đang chứng kiến nhiều biến động lớn ảnh hưởng đến chuỗi cung ứng.',
      noi_dung: `<p>Năm 2024 đánh dấu nhiều thách thức lớn với ngành vận tải biển toàn cầu. Từ cuộc xung đột ở Trung Đông ảnh hưởng đến tuyến hàng hải qua Biển Đỏ, cho đến những bất ổn địa chính trị tại nhiều khu vực khác trên thế giới.</p>
<p><strong>Tuyến Biển Đỏ bị gián đoạn:</strong> Nhiều hãng tàu lớn phải chuyển hướng qua Mũi Hảo Vọng (Cape of Good Hope) thay vì đi qua kênh đào Suez, khiến thời gian vận chuyển tăng từ 7-14 ngày và chi phí logistic tăng đáng kể.</p>
<p><strong>Giá cước tăng cao:</strong> Cước vận tải container tuyến châu Á – châu Âu đã tăng mạnh trong những tháng đầu năm 2024, tạo áp lực lớn cho các doanh nghiệp xuất nhập khẩu.</p>
<p><strong>Khuyến nghị của Hoàng Khang:</strong> Doanh nghiệp nên lên kế hoạch đặt chỗ sớm, lựa chọn các hãng tàu đáng tin cậy, và cân nhắc phương án vận tải đa phương thức để tối ưu chi phí trong giai đoạn này.</p>`,
      hinh_anh: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
      danh_muc: 'Thị trường logistics',
      tac_gia: 'Admin',
      luot_xem: 489,
      created_at: '2024-02-10 10:00:00'
    },
    {
      tieu_de: 'Tình hình xung đột Trung Đông và tác động đến ngành logistics',
      slug: 'xung-dot-trung-dong-tac-dong-logistics',
      mo_ta: 'Xung đột tại khu vực Trung Đông đang bước vào giai đoạn nhạy cảm với những diễn biến phức tạp, ảnh hưởng trực tiếp đến hoạt động vận tải và logistics toàn cầu.',
      noi_dung: `<p>Tình hình xung đột ở khu vực Trung Đông, đặc biệt là căng thẳng tại Biển Đỏ và eo biển Hormuz, đang tạo ra những tác động đáng kể đến chuỗi cung ứng toàn cầu và ngành logistics.</p>
<p><strong>Tác động đến vận tải biển:</strong> Các cuộc tấn công vào tàu thương mại ở Biển Đỏ buộc nhiều hãng tàu phải chuyển hướng đi vòng qua Mũi Hảo Vọng của châu Phi. Điều này kéo dài thời gian vận chuyển từ châu Á đến châu Âu thêm 10-14 ngày và tăng chi phí nhiên liệu đáng kể.</p>
<p><strong>Tác động đến hàng không:</strong> Một số tuyến bay qua vùng xung đột cũng bị điều chỉnh, ảnh hưởng đến lịch trình và chi phí vận tải hàng không.</p>
<p><strong>Giải pháp Hoàng Khang đang áp dụng:</strong> Chúng tôi liên tục cập nhật thông tin tình hình và điều chỉnh lịch trình, lựa chọn tuyến đường vận chuyển an toàn và hiệu quả nhất cho khách hàng.</p>`,
      hinh_anh: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80',
      danh_muc: 'Tin tức thế giới',
      tac_gia: 'Admin',
      luot_xem: 378,
      created_at: '2024-01-25 11:00:00'
    },
    {
      tieu_de: 'Hướng dẫn thủ tục hải quan xuất khẩu hàng thủ công mỹ nghệ',
      slug: 'thu-tuc-hai-quan-xuat-khau-hang-thu-cong-my-nghe',
      mo_ta: 'Hàng thủ công mỹ nghệ là một trong những mặt hàng xuất khẩu truyền thống của Việt Nam. Tuy nhiên, thủ tục hải quan cho loại hàng này khá phức tạp.',
      noi_dung: `<p>Hàng thủ công mỹ nghệ Việt Nam ngày càng được ưa chuộng trên thị trường quốc tế, với các sản phẩm đa dạng như đồ gốm sứ, đồ gỗ mỹ nghệ, hàng mây tre đan, tranh thêu, và nhiều loại sản phẩm truyền thống khác.</p>
<h3>Hồ sơ cần chuẩn bị</h3>
<ul>
<li>Hợp đồng mua bán ngoại thương (Sales Contract)</li>
<li>Hóa đơn thương mại (Commercial Invoice)</li>
<li>Phiếu đóng gói (Packing List)</li>
<li>Vận đơn (Bill of Lading hoặc Air Waybill)</li>
<li>Giấy chứng nhận xuất xứ (Certificate of Origin – C/O Form B hoặc Form theo FTA)</li>
<li>Tờ khai hải quan điện tử</li>
</ul>
<h3>Lưu ý đặc biệt</h3>
<p>Một số sản phẩm từ ngà voi, xương động vật quý hiếm có thể cần giấy phép đặc biệt theo Công ước CITES. Doanh nghiệp cần kiểm tra kỹ quy định của nước nhập khẩu trước khi xuất hàng.</p>
<p>Hoàng Khang cung cấp dịch vụ tư vấn và hỗ trợ toàn bộ quy trình thủ tục hải quan xuất khẩu, giúp doanh nghiệp tiết kiệm thời gian và tránh các rủi ro phát sinh.</p>`,
      hinh_anh: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=800&q=80',
      danh_muc: 'Kiến thức XNK',
      tac_gia: 'Admin',
      luot_xem: 267,
      created_at: '2024-01-15 14:00:00'
    },
    {
      tieu_de: 'Hoàng Khang gia nhập JCtrans – Mạng lưới logistics toàn cầu',
      slug: 'hoang-khang-gia-nhap-jctrans-mang-luoi-logistics',
      mo_ta: 'Hoàng Khang vừa chính thức trở thành thành viên của JCtrans – nền tảng logistics toàn cầu được thành lập năm 2003, kết nối hàng nghìn công ty logistics trên thế giới.',
      noi_dung: `<p>JCtrans (được thành lập năm 2003) là một trong những nền tảng kết nối logistics B2B lớn nhất thế giới, với hơn 28.000 thành viên đến từ hơn 180 quốc gia và vùng lãnh thổ.</p>
<p>Thông qua nền tảng JCtrans, các công ty logistics có thể tìm kiếm đối tác đáng tin cậy, cộng tác trong các dự án vận tải quốc tế, và mở rộng mạng lưới kinh doanh toàn cầu.</p>
<p><strong>Lợi ích khi Hoàng Khang gia nhập JCtrans:</strong></p>
<ul>
<li>Tiếp cận mạng lưới đối tác logistics tại hơn 180 quốc gia</li>
<li>Nâng cao khả năng xử lý hàng hóa đến/đi từ mọi điểm trên thế giới</li>
<li>Tăng cường uy tín và độ tin cậy trong mắt khách hàng và đối tác</li>
<li>Cập nhật xu hướng và công nghệ logistics mới nhất</li>
</ul>
<p>Việc gia nhập ba mạng lưới quốc tế lớn (WCA, VLA, JCtrans) khẳng định vị thế ngày càng vững chắc của Hoàng Khang trong ngành logistics Việt Nam và quốc tế.</p>`,
      hinh_anh: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=800&q=80',
      danh_muc: 'Tin công ty',
      tac_gia: 'Admin',
      luot_xem: 195,
      created_at: '2024-01-05 09:00:00'
    },
    {
      tieu_de: 'Quy trình nhập khẩu máy móc thiết bị từ Trung Quốc về Việt Nam',
      slug: 'quy-trinh-nhap-khau-may-moc-thiet-bi-tu-trung-quoc',
      mo_ta: 'Nhập khẩu máy móc thiết bị từ Trung Quốc là nhu cầu phổ biến của nhiều doanh nghiệp sản xuất Việt Nam. Bài viết này hướng dẫn chi tiết quy trình và thủ tục cần thiết.',
      noi_dung: `<p>Trung Quốc là đối tác thương mại lớn nhất của Việt Nam, và máy móc thiết bị là một trong những mặt hàng nhập khẩu chủ yếu. Việc nhập khẩu đúng quy trình giúp doanh nghiệp tiết kiệm chi phí và tránh rủi ro pháp lý.</p>
<h3>Các bước cơ bản trong quy trình nhập khẩu máy móc</h3>
<ol>
<li><strong>Kiểm tra chính sách nhập khẩu:</strong> Xác định mặt hàng có nằm trong danh mục cần giấy phép nhập khẩu không</li>
<li><strong>Ký hợp đồng mua bán:</strong> Thương lượng và ký hợp đồng với nhà cung cấp</li>
<li><strong>Thanh toán quốc tế:</strong> Sử dụng L/C, T/T, hoặc D/P tùy thỏa thuận</li>
<li><strong>Vận chuyển hàng hóa:</strong> Chọn phương thức vận tải phù hợp (đường bộ, đường biển, hàng không)</li>
<li><strong>Khai báo hải quan:</strong> Nộp tờ khai và hồ sơ hải quan</li>
<li><strong>Kiểm tra chất lượng:</strong> Một số máy móc cần qua kiểm định chất lượng trước khi thông quan</li>
</ol>
<p>Hoàng Khang có đội ngũ chuyên gia giàu kinh nghiệm nhập khẩu hàng Trung Quốc, sẵn sàng hỗ trợ từ việc tìm nguồn hàng, đàm phán giá, vận chuyển đến thông quan tại cửa khẩu.</p>`,
      hinh_anh: 'https://images.unsplash.com/photo-1533073526757-2c8ca1df9f1c?w=800&q=80',
      danh_muc: 'Kiến thức XNK',
      tac_gia: 'Admin',
      luot_xem: 523,
      created_at: '2023-12-20 10:30:00'
    },
    {
      tieu_de: 'Xu hướng xuất khẩu nông sản Việt Nam năm 2024',
      slug: 'xu-huong-xuat-khau-nong-san-viet-nam-2024',
      mo_ta: 'Nông sản Việt Nam ngày càng khẳng định vị thế trên thị trường quốc tế với nhiều mặt hàng đạt kim ngạch xuất khẩu hàng tỷ USD.',
      noi_dung: `<p>Năm 2024, xuất khẩu nông sản Việt Nam tiếp tục ghi nhận những con số ấn tượng. Với lợi thế về khí hậu nhiệt đới và lao động, Việt Nam đang ngày càng khẳng định vị thế là một trong những nước xuất khẩu nông sản hàng đầu Đông Nam Á.</p>
<h3>Các mặt hàng nông sản xuất khẩu chủ lực</h3>
<ul>
<li><strong>Cà phê:</strong> Việt Nam là nước xuất khẩu cà phê Robusta lớn nhất thế giới</li>
<li><strong>Gạo:</strong> Xuất khẩu sang hơn 150 quốc gia, đặc biệt gạo thơm ST25 ngày càng được ưa chuộng</li>
<li><strong>Hạt điều:</strong> Đứng đầu thế giới về xuất khẩu hạt điều chế biến</li>
<li><strong>Rau quả:</strong> Sầu riêng, thanh long, xoài đang là những mặt hàng có tiềm năng lớn</li>
<li><strong>Tôm và thủy sản:</strong> Kim ngạch xuất khẩu hàng tỷ USD mỗi năm</li>
</ul>
<p>Hoàng Khang có kinh nghiệm xuất khẩu nhiều loại nông sản Việt Nam sang các thị trường châu Á, châu Âu và Bắc Mỹ. Chúng tôi hỗ trợ doanh nghiệp từ khâu đóng gói, chứng nhận đến vận chuyển và thông quan tại nước nhập khẩu.</p>`,
      hinh_anh: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&q=80',
      danh_muc: 'Thị trường logistics',
      tac_gia: 'Admin',
      luot_xem: 412,
      created_at: '2023-12-05 09:00:00'
    }
  ];

  for (const news of newsData) {
    insertNews.run(
      news.tieu_de, news.slug, news.mo_ta, news.noi_dung,
      news.hinh_anh, news.danh_muc, news.tac_gia, news.luot_xem, news.created_at
    );
  }
}

// Seed jobs
const jobsCount = db.prepare('SELECT COUNT(*) as c FROM jobs').get().c;
if (jobsCount === 0) {
  const insertJob = db.prepare(`
    INSERT INTO jobs (vi_tri, phong_ban, dia_diem, loai_hinh, muc_luong, so_luong, mo_ta, yeu_cau, quyen_loi, han_nop, trang_thai)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  insertJob.run(
    'Nhân Viên Mua Hàng Tiếng Trung',
    'Phòng Kinh Doanh',
    'Hà Nội',
    'Toàn thời gian',
    '12 - 20 triệu VNĐ',
    2,
    `<ul>
<li>Tìm kiếm, phát triển và duy trì mối quan hệ với nhà cung cấp tại Trung Quốc</li>
<li>Thương lượng giá cả, điều kiện thanh toán, thời gian giao hàng với đối tác</li>
<li>Theo dõi đơn hàng từ khi đặt hàng đến khi nhận hàng</li>
<li>Xử lý các vấn đề phát sinh trong quá trình mua hàng</li>
<li>Lập báo cáo tình hình nhập khẩu hàng tháng</li>
<li>Phối hợp với bộ phận logistics để đảm bảo hàng về đúng tiến độ</li>
</ul>`,
    `<ul>
<li>Tốt nghiệp Đại học chuyên ngành Ngoại thương, Kinh tế, Thương mại quốc tế hoặc liên quan</li>
<li>Thành thạo tiếng Trung (HSK 5 trở lên), ưu tiên biết tiếng Anh</li>
<li>Có kinh nghiệm làm việc với đối tác Trung Quốc là lợi thế</li>
<li>Kỹ năng đàm phán, giao tiếp tốt</li>
<li>Chịu khó, cẩn thận, trung thực và có tinh thần trách nhiệm cao</li>
</ul>`,
    `<ul>
<li>Mức lương cạnh tranh: 12 - 20 triệu/tháng + thưởng theo KPI</li>
<li>Được đào tạo về nghiệp vụ xuất nhập khẩu</li>
<li>Môi trường làm việc năng động, cơ hội thăng tiến rõ ràng</li>
<li>BHXH, BHYT, BHTN theo quy định nhà nước</li>
<li>Các phúc lợi khác theo chính sách công ty</li>
</ul>`,
    '31/03/2024',
    1
  );

  insertJob.run(
    'Kế Toán Nội Bộ (Ngành XNK/Logistics)',
    'Phòng Kế Toán',
    'Hà Nội',
    'Toàn thời gian',
    '10 - 15 triệu VNĐ',
    1,
    `<ul>
<li>Xử lý hóa đơn, chứng từ kế toán liên quan đến hoạt động xuất nhập khẩu</li>
<li>Quản lý công nợ phải thu, phải trả với khách hàng và nhà cung cấp</li>
<li>Thực hiện công tác kế toán trên phần mềm Misa</li>
<li>Lập báo cáo tài chính định kỳ (tuần/tháng/quý/năm)</li>
<li>Theo dõi dòng tiền và các khoản thanh toán quốc tế</li>
<li>Phối hợp với kiểm toán nội bộ và bên ngoài</li>
</ul>`,
    `<ul>
<li>Tốt nghiệp Đại học chuyên ngành Kế toán, Tài chính hoặc liên quan</li>
<li>Có từ 1-2 năm kinh nghiệm kế toán, ưu tiên làm việc trong ngành logistics/XNK</li>
<li>Thành thạo phần mềm Misa và Excel</li>
<li>Hiểu biết cơ bản về quy trình xuất nhập khẩu</li>
<li>Cẩn thận, tỉ mỉ, trung thực, có khả năng làm việc độc lập</li>
<li>Ưu tiên biết tiếng Anh hoặc tiếng Trung</li>
</ul>`,
    `<ul>
<li>Mức lương: 10 - 15 triệu/tháng, tăng lương theo năng lực</li>
<li>Được đào tạo thêm về kế toán xuất nhập khẩu</li>
<li>BHXH, BHYT đầy đủ theo quy định</li>
<li>Thưởng lễ, Tết và các dịp đặc biệt</li>
<li>Làm việc trong môi trường chuyên nghiệp, năng động</li>
</ul>`,
    '28/02/2024',
    1
  );

  insertJob.run(
    'Nhân Viên Kinh Doanh Quốc Tế',
    'Phòng Kinh Doanh',
    'Hà Nội',
    'Toàn thời gian',
    '15 - 25 triệu VNĐ',
    2,
    `<ul>
<li>Tìm kiếm và phát triển khách hàng quốc tế mới trong lĩnh vực logistics, giao nhận</li>
<li>Nghiên cứu và tiếp cận các đối tác Freight Forwarding nước ngoài</li>
<li>Đàm phán hợp đồng và duy trì quan hệ lâu dài với đối tác quốc tế</li>
<li>Theo dõi thị trường logistics toàn cầu và xu hướng giá cước</li>
<li>Tham gia các hội chợ, triển lãm logistics quốc tế</li>
<li>Báo cáo tình hình kinh doanh định kỳ cho Ban Giám đốc</li>
</ul>`,
    `<ul>
<li>Tốt nghiệp Đại học chuyên ngành Ngoại thương, Logistics hoặc liên quan</li>
<li>Thành thạo tiếng Anh (TOEIC 700+ hoặc tương đương), ưu tiên biết thêm tiếng Trung/Nhật/Hàn</li>
<li>Có từ 2 năm kinh nghiệm trong ngành logistics/XNK</li>
<li>Có mạng lưới quan hệ với các hãng tàu, hãng hàng không là lợi thế lớn</li>
<li>Kỹ năng đàm phán, thuyết trình, và giao tiếp xuất sắc</li>
</ul>`,
    `<ul>
<li>Mức lương hấp dẫn: 15 - 25 triệu/tháng + hoa hồng theo doanh số</li>
<li>Cơ hội đi công tác nước ngoài, tham gia hội chợ quốc tế</li>
<li>Lộ trình thăng tiến rõ ràng: NV → Trưởng nhóm → Trưởng phòng</li>
<li>BHXH, BHYT, BHTN đầy đủ</li>
<li>Team building, du lịch công ty hàng năm</li>
</ul>`,
    '31/03/2024',
    1
  );

  insertJob.run(
    'Nhân Viên Khai Báo Hải Quan',
    'Phòng Hải Quan',
    'Hà Nội',
    'Toàn thời gian',
    '10 - 18 triệu VNĐ',
    2,
    `<ul>
<li>Thực hiện khai báo hải quan điện tử trên hệ thống VNACCS/VCIS</li>
<li>Chuẩn bị và kiểm tra hồ sơ hải quan cho lô hàng xuất/nhập khẩu</li>
<li>Theo dõi tình trạng thông quan và xử lý các vướng mắc phát sinh</li>
<li>Phối hợp với cơ quan hải quan để giải quyết các vấn đề kiểm tra</li>
<li>Tư vấn khách hàng về chính sách thuế và quy định hải quan</li>
<li>Cập nhật các thay đổi trong Luật Hải quan và các thông tư, nghị định liên quan</li>
</ul>`,
    `<ul>
<li>Có chứng chỉ đại lý khai báo hải quan hoặc đã qua đào tạo về nghiệp vụ hải quan</li>
<li>Thành thạo hệ thống khai báo VNACCS/VCIS</li>
<li>Hiểu biết về HS Code, biểu thuế xuất nhập khẩu</li>
<li>Có từ 1 năm kinh nghiệm khai báo hải quan</li>
<li>Cẩn thận, tỉ mỉ, chịu áp lực tốt</li>
</ul>`,
    `<ul>
<li>Mức lương: 10 - 18 triệu/tháng tùy năng lực</li>
<li>Được đào tạo nâng cao nghiệp vụ hải quan liên tục</li>
<li>BHXH, BHYT đầy đủ</li>
<li>Môi trường làm việc chuyên nghiệp, năng động</li>
<li>Thưởng theo KPI và thành tích</li>
</ul>`,
    '30/04/2024',
    1
  );

  insertJob.run(
    'Nhân Viên Chứng Từ Xuất Nhập Khẩu',
    'Phòng Chứng Từ',
    'Hà Nội',
    'Toàn thời gian',
    '9 - 14 triệu VNĐ',
    1,
    `<ul>
<li>Chuẩn bị, kiểm tra và xử lý bộ chứng từ xuất nhập khẩu (Invoice, Packing List, B/L, C/O, v.v.)</li>
<li>Phối hợp với bộ phận hải quan để đảm bảo chứng từ đầy đủ và chính xác</li>
<li>Liên hệ với hãng tàu, hãng hàng không để lấy vận đơn và các giấy tờ vận tải</li>
<li>Lưu trữ và quản lý hồ sơ chứng từ theo quy định</li>
<li>Hỗ trợ bộ phận kế toán trong việc đối chiếu chứng từ thanh toán</li>
</ul>`,
    `<ul>
<li>Tốt nghiệp Đại học chuyên ngành Ngoại thương, Logistics, Kinh tế hoặc liên quan</li>
<li>Tiếng Anh đọc hiểu chứng từ tốt</li>
<li>Hiểu biết cơ bản về Incoterms, UCP 600, và các loại chứng từ XNK</li>
<li>Cẩn thận, tỉ mỉ, có kỹ năng tổ chức và quản lý thông tin tốt</li>
<li>Ưu tiên ứng viên có kinh nghiệm làm việc trong lĩnh vực XNK/Logistics</li>
</ul>`,
    `<ul>
<li>Mức lương: 9 - 14 triệu/tháng</li>
<li>Được đào tạo bài bản về nghiệp vụ chứng từ XNK</li>
<li>BHXH, BHYT, BHTN theo quy định</li>
<li>Cơ hội phát triển lên vị trí quản lý chứng từ</li>
</ul>`,
    '30/04/2024',
    1
  );
}

module.exports = db;
