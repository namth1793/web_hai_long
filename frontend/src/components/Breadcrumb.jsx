import { Link } from 'react-router-dom';
import { FiChevronRight, FiHome } from 'react-icons/fi';
import { useLanguage } from '../context/LanguageContext';

export default function Breadcrumb({ items }) {
  const { t } = useLanguage();
  return (
    <div className="breadcrumb">
      <Link to="/" className="flex items-center gap-1 hover:text-accent transition-colors">
        <FiHome size={13} /><span>{t.breadcrumb.home}</span>
      </Link>
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-2">
          <FiChevronRight size={13} />
          {item.path ? (
            <Link to={item.path} className="hover:text-accent transition-colors">{item.label}</Link>
          ) : (
            <span className="text-gray-700 font-medium">{item.label}</span>
          )}
        </div>
      ))}
    </div>
  );
}
