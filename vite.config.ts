import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import sitemap from "vite-plugin-sitemap";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
    sitemap({
      hostname: 'https://youtube-cover.com',
      dynamicRoutes: [
        // 主页面 - 各语言版本
        '/en',
        '/zh',
        '/ja',
        '/fr',
        '/es',
        '/ko',
        '/km',
        '/si',
        '/bn',
        '/ur',
        // 静态页面 - 各语言版本
        '/en/about', '/zh/about', '/ja/about', '/fr/about', '/es/about', '/ko/about', '/km/about', '/si/about', '/bn/about', '/ur/about',
        '/en/privacy', '/zh/privacy', '/ja/privacy', '/fr/privacy', '/es/privacy', '/ko/privacy', '/km/privacy', '/si/privacy', '/bn/privacy', '/ur/privacy',
        '/en/terms', '/zh/terms', '/ja/terms', '/fr/terms', '/es/terms', '/ko/terms', '/km/terms', '/si/terms', '/bn/terms', '/ur/terms',
        '/en/contact', '/zh/contact', '/ja/contact', '/fr/contact', '/es/contact', '/ko/contact', '/km/contact', '/si/contact', '/bn/contact', '/ur/contact',
        '/en/changelog', '/zh/changelog', '/ja/changelog', '/fr/changelog', '/es/changelog', '/ko/changelog', '/km/changelog', '/si/changelog', '/bn/changelog', '/ur/changelog',
        // 根路径重定向到默认语言
        '/',
      ],
      changefreq: 'weekly',
      priority: {
        // 首页
        '/': 1.0,
        '/en': 1.0,
        '/zh': 0.9,
        '/ja': 0.9,
        '/fr': 0.9,
        '/es': 0.9,
        '/ko': 0.9,
        '/km': 0.9,
        '/si': 0.9,
        '/bn': 0.9,
        '/ur': 0.9,
        // 关于页面
        '/en/about': 0.8, '/zh/about': 0.7, '/ja/about': 0.7, '/fr/about': 0.7, '/es/about': 0.7, '/ko/about': 0.7, '/km/about': 0.7, '/si/about': 0.7, '/bn/about': 0.7, '/ur/about': 0.7,
        // 隐私政策页面
        '/en/privacy': 0.7, '/zh/privacy': 0.6, '/ja/privacy': 0.6, '/fr/privacy': 0.6, '/es/privacy': 0.6, '/ko/privacy': 0.6, '/km/privacy': 0.6, '/si/privacy': 0.6, '/bn/privacy': 0.6, '/ur/privacy': 0.6,
        // 服务条款页面
        '/en/terms': 0.7, '/zh/terms': 0.6, '/ja/terms': 0.6, '/fr/terms': 0.6, '/es/terms': 0.6, '/ko/terms': 0.6, '/km/terms': 0.6, '/si/terms': 0.6, '/bn/terms': 0.6, '/ur/terms': 0.6,
        // 联系我们页面
        '/en/contact': 0.7, '/zh/contact': 0.6, '/ja/contact': 0.6, '/fr/contact': 0.6, '/es/contact': 0.6, '/ko/contact': 0.6, '/km/contact': 0.6, '/si/contact': 0.6, '/bn/contact': 0.6, '/ur/contact': 0.6,
        // 更新日志页面
        '/en/changelog': 0.8, '/zh/changelog': 0.7, '/ja/changelog': 0.7, '/fr/changelog': 0.7, '/es/changelog': 0.7, '/ko/changelog': 0.7, '/km/changelog': 0.7, '/si/changelog': 0.7, '/bn/changelog': 0.7, '/ur/changelog': 0.7,
      },
      lastmod: new Date(),
    })
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
