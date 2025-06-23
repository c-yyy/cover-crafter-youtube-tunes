import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useParams, useLocation } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Lightbulb, AlertCircle, ArrowLeft, Home } from "lucide-react";

const HelpNavigation = () => {
  const { t } = useTranslation();
  const { lng } = useParams<{ lng: string }>();
  const location = useLocation();

  const helpSections = [
    {
      id: 'getting-started',
      title: t('help.gettingStarted', '快速开始'),
      icon: CheckCircle,
      path: `/${lng}/help/getting-started`
    },
    {
      id: 'advanced-tips',
      title: t('help.advancedTips', '高级技巧'),
      icon: Lightbulb,
      path: `/${lng}/help/advanced-tips`
    },
    {
      id: 'troubleshooting',
      title: t('help.troubleshooting', '问题解决'),
      icon: AlertCircle,
      path: `/${lng}/help/troubleshooting`
    }
  ];

  const isCurrentPath = (path: string) => {
    return location.pathname === path;
  };

  return (
    <Card className="sticky top-8">
      <CardContent className="p-4">
        {/* Back to Help Home */}
        <Link 
          to={`/${lng}/help`}
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-4 p-2 rounded-lg hover:bg-blue-50 transition-colors"
        >
          <Home className="h-4 w-4" />
          <span className="font-medium">{t('help.backToHelp', '返回帮助首页')}</span>
        </Link>
        
        <div className="border-t pt-4">
          <h3 className="font-semibold text-slate-800 mb-3">{t('help.helpTopics', '帮助主题')}</h3>
          <div className="space-y-2">
            {helpSections.map((section) => {
              const Icon = section.icon;
              const isCurrent = isCurrentPath(section.path);
              
              return (
                <Link
                  key={section.id}
                  to={section.path}
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                    isCurrent
                      ? 'bg-blue-50 text-blue-600 border border-blue-200'
                      : 'hover:bg-slate-50 text-slate-600 hover:text-slate-800'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="font-medium">{section.title}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HelpNavigation;