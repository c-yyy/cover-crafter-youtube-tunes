import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HelpCircle, Youtube, Download, Image as ImageIcon, Lightbulb, AlertCircle, CheckCircle, ArrowRight, Menu, X, Search, FileImage, Palette, Monitor, Mail, MessageSquare, Users, Share2, Clock, Shield, Heart, BookOpen } from "lucide-react";
import { Link, useParams } from 'react-router-dom';
import { Header } from '../components/Header';

const Help = () => {
  const { t, i18n } = useTranslation();
  const { lng } = useParams<{ lng: string }>();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('getting-started');

  const sections = [
    { id: 'getting-started', title: t('help.gettingStarted', '快速开始'), icon: CheckCircle },
    { id: 'tools', title: t('tools', '工具'), icon: Monitor },
    { id: 'tutorials', title: t('tutorials', '教程'), icon: FileImage },
    { id: 'faq', title: t('faq', '常见问题'), icon: HelpCircle },
    { id: 'resources', title: t('resources', '资源'), icon: Palette },
    { id: 'advanced-tips', title: t('help.advancedTips', '高级技巧'), icon: Lightbulb },
    { id: 'troubleshooting', title: t('help.troubleshooting', '问题解决'), icon: AlertCircle },
    { id: 'contact', title: t('contact', '联系我们'), icon: ArrowRight }
  ];

  return (
    <>
      <Helmet>
        <title>{t('help.pageTitle', '使用帮助和教程')} - {t('siteTitle')}</title>
        <meta name="description" content={t('help.pageDescription', '详细的YouTube缩略图下载教程，包含使用技巧、最佳实践和创意用途指南。学习如何高效使用我们的工具。')} />
        <link rel="canonical" href={`${window.location.origin}/help`} />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <Header currentPage="help" />

        <main className="container mx-auto px-4 py-12">
          <div className="max-w-6xl mx-auto">
            {/* Page Header */}
            <div className="text-center mb-12">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <div className="bg-blue-600 p-3 rounded-lg">
                  <HelpCircle className="h-8 w-8 text-white" />
                </div>
                <h1 className="text-4xl font-bold text-slate-800">
                  {t('help.pageTitle', '使用帮助和教程')}
                </h1>
              </div>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                {t('help.pageDescription', '学习如何充分利用我们的YouTube缩略图下载工具，掌握专业技巧，提升工作效率')}
              </p>
            </div>

            <div className="grid lg:grid-cols-4 gap-8">
              {/* Sidebar Navigation */}
              <div className="lg:col-span-1">
                <Card className="sticky top-8">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center space-x-2">
                      <Search className="h-5 w-5" />
                      <span>{t('help.navigationMenu', '导航目录')}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {sections.map((section) => {
                      const Icon = section.icon;
                      return (
                        <button
                          key={section.id}
                          onClick={() => setActiveSection(section.id)}
                          className={`w-full text-left p-3 rounded-lg transition-colors flex items-center space-x-3 ${
                            activeSection === section.id
                              ? 'bg-red-50 text-red-600 border border-red-200'
                              : 'hover:bg-slate-50 text-slate-600'
                          }`}
                        >
                          <Icon className="h-4 w-4" />
                          <span className="font-medium">{section.title}</span>
                        </button>
                      );
                    })}
                  </CardContent>
                </Card>
              </div>

              {/* Main Content */}
              <div className="lg:col-span-3 space-y-8">
                {/* Getting Started Section */}
                {activeSection === 'getting-started' && (
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-2xl flex items-center space-x-3">
                          <CheckCircle className="h-6 w-6 text-green-600" />
                          <span>{t('help.quickStartGuide', '快速开始指南')}</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-slate-800">{t('help.step1Title', '第一步：获取YouTube链接')}</h3>
                            <div className="bg-slate-50 p-4 rounded-lg">
                              <p className="text-slate-600 mb-3">{t('help.step1Description', '从YouTube复制视频链接的方法：')}</p>
                              <ul className="list-disc list-inside space-y-2 text-sm text-slate-600">
                                <li>{t('help.step1Method1', '在视频页面点击"分享"按钮')}</li>
                                <li>{t('help.step1Method2', '复制显示的链接')}</li>
                                <li>{t('help.step1Method3', '或直接从浏览器地址栏复制')}</li>
                                <li>{t('help.step1Method4', '支持所有YouTube链接格式')}</li>
                              </ul>
                            </div>
                          </div>
                          <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-slate-800">{t('help.step2Title', '第二步：粘贴并处理')}</h3>
                            <div className="bg-slate-50 p-4 rounded-lg">
                              <p className="text-slate-600 mb-3">{t('help.step2Description', '在我们的工具中：')}</p>
                              <ul className="list-disc list-inside space-y-2 text-sm text-slate-600">
                                <li>{t('help.step2Method1', '将链接粘贴到输入框')}</li>
                                <li>{t('help.step2Method2', '点击"获取缩略图"按钮')}</li>
                                <li>{t('help.step2Method3', '等待几秒钟处理')}</li>
                                <li>{t('help.step2Method4', '查看所有可用的缩略图尺寸')}</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                          <h4 className="font-semibold text-blue-800 mb-2 flex items-center space-x-2">
                            <Lightbulb className="h-4 w-4" />
                            <span>{t('help.proTips', '专业提示')}</span>
                          </h4>
                          <p className="text-blue-700 text-sm">
                            {t('help.shortcutTip', '使用键盘快捷键Ctrl+V（Windows）或Cmd+V（Mac）可以快速粘贴链接，提高工作效率。')}
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-xl">{t('help.supportedFormats', '支持的链接格式')}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="grid gap-4">
                            <div className="bg-green-50 border border-green-200 p-3 rounded-lg">
                              <p className="font-mono text-sm text-green-800">✓ https://www.youtube.com/watch?v=VIDEO_ID</p>
                            </div>
                            <div className="bg-green-50 border border-green-200 p-3 rounded-lg">
                              <p className="font-mono text-sm text-green-800">✓ https://youtu.be/VIDEO_ID</p>
                            </div>
                            <div className="bg-green-50 border border-green-200 p-3 rounded-lg">
                              <p className="font-mono text-sm text-green-800">✓ https://www.youtube.com/embed/VIDEO_ID</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {/* Advanced Tips Section */}
                {activeSection === 'advanced-tips' && (
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-2xl flex items-center space-x-3">
                          <Lightbulb className="h-6 w-6 text-yellow-600" />
                          <span>{t('help.advancedTips', '高级使用技巧')}</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                          <Card className="border-2 border-yellow-200">
                            <CardHeader>
                              <CardTitle className="text-lg flex items-center space-x-2">
                                <Monitor className="h-5 w-5 text-blue-600" />
                                <span>{t('help.resolutionGuide', '分辨率选择指南')}</span>
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-3">
                                <div className="bg-slate-50 p-3 rounded">
                                  <h4 className="font-semibold text-slate-800">{t('help.quality1920', '1920x1080 (最高质量)')}</h4>
                                  <p className="text-sm text-slate-600">{t('help.quality1920Use', '适用于：网站横幅、印刷材料、高清展示')}</p>
                                </div>
                                <div className="bg-slate-50 p-3 rounded">
                                  <h4 className="font-semibold text-slate-800">{t('help.quality480', '480x360 (高质量)')}</h4>
                                  <p className="text-sm text-slate-600">{t('help.quality480Use', '适用于：社交媒体、博客文章、在线内容')}</p>
                                </div>
                                <div className="bg-slate-50 p-3 rounded">
                                  <h4 className="font-semibold text-slate-800">{t('help.quality320', '320x180 (中等质量)')}</h4>
                                  <p className="text-sm text-slate-600">{t('help.quality320Use', '适用于：缩略图预览、快速加载需求')}</p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>

                          <Card className="border-2 border-green-200">
                            <CardHeader>
                              <CardTitle className="text-lg flex items-center space-x-2">
                                <Download className="h-5 w-5 text-green-600" />
                                <span>{t('help.batchDownloadTips', '批量下载技巧')}</span>
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-3">
                                <p className="text-slate-600 text-sm mb-3">{t('help.efficiencyMethods', '提高效率的方法：')}</p>
                                <ul className="list-disc list-inside space-y-2 text-sm text-slate-600">
                                  <li>{t('help.batchTip1', '使用浏览器的"另存为"功能重命名文件')}</li>
                                  <li>{t('help.batchTip2', '创建专门的文件夹分类存储')}</li>
                                  <li>{t('help.batchTip3', '利用历史记录功能快速重新下载')}</li>
                                  <li>{t('help.batchTip4', '右键点击图片选择"图片另存为"')}</li>
                                </ul>
                              </div>
                            </CardContent>
                          </Card>
                        </div>

                        <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
                          <CardHeader>
                            <CardTitle className="text-lg flex items-center space-x-2">
                              <FileImage className="h-5 w-5 text-purple-600" />
                              <span>{t('help.imageQualityOptimization', '图片质量优化建议')}</span>
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="grid md:grid-cols-3 gap-4">
                              <div className="text-center">
                                <div className="bg-white p-4 rounded-lg shadow-sm mb-3">
                                  <ImageIcon className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                                  <h4 className="font-semibold text-slate-800">{t('help.formatSelection', '格式选择')}</h4>
                                </div>
                                <p className="text-sm text-slate-600">{t('help.formatSelectionDesc', 'JPG格式适合大多数用途，文件小，兼容性好')}</p>
                              </div>
                              <div className="text-center">
                                <div className="bg-white p-4 rounded-lg shadow-sm mb-3">
                                  <Monitor className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                                  <h4 className="font-semibold text-slate-800">{t('help.sizeMatching', '尺寸匹配')}</h4>
                                </div>
                                <p className="text-sm text-slate-600">{t('help.sizeMatchingDesc', '根据使用场景选择合适的分辨率，避免过度压缩')}</p>
                              </div>
                              <div className="text-center">
                                <div className="bg-white p-4 rounded-lg shadow-sm mb-3">
                                  <Palette className="h-8 w-8 text-green-600 mx-auto mb-2" />
                                  <h4 className="font-semibold text-slate-800">{t('help.colorFidelity', '色彩保真')}</h4>
                                </div>
                                <p className="text-sm text-slate-600">{t('help.colorFidelityDesc', '我们的工具保持原始色彩，无额外压缩')}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {/* Troubleshooting Section */}
                {activeSection === 'troubleshooting' && (
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-2xl flex items-center space-x-3">
                          <AlertCircle className="h-6 w-6 text-red-600" />
                          <span>{t('help.troubleshooting', '常见问题解决')}</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="space-y-4">
                          <Card className="border-l-4 border-red-500">
                            <CardContent className="pt-6">
                              <h3 className="font-semibold text-slate-800 mb-2">{t('help.linkRecognitionProblem', '问题：无法识别YouTube链接')}</h3>
                              <div className="bg-red-50 p-4 rounded-lg mb-3">
                                <p className="text-red-800 text-sm font-medium mb-2">{t('help.possibleCauses', '可能原因：')}</p>
                                <ul className="list-disc list-inside text-sm text-red-700 space-y-1">
                                  <li>{t('help.cause1', '链接格式不正确')}</li>
                                  <li>{t('help.cause2', '包含额外的参数')}</li>
                                  <li>{t('help.cause3', '视频已被删除或设为私有')}</li>
                                </ul>
                              </div>
                              <div className="bg-green-50 p-4 rounded-lg">
                                <p className="text-green-800 text-sm font-medium mb-2">{t('help.solutions', '解决方案：')}</p>
                                <ul className="list-disc list-inside text-sm text-green-700 space-y-1">
                                  <li>{t('help.solution1', '确保链接包含完整的视频ID')}</li>
                                  <li>{t('help.solution2', '尝试从YouTube重新复制链接')}</li>
                                  <li>{t('help.solution3', '检查视频是否为公开状态')}</li>
                                  <li>{t('help.solution4', '移除链接中的时间戳参数（&t=）')}</li>
                                </ul>
                              </div>
                            </CardContent>
                          </Card>

                          <Card className="border-l-4 border-yellow-500">
                            <CardContent className="pt-6">
                              <h3 className="font-semibold text-slate-800 mb-2">{t('help.downloadProblem', '问题：下载速度慢或失败')}</h3>
                              <div className="bg-yellow-50 p-4 rounded-lg mb-3">
                                <p className="text-yellow-800 text-sm font-medium mb-2">{t('help.possibleCauses', '可能原因：')}</p>
                                <ul className="list-disc list-inside text-sm text-yellow-700 space-y-1">
                                  <li>{t('help.downloadCause1', '网络连接不稳定')}</li>
                                  <li>{t('help.downloadCause2', '浏览器缓存问题')}</li>
                                  <li>{t('help.downloadCause3', '广告拦截器干扰')}</li>
                                </ul>
                              </div>
                              <div className="bg-green-50 p-4 rounded-lg">
                                <p className="text-green-800 text-sm font-medium mb-2">{t('help.solutions', '解决方案：')}</p>
                                <ul className="list-disc list-inside text-sm text-green-700 space-y-1">
                                  <li>{t('help.downloadSolution1', '刷新页面重试')}</li>
                                  <li>{t('help.downloadSolution2', '清除浏览器缓存')}</li>
                                  <li>{t('help.downloadSolution3', '暂时禁用广告拦截器')}</li>
                                  <li>{t('help.downloadSolution4', '尝试使用其他浏览器')}</li>
                                </ul>
                              </div>
                            </CardContent>
                          </Card>

                          <Card className="border-l-4 border-blue-500">
                            <CardContent className="pt-6">
                              <h3 className="font-semibold text-slate-800 mb-2">{t('help.qualityProblem', '问题：图片质量不如预期')}</h3>
                              <div className="bg-blue-50 p-4 rounded-lg mb-3">
                                <p className="text-blue-800 text-sm font-medium mb-2">{t('help.explanation', '说明：')}</p>
                                <p className="text-sm text-blue-700">
                                  {t('help.qualityExplanation', '缩略图质量取决于YouTube原始上传的质量。我们提供的是YouTube服务器上的原始缩略图，未经额外处理。')}
                                </p>
                              </div>
                              <div className="bg-green-50 p-4 rounded-lg">
                                <p className="text-green-800 text-sm font-medium mb-2">{t('help.suggestions', '建议：')}</p>
                                <ul className="list-disc list-inside text-sm text-green-700 space-y-1">
                                  <li>{t('help.qualitySuggestion1', '选择最高分辨率选项')}</li>
                                  <li>{t('help.qualitySuggestion2', '检查原视频的上传质量')}</li>
                                  <li>{t('help.qualitySuggestion3', '较新的视频通常有更好的缩略图质量')}</li>
                                </ul>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {/* Best Practices Section */}
                {activeSection === 'best-practices' && (
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-2xl flex items-center space-x-3">
                          <FileImage className="h-6 w-6 text-green-600" />
                          <span>{t('help.bestPracticesGuide', '最佳实践指南')}</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
                            <CardHeader>
                              <CardTitle className="text-lg text-blue-800">{t('help.copyrightConsiderations', '版权和法律考虑')}</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-3">
                                <div className="bg-white p-3 rounded border border-blue-200">
                                  <h4 className="font-semibold text-blue-800 mb-1">{t('help.fairUse', '合理使用')}</h4>
                  <p className="text-sm text-blue-700">{t('help.fairUseDesc', '仅用于评论、教育或个人用途')}</p>
                </div>
                <div className="bg-white p-3 rounded border border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-1">{t('help.commercialUse', '商业用途')}</h4>
                  <p className="text-sm text-blue-700">{t('help.commercialUseDesc', '需要获得原作者明确授权')}</p>
                </div>
                <div className="bg-white p-3 rounded border border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-1">{t('help.attribution', '署名要求')}</h4>
                  <p className="text-sm text-blue-700">{t('help.attributionDesc', '在可能的情况下注明原视频来源')}</p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>

                          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                            <CardHeader>
                              <CardTitle className="text-lg text-green-800">{t('help.fileManagement', '文件管理建议')}</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-3">
                                <div className="bg-white p-3 rounded border border-green-200">
                                  <h4 className="font-semibold text-green-800 mb-1">{t('help.namingConvention', '命名规范')}</h4>
                  <p className="text-sm text-green-700">{t('help.namingConventionDesc', '使用描述性文件名，包含日期和用途')}</p>
                </div>
                <div className="bg-white p-3 rounded border border-green-200">
                  <h4 className="font-semibold text-green-800 mb-1">{t('help.categorizedStorage', '分类存储')}</h4>
                  <p className="text-sm text-green-700">{t('help.categorizedStorageDesc', '按项目或用途创建不同文件夹')}</p>
                </div>
                <div className="bg-white p-3 rounded border border-green-200">
                  <h4 className="font-semibold text-green-800 mb-1">{t('help.backupStrategy', '备份策略')}</h4>
                  <p className="text-sm text-green-700">{t('help.backupStrategyDesc', '重要图片应保存多个分辨率版本')}</p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </div>

                        <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
                          <CardHeader>
                            <CardTitle className="text-lg text-purple-800">{t('help.workflowOptimization', '工作流程优化')}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="grid md:grid-cols-3 gap-4">
                              <div className="bg-white p-4 rounded-lg border border-purple-200">
                                <div className="text-center mb-3">
                                  <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                                    <span className="text-purple-600 font-bold">1</span>
                                  </div>
                                  <h4 className="font-semibold text-purple-800">{t('help.batchCollection', '批量收集')}</h4>
                                </div>
                                <p className="text-sm text-purple-700">{t('help.batchCollectionDesc', '一次性收集所有需要的视频链接，然后批量处理')}</p>
                              </div>
                              <div className="bg-white p-4 rounded-lg border border-purple-200">
                                <div className="text-center mb-3">
                                  <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                                    <span className="text-purple-600 font-bold">2</span>
                                  </div>
                                  <h4 className="font-semibold text-purple-800">{t('help.qualityFiltering', '质量筛选')}</h4>
                                </div>
                                <p className="text-sm text-purple-700">{t('help.qualityFilteringDesc', '根据最终用途选择合适的分辨率，避免不必要的大文件')}</p>
                              </div>
                              <div className="bg-white p-4 rounded-lg border border-purple-200">
                                <div className="text-center mb-3">
                                  <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                                    <span className="text-purple-600 font-bold">3</span>
                                  </div>
                                  <h4 className="font-semibold text-purple-800">{t('help.immediateOrganization', '即时整理')}</h4>
                                </div>
                                <p className="text-sm text-purple-700">{t('help.immediateOrganizationDesc', '下载后立即重命名和分类，保持文件系统整洁')}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {/* Tools Section */}
                {activeSection === 'tools' && (
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-2xl flex items-center space-x-3">
                          <Monitor className="h-6 w-6 text-blue-600" />
                          <span>{t('help.toolsAndFeatures', '工具和功能')}</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                          <Card className="border-2 border-blue-200">
                            <CardHeader>
                              <CardTitle className="text-lg text-blue-800">{t('help.thumbnailDownloader', '缩略图下载器')}</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <p className="text-slate-600 mb-4">{t('help.thumbnailDownloaderDesc', '快速提取YouTube视频缩略图，支持多种分辨率。')}</p>
                              <ul className="list-disc list-inside space-y-1 text-sm text-slate-600">
                                <li>{t('help.thumbnailFeature1', '支持所有YouTube链接格式')}</li>
                                <li>{t('help.thumbnailFeature2', '提供多种分辨率选择')}</li>
                                <li>{t('help.thumbnailFeature3', '一键批量下载')}</li>
                                <li>{t('help.thumbnailFeature4', '历史记录管理')}</li>
                              </ul>
                            </CardContent>
                          </Card>
                          <Card className="border-2 border-green-200">
                            <CardHeader>
                              <CardTitle className="text-lg text-green-800">{t('help.coverMaker', '封面制作器')}</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <p className="text-slate-600 mb-4">{t('help.coverMakerDesc', '专业的封面设计工具，配备AI功能。')}</p>
                              <ul className="list-disc list-inside space-y-1 text-sm text-slate-600">
                                <li>{t('help.coverFeature1', '拖拽式设计界面')}</li>
                                <li>{t('help.coverFeature2', '丰富的文字和贴纸库')}</li>
                                <li>{t('help.coverFeature3', 'AI图片生成功能')}</li>
                                <li>{t('help.coverFeature4', '实时预览和编辑')}</li>
                              </ul>
                            </CardContent>
                          </Card>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {/* Tutorials Section */}
                {activeSection === 'tutorials' && (
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-2xl flex items-center space-x-3">
                          <FileImage className="h-6 w-6 text-purple-600" />
                          <span>{t('help.tutorialsAndGuides', '教程和指南')}</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="space-y-4">
                          <Card className="border-l-4 border-blue-500">
                            <CardContent className="pt-6">
                              <h3 className="text-lg font-semibold mb-2">{t('help.basicTutorials', '基础教程')}</h3>
                              <ul className="space-y-2 text-slate-600">
                                <li>• {t('help.basicTutorial1', '如何下载YouTube缩略图')}</li>
                                <li>• {t('help.basicTutorial2', '选择合适的图片分辨率')}</li>
                                <li>• {t('help.basicTutorial3', '批量处理多个视频')}</li>
                                <li>• {t('help.basicTutorial4', '管理下载历史')}</li>
                              </ul>
                            </CardContent>
                          </Card>
                          <Card className="border-l-4 border-green-500">
                            <CardContent className="pt-6">
                              <h3 className="text-lg font-semibold mb-2">{t('help.coverMakingTutorials', '封面制作教程')}</h3>
                              <ul className="space-y-2 text-slate-600">
                                <li>• {t('help.coverTutorial1', '创建专业YouTube封面')}</li>
                                <li>• {t('help.coverTutorial2', '使用AI生成图片素材')}</li>
                                <li>• {t('help.coverTutorial3', '添加文字和特效')}</li>
                                <li>• {t('help.coverTutorial4', '导出和优化设计')}</li>
                              </ul>
                            </CardContent>
                          </Card>
                          <Card className="border-l-4 border-purple-500">
                            <CardContent className="pt-6">
                              <h3 className="text-lg font-semibold mb-2">{t('help.advancedTechniques', '高级技巧')}</h3>
                              <ul className="space-y-2 text-slate-600">
                                <li>• {t('help.advancedTechnique1', '批量处理工作流程')}</li>
                                <li>• {t('help.advancedTechnique2', '自动化下载设置')}</li>
                                <li>• {t('help.advancedTechnique3', '创意设计技巧')}</li>
                                <li>• {t('help.advancedTechnique4', '性能优化建议')}</li>
                              </ul>
                            </CardContent>
                          </Card>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {/* FAQ Section */}
                {activeSection === 'faq' && (
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-2xl flex items-center space-x-3">
                          <HelpCircle className="h-6 w-6 text-orange-600" />
                          <span>{t('help.faq', '常见问题')}</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-4">
                          <Card className="border border-slate-200">
                            <CardContent className="pt-6">
                              <h3 className="font-semibold text-slate-800 mb-2">{t('help.faqQuestion1', 'Q: 支持哪些YouTube链接格式？')}</h3>
                              <p className="text-slate-600">{t('help.faqAnswer1', 'A: 我们支持所有标准的YouTube链接格式，包括完整链接、短链接和嵌入链接。')}</p>
                            </CardContent>
                          </Card>
                          <Card className="border border-slate-200">
                            <CardContent className="pt-6">
                              <h3 className="font-semibold text-slate-800 mb-2">{t('help.faqQuestion2', 'Q: 下载的图片质量如何？')}</h3>
                              <p className="text-slate-600">{t('help.faqAnswer2', 'A: 我们提供从120x90到1920x1080的多种分辨率，确保满足不同用途的需求。')}</p>
                            </CardContent>
                          </Card>
                          <Card className="border border-slate-200">
                            <CardContent className="pt-6">
                              <h3 className="font-semibold text-slate-800 mb-2">{t('help.faqQuestion3', 'Q: 是否需要注册账户？')}</h3>
                              <p className="text-slate-600">{t('help.faqAnswer3', 'A: 不需要，我们的工具完全免费使用，无需注册或登录。')}</p>
                            </CardContent>
                          </Card>
                          <Card className="border border-slate-200">
                            <CardContent className="pt-6">
                              <h3 className="font-semibold text-slate-800 mb-2">{t('help.faqQuestion4', 'Q: 封面制作器有哪些功能？')}</h3>
                              <p className="text-slate-600">{t('help.faqAnswer4', 'A: 包括文字添加、图片上传、贴纸库、AI图片生成等专业设计功能。')}</p>
                            </CardContent>
                          </Card>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {/* Resources Section */}
                {activeSection === 'resources' && (
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-2xl flex items-center space-x-3">
                          <Palette className="h-6 w-6 text-green-600" />
                          <span>{t('help.resourcesAndMaterials', '资源和素材')}</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                          <Card className="border-2 border-green-200">
                            <CardHeader>
                              <CardTitle className="text-lg text-green-800">{t('help.designResources', '设计资源')}</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <ul className="space-y-2 text-slate-600">
                                <li>{t('help.designResource1', '• 免费字体库')}</li>
                                <li>{t('help.designResource2', '• 图标和贴纸')}</li>
                                <li>{t('help.designResource3', '• 颜色搭配指南')}</li>
                                <li>{t('help.designResource4', '• 设计模板')}</li>
                              </ul>
                            </CardContent>
                          </Card>
                          <Card className="border-2 border-blue-200">
                            <CardHeader>
                              <CardTitle className="text-lg text-blue-800">{t('help.learningResources', '学习资源')}</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <ul className="space-y-2 text-slate-600">
                                <li>{t('help.learningResource1', '• 设计基础教程')}</li>
                                <li>{t('help.learningResource2', '• YouTube营销指南')}</li>
                                <li>{t('help.learningResource3', '• 创意灵感库')}</li>
                                <li>{t('help.learningResource4', '• 案例研究')}</li>
                              </ul>
                            </CardContent>
                          </Card>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {/* Contact Section */}
                {activeSection === 'contact' && (
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-2xl flex items-center space-x-3">
                          <ArrowRight className="h-6 w-6 text-red-600" />
                          <span>{t('help.contactUs', '联系我们')}</span>
                        </CardTitle>
                        <p className="text-slate-600 mt-2">{t('help.contactDescription', '我们致力于为用户提供最优质的服务和支持，欢迎通过以下方式与我们联系。')}</p>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        {/* 主要联系方式 */}
                        <div className="grid md:grid-cols-3 gap-6">
                          <Card className="border-2 border-red-200 bg-gradient-to-br from-red-50 to-pink-50">
                            <CardHeader>
                              <CardTitle className="text-lg text-red-800 flex items-center space-x-2">
                                <Mail className="h-5 w-5" />
                                <span>{t('help.technicalSupport', '技术支持')}</span>
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <p className="text-slate-600 mb-4">{t('help.technicalSupportDesc', '遇到技术问题或需要使用帮助？')}</p>
                              <div className="space-y-3">
                                <div className="bg-white p-3 rounded border border-red-200">
                                  <p className="font-semibold text-red-800 mb-1">{t('help.emailSupport', '邮箱支持')}</p>
                                  <p className="text-sm text-red-700">support@covercrafter.com</p>
                                  <p className="text-xs text-slate-500 mt-1">{t('help.emailSupportTime', '24小时内回复')}</p>
                                </div>
                                <div className="bg-white p-3 rounded border border-red-200">
                                  <p className="font-semibold text-red-800 mb-1">{t('help.onlineService', '在线客服')}</p>
                                  <p className="text-sm text-red-700">{t('help.onlineServiceTime', '工作日 9:00-18:00')}</p>
                                  <p className="text-xs text-slate-500 mt-1">{t('help.onlineServiceResponse', '即时响应')}</p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                          
                          <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50">
                            <CardHeader>
                              <CardTitle className="text-lg text-blue-800 flex items-center space-x-2">
                                <MessageSquare className="h-5 w-5" />
                                <span>{t('help.feedbackSuggestions', '反馈建议')}</span>
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <p className="text-slate-600 mb-4">{t('help.feedbackDesc', '我们重视您的意见和建议')}</p>
                              <div className="space-y-3">
                                <div className="bg-white p-3 rounded border border-blue-200">
                                  <p className="font-semibold text-blue-800 mb-1">{t('help.productFeedback', '产品反馈')}</p>
                                  <p className="text-sm text-blue-700">feedback@covercrafter.com</p>
                                  <p className="text-xs text-slate-500 mt-1">{t('help.productFeedbackDesc', '功能建议、体验反馈')}</p>
                                </div>
                                <div className="bg-white p-3 rounded border border-blue-200">
                                  <p className="font-semibold text-blue-800 mb-1">{t('help.userResearch', '用户调研')}</p>
                                  <p className="text-sm text-blue-700">{t('help.userResearchDesc', '参与产品改进')}</p>
                                  <p className="text-xs text-slate-500 mt-1">{t('help.userResearchInvite', '定期邀请参与')}</p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                          
                          <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
                            <CardHeader>
                              <CardTitle className="text-lg text-green-800 flex items-center space-x-2">
                                <Users className="h-5 w-5" />
                                <span>{t('help.businessCooperation', '商务合作')}</span>
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <p className="text-slate-600 mb-4">{t('help.businessCooperationDesc', '寻求合作机会或商务洽谈？')}</p>
                              <div className="space-y-3">
                                <div className="bg-white p-3 rounded border border-green-200">
                                  <p className="font-semibold text-green-800 mb-1">{t('help.businessPartnership', '商务合作')}</p>
                                  <p className="text-sm text-green-700">business@covercrafter.com</p>
                                  <p className="text-xs text-slate-500 mt-1">{t('help.businessPartnershipDesc', 'API接入、品牌合作')}</p>
                                </div>
                                <div className="bg-white p-3 rounded border border-green-200">
                                  <p className="font-semibold text-green-800 mb-1">{t('help.mediaContact', '媒体联系')}</p>
                                  <p className="text-sm text-green-700">media@covercrafter.com</p>
                                  <p className="text-xs text-slate-500 mt-1">{t('help.mediaContactDesc', '媒体采访、新闻发布')}</p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                        
                        {/* 社交媒体和社区 */}
                        <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-indigo-50">
                          <CardHeader>
                            <CardTitle className="text-xl text-purple-800 flex items-center space-x-2">
                              <Share2 className="h-5 w-5" />
                              <span>{t('help.socialMediaAndCommunity', '社交媒体与社区')}</span>
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="grid md:grid-cols-4 gap-4">
                              <div className="bg-white p-4 rounded-lg border border-purple-200 text-center">
                                <div className="bg-blue-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                                  <span className="text-white font-bold">微</span>
                                </div>
                                <p className="font-semibold text-purple-800 mb-1">{t('help.wechatPublicAccount', '微信公众号')}</p>
                                <p className="text-sm text-purple-700">CoverCrafter</p>
                                <p className="text-xs text-slate-500 mt-1">{t('help.wechatDesc', '最新功能、使用技巧')}</p>
                              </div>
                              
                              <div className="bg-white p-4 rounded-lg border border-purple-200 text-center">
                                <div className="bg-red-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                                  <span className="text-white font-bold">Y</span>
                                </div>
                                <p className="font-semibold text-purple-800 mb-1">YouTube</p>
                                <p className="text-sm text-purple-700">@CoverCrafter官方</p>
                                <p className="text-xs text-slate-500 mt-1">{t('help.youtubeDesc', '视频教程、案例分享')}</p>
                              </div>
                              
                              <div className="bg-white p-4 rounded-lg border border-purple-200 text-center">
                                <div className="bg-gray-800 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                                  <span className="text-white font-bold">G</span>
                                </div>
                                <p className="font-semibold text-purple-800 mb-1">GitHub</p>
                                <p className="text-sm text-purple-700">{t('help.githubProject', '开源项目')}</p>
                                <p className="text-xs text-slate-500 mt-1">{t('help.githubDesc', '代码贡献、问题反馈')}</p>
                              </div>
                              
                              <div className="bg-white p-4 rounded-lg border border-purple-200 text-center">
                                 <div className="bg-indigo-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                                   <MessageSquare className="h-6 w-6 text-white" />
                                 </div>
                                 <p className="font-semibold text-purple-800 mb-1">{t('help.userCommunity', '用户社区')}</p>
                                 <p className="text-sm text-purple-700">{t('help.discordServer', 'Discord服务器')}</p>
                                 <p className="text-xs text-slate-500 mt-1">{t('help.communityDesc', '用户交流、经验分享')}</p>
                               </div>
                            </div>
                          </CardContent>
                        </Card>
                        
                        {/* 响应时间和服务承诺 */}
                        <Card className="border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-yellow-50">
                          <CardHeader>
                            <CardTitle className="text-xl text-amber-800 flex items-center space-x-2">
                              <Clock className="h-5 w-5" />
                              <span>{t('help.serviceCommitment', '服务承诺')}</span>
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="grid md:grid-cols-3 gap-6">
                              <div className="text-center">
                                <div className="bg-amber-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                                  <Clock className="h-8 w-8 text-white" />
                                </div>
                                <h4 className="font-semibold text-amber-800 mb-2">{t('help.quickResponse', '快速响应')}</h4>
                                <p className="text-sm text-amber-700">{t('help.quickResponseDesc1', '技术支持邮件24小时内回复')}</p>
                                <p className="text-sm text-amber-700">{t('help.quickResponseDesc2', '在线客服工作时间即时响应')}</p>
                              </div>
                              
                              <div className="text-center">
                                <div className="bg-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                                  <Shield className="h-8 w-8 text-white" />
                                </div>
                                <h4 className="font-semibold text-amber-800 mb-2">{t('help.professionalService', '专业服务')}</h4>
                                <p className="text-sm text-amber-700">{t('help.professionalServiceDesc1', '专业技术团队提供支持')}</p>
                                <p className="text-sm text-amber-700">{t('help.professionalServiceDesc2', '详细的问题解决方案')}</p>
                              </div>
                              
                              <div className="text-center">
                                <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                                  <Heart className="h-8 w-8 text-white" />
                                </div>
                                <h4 className="font-semibold text-amber-800 mb-2">{t('help.userFirst', '用户至上')}</h4>
                                <p className="text-sm text-amber-700">{t('help.userFirstDesc1', '认真对待每一个反馈')}</p>
                                <p className="text-sm text-amber-700">{t('help.userFirstDesc2', '持续改进产品体验')}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                        
                        {/* 常见问题快速入口 */}
                        <Card className="border-2 border-indigo-200 bg-gradient-to-br from-indigo-50 to-blue-50">
                          <CardHeader>
                            <CardTitle className="text-xl text-indigo-800 flex items-center space-x-2">
                              <HelpCircle className="h-5 w-5" />
                              <span>{t('help.quickHelp', '快速帮助')}</span>
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-slate-600 mb-4">{t('help.quickHelpDesc', '在联系我们之前，您可以先查看这些资源：')}</p>
                            <div className="grid md:grid-cols-2 gap-4">
                              <button 
                                onClick={() => setActiveSection('faq')}
                                className="bg-white p-4 rounded-lg border border-indigo-200 hover:border-indigo-400 transition-colors text-left"
                              >
                                <div className="flex items-center space-x-3">
                                  <div className="bg-indigo-600 w-10 h-10 rounded-full flex items-center justify-center">
                                    <HelpCircle className="h-5 w-5 text-white" />
                                  </div>
                                  <div>
                                    <p className="font-semibold text-indigo-800">{t('help.faq', '常见问题')}</p>
                                    <p className="text-sm text-indigo-700">{t('help.faqButtonDesc', '查看最常见的问题和解答')}</p>
                                  </div>
                                </div>
                              </button>
                              
                              <button 
                                onClick={() => setActiveSection('tutorials')}
                                className="bg-white p-4 rounded-lg border border-indigo-200 hover:border-indigo-400 transition-colors text-left"
                              >
                                <div className="flex items-center space-x-3">
                                  <div className="bg-green-600 w-10 h-10 rounded-full flex items-center justify-center">
                                    <BookOpen className="h-5 w-5 text-white" />
                                  </div>
                                  <div>
                                    <p className="font-semibold text-indigo-800">{t('help.usageTutorials', '使用教程')}</p>
                                    <p className="text-sm text-indigo-700">{t('help.usageTutorialsDesc', '详细的功能使用指南')}</p>
                                  </div>
                                </div>
                              </button>
                            </div>
                          </CardContent>
                        </Card>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {/* Creative Uses Section */}
                {activeSection === 'creative-uses' && (
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-2xl flex items-center space-x-3">
                          <Palette className="h-6 w-6 text-purple-600" />
                          <span>{t('help.creativeUsesAndApplications', '创意用途和应用场景')}</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                          <Card className="border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-yellow-50">
                            <CardHeader>
                              <CardTitle className="text-lg text-orange-800 flex items-center space-x-2">
                                <Palette className="h-5 w-5" />
                                <span>{t('help.designAndCreation', '设计和创作')}</span>
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-3">
                                <div className="bg-white p-3 rounded border border-orange-200">
                                  <h4 className="font-semibold text-orange-800 mb-1">{t('help.webDesign', '网站设计')}</h4>
                  <p className="text-sm text-orange-700">{t('help.webDesignDesc', '用作网站横幅、背景图片或内容配图')}</p>
                                </div>
                                <div className="bg-white p-3 rounded border border-orange-200">
                                  <h4 className="font-semibold text-orange-800 mb-1">{t('help.socialMedia', '社交媒体')}</h4>
                  <p className="text-sm text-orange-700">{t('help.socialMediaDesc', '制作Instagram故事、Facebook封面或Twitter头图')}</p>
                                </div>
                                <div className="bg-white p-3 rounded border border-orange-200">
                                  <h4 className="font-semibold text-orange-800 mb-1">{t('help.printMaterials', '印刷材料')}</h4>
                  <p className="text-sm text-orange-700">{t('help.printMaterialsDesc', '用于海报、传单、名片等印刷品设计')}</p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>

                          <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50">
                            <CardHeader>
                              <CardTitle className="text-lg text-blue-800 flex items-center space-x-2">
                                <Monitor className="h-5 w-5" />
                                <span>{t('help.contentCreation', '内容创作')}</span>
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-3">
                                <div className="bg-white p-3 rounded border border-blue-200">
                                  <h4 className="font-semibold text-blue-800 mb-1">{t('help.blogPosts', '博客文章')}</h4>
                  <p className="text-sm text-blue-700">{t('help.blogPostsDesc', '为文章添加相关的视觉元素和配图')}</p>
                                </div>
                                <div className="bg-white p-3 rounded border border-blue-200">
                                  <h4 className="font-semibold text-blue-800 mb-1">{t('help.videoProduction', '视频制作')}</h4>
                  <p className="text-sm text-blue-700">{t('help.videoProductionDesc', '用作视频封面、片头片尾或转场素材')}</p>
                                </div>
                                <div className="bg-white p-3 rounded border border-blue-200">
                                  <h4 className="font-semibold text-blue-800 mb-1">{t('help.presentations', '演示文稿')}</h4>
                  <p className="text-sm text-blue-700">{t('help.presentationsDesc', '增强PPT和演示文稿的视觉效果')}</p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </div>

                        <Card className="bg-gradient-to-r from-green-50 to-teal-50 border-green-200">
                          <CardHeader>
                            <CardTitle className="text-lg text-green-800">{t('help.educationalBusinessApps', '教育和商业应用')}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="grid md:grid-cols-3 gap-4">
                              <div className="bg-white p-4 rounded-lg border border-green-200">
                                <h4 className="font-semibold text-green-800 mb-2">{t('help.educationalTraining', '教育培训')}</h4>
                                <ul className="text-sm text-green-700 space-y-1">
                                  <li>{t('help.educationalItem1', '• 课程材料配图')}</li>
                                  <li>{t('help.educationalItem2', '• 在线教程封面')}</li>
                                  <li>{t('help.educationalItem3', '• 学习资源整理')}</li>
                                  <li>{t('help.educationalItem4', '• 教学演示辅助')}</li>
                                </ul>
                              </div>
                              <div className="bg-white p-4 rounded-lg border border-green-200">
                                <h4 className="font-semibold text-green-800 mb-2">{t('help.marketing', '市场营销')}</h4>
                                <ul className="text-sm text-green-700 space-y-1">
                                  <li>{t('help.marketingItem1', '• 产品宣传材料')}</li>
                                  <li>{t('help.marketingItem2', '• 广告创意素材')}</li>
                                  <li>{t('help.marketingItem3', '• 品牌视觉设计')}</li>
                                  <li>{t('help.marketingItem4', '• 营销活动配图')}</li>
                                </ul>
                              </div>
                              <div className="bg-white p-4 rounded-lg border border-green-200">
                                <h4 className="font-semibold text-green-800 mb-2">{t('help.researchAnalysis', '研究分析')}</h4>
                                <ul className="text-sm text-green-700 space-y-1">
                                  <li>{t('help.researchItem1', '• 内容分析研究')}</li>
                                  <li>{t('help.researchItem2', '• 趋势观察记录')}</li>
                                  <li>{t('help.researchItem3', '• 竞品分析资料')}</li>
                                  <li>{t('help.researchItem4', '• 案例研究整理')}</li>
                                </ul>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
                          <CardHeader>
                            <CardTitle className="text-lg text-purple-800">{t('help.creativeProjectInspiration', '创意项目灵感')}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              <div className="bg-white p-4 rounded-lg border border-purple-200">
                                <h4 className="font-semibold text-purple-800 mb-2 flex items-center space-x-2">
                                  <ArrowRight className="h-4 w-4" />
                                  <span>{t('help.collageArtProject', '拼贴艺术项目')}</span>
                                </h4>
                                <p className="text-sm text-purple-700 mb-2">
                                  {t('help.collageArtProjectDesc', '收集多个相关主题的YouTube缩略图，创建主题拼贴画或情绪板，用于设计灵感或项目规划。')}
                                </p>
                              </div>
                              <div className="bg-white p-4 rounded-lg border border-purple-200">
                                <h4 className="font-semibold text-purple-800 mb-2 flex items-center space-x-2">
                                  <ArrowRight className="h-4 w-4" />
                                  <span>{t('help.timelineRecord', '时间轴记录')}</span>
                                </h4>
                                <p className="text-sm text-purple-700 mb-2">
                                  {t('help.timelineRecordDesc', '使用缩略图创建事件时间轴，记录重要时刻或项目进展，制作视觉化的成长记录。')}
                                </p>
                              </div>
                              <div className="bg-white p-4 rounded-lg border border-purple-200">
                                <h4 className="font-semibold text-purple-800 mb-2 flex items-center space-x-2">
                                  <ArrowRight className="h-4 w-4" />
                                  <span>{t('help.comparisonAnalysisChart', '比较分析图表')}</span>
                                </h4>
                                <p className="text-sm text-purple-700 mb-2">
                                  {t('help.comparisonAnalysisChartDesc', '将不同视频的缩略图并排展示，用于比较分析、产品对比或趋势研究的可视化呈现。')}
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Help;