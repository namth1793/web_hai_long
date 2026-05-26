import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiPackage, FiPhone } from 'react-icons/fi';
import Breadcrumb from '../components/Breadcrumb';
import { useLanguage } from '../context/LanguageContext';

export default function SanPham() {
  const { t } = useLanguage();
  const p = t.products;
  const [tab, setTab] = useState('nhap');
  const [selected, setSelected] = useState(null);
  const products = tab === 'nhap' ? p.nhap : p.xuat;

  return (
    <>
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-navy py-14">
        <div className="max-w-7xl mx-auto px-4">
          <Breadcrumb items={[{ label: p.header.breadcrumb }]} />
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mt-3">{p.header.title}</h1>
          <p className="text-blue-200 mt-2">{p.header.subtitle}</p>
        </div>
      </div>

      <section className="py-10 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          {/* Tabs */}
          <div className="flex flex-col sm:flex-row items-center justify-between mb-12 gap-6">
            <div>
              <h2 className="text-2xl font-black text-primary">{p.tabTitle}</h2>
              <p className="text-gray-500 text-sm mt-1">{p.tabSubtitle}</p>
            </div>
            <div className="bg-gray-100 rounded-xl p-1.5 inline-flex">
              {[['nhap', p.tabImport], ['xuat', p.tabExport]].map(([key, label]) => (
                <button key={key} onClick={() => { setTab(key); setSelected(null); }}
                  className={`px-5 py-2.5 rounded-lg font-semibold text-sm transition-all ${
                    tab === key ? 'bg-primary text-white shadow-md' : 'text-gray-600 hover:text-primary'
                  }`}>
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((prod, i) => (
              <div key={i}
                className={`card overflow-hidden cursor-pointer group transition-all duration-300 ${selected === i ? 'ring-2 ring-accent' : ''}`}
                onClick={() => setSelected(selected === i ? null : i)}
              >
                <div className="overflow-hidden h-48 relative">
                  <img src={prod.img || ['https://images.unsplash.com/photo-1533073526757-2c8ca1df9f1c?w=600&q=80','https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80','https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=600&q=80','https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&q=80','https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600&q=80','https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80','https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&q=80','https://images.unsplash.com/photo-1558171813-2daf2d9cd6e2?w=600&q=80','https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=600&q=80','https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80','https://images.unsplash.com/photo-1559583985-c80d8ad9b29f?w=600&q=80','https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80'][i + (tab === 'xuat' ? 6 : 0)]}
                    alt={prod.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-3 left-3 text-3xl">{prod.emoji}</div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-gray-800 text-lg mb-3 group-hover:text-accent transition-colors">{prod.name}</h3>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {prod.items.slice(0, 4).map((item) => (
                      <span key={item} className="bg-primary/10 text-primary text-xs px-2.5 py-1 rounded-full font-medium">{item}</span>
                    ))}
                    {prod.items.length > 4 && (
                      <span className="bg-gray-100 text-gray-500 text-xs px-2.5 py-1 rounded-full">+{prod.items.length - 4}</span>
                    )}
                  </div>
                  {selected === i && (
                    <div className="border-t border-gray-100 pt-4 mt-2 animate-fadeIn">
                      <p className="text-sm text-gray-600 leading-relaxed mb-4">{prod.desc}</p>
                      <div className="mb-4">
                        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                          {tab === 'nhap' ? p.importLabel : p.exportLabel}
                        </span>
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {(prod.origin || prod.markets).map((m) => (
                            <span key={m} className="bg-accent/10 text-accent text-xs px-2.5 py-1 rounded-full font-medium">{m}</span>
                          ))}
                        </div>
                      </div>
                      <Link to="/lien-he" className="flex items-center gap-2 text-accent font-semibold text-sm hover:gap-3 transition-all">
                        {p.quoteLink} <FiArrowRight size={14} />
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
            <h2 className="text-2xl font-black text-primary">{p.process.title}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {p.process.steps.map((s, i) => (
              <div key={i} className="relative text-center p-6 bg-white rounded-2xl shadow-sm">
                <div className="w-14 h-14 bg-accent text-white rounded-2xl flex items-center justify-center text-xl font-black mx-auto mb-4">{s.step}</div>
                <h4 className="font-bold text-primary mb-2">{s.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
                {i < 3 && <div className="hidden md:block absolute top-14 -right-3 text-gray-300 text-2xl">›</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-10 md:py-16 bg-primary">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <FiPackage size={40} className="text-accent mx-auto mb-4" />
          <h2 className="text-2xl md:text-3xl font-black mb-4">{p.cta.title}</h2>
          <p className="text-blue-200 mb-8">{p.cta.subtitle}</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/lien-he" className="btn-primary">{p.cta.btnConsult} <FiArrowRight /></Link>
            <a href="tel:02466898662" className="btn-outline"><FiPhone /> 024 668 98662</a>
          </div>
        </div>
      </section>
    </>
  );
}
