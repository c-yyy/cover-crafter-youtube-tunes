import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Youtube, 
  Download, 
  Image, 
  Clock, 
  Hash, 
  Link as LinkIcon, 
  Copy, 
  Check, 
  Search, 
  Menu, 
  X,
  Calculator,
  Palette,
  FileText,
  BarChart3,
  Zap,
  Globe,
  Shield,
  Star,
  ExternalLink,
  Play,
  Eye,
  Calendar,
  Tag,
  Users,
  TrendingUp,
  Settings,
  Info
} from "lucide-react";
import { Link, useParams } from 'react-router-dom';
import { Header } from '../components/Header';

interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: any;
  featured: boolean;
  comingSoon?: boolean;
}

const Tools = () => {
  const { t, i18n } = useTranslation();
  const { lng } = useParams<{ lng: string }>();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedText, setCopiedText] = useState('');
  
  // YouTube URL 分析工具状态
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [urlAnalysis, setUrlAnalysis] = useState<any>(null);
  
  // 视频时长计算器状态
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');
  const [totalSeconds, setTotalSeconds] = useState(0);

  const tools: Tool[] = [
    {
      id: 'thumbnail-extractor',
      name: t('tools.thumbnailExtractor.name', 'YouTube缩略图提取器'),
      description: t('tools.thumbnailExtractor.description', '快速提取YouTube视频的高质量缩略图，支持多种分辨率下载'),
      category: 'extraction',
      icon: Image,
      featured: true
    },
    {
      id: 'url-analyzer',
      name: t('tools.linkAnalyzer.name', 'YouTube链接分析器'),
      description: t('tools.linkAnalyzer.description', '分析YouTube链接，提取视频ID、频道信息和播放列表详情'),
      category: 'analysis',
      icon: LinkIcon,
      featured: true
    },
    {
      id: 'duration-calculator',
      name: t('tools.durationCalculator.name', '视频时长计算器'),
      description: t('tools.durationCalculator.description', '计算视频总时长，支持小时、分钟、秒的转换'),
      category: 'utility',
      icon: Clock,
      featured: false
    },
    {
      id: 'hashtag-generator',
      name: t('tools.tagGenerator.name', 'YouTube标签生成器'),
      description: t('tools.tagGenerator.description', '根据视频内容生成相关的YouTube标签和关键词'),
      category: 'seo',
      icon: Hash,
      featured: true
    },
    {
      id: 'title-optimizer',
      name: t('tools.titleOptimizer.name', '视频标题优化器'),
      description: t('tools.titleOptimizer.description', '优化YouTube视频标题，提高搜索排名和点击率'),
      category: 'seo',
      icon: FileText,
      featured: false
    },
    {
      id: 'thumbnail-analyzer',
      name: '缩略图分析器',
      description: '分析缩略图的色彩、构图和吸引力，提供优化建议',
      category: 'analysis',
      icon: Palette,
      featured: false
    },
    {
      id: 'engagement-calculator',
      name: '互动率计算器',
      description: '计算YouTube视频的互动率、观看率等关键指标',
      category: 'analytics',
      icon: BarChart3,
      featured: true
    },
    {
      id: 'channel-analyzer',
      name: t('tools.channelAnalyzer.name', '频道分析器'),
      description: t('tools.channelAnalyzer.description', '分析YouTube频道的统计数据和增长趋势'),
      category: 'analytics',
      icon: TrendingUp,
      featured: false
    },
    {
      id: 'video-downloader',
      name: '视频下载器',
      description: '下载YouTube视频（仅限个人使用，请遵守版权法）',
      category: 'extraction',
      icon: Download,
      featured: false,
      comingSoon: true
    },
    {
      id: 'subtitle-extractor',
      name: '字幕提取器',
      description: '提取YouTube视频的字幕文件，支持多种语言',
      category: 'extraction',
      icon: FileText,
      featured: false,
      comingSoon: true
    },
    {
      id: 'trending-tracker',
      name: '热门趋势追踪',
      description: '追踪YouTube热门视频和趋势话题',
      category: 'analytics',
      icon: TrendingUp,
      featured: false,
      comingSoon: true
    },
    {
      id: 'competitor-analyzer',
      name: '竞争对手分析',
      description: '分析竞争对手的YouTube策略和表现',
      category: 'analytics',
      icon: Users,
      featured: false,
      comingSoon: true
    }
  ];

  const categories = [
    { id: 'all', name: t('tools.categories.all', '全部工具'), icon: Zap, count: tools.length },
    { id: 'extraction', name: t('tools.categories.extraction', '内容提取'), icon: Download, count: tools.filter(tool => tool.category === 'extraction').length },
    { id: 'analysis', name: t('tools.categories.analysis', '数据分析'), icon: BarChart3, count: tools.filter(tool => tool.category === 'analysis').length },
    { id: 'seo', name: t('tools.categories.seo', 'SEO优化'), icon: TrendingUp, count: tools.filter(tool => tool.category === 'seo').length },
    { id: 'utility', name: t('tools.categories.utility', '实用工具'), icon: Calculator, count: tools.filter(tool => tool.category === 'utility').length },
    { id: 'analytics', name: t('tools.categories.analytics', '统计分析'), icon: BarChart3, count: tools.filter(tool => tool.category === 'analytics').length }
  ];

  const filteredTools = tools.filter(tool => {
    const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
    const matchesSearch = searchTerm === '' || 
      tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  const featuredTools = tools.filter(tool => tool.featured && !tool.comingSoon);

  // YouTube URL 分析功能
  const analyzeYouTubeUrl = () => {
    if (!youtubeUrl) return;
    
    try {
      const url = new URL(youtubeUrl);
      let videoId = '';
      let channelId = '';
      let playlistId = '';
      let timestamp = '';
      
      // 提取视频ID
      if (url.hostname.includes('youtube.com')) {
        videoId = url.searchParams.get('v') || '';
        playlistId = url.searchParams.get('list') || '';
        timestamp = url.searchParams.get('t') || '';
      } else if (url.hostname.includes('youtu.be')) {
        videoId = url.pathname.substring(1);
        timestamp = url.searchParams.get('t') || '';
      }
      
      setUrlAnalysis({
        originalUrl: youtubeUrl,
        videoId,
        channelId,
        playlistId,
        timestamp,
        embedUrl: videoId ? `https://www.youtube.com/embed/${videoId}` : '',
        thumbnailUrl: videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : ''
      });
    } catch (error) {
      setUrlAnalysis({ error: '无效的URL格式' });
    }
  };

  // 时长计算功能
  const calculateDuration = () => {
    const h = parseInt(hours) || 0;
    const m = parseInt(minutes) || 0;
    const s = parseInt(seconds) || 0;
    
    const total = h * 3600 + m * 60 + s;
    setTotalSeconds(total);
  };

  const formatDuration = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    
    if (h > 0) {
      return `${h}小时 ${m}分钟 ${s}秒`;
    } else if (m > 0) {
      return `${m}分钟 ${s}秒`;
    } else {
      return `${s}秒`;
    }
  };

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(label);
      setTimeout(() => setCopiedText(''), 2000);
    } catch (error) {
      console.error('复制失败:', error);
    }
  };

  return (
    <>
      <Helmet>
        <title>{t('toolsPageTitle')} - {t('siteTitle')}</title>
        <meta name="description" content={t('toolsPageDescription')} />
        <link rel="canonical" href={`${window.location.origin}/tools`} />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <Header currentPage="tools" />

        <main className="container mx-auto px-4 py-12">
          <div className="max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="text-center mb-12">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <div className="bg-purple-600 p-3 rounded-lg">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <h1 className="text-4xl font-bold text-slate-800">
                  {t('tools.pageTitle', 'YouTube创作者工具集')}
                </h1>
              </div>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                {t('tools.pageDescription', '专业的YouTube工具套件，提升你的创作效率和内容质量')}
              </p>
            </div>

            {/* Search */}
            <div className="mb-8">
              <div className="max-w-2xl mx-auto">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input
                    type="text"
                    placeholder={t('faqSearchPlaceholder')}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg"
                  />
                </div>
              </div>
            </div>

            {/* Featured Tools */}
            {featuredTools.length > 0 && selectedCategory === 'all' && searchTerm === '' && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center space-x-2">
                  <Star className="h-6 w-6 text-yellow-500" />
                  <span>{t('faqPopularQuestions')}</span>
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {featuredTools.map((tool) => {
                    const IconComponent = tool.icon;
                    return (
                      <Card 
                        key={tool.id} 
                        className="cursor-pointer hover:shadow-lg transition-all duration-300 border-2 border-yellow-200 bg-gradient-to-br from-yellow-50 to-orange-50"
                      >
                        <CardHeader>
                          <div className="flex items-center justify-between mb-2">
                            <div className="bg-yellow-500 p-2 rounded-lg">
                              <IconComponent className="h-6 w-6 text-white" />
                            </div>
                            <span className="text-xs font-medium text-yellow-700 bg-yellow-100 px-2 py-1 rounded-full">
                              精选
                            </span>
                          </div>
                          <CardTitle className="text-lg text-slate-800">
                            {tool.name}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-slate-600 text-sm mb-4">
                            {tool.description}
                          </p>
                          {tool.id === 'thumbnail-extractor' ? (
                            <Link to={`/${lng}`}>
                              <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white">
                                <Play className="h-4 w-4 mr-2" />
                                立即使用
                              </Button>
                            </Link>
                          ) : (
                            <Button 
                              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white"
                              onClick={() => {
                                const element = document.getElementById(tool.id);
                                element?.scrollIntoView({ behavior: 'smooth' });
                              }}
                            >
                              <Play className="h-4 w-4 mr-2" />
                              立即使用
                            </Button>
                          )}
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Category Filter */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">工具分类</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                {categories.map((category) => {
                  const IconComponent = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`p-4 rounded-lg font-medium transition-colors flex flex-col items-center space-y-2 ${
                        selectedCategory === category.id
                          ? 'bg-purple-600 text-white'
                          : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
                      }`}
                    >
                      <IconComponent className="h-6 w-6" />
                      <span className="text-sm">{category.name}</span>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        selectedCategory === category.id
                          ? 'bg-white text-purple-600'
                          : 'bg-slate-200 text-slate-700'
                      }`}>
                        {category.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Interactive Tools Section */}
            <div className="mb-12 space-y-8">
              {/* YouTube URL Analyzer */}
              <Card id="url-analyzer" className="border-2 border-blue-200">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-600 p-2 rounded-lg">
                      <LinkIcon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-xl">YouTube链接分析器</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex space-x-2">
                      <Input
                        placeholder="输入YouTube视频链接..."
                        value={youtubeUrl}
                        onChange={(e) => setYoutubeUrl(e.target.value)}
                        className="flex-1"
                      />
                      <Button onClick={analyzeYouTubeUrl} className="bg-blue-600 hover:bg-blue-700">
                        分析
                      </Button>
                    </div>
                    
                    {urlAnalysis && (
                      <div className="mt-4 p-4 bg-slate-50 rounded-lg">
                        {urlAnalysis.error ? (
                          <p className="text-red-600">{urlAnalysis.error}</p>
                        ) : (
                          <div className="space-y-3">
                            <div className="grid md:grid-cols-2 gap-4">
                              <div>
                                <label className="text-sm font-medium text-slate-700">视频ID:</label>
                                <div className="flex items-center space-x-2 mt-1">
                                  <code className="bg-white px-2 py-1 rounded text-sm flex-1">
                                    {urlAnalysis.videoId || '未找到'}
                                  </code>
                                  {urlAnalysis.videoId && (
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => copyToClipboard(urlAnalysis.videoId, '视频ID')}
                                    >
                                      {copiedText === '视频ID' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                    </Button>
                                  )}
                                </div>
                              </div>
                              
                              <div>
                                <label className="text-sm font-medium text-slate-700">嵌入链接:</label>
                                <div className="flex items-center space-x-2 mt-1">
                                  <code className="bg-white px-2 py-1 rounded text-sm flex-1 truncate">
                                    {urlAnalysis.embedUrl || '未生成'}
                                  </code>
                                  {urlAnalysis.embedUrl && (
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => copyToClipboard(urlAnalysis.embedUrl, '嵌入链接')}
                                    >
                                      {copiedText === '嵌入链接' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                    </Button>
                                  )}
                                </div>
                              </div>
                            </div>
                            
                            {urlAnalysis.thumbnailUrl && (
                              <div>
                                <label className="text-sm font-medium text-slate-700">缩略图预览:</label>
                                <div className="mt-2">
                                  <img 
                                    src={urlAnalysis.thumbnailUrl} 
                                    alt="视频缩略图" 
                                    className="max-w-xs rounded-lg shadow-md"
                                    onError={(e) => {
                                      e.currentTarget.style.display = 'none';
                                    }}
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Duration Calculator */}
              <Card id="duration-calculator" className="border-2 border-green-200">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="bg-green-600 p-2 rounded-lg">
                      <Clock className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-xl">视频时长计算器</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="text-sm font-medium text-slate-700">小时</label>
                        <Input
                          type="number"
                          placeholder="0"
                          value={hours}
                          onChange={(e) => setHours(e.target.value)}
                          min="0"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-slate-700">分钟</label>
                        <Input
                          type="number"
                          placeholder="0"
                          value={minutes}
                          onChange={(e) => setMinutes(e.target.value)}
                          min="0"
                          max="59"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-slate-700">秒</label>
                        <Input
                          type="number"
                          placeholder="0"
                          value={seconds}
                          onChange={(e) => setSeconds(e.target.value)}
                          min="0"
                          max="59"
                        />
                      </div>
                    </div>
                    
                    <Button onClick={calculateDuration} className="bg-green-600 hover:bg-green-700">
                      计算总时长
                    </Button>
                    
                    {totalSeconds > 0 && (
                      <div className="p-4 bg-green-50 rounded-lg">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium text-slate-700">总秒数:</label>
                            <p className="text-lg font-semibold text-green-700">{totalSeconds} 秒</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-slate-700">格式化时长:</label>
                            <p className="text-lg font-semibold text-green-700">{formatDuration(totalSeconds)}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* All Tools Grid */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-800">所有工具</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTools.map((tool) => {
                  const IconComponent = tool.icon;
                  return (
                    <Card 
                      key={tool.id} 
                      className={`cursor-pointer hover:shadow-md transition-all duration-200 ${
                        tool.comingSoon ? 'opacity-75' : ''
                      }`}
                    >
                      <CardHeader>
                        <div className="flex items-center justify-between mb-2">
                          <div className={`p-2 rounded-lg ${
                            tool.category === 'extraction' ? 'bg-blue-600' :
                            tool.category === 'analysis' ? 'bg-purple-600' :
                            tool.category === 'seo' ? 'bg-green-600' :
                            tool.category === 'utility' ? 'bg-orange-600' :
                            'bg-red-600'
                          }`}>
                            <IconComponent className="h-6 w-6 text-white" />
                          </div>
                          <div className="flex space-x-1">
                            {tool.featured && (
                              <span className="text-xs font-medium text-yellow-700 bg-yellow-100 px-2 py-1 rounded-full">
                                精选
                              </span>
                            )}
                            {tool.comingSoon && (
                              <span className="text-xs font-medium text-blue-700 bg-blue-100 px-2 py-1 rounded-full">
                                即将推出
                              </span>
                            )}
                          </div>
                        </div>
                        <CardTitle className="text-lg text-slate-800">
                          {tool.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-slate-600 text-sm mb-4">
                          {tool.description}
                        </p>
                        {tool.comingSoon ? (
                          <Button disabled className="w-full">
                            即将推出
                          </Button>
                        ) : tool.id === 'thumbnail-extractor' ? (
                          <Link to={`/${lng}`}>
                            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                              <Play className="h-4 w-4 mr-2" />
                              立即使用
                            </Button>
                          </Link>
                        ) : (
                          <Button 
                            className="w-full bg-slate-600 hover:bg-slate-700 text-white"
                            onClick={() => {
                              const element = document.getElementById(tool.id);
                              if (element) {
                                element.scrollIntoView({ behavior: 'smooth' });
                              }
                            }}
                          >
                            <Play className="h-4 w-4 mr-2" />
                            立即使用
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Empty State */}
            {filteredTools.length === 0 && (
              <div className="text-center py-12">
                <div className="bg-slate-100 p-6 rounded-full w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                  <Search className="h-12 w-12 text-slate-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">
                  未找到相关工具
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
                  重置搜索
                </Button>
              </div>
            )}

            {/* CTA Section */}
            <div className="mt-16">
              <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
                <CardContent className="p-8 text-center">
                  <div className="flex items-center justify-center space-x-3 mb-4">
                    <div className="bg-purple-600 p-3 rounded-lg">
                      <Zap className="h-8 w-8 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-800">
                      需要更多工具？
                    </h2>
                  </div>
                  <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
                    我们正在不断开发新的工具来帮助YouTube创作者。如果您有特定的需求或建议，
                    请联系我们，我们会优先考虑开发您需要的功能。
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to={`/${lng}/contact`}>
                      <Button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3">
                        <ExternalLink className="h-5 w-5 mr-2" />
                        提交建议
                      </Button>
                    </Link>
                    <Link to={`/${lng}/blog`}>
                      <Button variant="outline" className="px-6 py-3">
                        <Info className="h-5 w-5 mr-2" />
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

export default Tools;