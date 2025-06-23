import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Lightbulb } from "lucide-react";
import { Header } from '../../components/Header';
import HelpNavigation from '../../components/HelpNavigation';
import Breadcrumb from '../../components/Breadcrumb';
import { useParams } from 'react-router-dom';

const GettingStarted = () => {
  const { t } = useTranslation();
  const { lng } = useParams<{ lng: string }>();

  return (
    <>
      <Helmet>
        <title>{t('help.gettingStarted', '快速开始')} - {t('help.pageTitle', '使用帮助和教程')} - {t('siteTitle')}</title>
        <meta name="description" content={t('help.gettingStartedDescription', '学习如何快速开始使用YouTube缩略图下载工具，包含详细的步骤指南和专业提示。')} />
        <link rel="canonical" href={`${window.location.origin}/${lng}/help/getting-started`} />
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
                  { label: t('help.gettingStarted', '快速开始') }
                ]} />
                
                {/* Page Header */}
                <div className="text-center mb-12">
                  <div className="flex items-center justify-center space-x-3 mb-4">
                    <div className="bg-green-600 p-3 rounded-lg">
                      <CheckCircle className="h-8 w-8 text-white" />
                    </div>
                    <h1 className="text-4xl font-bold text-slate-800">
                      {t('help.gettingStarted', '快速开始')}
                    </h1>
                  </div>
                  <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                    {t('help.gettingStartedSubtitle', '学习如何快速开始使用我们的YouTube缩略图下载工具')}
                  </p>
                </div>

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
                          <span>{t('help.proTip', '专业提示')}</span>
                        </h4>
                        <p className="text-blue-700 text-sm">
                          {t('help.keyboardShortcut', '使用键盘快捷键Ctrl+V（Windows）或Cmd+V（Mac）可以快速粘贴链接，提高工作效率。')}
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
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default GettingStarted;