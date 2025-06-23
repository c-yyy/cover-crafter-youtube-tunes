import React from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpCircle, CheckCircle, Lightbulb, AlertCircle, Monitor, FileImage, Palette, ArrowRight } from "lucide-react";
import { Header } from '../../components/Header';
import { Link, useParams } from 'react-router-dom';

const HelpIndex = () => {
  const { t } = useTranslation();
  const { lng } = useParams<{ lng: string }>();

  const helpSections = [
    {
      id: 'getting-started',
      title: t('help.gettingStarted', '快速开始'),
      description: t('help.gettingStartedDesc', '学习如何快速开始使用YouTube缩略图下载工具'),
      icon: CheckCircle,
      color: 'green',
      path: 'getting-started'
    },
    {
      id: 'advanced-tips',
      title: t('help.advancedTips', '高级技巧'),
      description: t('help.advancedTipsDesc', '掌握专业技巧，提升下载效率和图片质量'),
      icon: Lightbulb,
      color: 'yellow',
      path: 'advanced-tips'
    },
    {
      id: 'troubleshooting',
      title: t('help.troubleshooting', '问题解决'),
      description: t('help.troubleshootingDesc', '快速解决使用过程中遇到的常见问题'),
      icon: AlertCircle,
      color: 'red',
      path: 'troubleshooting'
    },
    {
      id: 'tools',
      title: t('tools', '工具'),
      description: t('help.toolsDesc', '了解我们提供的各种YouTube相关工具'),
      icon: Monitor,
      color: 'blue',
      path: '/tools'
    },
    {
      id: 'tutorials',
      title: t('tutorials', '教程'),
      description: t('help.tutorialsDesc', '详细的视频和图文教程'),
      icon: FileImage,
      color: 'purple',
      path: '/tutorials'
    },
    {
      id: 'faq',
      title: t('faq', '常见问题'),
      description: t('help.faqDesc', '查看用户最常问的问题和答案'),
      icon: HelpCircle,
      color: 'indigo',
      path: '/faq'
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      green: 'bg-green-600 text-white border-green-200 hover:border-green-300',
      yellow: 'bg-yellow-600 text-white border-yellow-200 hover:border-yellow-300',
      red: 'bg-red-600 text-white border-red-200 hover:border-red-300',
      blue: 'bg-blue-600 text-white border-blue-200 hover:border-blue-300',
      purple: 'bg-purple-600 text-white border-purple-200 hover:border-purple-300',
      indigo: 'bg-indigo-600 text-white border-indigo-200 hover:border-indigo-300'
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  return (
    <>
      <Helmet>
        <title>{t('help.pageTitle', '使用帮助和教程')} - {t('siteTitle')}</title>
        <meta name="description" content={t('help.pageDescription', '详细的YouTube缩略图下载教程，包含使用技巧、最佳实践和创意用途指南。学习如何高效使用我们的工具。')} />
        <link rel="canonical" href={`${window.location.origin}/${lng}/help`} />
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
                {t('help.pageSubtitle', '学习如何充分利用我们的YouTube缩略图下载工具，掌握专业技巧，提升工作效率')}
              </p>
            </div>

            {/* Help Sections Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {helpSections.map((section) => {
                const Icon = section.icon;
                const isExternal = section.path.startsWith('/');
                const linkPath = isExternal ? `/${lng}${section.path}` : `/${lng}/help/${section.path}`;
                
                return (
                  <Link key={section.id} to={linkPath}>
                    <Card className="h-full hover:shadow-lg transition-all duration-300 border-2 hover:border-blue-300 group">
                      <CardHeader>
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-3 ${getColorClasses(section.color)}`}>
                          <Icon className="h-6 w-6" />
                        </div>
                        <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">
                          {section.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-slate-600 mb-4">{section.description}</p>
                        <div className="flex items-center text-blue-600 font-medium group-hover:text-blue-700">
                          <span className="mr-2">{t('help.learnMore', '了解更多')}</span>
                          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>

            {/* Quick Start Section */}
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
              <CardHeader>
                <CardTitle className="text-2xl text-center">{t('help.quickStart', '快速开始')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="bg-white p-4 rounded-lg shadow-sm mb-3">
                      <div className="text-3xl mb-2">1️⃣</div>
                      <h3 className="font-semibold text-slate-800">{t('help.quickStep1', '复制YouTube链接')}</h3>
                    </div>
                    <p className="text-sm text-slate-600">{t('help.quickStep1Desc', '从YouTube视频页面复制链接')}</p>
                  </div>
                  <div>
                    <div className="bg-white p-4 rounded-lg shadow-sm mb-3">
                      <div className="text-3xl mb-2">2️⃣</div>
                      <h3 className="font-semibold text-slate-800">{t('help.quickStep2', '粘贴到工具')}</h3>
                    </div>
                    <p className="text-sm text-slate-600">{t('help.quickStep2Desc', '将链接粘贴到我们的下载工具中')}</p>
                  </div>
                  <div>
                    <div className="bg-white p-4 rounded-lg shadow-sm mb-3">
                      <div className="text-3xl mb-2">3️⃣</div>
                      <h3 className="font-semibold text-slate-800">{t('help.quickStep3', '下载缩略图')}</h3>
                    </div>
                    <p className="text-sm text-slate-600">{t('help.quickStep3Desc', '选择合适的分辨率并下载')}</p>
                  </div>
                </div>
                <div className="text-center mt-6">
                  <Link 
                    to={`/${lng}/help/getting-started`}
                    className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <span>{t('help.viewDetailedGuide', '查看详细指南')}</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </>
  );
};

export default HelpIndex;