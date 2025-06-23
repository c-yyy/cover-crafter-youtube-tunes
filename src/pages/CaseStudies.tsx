import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Header } from '../components/Header';
import { 
  Youtube, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Calendar, 
  Eye, 
  ThumbsUp, 
  MessageSquare,
  ExternalLink,
  Filter,
  Search,
  BarChart3,
  Target,
  Award,
  FileText,
  Gamepad2,
  Coffee,
  GraduationCap,
  Monitor,
  Music,
  Heart,
  Star,
  Clock,
  ChevronRight,
  Play,
  BookOpen
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface CaseStudy {
  id: string;
  title: string;
  description: string;
  category: string;
  channel: {
    name: string;
    subscribers: string;
    niche: string;
  };
  metrics: {
    beforeCTR: number;
    afterCTR: number;
    improvement: number;
    views: string;
    engagement: number;
  };
  thumbnailBefore: string;
  thumbnailAfter: string;
  keyChanges: string[];
  insights: string[];
  tools: string[];
  timeline: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  featured: boolean;
  tags: string[];
}

const CaseStudies = () => {
  const { t, i18n } = useTranslation();
  const { lng } = useParams<{ lng: string }>();

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);

  const caseStudies: CaseStudy[] = [
    {
      id: 'gaming-channel-redesign',
      title: t('caseStudies.gaming.title', '游戏频道缩略图重设计：点击率提升180%'),
      description: t('caseStudies.gaming.description', '通过重新设计缩略图策略，一个中型游戏频道在3个月内实现了点击率的显著提升。'),
      category: 'gaming',
      channel: {
        name: t('caseStudies.gaming.channelName', 'GameMaster Pro'),
        subscribers: '25万',
        niche: t('caseStudies.gaming.niche', '游戏攻略与评测')
      },
      metrics: {
        beforeCTR: 3.2,
        afterCTR: 8.9,
        improvement: 178,
        views: '+340%',
        engagement: 85
      },
      thumbnailBefore: '/case-studies/gaming-before.jpg',
      thumbnailAfter: '/case-studies/gaming-after.jpg',
      keyChanges: [
          t('caseStudies.gaming.changes.1', '使用高对比度色彩方案'),
          t('caseStudies.gaming.changes.2', '添加清晰的游戏角色特写'),
          t('caseStudies.gaming.changes.3', '简化文字信息，突出关键词'),
          t('caseStudies.gaming.changes.4', '统一品牌视觉元素'),
          t('caseStudies.gaming.changes.5', '针对移动端优化设计')
        ],
      insights: [
        '游戏缩略图中角色表情比游戏画面更能吸引点击',
        '红色和黄色的组合在游戏类别中表现最佳',
        '数字和符号能够快速传达游戏进度信息',
        '保持品牌一致性有助于建立观众认知'
      ],
      tools: ['Photoshop', 'Canva Pro', 'TubeBuddy', 'VidIQ'],
      timeline: '3个月',
      difficulty: 'intermediate',
      featured: true,
      tags: ['游戏', '重设计', '高CTR', '品牌一致性']
    },
    {
      id: 'cooking-channel-optimization',
      title: t('caseStudies.cooking.title', '美食频道缩略图优化：观看时长增加65%'),
      description: t('caseStudies.cooking.description', '通过优化美食缩略图的视觉呈现，显著提升了观众的观看意愿和完播率。'),
      category: 'lifestyle',
      channel: {
        name: t('caseStudies.cooking.channelName', '小厨房大世界'),
        subscribers: '18万',
        niche: t('caseStudies.cooking.niche', '家常菜制作')
      },
      metrics: {
        beforeCTR: 4.1,
        afterCTR: 7.3,
        improvement: 78,
        views: '+125%',
        engagement: 92
      },
      thumbnailBefore: '/case-studies/cooking-before.jpg',
      thumbnailAfter: '/case-studies/cooking-after.jpg',
      keyChanges: [
        t('caseStudies.cooking.changes.1', '使用自然光拍摄食物'),
        t('caseStudies.cooking.changes.2', '添加制作过程的关键步骤'),
        t('caseStudies.cooking.changes.3', '使用暖色调滤镜增强食欲'),
        t('caseStudies.cooking.changes.4', '在缩略图中展示最终成品'),
        t('caseStudies.cooking.changes.5', '添加制作时间和难度标识')
      ],
      insights: [
        '食物的视觉呈现直接影响观看欲望',
        '制作过程比最终成品更能激发好奇心',
        '暖色调能够增强食物的吸引力',
        '时间标识帮助观众做出观看决策'
      ],
      tools: ['手机摄影', 'VSCO', 'Snapseed', 'Canva'],
      timeline: '2个月',
      difficulty: 'beginner',
      featured: true,
      tags: ['美食', '摄影技巧', '色彩优化', '用户体验']
    },
    {
      id: 'education-channel-ab-test',
      title: '教育频道A/B测试：找到最佳缩略图公式',
      description: '通过系统性的A/B测试，发现了教育类内容缩略图的最佳设计模式。',
      category: 'education',
      channel: {
        name: '知识加油站',
        subscribers: '42万',
        niche: '科普教育'
      },
      metrics: {
        beforeCTR: 5.8,
        afterCTR: 11.2,
        improvement: 93,
        views: '+210%',
        engagement: 88
      },
      thumbnailBefore: '/case-studies/education-before.jpg',
      thumbnailAfter: '/case-studies/education-after.jpg',
      keyChanges: [
        '使用问号和感叹号增加好奇心',
        '添加图表和数据可视化元素',
        '使用对比鲜明的背景色',
        '突出显示关键概念和数字',
        '加入人物表情增加亲和力'
      ],
      insights: [
        '问题式标题比陈述式标题效果更好',
        '数据可视化元素能够增加内容的权威性',
        '人物表情能够建立情感连接',
        '简洁的设计比复杂的设计更有效'
      ],
      tools: ['Adobe Illustrator', 'Figma', 'YouTube Analytics', 'Google Analytics'],
      timeline: '4个月',
      difficulty: 'advanced',
      featured: true,
      tags: ['教育', 'A/B测试', '数据驱动', '用户心理']
    },
    {
      id: 'tech-review-mobile-first',
      title: t('caseStudies.tech.title', '科技评测频道移动端优化策略'),
      description: t('caseStudies.tech.description', '针对移动端用户优化缩略图设计，显著提升了移动端的点击率和观看体验。'),
      category: 'technology',
      channel: {
        name: t('caseStudies.tech.channelName', '科技前沿'),
        subscribers: '35万',
        niche: t('caseStudies.tech.niche', '数码产品评测')
      },
      metrics: {
        beforeCTR: 6.2,
        afterCTR: 9.8,
        improvement: 58,
        views: '+95%',
        engagement: 79
      },
      thumbnailBefore: '/case-studies/tech-before.jpg',
      thumbnailAfter: '/case-studies/tech-after.jpg',
      keyChanges: [
        '增大文字尺寸适配小屏幕',
        '简化产品展示，突出核心特性',
        '使用更大的产品图片',
        '减少文字信息，增加视觉元素',
        '优化色彩对比度'
      ],
      insights: [
        '移动端用户更依赖视觉信息而非文字',
        '产品的细节展示比整体展示更有效',
        '高对比度设计在小屏幕上表现更好',
        '简洁的设计更适合快速浏览'
      ],
      tools: ['Sketch', 'Principle', 'Zeplin', 'Mobile Preview Tools'],
      timeline: '6周',
      difficulty: 'intermediate',
      featured: false,
      tags: ['科技', '移动端', '用户体验', '响应式设计']
    },
    {
      id: 'fitness-channel-seasonal',
      title: '健身频道季节性缩略图策略',
      description: '根据不同季节调整缩略图设计策略，实现了全年稳定的高点击率。',
      category: 'fitness',
      channel: {
        name: '健康生活馆',
        subscribers: '28万',
        niche: '健身与营养'
      },
      metrics: {
        beforeCTR: 4.7,
        afterCTR: 8.1,
        improvement: 72,
        views: '+150%',
        engagement: 86
      },
      thumbnailBefore: '/case-studies/fitness-before.jpg',
      thumbnailAfter: '/case-studies/fitness-after.jpg',
      keyChanges: [
        '春季：强调新开始和活力',
        '夏季：突出身材和海滩主题',
        '秋季：关注健康和免疫力',
        '冬季：室内运动和保暖健身',
        '节日：特殊节日相关的健身内容'
      ],
      insights: [
        '季节性内容能够提高相关性',
        '节日主题缩略图表现特别好',
        '颜色选择应该符合季节特征',
        '用户的健身需求随季节变化'
      ],
      tools: ['Photoshop', 'Lightroom', 'Canva', 'Seasonal Color Palettes'],
      timeline: '12个月',
      difficulty: 'intermediate',
      featured: false,
      tags: ['健身', '季节性', '内容策略', '用户需求']
    },
    {
      id: 'music-channel-branding',
      title: '音乐频道品牌化缩略图系统',
      description: '建立统一的品牌化缩略图系统，提升频道识别度和用户忠诚度。',
      category: 'music',
      channel: {
        name: '音乐无界',
        subscribers: '52万',
        niche: '音乐制作与分享'
      },
      metrics: {
        beforeCTR: 5.3,
        afterCTR: 9.6,
        improvement: 81,
        views: '+180%',
        engagement: 94
      },
      thumbnailBefore: '/case-studies/music-before.jpg',
      thumbnailAfter: '/case-studies/music-after.jpg',
      keyChanges: [
        '设计统一的品牌标识系统',
        '使用一致的色彩方案',
        '建立模板化的设计流程',
        '加入音乐可视化元素',
        '创建系列化的视觉语言'
      ],
      insights: [
        '品牌一致性能够建立用户认知',
        '模板化设计提高制作效率',
        '音乐类内容需要强烈的视觉冲击',
        '系列化设计增强用户期待'
      ],
      tools: ['Adobe Creative Suite', 'Brand Guidelines', 'Template Systems'],
      timeline: '5个月',
      difficulty: 'advanced',
      featured: false,
      tags: ['音乐', '品牌化', '系统设计', '视觉识别']
    }
  ];

  const categories = [
    { id: 'all', name: t('caseStudies.categories.all', '全部案例'), icon: FileText, count: caseStudies.length },
    { id: 'gaming', name: t('caseStudies.categories.gaming', '游戏频道'), icon: Gamepad2, count: caseStudies.filter(c => c.category === 'gaming').length },
    { id: 'lifestyle', name: t('caseStudies.categories.lifestyle', '生活方式'), icon: Coffee, count: caseStudies.filter(c => c.category === 'lifestyle').length },
    { id: 'education', name: t('caseStudies.categories.education', '教育内容'), icon: GraduationCap, count: caseStudies.filter(c => c.category === 'education').length },
    { id: 'technology', name: t('caseStudies.categories.technology', '科技评测'), icon: Monitor, count: caseStudies.filter(c => c.category === 'technology').length },
    { id: 'fitness', name: t('caseStudies.categories.fitness', '健身'), icon: Heart, count: caseStudies.filter(c => c.category === 'fitness').length },
    { id: 'music', name: t('caseStudies.categories.music', '音乐'), icon: Music, count: caseStudies.filter(c => c.category === 'music').length }
  ];

  const difficulties = [
    { id: 'all', name: t('caseStudiesFilterAll') },
    { id: 'beginner', name: t('caseStudiesDifficultyBeginner') },
    { id: 'intermediate', name: t('caseStudiesDifficultyIntermediate') },
    { id: 'advanced', name: t('caseStudiesDifficultyAdvanced') }
  ];

  const filteredCases = caseStudies.filter(caseStudy => {
    const matchesCategory = selectedCategory === 'all' || caseStudy.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'all' || caseStudy.difficulty === selectedDifficulty;
    const matchesSearch = searchTerm === '' || 
      caseStudy.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caseStudy.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caseStudy.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesCategory && matchesDifficulty && matchesSearch;
  });

  const featuredCases = caseStudies.filter(caseStudy => caseStudy.featured);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-700 bg-green-100';
      case 'intermediate': return 'text-yellow-700 bg-yellow-100';
      case 'advanced': return 'text-red-700 bg-red-100';
      default: return 'text-slate-700 bg-slate-100';
    }
  };

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return t('caseStudiesDifficultyBeginner');
      case 'intermediate': return t('caseStudiesDifficultyIntermediate');
      case 'advanced': return t('caseStudiesDifficultyAdvanced');
      default: return 'Unknown';
    }
  };

  if (selectedCase) {
    return (
      <>
        <Helmet>
          <title>{selectedCase.title} - 缩略图案例研究 - {t('siteTitle')}</title>
          <meta name="description" content={selectedCase.description} />
        </Helmet>
        
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
          {/* Header */}
          <Header currentPage="case-studies" />

          <main className="container mx-auto px-4 py-12">
            <div className="max-w-6xl mx-auto">
              {/* Case Header */}
              <div className="mb-8">
                <div className="flex items-center space-x-2 mb-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    getDifficultyColor(selectedCase.difficulty)
                  }`}>
                    {getDifficultyText(selectedCase.difficulty)}
                  </span>
                  <span className="text-slate-500">•</span>
                  <span className="text-slate-600 flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{selectedCase.timeline}</span>
                  </span>
                  {selectedCase.featured && (
                    <>
                      <span className="text-slate-500">•</span>
                      <span className="text-xs font-medium text-yellow-700 bg-yellow-100 px-2 py-1 rounded-full">
                        精选案例
                      </span>
                    </>
                  )}
                </div>
                
                <h1 className="text-3xl font-bold text-slate-800 mb-4">
                  {selectedCase.title}
                </h1>
                
                <p className="text-lg text-slate-600 mb-6">
                  {selectedCase.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedCase.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Channel Info */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="h-5 w-5" />
                    <span>频道信息</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <div className="text-sm text-slate-600">频道名称</div>
                      <div className="font-semibold text-slate-800">{selectedCase.channel.name}</div>
                    </div>
                    <div>
                      <div className="text-sm text-slate-600">订阅者数量</div>
                      <div className="font-semibold text-slate-800">{selectedCase.channel.subscribers}</div>
                    </div>
                    <div>
                      <div className="text-sm text-slate-600">内容领域</div>
                      <div className="font-semibold text-slate-800">{selectedCase.channel.niche}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Metrics */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="h-5 w-5" />
                    <span>效果数据</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-red-600">{selectedCase.metrics.beforeCTR}%</div>
                      <div className="text-sm text-slate-600">优化前CTR</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{selectedCase.metrics.afterCTR}%</div>
                      <div className="text-sm text-slate-600">优化后CTR</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">+{selectedCase.metrics.improvement}%</div>
                      <div className="text-sm text-slate-600">提升幅度</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">{selectedCase.metrics.views}</div>
                      <div className="text-sm text-slate-600">观看量增长</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600">{selectedCase.metrics.engagement}%</div>
                      <div className="text-sm text-slate-600">参与度</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Before/After Comparison */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Image className="h-5 w-5" />
                    <span>缩略图对比</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-semibold text-slate-800 mb-3 text-center">优化前</h4>
                      <div className="bg-slate-200 rounded-lg aspect-video flex items-center justify-center">
                        <div className="text-slate-500 text-center">
                          <Image className="h-12 w-12 mx-auto mb-2" />
                          <div>原始缩略图</div>
                          <div className="text-sm">CTR: {selectedCase.metrics.beforeCTR}%</div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800 mb-3 text-center">优化后</h4>
                      <div className="bg-green-100 rounded-lg aspect-video flex items-center justify-center border-2 border-green-300">
                        <div className="text-green-700 text-center">
                          <Image className="h-12 w-12 mx-auto mb-2" />
                          <div>优化缩略图</div>
                          <div className="text-sm">CTR: {selectedCase.metrics.afterCTR}%</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Key Changes */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Edit className="h-5 w-5" />
                    <span>关键改进</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {selectedCase.keyChanges.map((change, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-700">{change}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Insights */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Lightbulb className="h-5 w-5" />
                    <span>关键洞察</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {selectedCase.insights.map((insight, index) => (
                      <div key={index} className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="flex items-start space-x-3">
                          <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                          <span className="text-blue-800">{insight}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Tools Used */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Zap className="h-5 w-5" />
                    <span>使用工具</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {selectedCase.tools.map((tool) => (
                      <span 
                        key={tool}
                        className="px-3 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Related Cases */}
              <div className="mt-16">
                <h2 className="text-2xl font-bold text-slate-800 mb-6">相关案例</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {caseStudies
                    .filter(c => c.id !== selectedCase.id && c.category === selectedCase.category)
                    .slice(0, 3)
                    .map((caseStudy) => (
                      <Card 
                        key={caseStudy.id} 
                        className="cursor-pointer hover:shadow-md transition-all duration-200"
                        onClick={() => setSelectedCase(caseStudy)}
                      >
                        <CardHeader>
                          <div className="flex items-center justify-between mb-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              getDifficultyColor(caseStudy.difficulty)
                            }`}>
                              {getDifficultyText(caseStudy.difficulty)}
                            </span>
                            <span className="text-xs text-slate-500 flex items-center space-x-1">
                              <TrendingUp className="h-3 w-3" />
                              <span>+{caseStudy.metrics.improvement}%</span>
                            </span>
                          </div>
                          <CardTitle className="text-lg text-slate-800">
                            {caseStudy.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-slate-600 text-sm mb-4">
                            {caseStudy.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="text-sm text-slate-500">
                              {caseStudy.channel.name}
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
        <title>{t('caseStudiesPageTitle')} - {t('siteTitle')}</title>
        <meta name="description" content={t('caseStudiesPageDescription')} />
        <link rel="canonical" href={`${window.location.origin}/case-studies`} />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        {/* Header */}
        <Header currentPage="case-studies" />

        <main className="container mx-auto px-4 py-12">
          <div className="max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="text-center mb-12">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <div className="bg-purple-600 p-3 rounded-lg">
                  <FileText className="h-8 w-8 text-white" />
                </div>
                <h1 className="text-4xl font-bold text-slate-800">
                  {t('caseStudies.pageTitle', 'YouTube成功案例研究')}
                </h1>
              </div>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                {t('caseStudies.pageDescription', '深入分析成功的YouTube频道案例，学习他们的策略和技巧')}
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

            {/* Featured Cases */}
            {featuredCases.length > 0 && selectedCategory === 'all' && selectedDifficulty === 'all' && searchTerm === '' && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center space-x-2">
                  <Star className="h-6 w-6 text-yellow-500" />
                  <span>{t('faqPopularQuestions')}</span>
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {featuredCases.map((caseStudy) => (
                    <Card 
                      key={caseStudy.id} 
                      className="cursor-pointer hover:shadow-lg transition-all duration-300 border-2 border-yellow-200 bg-gradient-to-br from-yellow-50 to-orange-50"
                      onClick={() => setSelectedCase(caseStudy)}
                    >
                      <CardHeader>
                        <div className="flex items-center justify-between mb-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            getDifficultyColor(caseStudy.difficulty)
                          }`}>
                            {getDifficultyText(caseStudy.difficulty)}
                          </span>
                          <span className="text-xs font-medium text-yellow-700 bg-yellow-100 px-2 py-1 rounded-full">
                            Featured
                          </span>
                        </div>
                        <CardTitle className="text-lg text-slate-800">
                          {caseStudy.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-slate-600 text-sm mb-4">
                          {caseStudy.description}
                        </p>
                        <div className="flex items-center justify-between text-sm mb-4">
                          <div className="text-slate-600">
                            {caseStudy.channel.name}
                          </div>
                          <div className="flex items-center space-x-1 text-green-600 font-semibold">
                            <TrendingUp className="h-4 w-4" />
                            <span>+{caseStudy.metrics.improvement}%</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-sm text-slate-500">
                            <span className="flex items-center space-x-1">
                              <Clock className="h-4 w-4" />
                              <span>{caseStudy.timeline}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <Users className="h-4 w-4" />
                              <span>{caseStudy.channel.subscribers}</span>
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

            {/* Filters */}
            <div className="mb-8 space-y-6">
              {/* Category Filter */}
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-3">案例分类</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
                  {categories.map((category) => {
                    const IconComponent = category.icon;
                    return (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`p-3 rounded-lg font-medium transition-colors flex flex-col items-center space-y-2 ${
                          selectedCategory === category.id
                            ? 'bg-purple-600 text-white'
                            : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
                        }`}
                      >
                        <IconComponent className="h-5 w-5" />
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

              {/* Difficulty Filter */}
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-3">难度等级</h3>
                <div className="flex flex-wrap gap-3">
                  {difficulties.map((difficulty) => (
                    <button
                      key={difficulty.id}
                      onClick={() => setSelectedDifficulty(difficulty.id)}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        selectedDifficulty === difficulty.id
                          ? 'bg-purple-600 text-white'
                          : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
                      }`}
                    >
                      {difficulty.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Cases Grid */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-800">
                  {selectedCategory === 'all' ? '所有案例' : categories.find(c => c.id === selectedCategory)?.name}
                  {selectedDifficulty !== 'all' && (
                    <span className="text-lg font-normal text-slate-600 ml-2">
                      - {difficulties.find(d => d.id === selectedDifficulty)?.name}
                    </span>
                  )}
                </h2>
                <span className="text-slate-600">
                  共 {filteredCases.length} 个案例
                </span>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCases.map((caseStudy) => (
                  <Card 
                    key={caseStudy.id} 
                    className="cursor-pointer hover:shadow-md transition-all duration-200"
                    onClick={() => setSelectedCase(caseStudy)}
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          getDifficultyColor(caseStudy.difficulty)
                        }`}>
                          {getDifficultyText(caseStudy.difficulty)}
                        </span>
                        {caseStudy.featured && (
                          <span className="text-xs font-medium text-yellow-700 bg-yellow-100 px-2 py-1 rounded-full">
                            精选
                          </span>
                        )}
                      </div>
                      <CardTitle className="text-lg text-slate-800">
                        {caseStudy.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-600 text-sm mb-4">
                        {caseStudy.description}
                      </p>
                      <div className="flex items-center justify-between text-sm mb-4">
                        <div className="text-slate-600">
                          {caseStudy.channel.name}
                        </div>
                        <div className="flex items-center space-x-1 text-green-600 font-semibold">
                          <TrendingUp className="h-4 w-4" />
                          <span>+{caseStudy.metrics.improvement}%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-slate-500">
                          <span className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{caseStudy.timeline}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Users className="h-4 w-4" />
                            <span>{caseStudy.channel.subscribers}</span>
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
            {filteredCases.length === 0 && (
              <div className="text-center py-12">
                <div className="bg-slate-100 p-6 rounded-full w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                  <Search className="h-12 w-12 text-slate-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">
                  {t('faqNoResults')}
                </h3>
                <p className="text-slate-600 mb-4">
                  {t('faqNoResultsDescription')}
                </p>
                <Button 
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                    setSelectedDifficulty('all');
                  }}
                  variant="outline"
                >
                  Reset Filters
                </Button>
              </div>
            )}

            {/* CTA Section */}
            <div className="mt-16">
              <Card className="bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200">
                <CardContent className="p-8 text-center">
                  <div className="flex items-center justify-center space-x-3 mb-4">
                    <div className="bg-purple-600 p-3 rounded-lg">
                      <FileText className="h-8 w-8 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-800">
                      Learn from Success
                    </h2>
                  </div>
                  <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
                    {t('caseStudiesSubtitle')}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to={`/${lng}`}>
                      <Button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3">
                        <Play className="h-5 w-5 mr-2" />
                        Start Optimizing
                      </Button>
                    </Link>
                    <Link to={`/${lng}/tutorials`}>
                      <Button variant="outline" className="px-6 py-3">
                        <BookOpen className="h-5 w-5 mr-2" />
                        {t('tutorialsTitle')}
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

export default CaseStudies;