import { Link } from 'react-router-dom';
import { FiArrowRight, FiPhone, FiCheckCircle, FiFileText } from 'react-icons/fi';
import { MdAirplanemodeActive, MdDirectionsBoat, MdDirectionsBus } from 'react-icons/md';
import { FiGlobe, FiTruck, FiDollarSign, FiSearch, FiUser } from 'react-icons/fi';
import Breadcrumb from '../components/Breadcrumb';
import { useLanguage } from '../context/LanguageContext';

const TRANSPORT_ICONS = [
  <MdAirplanemodeActive size={32} />,
  <MdDirectionsBoat size={32} />,
  <MdDirectionsBus size={32} />,
  <FiTruck size={32} />,
];
const CONSIGNMENT_ICONS = [
  <FiSearch size={24} />,
  <FiDollarSign size={24} />,
  <FiGlobe size={24} />,
  <FiUser size={24} />,
];

export default function DichVu() {
  const { t } = useLanguage();
  const s = t.services;

  return (
    <>
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-navy py-14">
        <div className="max-w-7xl mx-auto px-4">
          <Breadcrumb items={[{ label: s.header.breadcrumb }]} />
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mt-3">{s.header.title}</h1>
          <p className="text-blue-200 mt-2">{s.header.subtitle}</p>
        </div>
      </div>

      {/* Service 1: Transport */}
      <section id="van-tai" className="py-12 md:py-20 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <div className="text-accent font-semibold text-sm uppercase tracking-wider mb-2">{s.transport.badge}</div>
            <h2 className="text-3xl font-black text-primary mb-4">{s.transport.title}</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">{s.transport.subtitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {s.transport.list.map((item, i) => (
              <div key={i} className="service-card card overflow-hidden">
                <div className={`${item.color} p-6 text-white`}>
                  <div className="mb-3">{TRANSPORT_ICONS[i]}</div>
                  <h3 className="font-bold text-lg">{item.title}</h3>
                </div>
                <div className="p-6">
                  <p className="text-sm text-gray-500 leading-relaxed mb-4">{item.desc}</p>
                  <ul className="space-y-1.5">
                    {item.features.map((f) => (
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

      {/* Service 2: Consignment */}
      <section id="uy-thac" className="py-12 md:py-20 bg-gray-50 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <div className="text-accent font-semibold text-sm uppercase tracking-wider mb-2">{s.consignment.badge}</div>
            <h2 className="text-3xl font-black text-primary mb-4">{s.consignment.title}</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">{s.consignment.subtitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {s.consignment.list.map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-shadow group">
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 bg-primary/10 text-primary group-hover:bg-accent group-hover:text-white rounded-xl flex items-center justify-center shrink-0 transition-all">
                    {CONSIGNMENT_ICONS[i]}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-primary text-lg mb-2 group-hover:text-accent transition-colors">{item.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed mb-4">{item.desc}</p>
                    <div>
                      <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">{s.consignment.processLabel}</span>
                      <ol className="mt-2 space-y-1">
                        {item.steps.map((step, si) => (
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

      {/* Service 3: Customs */}
      <section id="hai-quan" className="py-12 md:py-20 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-accent font-semibold text-sm uppercase tracking-wider mb-2">{s.customs.badge}</div>
              <h2 className="text-3xl font-black text-primary mb-5">{s.customs.title}</h2>
              <p className="text-gray-600 leading-relaxed mb-6">{s.customs.desc}</p>
              <div className="space-y-4">
                {s.customs.list.map((h, i) => (
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
              <img src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=700&q=80" alt="Customs" className="rounded-2xl w-full h-60 object-cover shadow-xl" />
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-primary rounded-2xl p-6 text-white text-center">
                  <div className="text-3xl font-black text-accent mb-1">100%</div>
                  <div className="text-sm text-blue-200">{s.customs.clearanceRate}</div>
                </div>
                <div className="bg-accent rounded-2xl p-6 text-white text-center">
                  <div className="text-3xl font-black mb-1">24h</div>
                  <div className="text-sm text-orange-100">{s.customs.avgTime}</div>
                </div>
              </div>
              <div className="bg-gray-50 rounded-2xl p-6">
                <h4 className="font-bold text-primary mb-3">{s.customs.ftaTitle}</h4>
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
            <h2 className="text-2xl font-black text-primary mb-4">{s.pricing.title}</h2>
            <p className="text-gray-600 mb-2" dangerouslySetInnerHTML={{ __html: s.pricing.p1 }} />
            <p className="text-gray-600 mb-8" dangerouslySetInnerHTML={{ __html: s.pricing.p2 }} />
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/lien-he" className="btn-primary">{s.pricing.btnQuote} <FiArrowRight /></Link>
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
