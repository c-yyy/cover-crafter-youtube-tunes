import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  BrowserRouter,
  Routes,
  Route,
  useParams,
  useNavigate,
  Navigate,
  Outlet,
  useLocation, // Added useLocation here
} from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { supportedLngs } from "./i18n"; // 从 i18n.ts 导入

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Footer from "./components/Footer"; // 导入 Footer 组件

const queryClient = new QueryClient();

// 语言切换组件
const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const { lng, '*': splat } = useParams(); // 获取当前语言和通配符路径

  const changeLanguage = (newLng: string) => {
    i18n.changeLanguage(newLng);
    // 构建新的路径，保留通配符部分
    const newPath = splat ? `/${newLng}/${splat}` : `/${newLng}`;
    navigate(newPath);
  };

  return (
    <div style={{ position: 'fixed', top: '10px', right: '10px', zIndex: 1000 }}>
      <select
        value={lng || i18n.language.split('-')[0]} // 处理 i18n.language 可能为 'en-US' 的情况
        onChange={(e) => changeLanguage(e.target.value)}
        style={{
          padding: '8px',
          borderRadius: '4px',
          border: '1px solid #ccc',
          backgroundColor: 'white',
        }}
      >
        {Object.entries(supportedLngs).map(([code, name]) => {
          let flag = '';
          switch (code) {
            case 'en':
              flag = '🇺🇸'; // United States Flag
              break;
            case 'zh':
              flag = '🇨🇳'; // China Flag
              break;
            case 'ja':
              flag = '🇯🇵'; // Japan Flag
              break;
            case 'fr':
              flag = '🇫🇷'; // France Flag
              break;
            case 'es':
              flag = '🇪🇸'; // Spain Flag
              break;
            case 'ko':
              flag = '🇰🇷'; // South Korea Flag
              break;
            case 'km':
              flag = '🇰🇭'; // Cambodia Flag
              break;
            case 'si':
              flag = '🇱🇰'; // Sri Lanka Flag
              break;
            case 'bn':
              flag = '🇧🇩'; // Bangladesh Flag
              break;
            case 'ur':
              flag = '🇵🇰'; // Pakistan Flag
              break;
            default:
              flag = '';
          }
          return (
            <option key={code} value={code}>
              {`${flag} ${name}`}
            </option>
          );
        })}
      </select>
    </div>
  );
};

// 包裹组件，用于处理语言参数和设置
const LanguageWrapper = () => {
  const { lng } = useParams<{ lng: string }>();
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation(); 

  useEffect(() => {
    if (!i18n.isInitialized) {
      return;
    }

    const detectedLng = i18n.language.split('-')[0];
    const currentPath = location.pathname;
    // 移除语言前缀后的路径，例如 /en/about -> /about, /en -> ""
    const basePath = currentPath.startsWith(`/${lng}`) ? currentPath.substring(`/${lng}`.length) : currentPath;
    
    if (lng && supportedLngs.hasOwnProperty(lng)) {
      if (i18n.language.split('-')[0] !== lng) {
        i18n.changeLanguage(lng);
      }
    } else {
      const fallbackLng = i18n.options.fallbackLng;
      const targetLng = supportedLngs.hasOwnProperty(detectedLng)
        ? detectedLng
        : (Array.isArray(fallbackLng) ? fallbackLng[0] : fallbackLng || 'en');
      
      // 目标路径，确保 basePath 为空字符串时不会产生 //
      const targetPath = `/${targetLng}${basePath || ''}`;
      if (currentPath !== targetPath) {
        navigate(targetPath, { replace: true });
      }
    }
  }, [lng, i18n, navigate, location]);

  useEffect(() => {
    if (lng && supportedLngs.hasOwnProperty(lng)) {
      document.documentElement.lang = lng;
    }
  }, [lng]);

  if (!i18n.isInitialized || (lng && !supportedLngs.hasOwnProperty(lng))) {
    return null; 
  }

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <LanguageSwitcher />
        <main style={{ flexGrow: 1 }}>
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
};

const AppInitialRedirect = () => {
  const { i18n } = useTranslation();
  if (!i18n.isInitialized) {
    return null; // 等待 i18n 初始化
  }
  const initialLang = i18n.language.split('-')[0] || (Array.isArray(i18n.options.fallbackLng) ? i18n.options.fallbackLng[0] : i18n.options.fallbackLng || 'en');
  const location = useLocation();
  // 保留查询参数和哈希值
  const targetPath = `/${initialLang}${location.pathname === '/' ? '' : location.pathname}${location.search}${location.hash}`;
  return <Navigate to={targetPath} replace />;
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AppInitialRedirect />} />
            <Route path="/:lng" element={<LanguageWrapper />}>
              <Route index element={<Index />} />
              <Route path="*" element={<NotFound />} /> 
            </Route>
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
