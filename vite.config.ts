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
        '/en/help', '/zh/help', '/ja/help', '/fr/help', '/es/help', '/ko/help', '/km/help', '/si/help', '/bn/help', '/ur/help',
        '/en/blog', '/zh/blog', '/ja/blog', '/fr/blog', '/es/blog', '/ko/blog', '/km/blog', '/si/blog', '/bn/blog', '/ur/blog',
        '/en/resources', '/zh/resources', '/ja/resources', '/fr/resources', '/es/resources', '/ko/resources', '/km/resources', '/si/resources', '/bn/resources', '/ur/resources',
        '/en/faq', '/zh/faq', '/ja/faq', '/fr/faq', '/es/faq', '/ko/faq', '/km/faq', '/si/faq', '/bn/faq', '/ur/faq',
        '/en/tools', '/zh/tools', '/ja/tools', '/fr/tools', '/es/tools', '/ko/tools', '/km/tools', '/si/tools', '/bn/tools', '/ur/tools',
        '/en/tutorials', '/zh/tutorials', '/ja/tutorials', '/fr/tutorials', '/es/tutorials', '/ko/tutorials', '/km/tutorials', '/si/tutorials', '/bn/tutorials', '/ur/tutorials',
        '/en/news', '/zh/news', '/ja/news', '/fr/news', '/es/news', '/ko/news', '/km/news', '/si/news', '/bn/news', '/ur/news',
        '/en/case-studies', '/zh/case-studies', '/ja/case-studies', '/fr/case-studies', '/es/case-studies', '/ko/case-studies', '/km/case-studies', '/si/case-studies', '/bn/case-studies', '/ur/case-studies',
        '/en/creator-economy', '/zh/creator-economy', '/ja/creator-economy', '/fr/creator-economy', '/es/creator-economy', '/ko/creator-economy', '/km/creator-economy', '/si/creator-economy', '/bn/creator-economy', '/ur/creator-economy',
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
        // 帮助页面
        '/en/help': 0.7, '/zh/help': 0.6, '/ja/help': 0.6, '/fr/help': 0.6, '/es/help': 0.6, '/ko/help': 0.6, '/km/help': 0.6, '/si/help': 0.6, '/bn/help': 0.6, '/ur/help': 0.6,
        // 博客页面
        '/en/blog': 0.8, '/zh/blog': 0.7, '/ja/blog': 0.7, '/fr/blog': 0.7, '/es/blog': 0.7, '/ko/blog': 0.7, '/km/blog': 0.7, '/si/blog': 0.7, '/bn/blog': 0.7, '/ur/blog': 0.7,
        // 资源页面
        '/en/resources': 0.7, '/zh/resources': 0.6, '/ja/resources': 0.6, '/fr/resources': 0.6, '/es/resources': 0.6, '/ko/resources': 0.6, '/km/resources': 0.6, '/si/resources': 0.6, '/bn/resources': 0.6, '/ur/resources': 0.6,
        // FAQ页面
        '/en/faq': 0.7, '/zh/faq': 0.6, '/ja/faq': 0.6, '/fr/faq': 0.6, '/es/faq': 0.6, '/ko/faq': 0.6, '/km/faq': 0.6, '/si/faq': 0.6, '/bn/faq': 0.6, '/ur/faq': 0.6,
        // 工具页面
        '/en/tools': 0.8, '/zh/tools': 0.7, '/ja/tools': 0.7, '/fr/tools': 0.7, '/es/tools': 0.7, '/ko/tools': 0.7, '/km/tools': 0.7, '/si/tools': 0.7, '/bn/tools': 0.7, '/ur/tools': 0.7,
        // 教程页面
        '/en/tutorials': 0.8, '/zh/tutorials': 0.7, '/ja/tutorials': 0.7, '/fr/tutorials': 0.7, '/es/tutorials': 0.7, '/ko/tutorials': 0.7, '/km/tutorials': 0.7, '/si/tutorials': 0.7, '/bn/tutorials': 0.7, '/ur/tutorials': 0.7,
        // 新闻页面
        '/en/news': 0.7, '/zh/news': 0.6, '/ja/news': 0.6, '/fr/news': 0.6, '/es/news': 0.6, '/ko/news': 0.6, '/km/news': 0.6, '/si/news': 0.6, '/bn/news': 0.6, '/ur/news': 0.6,
        // 案例研究页面
        '/en/case-studies': 0.7, '/zh/case-studies': 0.6, '/ja/case-studies': 0.6, '/fr/case-studies': 0.6, '/es/case-studies': 0.6, '/ko/case-studies': 0.6, '/km/case-studies': 0.6, '/si/case-studies': 0.6, '/bn/case-studies': 0.6, '/ur/case-studies': 0.6,
        // 创作者经济页面
        '/en/creator-economy': 0.7, '/zh/creator-economy': 0.6, '/ja/creator-economy': 0.6, '/fr/creator-economy': 0.6, '/es/creator-economy': 0.6, '/ko/creator-economy': 0.6, '/km/creator-economy': 0.6, '/si/creator-economy': 0.6, '/bn/creator-economy': 0.6, '/ur/creator-economy': 0.6,
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
