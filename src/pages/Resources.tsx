import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  ExternalLink, 
  Star, 
  Download, 
  Play, 
  Image, 
  Music, 
  Video, 
  Palette, 
  BarChart3, 
  Zap, 
  Globe, 
  Youtube, 
  Menu, 
  X,
  Search,
  Filter,
  Heart,
  Users,
  TrendingUp,
  Award,
  Lightbulb,
  Target
} from "lucide-react";
import { Link, useParams } from 'react-router-dom';
import { Header } from '../components/Header';

interface Resource {
  id: string;
  title: string;
  description: string;
  url: string;
  category: string;
  type: 'free' | 'freemium' | 'paid';
  rating: number;
  tags: string[];
  featured: boolean;
  icon: any;
}

const Resources = () => {
  const { t, i18n } = useTranslation();
  const { lng } = useParams<{ lng: string }>();

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const resources: Resource[] = [
    // 视频编辑工具
    {
      id: '1',
      title: 'DaVinci Resolve',
      description: '专业级免费视频编辑软件，提供强大的调色、剪辑和音频后期功能。',
      url: 'https://www.blackmagicdesign.com/products/davinciresolve',
      category: 'video-editing',
      type: 'freemium',
      rating: 4.8,
      tags: ['专业', '调色', '免费', '跨平台'],
      featured: true,
      icon: Video
    },
    {
      id: '2',
      title: t('resources.items.premiere.title', 'Adobe Premiere Pro'),
      description: t('resources.items.premiere.description', '行业标准的专业视频编辑软件，功能全面，与Adobe生态系统完美集成。'),
      url: 'https://www.adobe.com/products/premiere.html',
      category: 'video-editing',
      type: 'paid',
      rating: 4.7,
      tags: ['专业', '行业标准', '订阅制'],
      featured: true,
      icon: Video
    },
    {
      id: '3',
      title: 'Filmora',
      description: '易于使用的视频编辑软件，适合初学者，提供丰富的模板和特效。',
      url: 'https://filmora.wondershare.com/',
      category: 'video-editing',
      type: 'freemium',
      rating: 4.3,
      tags: ['初学者友好', '模板丰富', '简单易用'],
      featured: false,
      icon: Video
    },
    
    // 图片设计工具
    {
      id: '4',
      title: t('resources.items.canva.title', 'Canva'),
      description: t('resources.items.canva.description', '在线设计平台，提供丰富的YouTube缩略图模板和设计元素。'),
      url: 'https://www.canva.com/',
      category: 'design',
      type: 'freemium',
      rating: 4.6,
      tags: ['在线工具', '模板丰富', '易用'],
      featured: true,
      icon: Palette
    },
    {
      id: '5',
      title: t('resources.items.photoshop.title', 'Adobe Photoshop'),
      description: t('resources.items.photoshop.description', '专业图像编辑软件，缩略图设计和图片处理的行业标准。'),
      url: 'https://www.adobe.com/products/photoshop.html',
      category: 'design',
      type: 'paid',
      rating: 4.8,
      tags: ['专业', '功能强大', '行业标准'],
      featured: true,
      icon: Image
    },
    {
      id: '6',
      title: t('resources.items.gimp.title', 'GIMP'),
      description: t('resources.items.gimp.description', '免费开源的图像编辑软件，功能强大，是Photoshop的免费替代品。'),
      url: 'https://www.gimp.org/',
      category: 'design',
      type: 'free',
      rating: 4.2,
      tags: ['免费', '开源', '跨平台'],
      featured: false,
      icon: Image
    },
    
    // 音频工具
    {
      id: '7',
      title: t('resources.items.audacity.title', 'Audacity'),
      description: t('resources.items.audacity.description', '免费开源的音频编辑软件，适合录音、剪辑和音频处理。'),
      url: 'https://www.audacityteam.org/',
      category: 'audio',
      type: 'free',
      rating: 4.4,
      tags: ['免费', '开源', '音频编辑'],
      featured: false,
      icon: Music
    },
    {
      id: '8',
      title: 'Adobe Audition',
      description: '专业音频编辑和混音软件，提供高级音频处理功能。',
      url: 'https://www.adobe.com/products/audition.html',
      category: 'audio',
      type: 'paid',
      rating: 4.5,
      tags: ['专业', '音频处理', '降噪'],
      featured: false,
      icon: Music
    },
    
    // 分析工具
    {
      id: '9',
      title: t('resources.items.tubebuddy.title', 'TubeBuddy'),
      description: t('resources.items.tubebuddy.description', 'YouTube优化工具，提供关键词研究、SEO优化和分析功能。'),
      url: 'https://www.tubebuddy.com/',
      category: 'analytics',
      type: 'freemium',
      rating: 4.5,
      tags: ['SEO优化', '关键词研究', '分析'],
      featured: true,
      icon: BarChart3
    },
    {
      id: '10',
      title: t('resources.items.vidiq.title', 'VidIQ'),
      description: t('resources.items.vidiq.description', 'YouTube分析和优化平台，帮助创作者提升视频表现。'),
      url: 'https://vidiq.com/',
      category: 'analytics',
      type: 'freemium',
      rating: 4.4,
      tags: ['视频分析', '趋势追踪', '优化建议'],
      featured: true,
      icon: TrendingUp
    },
    
    // 素材资源
    {
      id: '11',
      title: t('resources.items.unsplash.title', 'Unsplash'),
      description: t('resources.items.unsplash.description', '高质量免费图片库，提供可商用的摄影作品。'),
      url: 'https://unsplash.com/',
      category: 'stock',
      type: 'free',
      rating: 4.7,
      tags: ['免费图片', '高质量', '可商用'],
      featured: true,
      icon: Image
    },
    {
      id: '12',
      title: t('resources.items.pexels.title', 'Pexels'),
      description: t('resources.items.pexels.description', '免费图片和视频素材库，内容丰富，更新频繁。'),
      url: 'https://www.pexels.com/',
      category: 'stock',
      type: 'free',
      rating: 4.6,
      tags: ['免费素材', '图片视频', '商用许可'],
      featured: false,
      icon: Video
    },
    {
      id: '13',
      title: 'Epidemic Sound',
      description: '专业音乐库，为内容创作者提供无版权问题的背景音乐。',
      url: 'https://www.epidemicsound.com/',
      category: 'stock',
      type: 'paid',
      rating: 4.8,
      tags: ['背景音乐', '无版权', '高质量'],
      featured: true,
      icon: Music
    },
    
    // 学习资源
    {
      id: '14',
      title: t('resources.items.ytacademy.title', 'YouTube Creator Academy'),
      description: t('resources.items.ytacademy.description', 'YouTube官方创作者学院，提供免费的创作技巧和最佳实践课程。'),
      url: 'https://creatoracademy.youtube.com/',
      category: 'learning',
      type: 'free',
      rating: 4.5,
      tags: ['官方资源', '免费课程', '最佳实践'],
      featured: true,
      icon: BookOpen
    },
    {
      id: '15',
      title: t('resources.items.thinkmedia.title', 'Think Media'),
      description: t('resources.items.thinkmedia.description', '专注于视频营销和YouTube成长的教育频道和课程平台。'),
      url: 'https://thinkmedia.com/',
      category: 'learning',
      type: 'freemium',
      rating: 4.6,
      tags: ['视频营销', '成长策略', '教育内容'],
      featured: false,
      icon: Users
    }
  ];

  const categories = [
    { id: 'all', name: t('resources.categories.all', '全部资源'), icon: Globe, count: resources.length },
    { id: 'video-editing', name: t('resources.categories.videoEditing', '视频编辑'), icon: Video, count: resources.filter(r => r.category === 'video-editing').length },
    { id: 'design', name: t('resources.categories.design', '图片设计'), icon: Palette, count: resources.filter(r => r.category === 'design').length },
    { id: 'audio', name: t('resources.categories.audio', '音频工具'), icon: Music, count: resources.filter(r => r.category === 'audio').length },
    { id: 'analytics', name: t('resources.categories.analytics', '数据分析'), icon: BarChart3, count: resources.filter(r => r.category === 'analytics').length },
    { id: 'stock', name: t('resources.categories.stock', '素材资源'), icon: Image, count: resources.filter(r => r.category === 'stock').length },
    { id: 'learning', name: t('resources.categories.learning', '学习资源'), icon: BookOpen, count: resources.filter(r => r.category === 'learning').length }
  ];

  const types = [
    { id: 'all', name: '全部类型', count: resources.length },
    { id: 'free', name: '免费', count: resources.filter(r => r.type === 'free').length },
    { id: 'freemium', name: '免费增值', count: resources.filter(r => r.type === 'freemium').length },
    { id: 'paid', name: '付费', count: resources.filter(r => r.type === 'paid').length }
  ];

  const filteredResources = resources.filter(resource => {
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    const matchesType = selectedType === 'all' || resource.type === selectedType;
    const matchesSearch = searchTerm === '' || 
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesCategory && matchesType && matchesSearch;
  });

  const featuredResources = resources.filter(resource => resource.featured);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'free': return 'bg-green-100 text-green-700';
      case 'freemium': return 'bg-blue-100 text-blue-700';
      case 'paid': return 'bg-orange-100 text-orange-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case 'free': return '免费';
      case 'freemium': return '免费增值';
      case 'paid': return '付费';
      default: return '未知';
    }
  };

  return (
    <>
      <Helmet>
        <title>创作者资源库 - 专业工具和学习资源推荐 - {t('siteTitle')}</title>
        <meta name="description" content="精选的YouTube创作者工具和资源，包括视频编辑软件、设计工具、音频处理、数据分析和学习资源。帮助创作者提升内容质量和创作效率。" />
        <link rel="canonical" href={`${window.location.origin}/resources`} />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <Header currentPage="resources" />


        <main className="container mx-auto px-4 py-12">
          <div className="max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="text-center mb-12">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <div className="bg-purple-600 p-3 rounded-lg">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <h1 className="text-4xl font-bold text-slate-800">
                  {t('resources.pageTitle', '创作者资源库')}
                </h1>
              </div>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                {t('resources.pageDescription', '精选的专业工具、学习资源和素材库，助力你的YouTube创作之路')}
              </p>
            </div>

            {/* Search and Filters */}
            <div className="mb-8">
              <div className="flex flex-col lg:flex-row gap-4 mb-6">
                {/* Search */}
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="搜索工具、资源..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>
                </div>
                
                {/* Type Filter */}
                <div className="flex gap-2">
                  {types.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setSelectedType(type.id)}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
                        selectedType === type.id
                          ? 'bg-red-600 text-white'
                          : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
                      }`}
                    >
                      <span>{type.name}</span>
                      <span className="bg-slate-200 text-slate-700 px-2 py-1 rounded-full text-xs">
                        {type.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Featured Resources */}
            {featuredResources.length > 0 && selectedCategory === 'all' && selectedType === 'all' && searchTerm === '' && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center space-x-2">
                  <Star className="h-6 w-6 text-yellow-500" />
                  <span>精选推荐</span>
                </h2>
                <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
                  {featuredResources.slice(0, 6).map((resource) => {
                    const IconComponent = resource.icon;
                    return (
                      <Card 
                        key={resource.id} 
                        className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2 border-yellow-200 bg-gradient-to-br from-yellow-50 to-orange-50"
                      >
                        <CardHeader>
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <div className="bg-yellow-500 p-2 rounded-lg">
                                <IconComponent className="h-5 w-5 text-white" />
                              </div>
                              <Badge className="bg-yellow-500 text-white">
                                精选
                              </Badge>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Star className="h-4 w-4 text-yellow-500 fill-current" />
                              <span className="text-sm font-medium">{resource.rating}</span>
                            </div>
                          </div>
                          <CardTitle className="text-lg">
                            {resource.title}
                          </CardTitle>
                          <Badge className={getTypeColor(resource.type)}>
                            {getTypeText(resource.type)}
                          </Badge>
                        </CardHeader>
                        <CardContent>
                          <p className="text-slate-600 mb-4 text-sm leading-relaxed">
                            {resource.description}
                          </p>
                          <div className="flex flex-wrap gap-1 mb-4">
                            {resource.tags.slice(0, 3).map((tag, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <Button 
                            asChild
                            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white"
                          >
                            <a href={resource.url} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4 mr-2" />
                              访问资源
                            </a>
                          </Button>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Category Filter */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">资源分类</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
                {categories.map((category) => {
                  const IconComponent = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`p-4 rounded-lg font-medium transition-colors flex flex-col items-center space-y-2 ${
                        selectedCategory === category.id
                          ? 'bg-red-600 text-white'
                          : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
                      }`}
                    >
                      <IconComponent className="h-6 w-6" />
                      <span className="text-sm">{category.name}</span>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        selectedCategory === category.id
                          ? 'bg-white text-red-600'
                          : 'bg-slate-200 text-slate-700'
                      }`}>
                        {category.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Resources Grid */}
            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
              {filteredResources.map((resource) => {
                const IconComponent = resource.icon;
                return (
                  <Card 
                    key={resource.id} 
                    className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 shadow-md"
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <div className={`p-2 rounded-lg ${
                            resource.category === 'video-editing' ? 'bg-blue-500' :
                            resource.category === 'design' ? 'bg-purple-500' :
                            resource.category === 'audio' ? 'bg-green-500' :
                            resource.category === 'analytics' ? 'bg-orange-500' :
                            resource.category === 'stock' ? 'bg-pink-500' :
                            resource.category === 'learning' ? 'bg-indigo-500' :
                            'bg-slate-500'
                          }`}>
                            <IconComponent className="h-5 w-5 text-white" />
                          </div>
                          {resource.featured && (
                            <Badge className="bg-yellow-500 text-white">
                              精选
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="text-sm font-medium">{resource.rating}</span>
                        </div>
                      </div>
                      <CardTitle className="text-lg">
                        {resource.title}
                      </CardTitle>
                      <Badge className={getTypeColor(resource.type)}>
                        {getTypeText(resource.type)}
                      </Badge>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-600 mb-4 text-sm leading-relaxed">
                        {resource.description}
                      </p>
                      <div className="flex flex-wrap gap-1 mb-4">
                        {resource.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <Button 
                        asChild
                        variant="outline" 
                        className="w-full hover:bg-red-50 hover:border-red-200 hover:text-red-600"
                      >
                        <a href={resource.url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          访问资源
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Empty State */}
            {filteredResources.length === 0 && (
              <div className="text-center py-12">
                <div className="bg-slate-100 p-6 rounded-full w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                  <Search className="h-12 w-12 text-slate-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">
                  未找到相关资源
                </h3>
                <p className="text-slate-600 mb-4">
                  请尝试调整搜索条件或选择其他分类。
                </p>
                <Button 
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                    setSelectedType('all');
                  }}
                  variant="outline"
                >
                  重置筛选
                </Button>
              </div>
            )}

            {/* Call to Action */}
            <div className="mt-16 text-center">
              <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
                <CardContent className="p-8">
                  <div className="flex items-center justify-center space-x-3 mb-4">
                    <div className="bg-purple-600 p-3 rounded-lg">
                      <Lightbulb className="h-8 w-8 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-800">
                      开始你的创作之旅
                    </h2>
                  </div>
                  <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
                    有了这些专业工具和资源，你已经具备了成为优秀YouTube创作者的基础。
                    现在就开始使用我们的缩略图提取工具，为你的视频制作吸引人的缩略图吧！
                  </p>
                  <Link to={`/${lng}`}>
                    <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 text-lg">
                      <Target className="h-5 w-5 mr-2" />
                      开始使用工具
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Resources;