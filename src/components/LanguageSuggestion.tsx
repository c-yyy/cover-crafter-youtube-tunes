import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { supportedLngs } from '../i18n';

const LanguageSuggestion: React.FC = () => {
  const { lng } = useParams<{ lng: string }>();
  const { t } = useTranslation();
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [suggestedLanguage, setSuggestedLanguage] = useState<string | null>(null);

  useEffect(() => {
    // 检查是否已经显示过建议
    const hasShownSuggestion = sessionStorage.getItem(`hasShownLanguageSuggestion_${lng}`);
    if (hasShownSuggestion) return;

    // 获取浏览器语言
    const browserLanguage = navigator.language.split('-')[0];
    
    // 检查当前语言是否与浏览器语言不同，且浏览器语言在支持列表中
    if (lng && browserLanguage !== lng && supportedLngs[browserLanguage]) {
      setSuggestedLanguage(browserLanguage);
      setShowSuggestion(true);
    }
  }, [lng]);

  const handleAccept = () => {
    // 记录用户选择到cookie
    document.cookie = `preferredLanguage=${suggestedLanguage}; path=/; max-age=${60 * 60 * 24 * 30}`; // 30天
    sessionStorage.setItem(`hasShownLanguageSuggestion_${lng}`, 'true');
    setShowSuggestion(false);
  };

  const handleDismiss = () => {
    sessionStorage.setItem(`hasShownLanguageSuggestion_${lng}`, 'true');
    setShowSuggestion(false);
  };

  if (!showSuggestion || !suggestedLanguage) return null;

  return (
    <div className="fixed top-4 right-4 bg-white border border-gray-300 rounded-lg shadow-lg p-4 max-w-sm z-50 animate-slide-in">
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-semibold text-gray-800">
          {t('languageSuggestionTitle')}
        </h3>
        <button
          onClick={handleDismiss}
          className="text-gray-400 hover:text-gray-600 ml-2"
        >
          ×
        </button>
      </div>
      <p className="text-gray-600 mb-4">
        {t('languageSuggestionDescription', { language: supportedLngs[suggestedLanguage] })}
      </p>
      <div className="flex space-x-2">
        <Link
          to={`/${suggestedLanguage}`}
          onClick={handleAccept}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors text-sm"
        >
          {t('languageSuggestionAccept')}
        </Link>
        <button
          onClick={handleDismiss}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition-colors text-sm"
        >
          {t('languageSuggestionDismiss')}
        </button>
      </div>
    </div>
  );
};

export default LanguageSuggestion;