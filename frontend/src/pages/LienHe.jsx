import { useState } from 'react';
import axios from 'axios';
import { FiPhone, FiMail, FiMapPin, FiClock, FiSend, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import { FaFacebookF, FaLinkedinIn } from 'react-icons/fa';
import Breadcrumb from '../components/Breadcrumb';
import { useLanguage } from '../context/LanguageContext';

export default function LienHe() {
  const { t } = useLanguage();
  const c = t.contact;
  const [form, setForm] = useState({ ho_ten: '', email: '', dien_thoai: '', cong_ty: '', dich_vu: '', noi_dung: '' });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      const res = await axios.post('/api/contacts', form);
      if (res.data.success) {
        setResult({ type: 'success', msg: c.form.successMsg || res.data.message });
        setForm({ ho_ten: '', email: '', dien_thoai: '', cong_ty: '', dich_vu: '', noi_dung: '' });
      }
    } catch {
      setResult({ type: 'error', msg: c.form.errorMsg });
    }
    setLoading(false);
  };

  const inputClass = 'w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all bg-white';
  const labelClass = 'block text-xs font-semibold text-gray-600 mb-1.5';

  return (
    <>
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-navy py-14">
        <div className="max-w-7xl mx-auto px-4">
          <Breadcrumb items={[{ label: c.header.breadcrumb }]} />
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mt-3">{c.header.title}</h1>
          <p className="text-blue-200 mt-2">{c.header.subtitle}</p>
        </div>
      </div>

      {/* Contact Info + Form */}
      <section className="py-10 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <div className="text-accent font-semibold text-sm uppercase tracking-wider mb-2">{c.info.badge}</div>
                <h2 className="text-2xl font-black text-primary mb-4">{c.info.title}</h2>
                <p className="text-gray-600 text-sm leading-relaxed">{c.info.desc}</p>
              </div>

              {/* HQ */}
              <div className="bg-white rounded-2xl p-5 shadow-sm flex gap-4">
                <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center shrink-0"><FiMapPin size={20} /></div>
                <div>
                  <h4 className="font-bold text-gray-800 text-sm mb-1">{c.info.hq}</h4>
                  {c.info.hqLines.map((l, i) => <p key={i} className="text-gray-500 text-xs leading-relaxed">{l}</p>)}
                </div>
              </div>

              {/* Office */}
              <div className="bg-white rounded-2xl p-5 shadow-sm flex gap-4">
                <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center shrink-0"><FiMapPin size={20} /></div>
                <div>
                  <h4 className="font-bold text-gray-800 text-sm mb-1">{c.info.office}</h4>
                  {c.info.officeLines.map((l, i) => <p key={i} className="text-gray-500 text-xs leading-relaxed">{l}</p>)}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-5 shadow-sm flex gap-4">
                <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center shrink-0"><FiPhone size={20} /></div>
                <div>
                  <h4 className="font-bold text-gray-800 text-sm mb-1">{c.info.phoneEmail}</h4>
                  <a href="tel:02466898662" className="block text-sm text-accent font-semibold hover:underline">024 668 98662</a>
                  <a href="mailto:info@hoangkhanglogs.com" className="block text-xs text-gray-500 hover:text-accent mt-1">info@hoangkhanglogs.com</a>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-5 shadow-sm flex gap-4">
                <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center shrink-0"><FiClock size={20} /></div>
                <div>
                  <h4 className="font-bold text-gray-800 text-sm mb-1">{c.info.hours}</h4>
                  {c.info.hoursLines.map((l, i) => <p key={i} className="text-xs text-gray-500">{l}</p>)}
                  <p className="text-xs text-accent font-medium mt-1">{c.info.emergency}</p>
                </div>
              </div>

              {/* Social */}
              <div>
                <h4 className="font-bold text-gray-700 text-sm mb-3">{c.info.social}</h4>
                <div className="flex items-center gap-3">
                  {[
                    { icon: <FaFacebookF size={16} />, label: 'Facebook', color: 'bg-blue-600' },
                    { icon: <FaLinkedinIn size={16} />, label: 'LinkedIn', color: 'bg-blue-700' },
                    { icon: <span className="text-xs font-bold">Zalo</span>, label: 'Zalo', color: 'bg-blue-500' },
                  ].map((s) => (
                    <a key={s.label} href="#" className={`${s.color} text-white w-10 h-10 rounded-full flex items-center justify-center hover:opacity-90 transition-opacity`} title={s.label}>
                      {s.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-xl font-black text-primary mb-2">{c.form.title}</h3>
                <p className="text-gray-500 text-sm mb-6">{c.form.subtitle}</p>

                {result && (
                  <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 text-sm ${result.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                    {result.type === 'success' ? <FiCheckCircle size={18} /> : <FiAlertCircle size={18} />}
                    {result.msg}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className={labelClass}>{c.form.fullName}</label>
                      <input type="text" required value={form.ho_ten} onChange={e => setForm(f => ({ ...f, ho_ten: e.target.value }))} className={inputClass} placeholder={c.form.namePlaceholder} />
                    </div>
                    <div>
                      <label className={labelClass}>{c.form.email}</label>
                      <input type="email" required value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} className={inputClass} placeholder={c.form.emailPlaceholder} />
                    </div>
                    <div>
                      <label className={labelClass}>{c.form.phone}</label>
                      <input type="tel" value={form.dien_thoai} onChange={e => setForm(f => ({ ...f, dien_thoai: e.target.value }))} className={inputClass} placeholder={c.form.phonePlaceholder} />
                    </div>
                    <div>
                      <label className={labelClass}>{c.form.company}</label>
                      <input type="text" value={form.cong_ty} onChange={e => setForm(f => ({ ...f, cong_ty: e.target.value }))} className={inputClass} placeholder={c.form.companyPlaceholder} />
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>{c.form.service}</label>
                    <select value={form.dich_vu} onChange={e => setForm(f => ({ ...f, dich_vu: e.target.value }))} className={inputClass}>
                      <option value="">{c.form.selectService}</option>
                      {c.form.services.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className={labelClass}>{c.form.message}</label>
                    <textarea value={form.noi_dung}
                      onChange={e => setForm(f => ({ ...f, noi_dung: e.target.value }))}
                      rows={5} className={`${inputClass} resize-none`}
                      placeholder={c.form.messagePlaceholder} />
                  </div>

                  <button type="submit" disabled={loading} className="w-full btn-primary justify-center py-4 text-base">
                    {loading ? (
                      <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />{c.form.submitting}</span>
                    ) : (
                      <span className="flex items-center gap-2"><FiSend size={16} /> {c.form.submit}</span>
                    )}
                  </button>

                  <p className="text-xs text-gray-400 text-center">
                    {c.form.orCall} <a href="tel:02466898662" className="text-accent font-semibold">024 668 98662</a>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h3 className="text-xl font-black text-primary mb-6 text-center">{c.map.title}</h3>
          <div className="rounded-2xl overflow-hidden shadow-lg h-80 md:h-96">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.5161700879167!2d105.79381727516444!3d21.02793208062107!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab8cff7fd1df%3A0x5e4fd3bf2a89b27c!2z78-fVOG7lWEgbmjDoCBTYW5uYW0!5e0!3m2!1svi!2svn!4v1710000000000!5m2!1svi!2svn"
              width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
              referrerPolicy="no-referrer-when-downgrade" title="Hoàng Khang Logistics" />
          </div>
          <p className="text-center text-sm text-gray-500 mt-3">
            <FiMapPin className="inline mr-1 text-accent" size={13} />{c.map.address}
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-10 md:py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4">
          <h3 className="text-2xl font-black text-primary text-center mb-10">{c.faq.title}</h3>
          <div className="space-y-4">
            {c.faq.items.map((faq, i) => (
              <details key={i} className="bg-white rounded-xl shadow-sm group">
                <summary className="flex items-center justify-between p-5 cursor-pointer list-none font-semibold text-gray-800 hover:text-accent transition-colors text-sm">
                  {faq.q}
                  <span className="text-accent text-lg shrink-0 ml-3 transition-transform group-open:rotate-45">+</span>
                </summary>
                <div className="px-5 pb-5 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-4">{faq.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
