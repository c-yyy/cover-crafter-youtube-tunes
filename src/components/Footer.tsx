import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-800 text-slate-300 py-8 mt-auto">
      <div className="container mx-auto px-4 text-center">
        <p>
          {t('footerText', { year: currentYear })}
        </p>
        <p className="text-sm mt-2">
          {t('footerDisclaimer')}
        </p>
      </div>
    </footer>
  );
};

export default Footer;