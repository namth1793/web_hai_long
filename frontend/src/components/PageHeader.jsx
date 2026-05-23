import Breadcrumb from './Breadcrumb';

/**
 * Shared page header used on all inner pages.
 * @param {string} title
 * @param {string} [subtitle]
 * @param {Array}  breadcrumbs  — passed straight to <Breadcrumb items={...} />
 */
export default function PageHeader({ title, subtitle, breadcrumbs = [] }) {
  return (
    <div className="bg-gradient-to-r from-primary to-navy py-9 md:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Breadcrumb items={breadcrumbs} />
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mt-3 leading-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-blue-200 mt-1.5 text-sm sm:text-base">{subtitle}</p>
        )}
      </div>
    </div>
  );
}
