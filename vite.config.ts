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
      hostname: 'https://youtube-thumbnail.com',
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
        // 根路径重定向到默认语言
        '/',
      ],
      changefreq: 'weekly',
      priority: {
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
