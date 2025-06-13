import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';

const NotFound = () => {
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;

  useEffect(() => {
    console.error(
      t('error.404.consoleLog'),
      location.pathname
    );
  }, [location.pathname, t]);

  return (
    <>
      <Helmet>
        <title>{t('notFound.title')}</title>
        <meta name="description" content={t('notFound.description')} />
        <link rel="canonical" href={`https://yourdomain.com/${currentLanguage}/404`} />
        {['en', 'zh', 'ja', 'fr', 'es'].map(lang => (
          <link key={lang} rel="alternate" hrefLang={lang} href={`https://yourdomain.com/${lang}/404`} />
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
