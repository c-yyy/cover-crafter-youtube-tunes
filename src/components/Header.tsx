import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Youtube, Menu, X } from 'lucide-react';
import UserProfile from './UserProfile';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import LanguageSelector from './LanguageSelector';

interface HeaderProps {
  currentPage?: string;
}

const Header: React.FC<HeaderProps> = ({ currentPage }) => {
  const { t } = useTranslation();
  const { lng } = useParams<{ lng: string }>();
  const { isAuthenticated } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigationItems = [
    { path: '', label: t('homeTitle'), key: 'home' },
    { path: 'cover-maker', label: t('coverMaker'), key: 'cover-maker' },
    { path: 'blog', label: t('blogTitle'), key: 'blog' },
    { path: 'about', label: t('aboutTitle'), key: 'about' },
    { path: 'help', label: t('helpTitle'), key: 'help' }
  ];

  const isCurrentPage = (itemKey: string) => {
    return currentPage === itemKey;
  };

  const getLinkClassName = (itemKey: string) => {
    return isCurrentPage(itemKey)
      ? "text-red-600 font-medium"
      : "text-slate-600 hover:text-red-600 font-medium transition-colors";
  };

  const getMobileLinkClassName = (itemKey: string) => {
    return isCurrentPage(itemKey)
      ? "text-red-600 font-medium"
      : "text-slate-600 hover:text-red-600 font-medium transition-colors";
  };

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to={`/${lng}`} className="flex items-center space-x-3">
            <div className="bg-red-600 p-2 rounded-lg">
              <Youtube className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-slate-800">
              {t('headerTitle')}
            </h1>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <nav className="flex items-center space-x-8">
              {navigationItems.map((item) => (
                <Link 
                  key={item.key}
                  to={`/${lng}${item.path ? `/${item.path}` : ''}`} 
                  className={getLinkClassName(item.key)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            
            {/* User Profile or Login Button */}
            {isAuthenticated ? (
              <UserProfile className="ml-4" />
            ) : (
              <Link to={`/${lng}/login`}>
                <Button variant="outline" size="sm">
                  {t('login.title')}
                </Button>
              </Link>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-slate-600" />
            ) : (
              <Menu className="h-6 w-6 text-slate-600" />
            )}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t pt-4">
            <nav className="flex flex-col space-y-4">
              {navigationItems.map((item) => (
                <Link 
                  key={item.key}
                  to={`/${lng}${item.path ? `/${item.path}` : ''}`} 
                  className={getMobileLinkClassName(item.key)}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            
            {/* Mobile User Profile or Login */}
            <div className="mt-4 pt-4 border-t">
              {isAuthenticated ? (
                <UserProfile />
              ) : (
                <Link to={`/${lng}/login`} onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full">
                    {t('login.title')}
                  </Button>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export { Header };