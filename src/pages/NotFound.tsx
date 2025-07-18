import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { supportedLngs } from '../i18n';

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { lng } = useParams<{ lng: string }>();
  const { t, i18n } = useTranslation();
  const currentLanguage = lng || i18n.language.split('-')[0];

  useEffect(() => {
    // 检查是否是无效的语言代码导致的404
    const pathSegments = location.pathname.split('/').filter(Boolean);
    if (pathSegments.length >= 2) {
      const firstSegment = pathSegments[0];
      const secondSegment = pathSegments[1];
      
      // 如果第一个段是无效语言代码，重定向到默认语言
      if (!supportedLngs.hasOwnProperty(firstSegment)) {
        navigate(`/en${location.pathname.substring(firstSegment.length + 1)}`, { replace: true });
        return;
      }
      
      // 如果第二个段也是语言代码（如 /km/km），重定向到第一个语言代码
      if (supportedLngs.hasOwnProperty(secondSegment)) {
        navigate(`/${firstSegment}${location.pathname.substring(firstSegment.length + secondSegment.length + 2)}`, { replace: true });
        return;
      }
    }
    
    console.error(
      t('error.404.consoleLog'),
      location.pathname
    );
  }, [location.pathname, t, navigate]);

  return (
    <>
      <Helmet>
        <title>{t('notFound.title')}</title>
        <meta name="description" content={t('notFound.description')} />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href={`https://youtube-cover.com/${currentLanguage}/404`} />
        {Object.keys(supportedLngs).map(lang => (
          <link key={lang} rel="alternate" hrefLang={lang} href={`https://youtube-cover.com/${lang}/404`} />
        ))}
      </Helmet>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">{t('notFound.heading')}</h1>
          <p className="text-xl text-gray-600 mb-4">{t('notFound.message')}</p>
          <a href={`/${currentLanguage}`} className="text-blue-500 hover:text-blue-700 underline">
            {t('notFound.homeLink')}
          </a>
        </div>
      </div>
    </>
  );
};

export default NotFound;
