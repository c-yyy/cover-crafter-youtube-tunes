const fs = require('fs');
const path = require('path');

// 网站基础URL
const BASE_URL = 'https://youtube-cover.com';

// 支持的语言
const LANGUAGES = ['en', 'zh', 'ja', 'fr', 'es', 'ko', 'km', 'si', 'bn', 'ur'];

// 页面配置
const PAGES = [
  {
    path: '',
    priority: '1.0',
    changefreq: 'weekly'
  },
  {
    path: '/cover-maker',
    priority: '0.9',
    changefreq: 'weekly'
  },
  {
    path: '/about',
    priority: '0.8',
    changefreq: 'monthly'
  },
  {
    path: '/privacy',
    priority: '0.6',
    changefreq: 'yearly'
  },
  {
    path: '/terms',
    priority: '0.6',
    changefreq: 'yearly'
  },
  {
    path: '/contact',
    priority: '0.7',
    changefreq: 'monthly'
  },
  {
    path: '/changelog',
    priority: '0.6',
    changefreq: 'monthly'
  },
  {
    path: '/help',
    priority: '0.8',
    changefreq: 'weekly'
  },
  {
    path: '/help/getting-started',
    priority: '0.7',
    changefreq: 'monthly'
  },
  {
    path: '/help/advanced-tips',
    priority: '0.7',
    changefreq: 'monthly'
  },
  {
    path: '/help/troubleshooting',
    priority: '0.7',
    changefreq: 'monthly'
  },
  {
    path: '/blog',
    priority: '0.8',
    changefreq: 'weekly'
  },
  {
    path: '/blog/bg7k9m2x',
    priority: '0.6',
    changefreq: 'monthly'
  },
  {
    path: '/blog/xk3p8q1z',
    priority: '0.6',
    changefreq: 'monthly'
  },
  {
    path: '/blog/m9n4r7s2',
    priority: '0.6',
    changefreq: 'monthly'
  },
  {
    path: '/resources',
    priority: '0.7',
    changefreq: 'weekly'
  },
  {
    path: '/faq',
    priority: '0.7',
    changefreq: 'monthly'
  },
  {
    path: '/tools',
    priority: '0.7',
    changefreq: 'weekly'
  },
  {
    path: '/tutorials',
    priority: '0.7',
    changefreq: 'weekly'
  },
  {
    path: '/news',
    priority: '0.6',
    changefreq: 'weekly'
  },
  {
    path: '/case-studies',
    priority: '0.6',
    changefreq: 'monthly'
  },
  {
    path: '/creator-economy',
    priority: '0.6',
    changefreq: 'monthly'
  }
];

// 生成hreflang链接
function generateHreflangLinks(pagePath) {
  return LANGUAGES.map(lang => 
    `    <xhtml:link rel="alternate" hreflang="${lang}" href="${BASE_URL}/${lang}${pagePath}" />`
  ).join('\n');
}

// 生成URL条目
function generateUrlEntry(lang, page) {
  const url = `${BASE_URL}/${lang}${page.path}`;
  const lastmod = new Date().toISOString().split('T')[0]; // YYYY-MM-DD格式
  
  return `  <url>
    <loc>${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
${generateHreflangLinks(page.path)}
  </url>`;
}

// 生成完整的sitemap
function generateSitemap() {
  const header = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">`;
  
  const urls = [];
  
  // 为每种语言生成所有页面
  LANGUAGES.forEach(lang => {
    urls.push(`  <!-- ${lang.toUpperCase()} Pages -->`);
    PAGES.forEach(page => {
      urls.push(generateUrlEntry(lang, page));
    });
    urls.push(''); // 添加空行分隔
  });
  
  const footer = `</urlset>`;
  
  return [header, ...urls, footer].join('\n');
}

// 写入sitemap文件
function writeSitemap() {
  const sitemapContent = generateSitemap();
  const outputPath = path.join(__dirname, '../public/sitemap.xml');
  
  fs.writeFileSync(outputPath, sitemapContent, 'utf8');
  console.log(`✅ Sitemap generated successfully at ${outputPath}`);
  console.log(`📊 Generated ${LANGUAGES.length * PAGES.length} URLs for ${LANGUAGES.length} languages`);
}

// 如果直接运行此脚本
if (require.main === module) {
  writeSitemap();
}

module.exports = {
  generateSitemap,
  writeSitemap,
  LANGUAGES,
  PAGES,
  BASE_URL
};