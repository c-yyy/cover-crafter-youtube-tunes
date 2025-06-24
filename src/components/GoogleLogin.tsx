import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';

// 声明全局的 google 对象
declare global {
  interface Window {
    google: any;
  }
}

interface GoogleUser {
  id: string;
  name: string;
  email: string;
  picture: string;
}

interface GoogleLoginProps {
  onSuccess?: (user: GoogleUser) => void;
  onError?: (error: any) => void;
  className?: string;
}

const GoogleLogin: React.FC<GoogleLoginProps> = ({ onSuccess, onError, className }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoaded, setIsGoogleLoaded] = useState(false);
  const { toast } = useToast();
  const { t } = useTranslation();

  const CLIENT_ID = "420745752838-p8rqv9d8uvgpo4t3svmg8i5c8l6ujcvj.apps.googleusercontent.com";

  useEffect(() => {
    // 检查 Google Identity Services 是否已加载
    const checkGoogleLoaded = () => {
      if (window.google && window.google.accounts) {
        setIsGoogleLoaded(true);
        initializeGoogleSignIn();
      } else {
        // 如果还没加载，等待一段时间后再检查
        setTimeout(checkGoogleLoaded, 100);
      }
    };

    checkGoogleLoaded();
  }, []);

  const initializeGoogleSignIn = () => {
    try {
      window.google.accounts.id.initialize({
        client_id: CLIENT_ID,
        callback: handleCredentialResponse,
        auto_select: false,
        cancel_on_tap_outside: true,
      });
    } catch (error) {
      console.error('Failed to initialize Google Sign-In:', error);
      onError?.(error);
    }
  };

  const handleCredentialResponse = (response: any) => {
    try {
      // 解码 JWT token 获取用户信息
      const payload = JSON.parse(atob(response.credential.split('.')[1]));
      
      const user: GoogleUser = {
        id: payload.sub,
        name: payload.name,
        email: payload.email,
        picture: payload.picture,
      };

      toast({
        title: t('login.loginSuccess'),
        description: t('login.welcomeBack', { name: user.name }),
      });

      onSuccess?.(user);
    } catch (error) {
      console.error('Failed to process credential response:', error);
      toast({
        title: t('login.loginFailed'),
        description: t('login.loginError'),
        variant: "destructive",
      });
      onError?.(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    if (!isGoogleLoaded) {
      toast({
        title: t('login.loginFailed'),
        description: t('login.loginError'),
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      window.google.accounts.id.prompt((notification: any) => {
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          // 如果弹窗没有显示，则显示一键登录按钮
          window.google.accounts.id.renderButton(
            document.getElementById('google-signin-button'),
            {
              theme: 'outline',
              size: 'large',
              type: 'standard',
              text: 'signin_with',
              shape: 'rectangular',
              logo_alignment: 'left',
            }
          );
        }
        setIsLoading(false);
      });
    } catch (error) {
      console.error('Failed to prompt Google Sign-In:', error);
      setIsLoading(false);
      toast({
        title: t('login.loginFailed'),
        description: t('login.loginError'),
        variant: "destructive",
      });
      onError?.(error);
    }
  };

  return (
    <div className={className}>
      <Button
        onClick={handleGoogleLogin}
        disabled={isLoading || !isGoogleLoaded}
        className="w-full flex items-center justify-center gap-2 bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
      >
        {isLoading ? (
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900"></div>
        ) : (
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
        )}
        {isLoading ? t('login.loggingIn') : t('login.googleLogin')}
      </Button>
      
      {/* Google一键登录按钮的容器 */}
      <div id="google-signin-button" className="mt-2"></div>
    </div>
  );
};

export default GoogleLogin;