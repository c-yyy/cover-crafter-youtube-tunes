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
import About from "./pages/About";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Contact from "./pages/Contact";
import Footer from "./components/Footer"; // 导入 Footer 组件
import LanguageSuggestion from "./components/LanguageSuggestion";
import HreflangTags from "./components/HreflangTags";

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

  useEffect(() => {
    if (!i18n.isInitialized) {
      return;
    }

    // 只处理有效的语言代码
    if (lng && supportedLngs.hasOwnProperty(lng)) {
      if (i18n.language.split('-')[0] !== lng) {
        i18n.changeLanguage(lng);
      }
    } else if (lng && !supportedLngs.hasOwnProperty(lng)) {
      // 如果语言代码无效，跳转到404页面
      navigate('/en/404', { replace: true });
      return;
    }
  }, [lng, i18n, navigate]);

  useEffect(() => {
    if (lng && supportedLngs.hasOwnProperty(lng)) {
      document.documentElement.lang = lng;
    }
  }, [lng]);

  if (!i18n.isInitialized) {
    return null; 
  }

  if (lng && !supportedLngs.hasOwnProperty(lng)) {
    return null;
  }

  return (
    <>
      <HreflangTags />
      <LanguageSuggestion />
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

// 根路径处理组件 - 不进行自动跳转，而是显示语言选择页面
const LanguageSelection = () => {
  const location = useLocation();
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
            Choose Your Language / 选择语言
          </h1>
          <div className="space-y-3">
            {Object.entries(supportedLngs).map(([code, name]) => {
              let flag = '';
              switch (code) {
                case 'en': flag = '🇺🇸'; break;
                case 'zh': flag = '🇨🇳'; break;
                case 'ja': flag = '🇯🇵'; break;
                case 'fr': flag = '🇫🇷'; break;
                case 'es': flag = '🇪🇸'; break;
                case 'ko': flag = '🇰🇷'; break;
                case 'km': flag = '🇰🇭'; break;
                case 'si': flag = '🇱🇰'; break;
                case 'bn': flag = '🇧🇩'; break;
                case 'ur': flag = '🇵🇰'; break;
                default: flag = '🌐';
              }
              
              const targetPath = `/${code}${location.search}${location.hash}`;
              
              return (
                <a
                  key={code}
                  href={targetPath}
                  className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors"
                >
                  <span className="text-2xl">{flag}</span>
                  <span className="text-gray-800 font-medium">{name}</span>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/en" replace />} />
            <Route path="/:lng" element={<LanguageWrapper />}>
              <Route index element={<Index />} />
              <Route path="about" element={<About />} />
              <Route path="privacy" element={<Privacy />} />
              <Route path="terms" element={<Terms />} />
              <Route path="contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} /> 
            </Route>
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
