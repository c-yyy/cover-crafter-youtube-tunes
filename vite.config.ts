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
        // Cover Maker 页面 - 各语言版本
        '/en/cover-maker', '/zh/cover-maker', '/ja/cover-maker', '/fr/cover-maker', '/es/cover-maker', '/ko/cover-maker', '/km/cover-maker', '/si/cover-maker', '/bn/cover-maker', '/ur/cover-maker',
        // 帮助页面 - 各语言版本
        '/en/help', '/zh/help', '/ja/help', '/fr/help', '/es/help', '/ko/help', '/km/help', '/si/help', '/bn/help', '/ur/help',
        '/en/help/getting-started', '/zh/help/getting-started', '/ja/help/getting-started', '/fr/help/getting-started', '/es/help/getting-started', '/ko/help/getting-started', '/km/help/getting-started', '/si/help/getting-started', '/bn/help/getting-started', '/ur/help/getting-started',
        '/en/help/advanced-tips', '/zh/help/advanced-tips', '/ja/help/advanced-tips', '/fr/help/advanced-tips', '/es/help/advanced-tips', '/ko/help/advanced-tips', '/km/help/advanced-tips', '/si/help/advanced-tips', '/bn/help/advanced-tips', '/ur/help/advanced-tips',
        '/en/help/troubleshooting', '/zh/help/troubleshooting', '/ja/help/troubleshooting', '/fr/help/troubleshooting', '/es/help/troubleshooting', '/ko/help/troubleshooting', '/km/help/troubleshooting', '/si/help/troubleshooting', '/bn/help/troubleshooting', '/ur/help/troubleshooting',
        // 博客页面 - 各语言版本
        '/en/blog', '/zh/blog', '/ja/blog', '/fr/blog', '/es/blog', '/ko/blog', '/km/blog', '/si/blog', '/bn/blog', '/ur/blog',
        // 博客文章示例页面 (动态路由示例)
        '/en/blog/bg7k9m2x', '/zh/blog/bg7k9m2x', '/ja/blog/bg7k9m2x', '/fr/blog/bg7k9m2x', '/es/blog/bg7k9m2x', '/ko/blog/bg7k9m2x', '/km/blog/bg7k9m2x', '/si/blog/bg7k9m2x', '/bn/blog/bg7k9m2x', '/ur/blog/bg7k9m2x',
        '/en/blog/h3k8l9p2', '/zh/blog/h3k8l9p2', '/ja/blog/h3k8l9p2', '/fr/blog/h3k8l9p2', '/es/blog/h3k8l9p2', '/ko/blog/h3k8l9p2', '/km/blog/h3k8l9p2', '/si/blog/h3k8l9p2', '/bn/blog/h3k8l9p2', '/ur/blog/h3k8l9p2',
        '/en/blog/m9n4q7r5', '/zh/blog/m9n4q7r5', '/ja/blog/m9n4q7r5', '/fr/blog/m9n4q7r5', '/es/blog/m9n4q7r5', '/ko/blog/m9n4q7r5', '/km/blog/m9n4q7r5', '/si/blog/m9n4q7r5', '/bn/blog/m9n4q7r5', '/ur/blog/m9n4q7r5',
        '/en/blog/x2y6z8w1', '/zh/blog/x2y6z8w1', '/ja/blog/x2y6z8w1', '/fr/blog/x2y6z8w1', '/es/blog/x2y6z8w1', '/ko/blog/x2y6z8w1', '/km/blog/x2y6z8w1', '/si/blog/x2y6z8w1', '/bn/blog/x2y6z8w1', '/ur/blog/x2y6z8w1',
        '/en/blog/a5b3c7d9', '/zh/blog/a5b3c7d9', '/ja/blog/a5b3c7d9', '/fr/blog/a5b3c7d9', '/es/blog/a5b3c7d9', '/ko/blog/a5b3c7d9', '/km/blog/a5b3c7d9', '/si/blog/a5b3c7d9', '/bn/blog/a5b3c7d9', '/ur/blog/a5b3c7d9',
        '/en/blog/p8q2r4s6', '/zh/blog/p8q2r4s6', '/ja/blog/p8q2r4s6', '/fr/blog/p8q2r4s6', '/es/blog/p8q2r4s6', '/ko/blog/p8q2r4s6', '/km/blog/p8q2r4s6', '/si/blog/p8q2r4s6', '/bn/blog/p8q2r4s6', '/ur/blog/p8q2r4s6',
        // 其他页面 - 各语言版本
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
        // Cover Maker 页面 (核心功能，高优先级)
        '/en/cover-maker': 0.9, '/zh/cover-maker': 0.8, '/ja/cover-maker': 0.8, '/fr/cover-maker': 0.8, '/es/cover-maker': 0.8, '/ko/cover-maker': 0.8, '/km/cover-maker': 0.8, '/si/cover-maker': 0.8, '/bn/cover-maker': 0.8, '/ur/cover-maker': 0.8,
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
        // 帮助子页面
        '/en/help/getting-started': 0.6, '/zh/help/getting-started': 0.5, '/ja/help/getting-started': 0.5, '/fr/help/getting-started': 0.5, '/es/help/getting-started': 0.5, '/ko/help/getting-started': 0.5, '/km/help/getting-started': 0.5, '/si/help/getting-started': 0.5, '/bn/help/getting-started': 0.5, '/ur/help/getting-started': 0.5,
        '/en/help/advanced-tips': 0.6, '/zh/help/advanced-tips': 0.5, '/ja/help/advanced-tips': 0.5, '/fr/help/advanced-tips': 0.5, '/es/help/advanced-tips': 0.5, '/ko/help/advanced-tips': 0.5, '/km/help/advanced-tips': 0.5, '/si/help/advanced-tips': 0.5, '/bn/help/advanced-tips': 0.5, '/ur/help/advanced-tips': 0.5,
        '/en/help/troubleshooting': 0.6, '/zh/help/troubleshooting': 0.5, '/ja/help/troubleshooting': 0.5, '/fr/help/troubleshooting': 0.5, '/es/help/troubleshooting': 0.5, '/ko/help/troubleshooting': 0.5, '/km/help/troubleshooting': 0.5, '/si/help/troubleshooting': 0.5, '/bn/help/troubleshooting': 0.5, '/ur/help/troubleshooting': 0.5,
        // 博客页面
        '/en/blog': 0.8, '/zh/blog': 0.7, '/ja/blog': 0.7, '/fr/blog': 0.7, '/es/blog': 0.7, '/ko/blog': 0.7, '/km/blog': 0.7, '/si/blog': 0.7, '/bn/blog': 0.7, '/ur/blog': 0.7,
        // 博客文章页面
        '/en/blog/bg7k9m2x': 0.6, '/zh/blog/bg7k9m2x': 0.5, '/ja/blog/bg7k9m2x': 0.5, '/fr/blog/bg7k9m2x': 0.5, '/es/blog/bg7k9m2x': 0.5, '/ko/blog/bg7k9m2x': 0.5, '/km/blog/bg7k9m2x': 0.5, '/si/blog/bg7k9m2x': 0.5, '/bn/blog/bg7k9m2x': 0.5, '/ur/blog/bg7k9m2x': 0.5,
        '/en/blog/h3k8l9p2': 0.6, '/zh/blog/h3k8l9p2': 0.5, '/ja/blog/h3k8l9p2': 0.5, '/fr/blog/h3k8l9p2': 0.5, '/es/blog/h3k8l9p2': 0.5, '/ko/blog/h3k8l9p2': 0.5, '/km/blog/h3k8l9p2': 0.5, '/si/blog/h3k8l9p2': 0.5, '/bn/blog/h3k8l9p2': 0.5, '/ur/blog/h3k8l9p2': 0.5,
        '/en/blog/m9n4q7r5': 0.6, '/zh/blog/m9n4q7r5': 0.5, '/ja/blog/m9n4q7r5': 0.5, '/fr/blog/m9n4q7r5': 0.5, '/es/blog/m9n4q7r5': 0.5, '/ko/blog/m9n4q7r5': 0.5, '/km/blog/m9n4q7r5': 0.5, '/si/blog/m9n4q7r5': 0.5, '/bn/blog/m9n4q7r5': 0.5, '/ur/blog/m9n4q7r5': 0.5,
        '/en/blog/x2y6z8w1': 0.6, '/zh/blog/x2y6z8w1': 0.5, '/ja/blog/x2y6z8w1': 0.5, '/fr/blog/x2y6z8w1': 0.5, '/es/blog/x2y6z8w1': 0.5, '/ko/blog/x2y6z8w1': 0.5, '/km/blog/x2y6z8w1': 0.5, '/si/blog/x2y6z8w1': 0.5, '/bn/blog/x2y6z8w1': 0.5, '/ur/blog/x2y6z8w1': 0.5,
        '/en/blog/a5b3c7d9': 0.6, '/zh/blog/a5b3c7d9': 0.5, '/ja/blog/a5b3c7d9': 0.5, '/fr/blog/a5b3c7d9': 0.5, '/es/blog/a5b3c7d9': 0.5, '/ko/blog/a5b3c7d9': 0.5, '/km/blog/a5b3c7d9': 0.5, '/si/blog/a5b3c7d9': 0.5, '/bn/blog/a5b3c7d9': 0.5, '/ur/blog/a5b3c7d9': 0.5,
        '/en/blog/p8q2r4s6': 0.6, '/zh/blog/p8q2r4s6': 0.5, '/ja/blog/p8q2r4s6': 0.5, '/fr/blog/p8q2r4s6': 0.5, '/es/blog/p8q2r4s6': 0.5, '/ko/blog/p8q2r4s6': 0.5, '/km/blog/p8q2r4s6': 0.5, '/si/blog/p8q2r4s6': 0.5, '/bn/blog/p8q2r4s6': 0.5, '/ur/blog/p8q2r4s6': 0.5,
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
