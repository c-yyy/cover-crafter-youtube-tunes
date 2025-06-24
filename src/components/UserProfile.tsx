import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogOut, User, Settings, BarChart3 } from 'lucide-react';
import GoogleLogin from './GoogleLogin';
import { useToast } from '@/hooks/use-toast';
import { Link, useParams } from 'react-router-dom';

interface UserProfileProps {
  className?: string;
}

const UserProfile: React.FC<UserProfileProps> = ({ className }) => {
  const { user, isAuthenticated, login, logout } = useAuth();
  const { lng } = useParams<{ lng: string }>();
  const { toast } = useToast();
  const { t } = useTranslation();

  const handleLoginSuccess = (userData: any) => {
    login(userData);
  };

  const handleLoginError = (error: any) => {
    console.error('Login error:', error);
    toast({
      title: t('login.loginFailed'),
      description: t('login.loginError'),
      variant: "destructive",
    });
  };

  const handleLogout = () => {
    logout();
    toast({
      title: t('login.loggedOut'),
      description: t('login.loggedOutMessage'),
    });
  };

  if (!isAuthenticated) {
    return (
      <div className={className}>
        <GoogleLogin
          onSuccess={handleLoginSuccess}
          onError={handleLoginError}
          className="w-full max-w-xs"
        />
      </div>
    );
  }

  return (
    <div className={className}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-10 w-10 rounded-full">
            <Avatar className="h-10 w-10">
              <AvatarImage src={user?.picture} alt={user?.name} />
              <AvatarFallback>
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {user?.name && !/[\u00C0-\u00FF]{2,}|[\uFFFD]/.test(user.name) 
                  ? user.name 
                  : user?.email?.split('@')[0] || 'User'
                }
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {user?.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer" asChild>
            <Link to={`/${lng}/dashboard`}>
              <BarChart3 className="mr-2 h-4 w-4" />
              <span>{t('dashboard.title', '仪表板')}</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <User className="mr-2 h-4 w-4" />
            <span>{t('profile.title', '个人资料')}</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <Settings className="mr-2 h-4 w-4" />
            <span>{t('settings.title', '设置')}</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>{t('login.logout')}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserProfile;