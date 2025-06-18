import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';

const Footer = () => {
  const { t } = useTranslation();
  const { lng } = useParams<{ lng: string }>();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-800 text-slate-300 py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-6">
          {/* About Section */}
          <div>
            <h3 className="text-white font-semibold mb-3">{t('aboutPageTitle')}</h3>
            <p className="text-sm text-slate-400 mb-3">
              {t('aboutIntroDescription').substring(0, 120)}...
            </p>
            <Link 
              to={`/${lng}/about`} 
              className="text-blue-400 hover:text-blue-300 text-sm transition-colors"
            >
              {t('learnMore', 'Learn More')}
            </Link>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-3">{t('quickLinks', 'Quick Links')}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link 
                  to={`/${lng}`} 
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  {t('homeTitle')}
                </Link>
              </li>
              <li>
                <Link 
                  to={`/${lng}/about`} 
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  {t('aboutPageTitle')}
                </Link>
              </li>
              <li>
                <Link 
                  to={`/${lng}/contact`} 
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  {t('contactPageTitle')}
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-3">{t('legal', 'Legal')}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link 
                  to={`/${lng}/privacy`} 
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  {t('privacyPageTitle')}
                </Link>
              </li>
              <li>
                <Link 
                  to={`/${lng}/terms`} 
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  {t('termsPageTitle')}
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-3">{t('contactPageTitle')}</h3>
            <div className="text-sm space-y-2">
              <p className="text-slate-400">
                {t('contactInfoEmailDescription')}
              </p>
              <p className="text-slate-300">
                support@youtubecover.download
              </p>
              <p className="text-slate-400">
                {t('contactInfoResponseTime')}
              </p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-slate-700 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-center md:text-left mb-4 md:mb-0">
              {t('footerText', { year: currentYear })}
            </p>
            <div className="flex space-x-4 text-sm">
              <Link 
                to={`/${lng}/privacy`} 
                className="text-slate-400 hover:text-white transition-colors"
              >
                {t('privacyPageTitle')}
              </Link>
              <Link 
                to={`/${lng}/terms`} 
                className="text-slate-400 hover:text-white transition-colors"
              >
                {t('termsPageTitle')}
              </Link>
              <Link 
                to={`/${lng}/contact`} 
                className="text-slate-400 hover:text-white transition-colors"
              >
                {t('contactPageTitle')}
              </Link>
            </div>
          </div>
          <p className="text-sm mt-4 text-center text-slate-400">
            {t('footerDisclaimer')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;