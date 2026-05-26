import { Link } from 'react-router-dom';
import { FiPhone, FiMail, FiMapPin, FiClock } from 'react-icons/fi';
import { FaFacebookF, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();
  const f = t.footer;
  return (
    <footer className="bg-navy text-white pb-20 md:pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">

          {/* Company */}
          <div className="col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center text-white font-black text-base">HK</div>
              <div>
                <div className="font-black text-base leading-tight">HOÀNG KHANG</div>
                <div className="text-accent text-xs font-medium">XNK & LOGISTICS</div>
              </div>
            </div>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-4">{f.tagline}</p>
            <p className="text-gray-400 text-xs mb-3"><span className="text-gray-300">{f.taxCode}</span> 0109843985</p>
            <div className="flex items-center gap-2.5">
              <a href="#" className="w-8 h-8 bg-white/10 hover:bg-accent rounded-full flex items-center justify-center transition-colors"><FaFacebookF size={13} /></a>
              <a href="#" className="w-8 h-8 bg-white/10 hover:bg-accent rounded-full flex items-center justify-center transition-colors"><FaLinkedinIn size={13} /></a>
              <a href="#" className="w-8 h-8 bg-white/10 hover:bg-accent rounded-full flex items-center justify-center transition-colors"><FaYoutube size={13} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-sm mb-4 pb-2 border-b border-white/20">{f.links}</h4>
            <ul className="space-y-2">
              {f.navLinks.map(([label, path]) => (
                <li key={path}>
                  <Link to={path} className="text-gray-400 hover:text-accent text-xs sm:text-sm transition-colors flex items-center gap-1.5">
                    <span className="text-accent">›</span>{label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-sm mb-4 pb-2 border-b border-white/20">{f.services}</h4>
            <ul className="space-y-2">
              {f.serviceLinks.map((s) => (
                <li key={s}>
                  <Link to="/dich-vu" className="text-gray-400 hover:text-accent text-xs sm:text-sm transition-colors flex items-center gap-1.5">
                    <span className="text-accent">›</span>{s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-2 lg:col-span-1">
            <h4 className="font-bold text-sm mb-4 pb-2 border-b border-white/20">{f.contact}</h4>
            <ul className="space-y-3">
              <li className="flex gap-2.5 text-xs sm:text-sm">
                <FiMapPin className="text-accent mt-0.5 shrink-0" size={13} />
                <span className="text-gray-400">{f.address1}</span>
              </li>
              <li className="flex gap-2.5 text-xs sm:text-sm">
                <FiMapPin className="text-accent mt-0.5 shrink-0" size={13} />
                <span className="text-gray-400">{f.address2}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <FiPhone className="text-accent shrink-0" size={13} />
                <a href="tel:02466898662" className="text-gray-400 hover:text-accent transition-colors text-xs sm:text-sm">024 668 98662</a>
              </li>
              <li className="flex items-center gap-2.5">
                <FiMail className="text-accent shrink-0" size={13} />
                <a href="mailto:info@hoangkhanglogs.com" className="text-gray-400 hover:text-accent transition-colors text-xs sm:text-sm break-all">info@hoangkhanglogs.com</a>
              </li>
              <li className="flex items-center gap-2.5">
                <FiClock className="text-accent shrink-0" size={13} />
                <span className="text-gray-400 text-xs sm:text-sm">{f.hours}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-gray-500">
          <p>{f.copyright}</p>
          <div className="flex items-center gap-3">
            <Link to="/lien-he" className="hover:text-accent transition-colors">{f.privacy}</Link>
            <span>|</span>
            <Link to="/lien-he" className="hover:text-accent transition-colors">{f.terms}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
