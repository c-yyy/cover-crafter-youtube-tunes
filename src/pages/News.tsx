import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Youtube, 
  Newspaper, 
  Calendar, 
  Clock, 
  Eye, 
  ThumbsUp, 
  Share2, 
  Search, 
  Menu, 
  X,
  ChevronRight,
  TrendingUp,
  Users,
  Play,
  Video,
  Zap,
  Globe,
  Star,
  Award,
  Target,
  BarChart3,
  Settings,
  Lightbulb,
  ExternalLink,
  Filter,
  Tag,
  ArrowRight,
  BookOpen,
  Camera,
  Edit,
  Mic,
  Monitor,
  Smartphone,
  Wifi,
  Shield,
  DollarSign,
  Briefcase,
  Gamepad2,
  Music,
  Film,
  Palette,
  Code,
  Database,
  Cloud,
  Lock,
  AlertCircle,
  CheckCircle,
  Info,
  MessageSquare
} from "lucide-react";
import { Link, useParams } from 'react-router-dom';
import { Header } from '../components/Header';

interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  tags: string[];
  publishDate: string;
  readTime: string;
  views: number;
  likes: number;
  featured: boolean;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  image?: string;
}

const News = () => {
  const { t, i18n } = useTranslation();
  const { lng } = useParams<{ lng: string }>();

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);

  const newsArticles: NewsArticle[] = [
    {
      id: 'youtube-shorts-monetization-2024',
      title: t('news.shorts2024.title', 'YouTube Shorts 2024年最新变现政策解读'),
      summary: t('news.shorts2024.summary', 'YouTube宣布了Shorts创作者基金的重大更新，为短视频创作者提供更多变现机会。'),
      content: `YouTube在2024年推出了全新的Shorts变现政策，为全球创作者带来了更多收益机会。\n\n**主要变化包括：**\n\n1. **降低门槛**：订阅者要求从1000降至500，观看时长要求也相应调整\n2. **收益分成**：Shorts广告收益分成比例提升至45%\n3. **创作者基金**：新增10万美元的Shorts创作者基金\n4. **多元化变现**：支持超级感谢、频道会员等功能\n\n**对创作者的影响：**\n\n这些变化意味着更多小型创作者能够开始变现，同时也鼓励了高质量短视频内容的创作。专家预测，这将继续推动短视频生态的发展。\n\n**申请条件：**\n\n- 频道订阅者达到500人\n- 过去90天内Shorts观看时长超过3000小时\n- 遵守YouTube社区准则\n- 居住在符合条件的国家或地区\n\n创作者可以通过YouTube Studio申请加入合作伙伴计划，审核通过后即可开始享受新的变现政策。`,
      category: 'platform-updates',
      tags: ['YouTube', 'Shorts', '变现', '创作者基金', '政策更新'],
      publishDate: '2024-01-15',
      readTime: '5分钟',
      views: 15420,
      likes: 892,
      featured: true,
      author: {
        name: '李明',
        avatar: '/avatars/liming.jpg',
        role: '平台政策分析师'
      }
    },
    {
      id: 'ai-thumbnail-generation-trends',
      title: t('news.ai2024.title', 'AI生成缩略图技术的最新发展趋势'),
      summary: t('news.ai2024.summary', '人工智能在视频缩略图生成领域的应用越来越广泛，为创作者提供了新的创作工具。'),
      content: `人工智能技术在视频缩略图生成领域正在快速发展，为内容创作者带来了革命性的变化。\n\n**技术突破：**\n\n1. **智能分析**：AI能够分析视频内容，自动识别关键帧和重要元素\n2. **风格迁移**：支持将特定艺术风格应用到缩略图设计中\n3. **个性化推荐**：根据频道风格和受众偏好生成定制化缩略图\n4. **A/B测试**：自动生成多个版本进行效果测试\n\n**主要工具和平台：**\n\n- **Canva AI**：集成了智能设计建议功能\n- **Adobe Sensei**：提供智能裁剪和色彩优化\n- **Thumbnail.ai**：专门的AI缩略图生成平台\n- **YouTube Studio**：内置AI辅助设计工具\n\n**应用效果：**\n\n根据最新研究，使用AI辅助生成的缩略图平均点击率提升了23%，创作时间减少了60%。\n\n**未来展望：**\n\n专家预测，到2025年，超过70%的YouTube创作者将使用某种形式的AI辅助工具来优化缩略图设计。`,
      category: 'technology',
      tags: ['AI', '人工智能', '缩略图', '设计工具', '技术趋势'],
      publishDate: '2024-01-12',
      readTime: '7分钟',
      views: 8930,
      likes: 567,
      featured: true,
      author: {
        name: '张伟',
        avatar: '/avatars/zhangwei.jpg',
        role: '技术研究员'
      }
    },
    {
      id: 'youtube-algorithm-changes-2024',
      title: t('news.algorithm2024.title', 'YouTube算法2024年重大调整分析'),
      summary: t('news.algorithm2024.summary', 'YouTube对推荐算法进行了重要更新，更加注重用户参与度和内容质量。'),
      content: `YouTube在2024年对其核心推荐算法进行了重大调整，这些变化将显著影响内容的曝光和推荐机制。\n\n**主要算法变化：**\n\n1. **参与度权重增加**：评论、分享、完播率的权重显著提升\n2. **内容质量评估**：引入更严格的内容质量评估机制\n3. **多样性推荐**：增加内容类型和创作者的多样性\n4. **实时反馈**：更快速地响应用户行为变化\n\n**对创作者的影响：**\n\n- **积极影响**：高质量内容获得更多曝光机会\n- **挑战**：需要更加注重用户互动和内容深度\n- **机会**：小创作者有更多机会被发现\n\n**优化策略建议：**\n\n1. **提高完播率**：制作引人入胜的开头和结尾\n2. **鼓励互动**：在视频中主动引导观众评论和分享\n3. **内容深度**：提供有价值、有深度的内容\n4. **发布频率**：保持稳定的发布节奏\n\n**数据表现：**\n\n调整后的算法显示，优质内容的平均观看时长增加了18%，用户满意度提升了15%。`,
      category: 'algorithm',
      tags: ['YouTube', '算法', '推荐系统', 'SEO', '内容优化'],
      publishDate: '2024-01-10',
      readTime: '6分钟',
      views: 12750,
      likes: 743,
      featured: true,
      author: {
        name: '王芳',
        avatar: '/avatars/wangfang.jpg',
        role: '数据分析专家'
      }
    },
    {
      id: 'mobile-video-consumption-trends',
      title: t('news.mobile2024.title', '移动端视频消费趋势报告2024'),
      summary: t('news.mobile2024.summary', '最新研究显示，移动端视频消费占比持续上升，短视频格式更受欢迎。'),
      content: `2024年移动端视频消费趋势报告显示了用户观看习惯的显著变化。\n\n**关键数据：**\n\n- 移动端视频观看时长占总时长的78%（同比增长12%）\n- 短视频（<60秒）完播率达到85%\n- 竖屏视频的参与度比横屏高出35%\n- 夜间观看高峰期为20:00-23:00\n\n**用户行为特征：**\n\n1. **碎片化观看**：用户更倾向于在通勤、等待等碎片时间观看\n2. **快速切换**：平均每个视频的决策时间仅为3秒\n3. **社交分享**：移动端分享率比桌面端高出60%\n4. **多任务处理**：40%的用户在观看视频时进行其他活动\n\n**内容偏好变化：**\n\n- **教育类内容**：增长率达到45%\n- **生活方式**：保持稳定增长\n- **娱乐搞笑**：仍然是最受欢迎的类别\n- **新闻资讯**：移动端消费占比达到82%\n\n**对创作者的启示：**\n\n1. 优化移动端观看体验\n2. 制作更多竖屏内容\n3. 关注视频开头的吸引力\n4. 适应碎片化观看习惯`,
      category: 'market-research',
      tags: ['移动端', '视频消费', '用户行为', '市场趋势', '数据报告'],
      publishDate: '2024-01-08',
      readTime: '8分钟',
      views: 6840,
      likes: 421,
      featured: false,
      author: {
        name: '刘强',
        avatar: '/avatars/liuqiang.jpg',
        role: '市场研究分析师'
      }
    },
    {
      id: 'creator-economy-growth-2024',
      title: t('news.economy2024.title', '创作者经济2024年增长报告'),
      summary: t('news.economy2024.summary', '创作者经济继续快速增长，预计2024年市场规模将达到1040亿美元。'),
      content: `创作者经济在2024年继续保持强劲增长势头，成为数字经济的重要组成部分。\n\n**市场规模：**\n\n- 2024年预计达到1040亿美元\n- 同比增长22.3%\n- 全球创作者数量超过5000万\n- 全职创作者占比达到18%\n\n**收入来源多样化：**\n\n1. **广告收入**：仍然是主要收入来源（45%）\n2. **品牌合作**：快速增长（28%）\n3. **付费订阅**：稳定增长（15%）\n4. **商品销售**：新兴收入源（12%）\n\n**地区分布：**\n\n- **北美**：占全球市场的40%\n- **亚太地区**：增长最快，占比35%\n- **欧洲**：稳定发展，占比20%\n- **其他地区**：占比5%\n\n**平台生态：**\n\n各大平台都在加大对创作者的支持力度：\n- YouTube：创作者基金和分成优化\n- TikTok：创作者激励计划\n- Instagram：Reels奖励机制\n- Twitch：订阅分成调整\n\n**挑战与机遇：**\n\n虽然市场前景乐观，但创作者也面临内容同质化、平台依赖性等挑战。成功的创作者需要建立多元化的收入来源和个人品牌。`,
      category: 'industry-analysis',
      tags: ['创作者经济', '市场分析', '收入模式', '行业报告', '数字经济'],
      publishDate: '2024-01-05',
      readTime: '9分钟',
      views: 9560,
      likes: 678,
      featured: false,
      author: {
        name: '陈静',
        avatar: '/avatars/chenjing.jpg',
        role: '行业分析师'
      }
    },
    {
      id: 'video-seo-best-practices-2024',
      title: t('news.seo2024.title', '2024年视频SEO最佳实践指南'),
      summary: t('news.seo2024.summary', '掌握最新的视频SEO技巧，提高视频在搜索结果中的排名和可见性。'),
      content: `视频SEO在2024年变得更加重要，正确的优化策略能够显著提升视频的曝光度和观看量。\n\n**关键优化要素：**\n\n1. **标题优化**\n   - 包含目标关键词\n   - 长度控制在60字符以内\n   - 使用吸引人的词汇\n\n2. **描述优化**\n   - 前125字符最重要\n   - 包含相关关键词\n   - 添加时间戳和章节\n\n3. **标签策略**\n   - 使用10-15个相关标签\n   - 包含长尾关键词\n   - 参考竞争对手标签\n\n4. **缩略图优化**\n   - 高对比度设计\n   - 清晰的文字说明\n   - 符合品牌风格\n\n**技术SEO要点：**\n\n- **文件命名**：使用描述性文件名\n- **字幕添加**：提高可访问性和SEO\n- **章节标记**：改善用户体验\n- **结构化数据**：帮助搜索引擎理解内容\n\n**平台特定优化：**\n\n**YouTube：**\n- 利用YouTube Shorts\n- 优化播放列表\n- 使用社区功能\n\n**其他平台：**\n- 适配各平台算法\n- 交叉推广策略\n- 数据分析优化\n\n**效果测量：**\n\n定期监控关键指标：点击率、观看时长、搜索排名、转化率等。`,
      category: 'seo-optimization',
      tags: ['视频SEO', '搜索优化', '关键词', '排名提升', '流量增长'],
      publishDate: '2024-01-03',
      readTime: '10分钟',
      views: 7230,
      likes: 534,
      featured: false,
      author: {
        name: '赵磊',
        avatar: '/avatars/zhaolei.jpg',
        role: 'SEO专家'
      }
    }
  ];

  const categories = [
    { id: 'all', name: t('news.categories.all', '全部新闻'), icon: Newspaper, count: newsArticles.length },
    { id: 'platform-updates', name: t('news.categories.platformUpdates', '平台更新'), icon: Youtube, count: newsArticles.filter(a => a.category === 'platform-updates').length },
    { id: 'technology', name: t('news.categories.technology', '技术趋势'), icon: Zap, count: newsArticles.filter(a => a.category === 'technology').length },
    { id: 'algorithm', name: t('news.categories.algorithm', '算法分析'), icon: BarChart3, count: newsArticles.filter(a => a.category === 'algorithm').length },
    { id: 'market-research', name: t('news.categories.marketResearch', '市场研究'), icon: TrendingUp, count: newsArticles.filter(a => a.category === 'market-research').length },
    { id: 'industry-analysis', name: t('news.categories.industryAnalysis', '行业分析'), icon: Briefcase, count: newsArticles.filter(a => a.category === 'industry-analysis').length },
    { id: 'seo-optimization', name: t('news.categories.seoOptimization', 'SEO优化'), icon: Target, count: newsArticles.filter(a => a.category === 'seo-optimization').length }
  ];

  const filteredArticles = newsArticles.filter(article => {
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    const matchesSearch = searchTerm === '' || 
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  const featuredArticles = newsArticles.filter(article => article.featured);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (selectedArticle) {
    return (
      <>
        <Helmet>
          <title>{selectedArticle.title} - YouTube资讯 - {t('siteTitle')}</title>
          <meta name="description" content={selectedArticle.summary} />
        </Helmet>
        
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
          {/* Header */}
          <Header currentPage="news" />

          <main className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto">
              {/* Article Header */}
              <div className="mb-8">
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  {selectedArticle.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <h1 className="text-3xl font-bold text-slate-800 mb-4">
                  {selectedArticle.title}
                </h1>
                
                <div className="flex items-center space-x-6 text-slate-600 mb-6">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(selectedArticle.publishDate)}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4" />
                    <span>{selectedArticle.readTime}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Eye className="h-4 w-4" />
                    <span>{selectedArticle.views.toLocaleString()} 次阅读</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <ThumbsUp className="h-4 w-4" />
                    <span>{selectedArticle.likes} 点赞</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-slate-300 rounded-full flex items-center justify-center">
                    <Users className="h-5 w-5 text-slate-600" />
                  </div>
                  <div>
                    <div className="font-medium text-slate-800">{selectedArticle.author.name}</div>
                    <div className="text-sm text-slate-600">{selectedArticle.author.role}</div>
                  </div>
                </div>
                
                <p className="text-lg text-slate-600 leading-relaxed">
                  {selectedArticle.summary}
                </p>
              </div>

              {/* Article Content */}
              <div className="prose max-w-none">
                {selectedArticle.content.split('\n').map((paragraph, index) => {
                  if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                    return (
                      <h3 key={index} className="text-xl font-bold text-slate-800 mt-8 mb-4">
                        {paragraph.slice(2, -2)}
                      </h3>
                    );
                  }
                  if (paragraph.startsWith('- **') || paragraph.startsWith('1. **') || paragraph.startsWith('2. **') || paragraph.startsWith('3. **') || paragraph.startsWith('4. **')) {
                    return (
                      <li key={index} className="mb-2 text-slate-700">
                        {paragraph.replace(/^[\d\-\s]*\*\*(.*?)\*\*:?\s*/, '<strong>$1</strong>: ').replace(/<strong>(.*?)<\/strong>/, '<strong>$1</strong>')}
                      </li>
                    );
                  }
                  return paragraph && (
                    <p key={index} className="mb-4 text-slate-700 leading-relaxed">
                      {paragraph}
                    </p>
                  );
                })}
              </div>

              {/* Article Actions */}
              <div className="mt-12 p-6 bg-slate-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Button variant="outline" className="flex items-center space-x-2">
                      <ThumbsUp className="h-4 w-4" />
                      <span>点赞 ({selectedArticle.likes})</span>
                    </Button>
                    <Button variant="outline" className="flex items-center space-x-2">
                      <Share2 className="h-4 w-4" />
                      <span>分享</span>
                    </Button>
                  </div>
                  <div className="text-sm text-slate-600">
                    {selectedArticle.views.toLocaleString()} 次阅读
                  </div>
                </div>
              </div>

              {/* Related Articles */}
              <div className="mt-16">
                <h2 className="text-2xl font-bold text-slate-800 mb-6">相关文章</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {newsArticles
                    .filter(a => a.id !== selectedArticle.id && a.category === selectedArticle.category)
                    .slice(0, 4)
                    .map((article) => (
                      <Card 
                        key={article.id} 
                        className="cursor-pointer hover:shadow-md transition-all duration-200"
                        onClick={() => setSelectedArticle(article)}
                      >
                        <CardHeader>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs text-slate-500">
                              {formatDate(article.publishDate)}
                            </span>
                            <span className="text-xs text-slate-500 flex items-center space-x-1">
                              <Clock className="h-3 w-3" />
                              <span>{article.readTime}</span>
                            </span>
                          </div>
                          <CardTitle className="text-lg text-slate-800">
                            {article.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-slate-600 text-sm mb-4">
                            {article.summary}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4 text-sm text-slate-500">
                              <span className="flex items-center space-x-1">
                                <Eye className="h-4 w-4" />
                                <span>{article.views.toLocaleString()}</span>
                              </span>
                              <span className="flex items-center space-x-1">
                                <ThumbsUp className="h-4 w-4" />
                                <span>{article.likes}</span>
                              </span>
                            </div>
                            <ChevronRight className="h-5 w-5 text-slate-400" />
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  }
                </div>
              </div>
            </div>
          </main>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>行业资讯 - YouTube创作最新动态 - {t('siteTitle')}</title>
        <meta name="description" content="获取最新的YouTube创作行业资讯、平台更新、创作技巧和趋势分析，助力内容创作者把握行业脉搏。" />
        <link rel="canonical" href={`${window.location.origin}/news`} />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <Header currentPage="news" />


        <main className="container mx-auto px-4 py-12">
          <div className="max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="text-center mb-12">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <div className="bg-blue-600 p-3 rounded-lg">
                  <Newspaper className="h-8 w-8 text-white" />
                </div>
                <h1 className="text-4xl font-bold text-slate-800">
                  {t('news.pageTitle', 'YouTube资讯中心')}
                </h1>
              </div>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                {t('news.pageDescription', '获取最新的平台动态、技术趋势、算法变化和行业分析')}
              </p>
            </div>

            {/* Search */}
            <div className="mb-8">
              <div className="max-w-2xl mx-auto">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="搜索资讯..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                  />
                </div>
              </div>
            </div>

            {/* Featured Articles */}
            {featuredArticles.length > 0 && selectedCategory === 'all' && searchTerm === '' && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center space-x-2">
                  <Star className="h-6 w-6 text-yellow-500" />
                  <span>热门资讯</span>
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {featuredArticles.map((article) => (
                    <Card 
                      key={article.id} 
                      className="cursor-pointer hover:shadow-lg transition-all duration-300 border-2 border-yellow-200 bg-gradient-to-br from-yellow-50 to-orange-50"
                      onClick={() => setSelectedArticle(article)}
                    >
                      <CardHeader>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-slate-500">
                            {formatDate(article.publishDate)}
                          </span>
                          <span className="text-xs font-medium text-yellow-700 bg-yellow-100 px-2 py-1 rounded-full">
                            热门
                          </span>
                        </div>
                        <CardTitle className="text-lg text-slate-800">
                          {article.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-slate-600 text-sm mb-4">
                          {article.summary}
                        </p>
                        <div className="flex flex-wrap gap-1 mb-4">
                          {article.tags.slice(0, 3).map((tag) => (
                            <span 
                              key={tag}
                              className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center justify-between text-sm text-slate-500">
                          <div className="flex items-center space-x-4">
                            <span className="flex items-center space-x-1">
                              <Clock className="h-4 w-4" />
                              <span>{article.readTime}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <Eye className="h-4 w-4" />
                              <span>{article.views.toLocaleString()}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <ThumbsUp className="h-4 w-4" />
                              <span>{article.likes}</span>
                            </span>
                          </div>
                          <ChevronRight className="h-5 w-5 text-slate-400" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Category Filter */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-slate-800 mb-3">资讯分类</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
                {categories.map((category) => {
                  const IconComponent = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`p-3 rounded-lg font-medium transition-colors flex flex-col items-center space-y-2 ${
                        selectedCategory === category.id
                          ? 'bg-blue-600 text-white'
                          : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
                      }`}
                    >
                      <IconComponent className="h-5 w-5" />
                      <span className="text-sm">{category.name}</span>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        selectedCategory === category.id
                          ? 'bg-white text-blue-600'
                          : 'bg-slate-200 text-slate-700'
                      }`}>
                        {category.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Articles Grid */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-800">
                  {selectedCategory === 'all' ? '全部资讯' : categories.find(c => c.id === selectedCategory)?.name}
                </h2>
                <span className="text-slate-600">
                  共 {filteredArticles.length} 篇文章
                </span>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredArticles.map((article) => (
                  <Card 
                    key={article.id} 
                    className="cursor-pointer hover:shadow-md transition-all duration-200"
                    onClick={() => setSelectedArticle(article)}
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-slate-500">
                          {formatDate(article.publishDate)}
                        </span>
                        {article.featured && (
                          <span className="text-xs font-medium text-yellow-700 bg-yellow-100 px-2 py-1 rounded-full">
                            热门
                          </span>
                        )}
                      </div>
                      <CardTitle className="text-lg text-slate-800">
                        {article.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-600 text-sm mb-4">
                        {article.summary}
                      </p>
                      <div className="flex flex-wrap gap-1 mb-4">
                        {article.tags.slice(0, 3).map((tag) => (
                          <span 
                            key={tag}
                            className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-slate-500">
                          <span className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{article.readTime}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Eye className="h-4 w-4" />
                            <span>{article.views.toLocaleString()}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <ThumbsUp className="h-4 w-4" />
                            <span>{article.likes}</span>
                          </span>
                        </div>
                        <ChevronRight className="h-5 w-5 text-slate-400" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Empty State */}
            {filteredArticles.length === 0 && (
              <div className="text-center py-12">
                <div className="bg-slate-100 p-6 rounded-full w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                  <Search className="h-12 w-12 text-slate-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">
                  未找到相关资讯
                </h3>
                <p className="text-slate-600 mb-4">
                  请尝试调整搜索关键词或选择其他分类。
                </p>
                <Button 
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                  }}
                  variant="outline"
                >
                  重置筛选
                </Button>
              </div>
            )}

            {/* CTA Section */}
            <div className="mt-16">
              <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
                <CardContent className="p-8 text-center">
                  <div className="flex items-center justify-center space-x-3 mb-4">
                    <div className="bg-blue-600 p-3 rounded-lg">
                      <Newspaper className="h-8 w-8 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-800">
                      保持资讯更新
                    </h2>
                  </div>
                  <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
                    关注我们的资讯中心，获取最新的YouTube平台动态、技术趋势和行业分析。
                    让您在快速变化的数字世界中保持领先。
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to={`/${lng}`}>
                      <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3">
                        <Play className="h-5 w-5 mr-2" />
                        开始使用工具
                      </Button>
                    </Link>
                    <Link to={`/${lng}/tutorials`}>
                      <Button variant="outline" className="px-6 py-3">
                        <BookOpen className="h-5 w-5 mr-2" />
                        查看教程
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default News;