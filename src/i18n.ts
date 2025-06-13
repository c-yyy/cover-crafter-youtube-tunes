import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

export const supportedLngs = {
  en: 'English',
  zh: '简体中文',
  ja: '日本語',
  fr: 'Français',
  es: 'Español',
  ko: '한국어',
};

i18n
  .use(Backend) // 从服务器加载翻译
  .use(LanguageDetector) // 检测用户语言
  .use(initReactI18next) // 将 i18n 实例传递给 react-i18next
  .init({
    fallbackLng: 'en', // 如果检测到的语言不可用，则使用的语言
    debug: process.env.NODE_ENV === 'development', // 开发模式下开启 debug
    supportedLngs: Object.keys(supportedLngs),
    interpolation: {
      escapeValue: false, // react 已经做了 xss 防御
    },
    backend: {
      loadPath: '/locales/{{lng}}/translation.json', // 翻译文件路径
    },
  });

export default i18n;