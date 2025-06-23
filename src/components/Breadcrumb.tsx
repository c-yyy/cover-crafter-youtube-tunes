import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  const { t } = useTranslation();
  const { lng } = useParams<{ lng: string }>();

  const allItems = [
    { label: t('home', '首页'), href: `/${lng}` },
    ...items
  ];

  return (
    <nav className="flex items-center space-x-2 text-sm text-slate-600 mb-6">
      <Home className="h-4 w-4" />
      {allItems.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && <ChevronRight className="h-4 w-4 text-slate-400" />}
          {item.href && index < allItems.length - 1 ? (
            <Link 
              to={item.href} 
              className="hover:text-blue-600 transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className={index === allItems.length - 1 ? 'text-slate-800 font-medium' : ''}>
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;