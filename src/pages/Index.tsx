
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Youtube, Image as ImageIcon, Zap } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

interface HistoryItem {
  id: string;
  url: string;
  title: string;
  timestamp: number;
}

const Index = () => {
  const { t, i18n } = useTranslation();
  const { lng } = useParams<{ lng: string }>();
  const [url, setUrl] = useState("");
  const [videoData, setVideoData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const storedHistory = localStorage.getItem('youtubeCoverHistory');
    if (storedHistory) {
      setHistory(JSON.parse(storedHistory));
    }
  }, []);

  useEffect(() => {
    if (history.length > 0) {
      localStorage.setItem('youtubeCoverHistory', JSON.stringify(history));
    }
  }, [history]);

  const extractVideoId = (url: string) => {
    const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) {
      toast({
        title: t('toastErrorTitle'),
        description: t('toastErrorDescriptionNoURL'),
        variant: "destructive",
      });
      return;
    }

    const videoId = extractVideoId(url);
    if (!videoId) {
      toast({
        title: t('toastInvalidURLTitle'),
        description: t('toastErrorDescriptionInvalidURL'),
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    // Simulate API call - in real implementation, you'd call YouTube API
    // For demo purposes, we'll use a placeholder title
    const videoTitle = `Video for ID: ${videoId}`;
    setTimeout(() => {
      const newHistoryItem: HistoryItem = {
        id: videoId,
        url: url,
        title: videoTitle, // Using the fetched or a placeholder title
        timestamp: Date.now(),
      };
      setHistory(prevHistory => {
        const updatedHistory = [newHistoryItem, ...prevHistory.filter(item => item.id !== videoId)];
        return updatedHistory.slice(0, 10); // Keep only the last 10 items
      });

      setVideoData({
        id: videoId,
        title: videoTitle, // Use the same title for consistency
        thumbnails: {
          maxres: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
          high: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
          medium: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
          default: `https://img.youtube.com/vi/${videoId}/default.jpg`,
        }
      });
      setLoading(false);
      toast({
        title: t('toastSuccessTitle'),
        description: t('toastSuccessDescriptionThumbnailsLoaded'),
      });
    }, 1500);
  };

  const downloadImage = async (imageUrl: string, quality: string) => {
    try {
      const response = await fetch(imageUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `youtube-cover.com-${quality}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast({
        title: t('toastDownloadStartedTitle'),
        description: t('toastDownloadStartedDescription', { quality: t(`thumbnailQuality${quality === 'maxres' ? 'Maxres' : quality.charAt(0).toUpperCase() + quality.slice(1)}`) }),
      });
    } catch (error) {
      console.error("Error downloading image:", error);
      toast({
        title: t('toastDownloadFailedTitle'),
        description: t('toastDownloadFailedDescription'),
        variant: "destructive",
      });
    }
  };

  const pageTitle = t('siteTitle');
  const pageDescription = t('siteDescription');

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="alternate" hrefLang={i18n.language} href={`${window.location.origin}/${i18n.language}${window.location.pathname.substring(window.location.pathname.lastIndexOf('/'))}`} />
        {Object.keys(i18n.options.resources || {}).filter(lang => lang !== i18n.language).map(lang => (
          <link key={lang} rel="alternate" hrefLang={lang} href={`${window.location.origin}/${lang}${window.location.pathname.substring(window.location.pathname.lastIndexOf('/'))}`} />
        ))}
      </Helmet>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to={`/${lng}`} className="flex items-center space-x-3">
              <div className="bg-red-600 p-2 rounded-lg">
                <Youtube className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-slate-800">
                {t('headerTitle')}
              </h1>
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link 
                to={`/${lng}`} 
                className="text-slate-600 hover:text-red-600 font-medium transition-colors"
              >
                {t('homeTitle')}
              </Link>
              <Link 
                to={`/${lng}/about`} 
                className="text-slate-600 hover:text-red-600 font-medium transition-colors"
              >
                {t('about')}
              </Link>
              <Link 
                to={`/${lng}/contact`} 
                className="text-slate-600 hover:text-red-600 font-medium transition-colors"
              >
                {t('contact')}
              </Link>
            </nav>
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6 text-slate-600" />
              ) : (
                <Menu className="h-6 w-6 text-slate-600" />
              )}
            </button>
          </div>
          
          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="md:hidden mt-4 pb-4 border-t border-slate-200 pt-4">
              <div className="flex flex-col space-y-3">
                <Link 
                  to={`/${lng}`} 
                  className="text-slate-600 hover:text-red-600 font-medium transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t('homeTitle')}
                </Link>
                <Link 
                  to={`/${lng}/about`} 
                  className="text-slate-600 hover:text-red-600 font-medium transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t('about')}
                </Link>
                <Link 
                  to={`/${lng}/contact`} 
                  className="text-slate-600 hover:text-red-600 font-medium transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t('contact')}
                </Link>
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-slate-800 mb-4">
            {t('heroTitle')}
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            {t('heroSubtitle')}
          </p>
        </div>

        {/* Input Form */}
        <Card className="max-w-2xl mx-auto mb-12 shadow-lg border-0 bg-white">
          <CardHeader>
            <CardTitle className="text-center flex items-center justify-center space-x-2">
              <ImageIcon className="h-6 w-6 text-red-600" />
              <span>{t('formCardTitle')}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <Input
                  type="url"
                  placeholder={t('formInputPlaceholder')}
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="pl-12 h-14 text-lg border-2 border-slate-200 focus:border-red-500 rounded-xl"
                />
                <Youtube className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-red-600" />
              </div>
              <Button
                type="submit"
                disabled={loading}
                className="w-full h-14 text-lg bg-red-600 hover:bg-red-700 rounded-xl font-semibold"
              >
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>{t('formButtonProcessingText')}</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Zap className="h-5 w-5" />
                    <span>{t('formButtonText')}</span>
                  </div>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Results */}
        {videoData && (
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-slate-800 mb-6 text-center">
              {t('resultsTitle')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(videoData.thumbnails).map(([quality, url]) => (
                <Card key={quality} className="shadow-lg hover:shadow-xl transition-shadow duration-300 border-0 bg-white">
                  <CardContent className="p-6">
                    <div className="aspect-video mb-4 rounded-lg overflow-hidden bg-slate-100">
                      <img
                        src={url as string}
                        alt={`${quality} thumbnail`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "https://via.placeholder.com/480x360/f1f5f9/64748b?text=Thumbnail+Not+Available";
                        }}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-slate-800 capitalize">
                          {t(`thumbnailQuality${quality === 'maxres' ? 'MaxRes' : quality.charAt(0).toUpperCase() + quality.slice(1)}`)}
                        </h4>
                        <p className="text-sm text-slate-600">
                          {t(`thumbnailResolution${quality === 'maxres' ? 'MaxRes' : quality.charAt(0).toUpperCase() + quality.slice(1)}`)}
                        </p>
                      </div>
                      <Button
                        onClick={() => downloadImage(url as string, quality)}
                        className="bg-red-600 hover:bg-red-700 rounded-lg"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        {t('downloadButtonText')}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* History Section */}
        {history.length > 0 && (
          <div className="mt-8"> {/* Added margin-top here */}
          <Card className="max-w-2xl mx-auto mb-12 shadow-lg border-0 bg-white">
            <CardHeader>
              <CardTitle className="text-center flex items-center justify-center space-x-2">
                {/* You might want to add an icon for history here */}
                <span>{t('historyTitle')}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {history.map((item) => (
                  <li key={item.id} 
                      className="p-2 hover:bg-slate-100 rounded-md cursor-pointer flex justify-between items-center group relative"
                      onClick={() => {
                        setUrl(item.url);
                        // Optionally, trigger form submission directly
                        // handleSubmit(new Event('submit') as any); 
                      }}>
                    <span className="truncate text-sm text-slate-700" title={item.title}>{item.title}</span>
                    <span className="text-xs text-slate-500">{new Date(item.timestamp).toLocaleString()}</span>
                    <div className="absolute right-0 bottom-full mb-2 hidden group-hover:block p-1 bg-white border border-slate-200 rounded shadow-lg z-10">
                      <img src={`https://img.youtube.com/vi/${item.id}/default.jpg`} alt={t('thumbnailAltText', { videoTitle: item.title })} className="w-32 h-auto" />
                    </div>
                  </li>
                ))}
              </ul>
              {history.length > 0 && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-4 w-full"
                  onClick={() => {
                    setHistory([]);
                    localStorage.removeItem('youtubeCoverHistory');
                    toast({
                      title: t('historyClearedTitle'),
                      description: t('historyClearedDescription'),
                    });
                  }}
                >
                  {t('clearHistoryButtonText')}
                </Button>
              )}
            </CardContent>
          </Card>
          </div>
        )}

        {/* Features Section */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center p-6">
            <div className="bg-red-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Zap className="h-8 w-8 text-red-600" />
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">{t('featureFastEasyTitle')}</h3>
            <p className="text-slate-600">
              {t('featureFastEasyDescription')}
            </p>
          </div>
          <div className="text-center p-6">
            <div className="bg-red-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <ImageIcon className="h-8 w-8 text-red-600" />
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">{t('featureMultipleSizesTitle')}</h3>
            <p className="text-slate-600">
              {t('featureMultipleSizesDescription')}
            </p>
          </div>
          <div className="text-center p-6">
            <div className="bg-red-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Download className="h-8 w-8 text-red-600" />
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">{t('featureOneClickDownloadTitle')}</h3>
            <p className="text-slate-600">
              {t('featureOneClickDownloadDescription')}
            </p>
          </div>
        </div>
      </main>


      </div>
    </>
  );
};

export default Index;
