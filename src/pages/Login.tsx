import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { Header } from '@/components/Header';
import GoogleLogin from '@/components/GoogleLogin';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const Login: React.FC = () => {
  const { t } = useTranslation();
  const { isAuthenticated, login } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { lng } = useParams<{ lng: string }>();

  // 如果已经登录，重定向到仪表板
  if (isAuthenticated) {
    return <Navigate to={`/${lng}/dashboard`} replace />;
  }

  const handleLoginSuccess = (user: any) => {
    login(user);
    toast({
      title: t('login.loginSuccess'),
      description: t('login.welcomeBack', { name: user.name }),
    });
    // 登录成功后重定向到仪表板
    navigate(`/${lng}/dashboard`);
  };

  const handleLoginError = (error: any) => {
    console.error('Login error:', error);
    toast({
      title: t('login.loginFailed'),
      description: t('login.loginError'),
      variant: "destructive",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentPage="login" />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-gray-900">
                {t('login.title')}
              </CardTitle>
              <CardDescription>
                {t('login.subtitle')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <GoogleLogin
                onSuccess={handleLoginSuccess}
                onError={handleLoginError}
              />
              
              <div className="text-center text-sm text-gray-600">
                <p>{t('login.termsAgreement')}</p>
                <div className="flex justify-center space-x-2 mt-1">
                  <a href={`/${lng}/terms`} className="text-blue-600 hover:underline">
                    {t('login.termsOfService')}
                  </a>
                  <span>{t('login.and')}</span>
                  <a href={`/${lng}/privacy`} className="text-blue-600 hover:underline">
                    {t('login.privacyPolicy')}
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="mt-8 text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {t('login.featuresTitle')}
            </h3>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center justify-center space-x-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>{t('login.features.savePreferences')}</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>{t('login.features.premiumFeatures')}</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>{t('login.features.syncDevices')}</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>{t('login.features.prioritySupport')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;