import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, Monitor, Download, FileImage, ImageIcon, Palette } from "lucide-react";
import { Header } from '../../components/Header';
import HelpNavigation from '../../components/HelpNavigation';
import Breadcrumb from '../../components/Breadcrumb';
import { useParams } from 'react-router-dom';

const AdvancedTips = () => {
  const { t } = useTranslation();
  const { lng } = useParams<{ lng: string }>();

  return (
    <>
      <Helmet>
        <title>{t('help.advancedTips', '高级技巧')} - {t('help.pageTitle', '使用帮助和教程')} - {t('siteTitle')}</title>
        <meta name="description" content={t('help.advancedTipsDescription', '掌握YouTube缩略图下载的高级技巧，包括分辨率选择、批量下载和图片质量优化建议。')} />
        <link rel="canonical" href={`${window.location.origin}/${lng}/help/advanced-tips`} />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <Header currentPage="help" />

        <main className="container mx-auto px-4 py-12">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-4 gap-8">
              {/* Sidebar Navigation */}
              <div className="lg:col-span-1">
                <HelpNavigation />
              </div>
              
              {/* Main Content */}
              <div className="lg:col-span-3">
                <Breadcrumb items={[
                  { label: t('help.pageTitle', '帮助'), href: `/${lng}/help` },
                  { label: t('help.advancedTips', '高级技巧') }
                ]} />
                
                {/* Page Header */}
                <div className="text-center mb-12">
                  <div className="flex items-center justify-center space-x-3 mb-4">
                    <div className="bg-yellow-600 p-3 rounded-lg">
                      <Lightbulb className="h-8 w-8 text-white" />
                    </div>
                    <h1 className="text-4xl font-bold text-slate-800">
                      {t('help.advancedTips', '高级技巧')}
                    </h1>
                  </div>
                  <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                    {t('help.advancedTipsSubtitle', '掌握专业技巧，提升YouTube缩略图下载的效率和质量')}
                  </p>
                </div>

                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-2xl flex items-center space-x-3">
                        <Lightbulb className="h-6 w-6 text-yellow-600" />
                        <span>{t('help.advancedUsageTips', '高级使用技巧')}</span>
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
                                <li>{t('help.saveAsMethod', '使用浏览器的"另存为"功能重命名文件')}</li>
                                <li>{t('help.folderOrganization', '创建专门的文件夹分类存储')}</li>
                                <li>{t('help.historyFeature', '利用历史记录功能快速重新下载')}</li>
                                <li>{t('help.rightClickSave', '右键点击图片选择"图片另存为"')}</li>
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
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default AdvancedTips;