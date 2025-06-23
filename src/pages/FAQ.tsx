import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { 
  ChevronDown, 
  ChevronUp, 
  Search, 
  HelpCircle,
  MessageCircle,
  Mail,
  Phone,
  ExternalLink,
  Zap,
  AlertCircle,
  Shield,
  Star,
  Users,
  Info
} from 'lucide-react';
import { Header } from '../components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  popular: boolean;
}

const FAQ = () => {
  const { t, i18n } = useTranslation();
  const { lng } = useParams<{ lng: string }>();

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const faqItems: FAQItem[] = [
    // 基础使用问题
    {
      id: '1',
      question: t('faq.q1.question', '如何使用YouTube缩略图提取器？'),
    answer: t('faq.q1.answer', '使用非常简单：1) 复制YouTube视频的URL链接；2) 将链接粘贴到我们网站的输入框中；3) 点击"获取缩略图"按钮；4) 选择您需要的缩略图尺寸并下载。整个过程只需几秒钟，无需注册或登录。'),
      category: 'basic',
      popular: true
    },
    {
      id: '2',
      question: t('faq.q2.question', '支持哪些YouTube视频链接格式？'),
    answer: t('faq.q2.answer', '我们支持所有常见的YouTube链接格式，包括：\n• 标准链接：https://www.youtube.com/watch?v=VIDEO_ID\n• 短链接：https://youtu.be/VIDEO_ID\n• 移动端链接：https://m.youtube.com/watch?v=VIDEO_ID\n• 嵌入链接：https://www.youtube.com/embed/VIDEO_ID\n• 带时间戳的链接也完全支持'),
      category: 'basic',
      popular: true
    },
    {
      id: '3',
      question: t('faq.q3.question', '提取的缩略图有哪些尺寸？'),
    answer: t('faq.q3.answer', 'YouTube为每个视频提供多种缩略图尺寸：\n• 默认缩略图：120x90像素\n• 中等质量：320x180像素\n• 高质量：480x360像素\n• 标准清晰度：640x480像素\n• 最高质量：1280x720像素（如果可用）\n• 最大分辨率：1920x1080像素（如果可用）\n\n我们会自动检测并提供所有可用的尺寸选项。'),
      category: 'basic',
      popular: true
    },
    
    // 技术问题
    {
      id: '4',
      question: t('faq.q4.question', '为什么有些视频无法提取缩略图？'),
    answer: t('faq.q4.answer', '可能的原因包括：\n• 视频被设为私有或已删除\n• 视频链接格式不正确\n• 视频刚刚上传，缩略图还未生成\n• 网络连接问题\n• 视频受地区限制\n\n请检查视频链接是否正确，并确保视频是公开可访问的。如果问题持续存在，请联系我们的技术支持。'),
      category: 'technical',
      popular: false
    },
    {
      id: '5',
      question: t('faq.q5.question', '工具是否支持移动设备？'),
    answer: t('faq.q5.answer', '是的！我们的工具完全支持移动设备，包括智能手机和平板电脑。网站采用响应式设计，在任何设备上都能完美运行。您可以在iOS、Android或任何其他移动平台上使用我们的服务。'),
      category: 'technical',
      popular: true
    },
    {
      id: '6',
      question: t('faq.q6.question', '提取速度慢怎么办？'),
    answer: t('faq.q6.answer', '如果遇到提取速度慢的问题，请尝试：\n• 检查网络连接是否稳定\n• 刷新页面重试\n• 清除浏览器缓存\n• 尝试使用其他浏览器\n• 避免在网络高峰期使用\n\n我们的服务器分布在全球多个地区，通常能提供快速的响应速度。'),
      category: 'technical',
      popular: false
    },
    
    // 法律和版权问题
    {
      id: '7',
      question: t('faq.q7.question', '使用提取的缩略图是否合法？'),
    answer: t('faq.q7.answer', '这取决于您的使用目的：\n• 个人学习和研究：通常被认为是合理使用\n• 评论和批评：在合理范围内通常是允许的\n• 商业用途：需要获得版权所有者的许可\n• 重新上传：可能涉及版权侵权\n\n我们建议在使用他人的缩略图时，始终尊重原创者的版权，并在必要时获得适当的许可。'),
      category: 'legal',
      popular: true
    },
    {
      id: '8',
      question: t('faq.q8.question', '可以用于商业目的吗？'),
    answer: t('faq.q8.answer', '对于商业用途，我们强烈建议：\n• 获得原视频创作者的明确许可\n• 了解相关的版权法律\n• 考虑使用自己创作的内容\n• 咨询法律专业人士\n\n我们的工具本身是免费的，但使用提取的内容需要遵守相关的版权法律和YouTube的服务条款。'),
      category: 'legal',
      popular: false
    },
    {
      id: '9',
      question: t('faq.q9.question', '你们会存储用户数据吗？'),
    answer: t('faq.q9.answer', '我们非常重视用户隐私：\n• 不存储您输入的YouTube链接\n• 不保存提取的缩略图\n• 不收集个人身份信息\n• 不使用追踪cookies\n• 所有处理都在您的浏览器中完成\n\n详细的隐私政策请查看我们的隐私政策页面。'),
      category: 'legal',
      popular: true
    },
    
    // 功能相关
    {
      id: '10',
      question: t('faq.q10.question', '是否支持批量下载？'),
    answer: t('faq.q10.answer', '目前我们的工具专注于单个视频的缩略图提取，以确保最佳的用户体验和服务稳定性。如果您需要批量处理，建议：\n• 使用我们的历史记录功能管理多个链接\n• 逐个处理以确保质量\n• 关注我们的更新，未来可能会添加批量功能'),
      category: 'features',
      popular: false
    },
    {
      id: '11',
      question: '历史记录功能如何使用？',
      answer: '历史记录功能帮助您管理之前提取的缩略图：\n• 自动保存最近的提取记录\n• 快速重新访问之前的结果\n• 一键清除历史记录\n• 数据仅存储在您的浏览器中\n• 不会上传到我们的服务器\n\n这个功能让您能够轻松管理和重用之前的工作。',
      category: 'features',
      popular: true
    },
    {
      id: '12',
      question: '支持哪些图片格式下载？',
      answer: '我们提供多种下载格式：\n• JPG格式：最常用，文件较小\n• PNG格式：支持透明背景（如果原图有）\n• WebP格式：现代浏览器支持，文件更小\n\n系统会自动检测原始格式并提供最佳的下载选项。大多数YouTube缩略图都是JPG格式。',
      category: 'features',
      popular: false
    },
    
    // 故障排除
    {
      id: '13',
      question: '遇到错误提示怎么办？',
      answer: '常见错误及解决方法：\n• "无效的URL"：检查链接格式是否正确\n• "视频不存在"：确认视频未被删除或设为私有\n• "网络错误"：检查网络连接，稍后重试\n• "加载失败"：刷新页面或清除浏览器缓存\n\n如果问题持续存在，请通过联系页面向我们报告具体的错误信息。',
      category: 'troubleshooting',
      popular: true
    },
    {
      id: '14',
      question: '浏览器兼容性如何？',
      answer: '我们的工具支持所有现代浏览器：\n• Chrome（推荐）\n• Firefox\n• Safari\n• Edge\n• Opera\n\n建议使用最新版本的浏览器以获得最佳体验。如果遇到兼容性问题，请尝试更新浏览器或使用Chrome。',
      category: 'troubleshooting',
      popular: false
    },
    {
      id: '15',
      question: '下载的图片质量不清晰怎么办？',
      answer: '图片质量取决于YouTube原始缩略图：\n• 选择最高可用分辨率\n• 检查原视频的缩略图质量\n• 某些老视频可能只有低分辨率版本\n• 尝试不同的尺寸选项\n\n我们提供的是YouTube原始缩略图，质量与平台上显示的完全一致。',
      category: 'troubleshooting',
      popular: false
    },
    
    // 高级使用
    {
      id: '16',
      question: '如何获得最佳的缩略图质量？',
      answer: '获得最佳质量的建议：\n• 选择最高分辨率选项（1280x720或更高）\n• 确保原视频有高质量缩略图\n• 避免过度压缩或编辑\n• 使用现代浏览器下载\n• 检查网络连接稳定性\n\n记住，我们只能提供YouTube原始缩略图的质量，无法提升原始图片的分辨率。',
      category: 'advanced',
      popular: false
    },
    {
      id: '17',
      question: '可以提取YouTube Shorts的缩略图吗？',
      answer: '是的！我们完全支持YouTube Shorts：\n• 支持所有Shorts链接格式\n• 提供垂直方向的缩略图\n• 包含所有可用的分辨率选项\n• 处理方式与普通视频相同\n\nShorts的缩略图通常是9:16的垂直格式，适合移动设备显示。',
      category: 'advanced',
      popular: true
    },
    {
      id: '18',
      question: '工具是否有使用限制？',
      answer: '我们的服务是完全免费的，但有一些合理的限制：\n• 每分钟最多50次请求\n• 单次会话最多100个历史记录\n• 不支持自动化脚本或机器人\n• 仅限个人和教育用途\n\n这些限制确保所有用户都能享受稳定快速的服务。',
      category: 'advanced',
      popular: false
    }
  ];

  const categories = [
    { id: 'all', name: t('faqAllCategories'), icon: HelpCircle, count: faqItems.length },
    { id: 'basic', name: t('faqCategoryGeneral'), icon: Zap, count: faqItems.filter(item => item.category === 'basic').length },
    { id: 'technical', name: t('faqCategoryTechnical'), icon: AlertCircle, count: faqItems.filter(item => item.category === 'technical').length },
    { id: 'legal', name: 'Legal & Copyright', icon: Shield, count: faqItems.filter(item => item.category === 'legal').length },
    { id: 'features', name: 'Features', icon: Star, count: faqItems.filter(item => item.category === 'features').length },
    { id: 'troubleshooting', name: t('faqCategoryTroubleshooting'), icon: AlertCircle, count: faqItems.filter(item => item.category === 'troubleshooting').length },
    { id: 'advanced', name: 'Advanced Usage', icon: Users, count: faqItems.filter(item => item.category === 'advanced').length }
  ];

  const filteredItems = faqItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = searchTerm === '' || 
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  const popularItems = faqItems.filter(item => item.popular);

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const formatAnswer = (answer: string) => {
    return answer.split('\n').map((line, index) => {
      if (line.startsWith('•')) {
        return (
          <li key={index} className="ml-4 mb-1">
            {line.substring(1).trim()}
          </li>
        );
      }
      return line && <p key={index} className="mb-2">{line}</p>;
    });
  };

  return (
    <>
      <Helmet>
        <title>{t('faqPageTitle')} - {t('siteTitle')}</title>
        <meta name="description" content={t('faqPageDescription')} />
        <link rel="canonical" href={`${window.location.origin}/faq`} />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <Header currentPage="faq" />


        <main className="container mx-auto px-4 py-12">
          <div className="max-w-6xl mx-auto">
            {/* Page Header */}
            <div className="text-center mb-12">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <div className="bg-blue-600 p-3 rounded-lg">
                  <HelpCircle className="h-8 w-8 text-white" />
                </div>
                <h1 className="text-4xl font-bold text-slate-800">
                  {t('faqTitle')}
                </h1>
              </div>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                {t('faqDescription')}
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
                    className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                  />
                </div>
              </div>
            </div>

            {/* Popular Questions */}
            {popularItems.length > 0 && selectedCategory === 'all' && searchTerm === '' && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center space-x-2">
                  <Star className="h-6 w-6 text-yellow-500" />
                  <span>{t('faqPopularQuestions')}</span>
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {popularItems.slice(0, 6).map((item) => (
                    <Card 
                      key={item.id} 
                      className="cursor-pointer hover:shadow-lg transition-all duration-300 border-2 border-yellow-200 bg-gradient-to-br from-yellow-50 to-orange-50"
                      onClick={() => toggleExpanded(item.id)}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className="bg-yellow-500 p-1 rounded">
                              <Star className="h-4 w-4 text-white" />
                            </div>
                            <span className="text-xs font-medium text-yellow-700 bg-yellow-100 px-2 py-1 rounded-full">
                              热门
                            </span>
                          </div>
                          {expandedItems.includes(item.id) ? (
                            <ChevronUp className="h-5 w-5 text-slate-400" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-slate-400" />
                          )}
                        </div>
                        <CardTitle className="text-lg text-slate-800">
                          {item.question}
                        </CardTitle>
                      </CardHeader>
                      {expandedItems.includes(item.id) && (
                        <CardContent className="pt-0">
                          <div className="text-slate-600 text-sm leading-relaxed">
                            {formatAnswer(item.answer)}
                          </div>
                        </CardContent>
                      )}
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Category Filter */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">问题分类</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
                {categories.map((category) => {
                  const IconComponent = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`p-4 rounded-lg font-medium transition-colors flex flex-col items-center space-y-2 ${
                        selectedCategory === category.id
                          ? 'bg-blue-600 text-white'
                          : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
                      }`}
                    >
                      <IconComponent className="h-6 w-6" />
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

            {/* FAQ Items */}
            <div className="space-y-4">
              {filteredItems.map((item) => (
                <Card 
                  key={item.id} 
                  className="cursor-pointer hover:shadow-md transition-all duration-200"
                  onClick={() => toggleExpanded(item.id)}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {item.popular && (
                          <div className="bg-yellow-500 p-1 rounded">
                            <Star className="h-4 w-4 text-white" />
                          </div>
                        )}
                        <CardTitle className="text-lg text-slate-800">
                          {item.question}
                        </CardTitle>
                      </div>
                      {expandedItems.includes(item.id) ? (
                        <ChevronUp className="h-5 w-5 text-slate-400" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-slate-400" />
                      )}
                    </div>
                  </CardHeader>
                  {expandedItems.includes(item.id) && (
                    <CardContent className="pt-0">
                      <div className="text-slate-600 leading-relaxed">
                        {formatAnswer(item.answer)}
                      </div>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>

            {/* Empty State */}
            {filteredItems.length === 0 && (
              <div className="text-center py-12">
                <div className="bg-slate-100 p-6 rounded-full w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                  <Search className="h-12 w-12 text-slate-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">
                  未找到相关问题
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
                  Reset Search
                </Button>
              </div>
            )}

            {/* Contact Section */}
            <div className="mt-16">
              <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
                <CardContent className="p-8 text-center">
                  <div className="flex items-center justify-center space-x-3 mb-4">
                    <div className="bg-blue-600 p-3 rounded-lg">
                      <Info className="h-8 w-8 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-800">
                      {t('faqContactTitle')}
                    </h2>
                  </div>
                  <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
                    {t('faqContactDescription')}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to={`/${lng}/contact`}>
                      <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3">
                        <ExternalLink className="h-5 w-5 mr-2" />
                        {t('faqContactButton')}
                      </Button>
                    </Link>
                    <Link to={`/${lng}/help`}>
                      <Button variant="outline" className="px-6 py-3">
                        <HelpCircle className="h-5 w-5 mr-2" />
                        View Help Guide
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

export default FAQ;