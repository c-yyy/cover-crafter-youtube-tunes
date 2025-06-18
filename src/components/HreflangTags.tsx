import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, useLocation } from 'react-router-dom';
import { supportedLngs } from '../i18n';

const HreflangTags: React.FC = () => {
  const { lng } = useParams<{ lng: string }>();
  const location = useLocation();
  
  // 获取当前页面的基础URL（不包含语言参数）
  const getBaseUrl = () => {
    const currentPath = location.pathname;
    // 移除语言前缀，获取基础路径
    const basePath = currentPath.replace(`/${lng}`, '') || '/';
    return basePath === '/' ? '' : basePath;
  };
  
  const baseUrl = getBaseUrl();
  const currentDomain = window.location.origin;
  
  return (
    <Helmet>
      {/* Canonical URL */}
      <link rel="canonical" href={`${currentDomain}/${lng}${baseUrl}`} />
      
      {/* Hreflang tags for all supported languages */}
      {Object.keys(supportedLngs).map((langCode) => (
        <link
          key={langCode}
          rel="alternate"
          hrefLang={langCode}
          href={`${currentDomain}/${langCode}${baseUrl}`}
        />
      ))}
      
      {/* Default hreflang for x-default */}
      <link
        rel="alternate"
        hrefLang="x-default"
        href={`${currentDomain}/en${baseUrl}`}
      />
    </Helmet>
  );
};

export default HreflangTags;