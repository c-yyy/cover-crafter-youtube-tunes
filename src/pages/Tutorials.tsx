import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Header } from '../components/Header';
import { 
  Youtube, 
  BookOpen, 
  Play, 
  Clock, 
  Star, 
  Filter, 
  Search, 
  Tag, 
  ChevronRight, 
  ArrowRight, 
  Video, 
  Image, 
  Music, 
  Palette, 
  Camera, 
  Edit, 
  Monitor, 
  Smartphone, 
  Globe,
  TrendingUp,
  Target,
  Shield,
  Settings,
  Eye,
  Info
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Tutorial {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  views: number;
  rating: number;
  featured: boolean;
  steps: TutorialStep[];
}

interface TutorialStep {
  id: string;
  title: string;
  content: string;
  image?: string;
  tips?: string[];
}

const Tutorials = () => {
  const { t, i18n } = useTranslation();
  const { lng } = useParams<{ lng: string }>();

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTutorial, setSelectedTutorial] = useState<Tutorial | null>(null);

  const tutorials: Tutorial[] = [
    {
      id: 'basic-thumbnail-extraction',
      title: t('tutorials.basic.title', '如何提取YouTube缩略图 - 基础教程'),
      description: t('tutorials.basic.description', '学习如何快速提取YouTube视频的高质量缩略图，适合初学者'),
      category: 'basic',
      difficulty: 'beginner',
      duration: '5分钟',
      views: 15420,
      rating: 4.8,
      featured: true,
      steps: [
        {
          id: 'step1',
          title: t('tutorials.steps.step1.title', '复制YouTube视频链接'),
          content: t('tutorials.steps.step1.content', '首先，打开YouTube并找到您想要提取缩略图的视频。点击分享按钮，然后复制视频链接。支持的链接格式包括：\n• https://www.youtube.com/watch?v=VIDEO_ID\n• https://youtu.be/VIDEO_ID\n• 移动端和嵌入链接也完全支持'),
          tips: [
            '确保链接是完整的，包含视频ID',
            '可以直接从浏览器地址栏复制链接',
            '带时间戳的链接也可以正常使用'
          ]
        },
        {
          id: 'step2',
          title: t('tutorials.steps.step2.title', '粘贴链接到工具'),
          content: t('tutorials.steps.step2.content', '打开我们的YouTube缩略图提取器，将复制的链接粘贴到输入框中。工具会自动识别链接格式并提取视频ID。'),
          tips: [
            '粘贴后会自动检测链接有效性',
            '如果链接无效，会显示错误提示',
            '支持批量处理多个链接'
          ]
        },
        {
          id: 'step3',
          title: t('tutorials.steps.step3.title', '选择缩略图质量'),
          content: t('tutorials.steps.step3.content', '点击"获取缩略图"按钮后，系统会显示所有可用的缩略图尺寸。选择您需要的质量：\n• 默认：120x90像素\n• 中等：320x180像素\n• 高质量：480x360像素\n• 最高质量：1280x720像素或更高'),
          tips: [
            '选择最高可用分辨率获得最佳质量',
            '不同视频可能有不同的最高分辨率',
            '较新的视频通常有更高分辨率的缩略图'
          ]
        },
        {
          id: 'step4',
          title: t('tutorials.steps.step4.title', '下载缩略图'),
          content: t('tutorials.steps.step4.content', '选择合适的尺寸后，点击下载按钮即可保存缩略图到您的设备。文件会以视频标题命名，格式通常为JPG。'),
          tips: [
            '可以右键另存为自定义文件名',
            '建议保存到专门的文件夹便于管理',
            '下载的图片质量与YouTube原始缩略图一致'
          ]
        }
      ]
    },
    {
      id: 'advanced-thumbnail-optimization',
      title: t('tutorials.optimization.title', '缩略图优化最佳实践'),
      description: t('tutorials.optimization.description', '深入了解如何优化YouTube缩略图以提高点击率和视频表现'),
      category: 'optimization',
      difficulty: 'intermediate',
      duration: '15分钟',
      views: 8930,
      rating: 4.9,
      featured: true,
      steps: [
        {
          id: 'step1',
          title: '分析成功的缩略图',
          content: '研究您所在领域的热门视频缩略图，分析它们的共同特点：\n• 色彩搭配和对比度\n• 文字大小和位置\n• 人物表情和姿态\n• 背景和构图元素',
          tips: [
            '收集同类型成功视频的缩略图作为参考',
            '注意观察哪些元素最吸引眼球',
            '分析不同设备上的显示效果'
          ]
        },
        {
          id: 'step2',
          title: '设计原则应用',
          content: '应用设计原则创建吸引人的缩略图：\n• 使用高对比度色彩\n• 保持简洁明了的构图\n• 突出关键信息\n• 确保在小尺寸下也清晰可见',
          tips: [
            '使用品牌色彩保持一致性',
            '避免过于复杂的设计',
            '测试在手机屏幕上的显示效果'
          ]
        },
        {
          id: 'step3',
          title: 'A/B测试缩略图',
          content: '创建多个版本的缩略图进行测试：\n• 制作2-3个不同风格的版本\n• 在不同时间发布相似内容测试\n• 分析点击率和观看时长数据\n• 根据数据优化设计策略',
          tips: [
            '记录每个版本的表现数据',
            '考虑目标受众的偏好',
            '定期更新和优化缩略图策略'
          ]
        }
      ]
    },
    {
      id: 'batch-processing',
      title: t('tutorials.batch.title', '批量处理YouTube缩略图'),
      description: t('tutorials.batch.description', '学习如何高效地批量提取和管理多个视频的缩略图'),
      category: 'advanced',
      difficulty: 'advanced',
      duration: '20分钟',
      views: 5670,
      rating: 4.7,
      featured: false,
      steps: [
        {
          id: 'step1',
          title: '准备视频链接列表',
          content: '整理需要提取缩略图的所有视频链接：\n• 从播放列表导出链接\n• 使用浏览器书签管理\n• 创建Excel或文本文件记录\n• 按类别或项目分组管理',
          tips: [
            '使用统一的命名规则',
            '记录视频的相关信息',
            '定期备份链接列表'
          ]
        },
        {
          id: 'step2',
          title: '使用历史记录功能',
          content: '充分利用工具的历史记录功能：\n• 查看之前提取的缩略图\n• 快速重新下载\n• 管理和清理历史记录\n• 导出历史数据',
          tips: [
            '定期清理不需要的历史记录',
            '为重要项目创建备份',
            '使用标签或分类管理'
          ]
        },
        {
          id: 'step3',
          title: '文件组织和命名',
          content: '建立有效的文件管理系统：\n• 创建清晰的文件夹结构\n• 使用一致的命名规则\n• 添加元数据和标签\n• 定期备份重要文件',
          tips: [
            '包含日期和项目信息在文件名中',
            '使用云存储同步文件',
            '创建索引文件便于查找'
          ]
        }
      ]
    },
    {
      id: 'copyright-guidelines',
      title: t('tutorials.copyright.title', 'YouTube缩略图版权指南'),
      description: t('tutorials.copyright.description', '了解使用YouTube缩略图的法律注意事项和最佳实践'),
      category: 'legal',
      difficulty: 'intermediate',
      duration: '12分钟',
      views: 7240,
      rating: 4.6,
      featured: true,
      steps: [
        {
          id: 'step1',
          title: '理解版权基础',
          content: 'YouTube缩略图的版权归属：\n• 原创者拥有缩略图版权\n• 合理使用原则的适用\n• 商业用途的限制\n• 不同国家的法律差异',
          tips: [
            '始终尊重原创者的权利',
            '了解当地的版权法律',
            '在不确定时寻求法律建议'
          ]
        },
        {
          id: 'step2',
          title: '合法使用场景',
          content: '以下情况通常被认为是合理使用：\n• 教育和学术研究\n• 新闻报道和评论\n• 个人学习和分析\n• 非商业性质的使用',
          tips: [
            '明确标注来源和原作者',
            '避免用于商业推广',
            '尊重原创者的意愿'
          ]
        },
        {
          id: 'step3',
          title: '获得使用许可',
          content: '如需商业使用，建议：\n• 联系原视频创作者\n• 获得明确的书面许可\n• 了解使用条件和限制\n• 考虑付费授权',
          tips: [
            '保存所有许可文件',
            '明确使用范围和期限',
            '定期检查许可状态'
          ]
        }
      ]
    },
    {
      id: 'mobile-optimization',
      title: t('tutorials.mobile.title', '移动设备优化指南'),
      description: t('tutorials.mobile.description', '学习如何在移动设备上高效使用YouTube缩略图提取工具'),
      category: 'mobile',
      difficulty: 'beginner',
      duration: '8分钟',
      views: 12350,
      rating: 4.5,
      featured: false,
      steps: [
        {
          id: 'step1',
          title: '移动端界面导航',
          content: '熟悉移动端的界面布局：\n• 响应式设计适配\n• 触摸友好的按钮\n• 简化的操作流程\n• 快速访问功能',
          tips: [
            '使用横屏模式获得更好体验',
            '利用手势操作提高效率',
            '保持网络连接稳定'
          ]
        },
        {
          id: 'step2',
          title: '从YouTube应用分享',
          content: '直接从YouTube移动应用分享链接：\n• 点击视频下方的分享按钮\n• 选择"复制链接"选项\n• 切换到浏览器粘贴链接\n• 或使用"在浏览器中打开"',
          tips: [
            '确保复制完整的链接',
            '可以使用剪贴板历史功能',
            '注意应用间的切换'
          ]
        },
        {
          id: 'step3',
          title: '移动端下载管理',
          content: '在移动设备上管理下载的缩略图：\n• 选择合适的保存位置\n• 使用文件管理器整理\n• 同步到云存储\n• 分享到其他应用',
          tips: [
            '定期清理下载文件夹',
            '使用云存储备份重要图片',
            '为文件添加描述性名称'
          ]
        }
      ]
    },
    {
      id: 'troubleshooting-guide',
      title: t('tutorials.troubleshooting.title', '常见问题解决指南'),
      description: t('tutorials.troubleshooting.description', '解决使用YouTube缩略图提取工具时遇到的常见问题'),
      category: 'troubleshooting',
      difficulty: 'beginner',
      duration: '10分钟',
      views: 9870,
      rating: 4.4,
      featured: false,
      steps: [
        {
          id: 'step1',
          title: '链接识别问题',
          content: '解决链接无法识别的问题：\n• 检查链接格式是否正确\n• 确认视频是否为公开状态\n• 验证网络连接\n• 尝试刷新页面',
          tips: [
            '复制完整的URL链接',
            '避免使用缩短的链接',
            '检查视频是否被删除或私有化'
          ]
        },
        {
          id: 'step2',
          title: '下载失败处理',
          content: '当缩略图下载失败时：\n• 检查浏览器设置\n• 清除浏览器缓存\n• 尝试不同的浏览器\n• 检查网络稳定性',
          tips: [
            '允许浏览器下载文件',
            '检查下载文件夹权限',
            '尝试右键另存为'
          ]
        },
        {
          id: 'step3',
          title: '性能优化',
          content: '提升工具使用性能：\n• 关闭不必要的浏览器标签\n• 清理浏览器缓存和Cookie\n• 更新浏览器到最新版本\n• 检查设备存储空间',
          tips: [
            '定期重启浏览器',
            '使用推荐的浏览器',
            '保持系统更新'
          ]
        }
      ]
    }
  ];

  const categories = [
    { id: 'all', name: t('tutorials.categories.all', '全部教程'), icon: BookOpen, count: tutorials.length },
    { id: 'basic', name: t('tutorials.categories.basic', '基础入门'), icon: Play, count: tutorials.filter(t => t.category === 'basic').length },
    { id: 'optimization', name: t('tutorials.categories.optimization', '优化技巧'), icon: TrendingUp, count: tutorials.filter(t => t.category === 'optimization').length },
    { id: 'advanced', name: t('tutorials.categories.advanced', '高级技巧'), icon: Target, count: tutorials.filter(t => t.category === 'advanced').length },
    { id: 'legal', name: t('tutorials.categories.legal', '法律指南'), icon: Shield, count: tutorials.filter(t => t.category === 'legal').length },
    { id: 'mobile', name: t('tutorials.categories.mobile', '移动端'), icon: Globe, count: tutorials.filter(t => t.category === 'mobile').length },
    { id: 'troubleshooting', name: t('tutorials.categories.troubleshooting', '问题解决'), icon: Settings, count: tutorials.filter(t => t.category === 'troubleshooting').length }
  ];

  const difficulties = [
    { id: 'all', name: '全部难度', color: 'slate' },
    { id: 'beginner', name: '初学者', color: 'green' },
    { id: 'intermediate', name: '中级', color: 'yellow' },
    { id: 'advanced', name: '高级', color: 'red' }
  ];

  const filteredTutorials = tutorials.filter(tutorial => {
    const matchesCategory = selectedCategory === 'all' || tutorial.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'all' || tutorial.difficulty === selectedDifficulty;
    const matchesSearch = searchTerm === '' || 
      tutorial.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tutorial.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesDifficulty && matchesSearch;
  });

  const featuredTutorials = tutorials.filter(tutorial => tutorial.featured);

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
      case 'beginner': return '初学者';
      case 'intermediate': return '中级';
      case 'advanced': return '高级';
      default: return '未知';
    }
  };

  if (selectedTutorial) {
    return (
      <>
        <Helmet>
          <title>{selectedTutorial.title} - YouTube缩略图提取教程 - {t('siteTitle')}</title>
          <meta name="description" content={selectedTutorial.description} />
        </Helmet>
        
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
          {/* Header */}
          <Header currentPage="tutorials" />

          <main className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto">
              {/* Tutorial Header */}
              <div className="mb-8">
                <div className="flex items-center space-x-2 mb-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    getDifficultyColor(selectedTutorial.difficulty)
                  }`}>
                    {getDifficultyText(selectedTutorial.difficulty)}
                  </span>
                  <span className="text-slate-500">•</span>
                  <span className="text-slate-600 flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{selectedTutorial.duration}</span>
                  </span>
                  <span className="text-slate-500">•</span>
                  <span className="text-slate-600 flex items-center space-x-1">
                    <Eye className="h-4 w-4" />
                    <span>{selectedTutorial.views.toLocaleString()} 次观看</span>
                  </span>
                  <span className="text-slate-500">•</span>
                  <span className="text-slate-600 flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span>{selectedTutorial.rating}</span>
                  </span>
                </div>
                
                <h1 className="text-3xl font-bold text-slate-800 mb-4">
                  {selectedTutorial.title}
                </h1>
                
                <p className="text-lg text-slate-600">
                  {selectedTutorial.description}
                </p>
              </div>

              {/* Tutorial Steps */}
              <div className="space-y-8">
                {selectedTutorial.steps.map((step, index) => (
                  <Card key={step.id} className="border-l-4 border-l-blue-500">
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                          {index + 1}
                        </div>
                        <CardTitle className="text-xl text-slate-800">
                          {step.title}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="prose max-w-none">
                        {step.content.split('\n').map((paragraph, pIndex) => {
                          if (paragraph.startsWith('•')) {
                            return (
                              <li key={pIndex} className="ml-4 mb-1">
                                {paragraph.substring(1).trim()}
                              </li>
                            );
                          }
                          return paragraph && (
                            <p key={pIndex} className="mb-3 text-slate-700 leading-relaxed">
                              {paragraph}
                            </p>
                          );
                        })}
                      </div>
                      
                      {step.tips && step.tips.length > 0 && (
                        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                          <div className="flex items-center space-x-2 mb-3">
                            <Info className="h-5 w-5 text-blue-600" />
                            <h4 className="font-semibold text-blue-800">实用技巧</h4>
                          </div>
                          <ul className="space-y-2">
                            {step.tips.map((tip, tipIndex) => (
                              <li key={tipIndex} className="flex items-start space-x-2 text-sm text-blue-700">
                                <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
                                <span>{tip}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Related Tutorials */}
              <div className="mt-16">
                <h2 className="text-2xl font-bold text-slate-800 mb-6">相关教程</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {tutorials
                    .filter(t => t.id !== selectedTutorial.id && t.category === selectedTutorial.category)
                    .slice(0, 4)
                    .map((tutorial) => (
                      <Card 
                        key={tutorial.id} 
                        className="cursor-pointer hover:shadow-md transition-all duration-200"
                        onClick={() => setSelectedTutorial(tutorial)}
                      >
                        <CardHeader>
                          <div className="flex items-center justify-between mb-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              getDifficultyColor(tutorial.difficulty)
                            }`}>
                              {getDifficultyText(tutorial.difficulty)}
                            </span>
                            <div className="flex items-center space-x-1 text-sm text-slate-500">
                              <Clock className="h-4 w-4" />
                              <span>{tutorial.duration}</span>
                            </div>
                          </div>
                          <CardTitle className="text-lg text-slate-800">
                            {tutorial.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-slate-600 text-sm mb-4">
                            {tutorial.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4 text-sm text-slate-500">
                              <span className="flex items-center space-x-1">
                                <Eye className="h-4 w-4" />
                                <span>{tutorial.views.toLocaleString()}</span>
                              </span>
                              <span className="flex items-center space-x-1">
                                <Star className="h-4 w-4 text-yellow-500" />
                                <span>{tutorial.rating}</span>
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
        <title>{t('tutorialsPageTitle')} - {t('siteTitle')}</title>
        <meta name="description" content={t('tutorialsPageDescription')} />
        <link rel="canonical" href={`${window.location.origin}/tutorials`} />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        {/* Header */}
        <Header currentPage="tutorials" />

        <main className="container mx-auto px-4 py-12">
          <div className="max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="text-center mb-12">
              <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="bg-indigo-600 p-3 rounded-lg">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-slate-800">
                {t('tutorials.pageTitle', 'YouTube创作教程')}
              </h1>
            </div>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              {t('tutorials.pageDescription', '从基础到进阶的YouTube创作教程，帮助你掌握视频制作、优化和推广的各种技巧。')}
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
                    className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-lg"
                  />
                </div>
              </div>
            </div>

            {/* Featured Tutorials */}
            {featuredTutorials.length > 0 && selectedCategory === 'all' && selectedDifficulty === 'all' && searchTerm === '' && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center space-x-2">
                  <Star className="h-6 w-6 text-yellow-500" />
                  <span>{t('faqPopularQuestions')}</span>
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {featuredTutorials.map((tutorial) => (
                    <Card 
                      key={tutorial.id} 
                      className="cursor-pointer hover:shadow-lg transition-all duration-300 border-2 border-yellow-200 bg-gradient-to-br from-yellow-50 to-orange-50"
                      onClick={() => setSelectedTutorial(tutorial)}
                    >
                      <CardHeader>
                        <div className="flex items-center justify-between mb-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            getDifficultyColor(tutorial.difficulty)
                          }`}>
                            {getDifficultyText(tutorial.difficulty)}
                          </span>
                          <span className="text-xs font-medium text-yellow-700 bg-yellow-100 px-2 py-1 rounded-full">
                            Featured
                          </span>
                        </div>
                        <CardTitle className="text-lg text-slate-800">
                          {tutorial.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-slate-600 text-sm mb-4">
                          {tutorial.description}
                        </p>
                        <div className="flex items-center justify-between text-sm text-slate-500">
                          <div className="flex items-center space-x-4">
                            <span className="flex items-center space-x-1">
                              <Clock className="h-4 w-4" />
                              <span>{tutorial.duration}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <Eye className="h-4 w-4" />
                              <span>{tutorial.views.toLocaleString()}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <Star className="h-4 w-4 text-yellow-500" />
                              <span>{tutorial.rating}</span>
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
                <h3 className="text-lg font-semibold text-slate-800 mb-3">教程分类</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
                  {categories.map((category) => {
                    const IconComponent = category.icon;
                    return (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`p-3 rounded-lg font-medium transition-colors flex flex-col items-center space-y-2 ${
                          selectedCategory === category.id
                            ? 'bg-indigo-600 text-white'
                            : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
                        }`}
                      >
                        <IconComponent className="h-5 w-5" />
                        <span className="text-sm">{category.name}</span>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          selectedCategory === category.id
                            ? 'bg-white text-indigo-600'
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
                          ? 'bg-indigo-600 text-white'
                          : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
                      }`}
                    >
                      {difficulty.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Tutorials Grid */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-800">
                  {selectedCategory === 'all' ? t('tutorialsFilterAll') : categories.find(c => c.id === selectedCategory)?.name}
                  {selectedDifficulty !== 'all' && (
                    <span className="text-lg font-normal text-slate-600 ml-2">
                      - {difficulties.find(d => d.id === selectedDifficulty)?.name}
                    </span>
                  )}
                </h2>
                <span className="text-slate-600">
                  {t('tutorialsCount', { count: filteredTutorials.length })}
                </span>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTutorials.map((tutorial) => (
                  <Card 
                    key={tutorial.id} 
                    className="cursor-pointer hover:shadow-md transition-all duration-200"
                    onClick={() => setSelectedTutorial(tutorial)}
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          getDifficultyColor(tutorial.difficulty)
                        }`}>
                          {getDifficultyText(tutorial.difficulty)}
                        </span>
                        {tutorial.featured && (
                          <span className="text-xs font-medium text-yellow-700 bg-yellow-100 px-2 py-1 rounded-full">
                            Featured
                          </span>
                        )}
                      </div>
                      <CardTitle className="text-lg text-slate-800">
                        {tutorial.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-600 text-sm mb-4">
                        {tutorial.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-slate-500">
                          <span className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{tutorial.duration}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Eye className="h-4 w-4" />
                            <span>{tutorial.views.toLocaleString()}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Star className="h-4 w-4 text-yellow-500" />
                            <span>{tutorial.rating}</span>
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
            {filteredTutorials.length === 0 && (
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
              <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
                <CardContent className="p-8 text-center">
                  <div className="flex items-center justify-center space-x-3 mb-4">
                    <div className="bg-indigo-600 p-3 rounded-lg">
                      <BookOpen className="h-8 w-8 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-800">
                      Start Your Learning Journey
                    </h2>
                  </div>
                  <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
                    {t('tutorialsSubtitle')}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to={`/${lng}`}>
                      <Button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3">
                        <Play className="h-5 w-5 mr-2" />
                        Start Now
                      </Button>
                    </Link>
                    <Link to={`/${lng}/help`}>
                      <Button variant="outline" className="px-6 py-3">
                        <Info className="h-5 w-5 mr-2" />
                        {t('helpTitle')}
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

export default Tutorials;