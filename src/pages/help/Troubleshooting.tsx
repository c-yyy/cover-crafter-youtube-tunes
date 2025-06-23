import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Header } from '../../components/Header';
import HelpNavigation from '../../components/HelpNavigation';
import Breadcrumb from '../../components/Breadcrumb';
import { useParams } from 'react-router-dom';

const Troubleshooting = () => {
  const { t } = useTranslation();
  const { lng } = useParams<{ lng: string }>();

  return (
    <>
      <Helmet>
        <title>{t('help.troubleshooting', '问题解决')} - {t('help.pageTitle', '使用帮助和教程')} - {t('siteTitle')}</title>
        <meta name="description" content={t('help.troubleshootingDescription', '解决YouTube缩略图下载过程中遇到的常见问题，包括链接识别、下载失败和图片质量等问题的解决方案。')} />
        <link rel="canonical" href={`${window.location.origin}/${lng}/help/troubleshooting`} />
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
                  { label: t('help.troubleshooting', '问题解决') }
                ]} />
                
                {/* Page Header */}
                <div className="text-center mb-12">
                  <div className="flex items-center justify-center space-x-3 mb-4">
                    <div className="bg-red-600 p-3 rounded-lg">
                      <AlertCircle className="h-8 w-8 text-white" />
                    </div>
                    <h1 className="text-4xl font-bold text-slate-800">
                      {t('help.troubleshooting', '问题解决')}
                    </h1>
                  </div>
                  <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                    {t('help.troubleshootingSubtitle', '快速解决使用过程中遇到的常见问题')}
                  </p>
                </div>

                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-2xl flex items-center space-x-3">
                        <AlertCircle className="h-6 w-6 text-red-600" />
                        <span>{t('help.commonProblems', '常见问题解决')}</span>
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
                                <li>{t('help.incorrectLinkFormat', '链接格式不正确')}</li>
                                <li>{t('help.extraParameters', '包含额外的参数')}</li>
                                <li>{t('help.videoDeletedOrPrivate', '视频已被删除或设为私有')}</li>
                              </ul>
                            </div>
                            <div className="bg-green-50 p-4 rounded-lg">
                              <p className="text-green-800 text-sm font-medium mb-2">{t('help.solutions', '解决方案：')}</p>
                              <ul className="list-disc list-inside text-sm text-green-700 space-y-1">
                                <li>{t('help.ensureCompleteVideoId', '确保链接包含完整的视频ID')}</li>
                                <li>{t('help.recopyFromYoutube', '尝试从YouTube重新复制链接')}</li>
                                <li>{t('help.checkVideoPublic', '检查视频是否为公开状态')}</li>
                                <li>{t('help.removeTimestampParams', '移除链接中的时间戳参数（&t=）')}</li>
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
                                <li>{t('help.unstableConnection', '网络连接不稳定')}</li>
                                <li>{t('help.browserCacheIssue', '浏览器缓存问题')}</li>
                                <li>{t('help.adBlockerInterference', '广告拦截器干扰')}</li>
                              </ul>
                            </div>
                            <div className="bg-green-50 p-4 rounded-lg">
                              <p className="text-green-800 text-sm font-medium mb-2">{t('help.solutions', '解决方案：')}</p>
                              <ul className="list-disc list-inside text-sm text-green-700 space-y-1">
                                <li>{t('help.refreshAndRetry', '刷新页面重试')}</li>
                                <li>{t('help.clearBrowserCache', '清除浏览器缓存')}</li>
                                <li>{t('help.disableAdBlocker', '暂时禁用广告拦截器')}</li>
                                <li>{t('help.tryDifferentBrowser', '尝试使用其他浏览器')}</li>
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
                                <li>{t('help.selectHighestResolution', '选择最高分辨率选项')}</li>
                                <li>{t('help.checkOriginalVideo', '检查原视频的缩略图质量')}</li>
                                <li>{t('help.tryDifferentVideo', '尝试其他视频进行对比')}</li>
                                <li>{t('help.useImageEditor', '使用图片编辑软件进行后期优化')}</li>
                              </ul>
                            </div>
                          </CardContent>
                        </Card>

                        <Card className="border-l-4 border-purple-500">
                          <CardContent className="pt-6">
                            <h3 className="font-semibold text-slate-800 mb-2">{t('help.browserCompatibility', '问题：浏览器兼容性')}</h3>
                            <div className="bg-purple-50 p-4 rounded-lg mb-3">
                              <p className="text-purple-800 text-sm font-medium mb-2">{t('help.supportedBrowsers', '支持的浏览器：')}</p>
                              <ul className="list-disc list-inside text-sm text-purple-700 space-y-1">
                                <li>Chrome 80+</li>
                                <li>Firefox 75+</li>
                                <li>Safari 13+</li>
                                <li>Edge 80+</li>
                              </ul>
                            </div>
                            <div className="bg-green-50 p-4 rounded-lg">
                              <p className="text-green-800 text-sm font-medium mb-2">{t('help.recommendations', '建议：')}</p>
                              <ul className="list-disc list-inside text-sm text-green-700 space-y-1">
                                <li>{t('help.updateBrowser', '更新浏览器到最新版本')}</li>
                                <li>{t('help.enableJavaScript', '确保JavaScript已启用')}</li>
                                <li>{t('help.disableExtensions', '暂时禁用可能冲突的扩展程序')}</li>
                              </ul>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
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

export default Troubleshooting;