import React, { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { supportedLngs } from '../i18n';
import i18n from '../i18n';

const LanguageSuggestion: React.FC = () => {
  const { lng } = useParams<{ lng: string }>();
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [showSuggestion, setShowSuggestion] = useState(false);
  
  // 获取当前路径，去除语言前缀
   const getCurrentPath = () => {
     const pathname = location.pathname;
     // 匹配 /语言代码/路径 的模式
     const match = pathname.match(/^\/([a-z]{2})(\/.*)?$/);
     if (match && match[2]) {
       return match[2]; // 返回去除语言前缀的路径
     }
     return ''; // 如果是根路径或无法匹配，返回空字符串
   };
  const [suggestedLanguage, setSuggestedLanguage] = useState<string | null>(null);
  const [targetTranslations, setTargetTranslations] = useState<any>(null);

  useEffect(() => {
    // 检查是否已经显示过建议
    const hasShownSuggestion = sessionStorage.getItem(`hasShownLanguageSuggestion_${lng}`);
    if (hasShownSuggestion) return;

    // 获取浏览器语言
    const browserLanguage = navigator.language.split('-')[0];
    
    // 检查当前语言是否与浏览器语言不同，且浏览器语言在支持列表中
    if (lng && browserLanguage !== lng && supportedLngs[browserLanguage]) {
      setSuggestedLanguage(browserLanguage);
      // 加载目标语言的翻译
      loadTargetTranslations(browserLanguage);
    }
  }, [lng]);

  const loadTargetTranslations = async (targetLng: string) => {
    try {
      const response = await fetch(`/locales/${targetLng}/translation.json`);
      const translations = await response.json();
      setTargetTranslations(translations);
      setShowSuggestion(true);
    } catch (error) {
      console.error('Failed to load target language translations:', error);
      // 如果加载失败，仍然显示建议但使用当前语言
      setShowSuggestion(true);
    }
  };

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

  // 使用目标语言的翻译，如果没有加载成功则使用当前语言
  const getTargetText = (key: string, options?: any) => {
    if (targetTranslations && targetTranslations[key]) {
      if (options && key === 'languageSuggestionDescription') {
        return targetTranslations[key].replace('{{language}}', options.language);
      }
      return targetTranslations[key];
    }
    return t(key, options);
  };

  return (
    <div className="fixed top-20 right-4 bg-white border border-gray-300 rounded-lg shadow-lg p-4 max-w-sm z-50 animate-slide-in">
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-semibold text-gray-800">
          {getTargetText('languageSuggestionTitle')}
        </h3>
        <button
          onClick={handleDismiss}
          className="text-gray-400 hover:text-gray-600 ml-2"
        >
          ×
        </button>
      </div>
      <p className="text-gray-600 mb-4">
        {getTargetText('languageSuggestionDescription', { language: supportedLngs[suggestedLanguage] })}
      </p>
      <div className="flex space-x-2">
        <Link
          to={`/${suggestedLanguage}${getCurrentPath()}`}
          onClick={handleAccept}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors text-sm"
        >
          {getTargetText('languageSuggestionAccept')}
        </Link>
        <button
          onClick={handleDismiss}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition-colors text-sm"
        >
          {getTargetText('languageSuggestionDismiss')}
        </button>
      </div>
    </div>
  );
};

export default LanguageSuggestion;