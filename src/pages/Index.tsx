
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Youtube, Image as ImageIcon, Zap, ClipboardPaste, Menu, X, Ruler } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import { Header } from "@/components/Header";
import ThumbnailSizeGuide from "@/components/ThumbnailSizeGuide";

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


  useEffect(() => {
    const storedHistory = localStorage.getItem('youtubeThumbnailHistory');
    if (storedHistory) {
      setHistory(JSON.parse(storedHistory));
    }
  }, []);

  useEffect(() => {
    if (history.length > 0) {
      localStorage.setItem('youtubeThumbnailHistory', JSON.stringify(history));
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
        <Header currentPage="home" />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section - Compact */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-3 flex items-center justify-center gap-3">
            {t('heroTitleNew')}
          </h1>
          <p className="text-lg text-slate-600 max-w-4xl mx-auto">
            {t('heroSubtitleNew')}
          </p>
        </div>

        {/* Main Content - Two Column Layout for Desktop */}
        <style>
          {`
            .line-clamp-2 {
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
              overflow: hidden;
            }
          `}
        </style>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {/* Left Column: Size Guide */}
          <div className="space-y-4">
            <div className="text-center">
              <h2 className="text-xl font-bold text-slate-800 mb-2 flex items-center justify-center gap-2">
                <Ruler className="w-5 h-5 text-red-600" />
                {t('sizeGuideTitle')}
              </h2>
              <p className="text-sm text-slate-600 mb-3">
                {t('sizeGuideDescription')}
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-3">
              <ThumbnailSizeGuide />
            </div>
          </div>

          {/* Right Column: Downloader */}
          <div className="space-y-4">
            <div className="text-center">
              <h2 className="text-xl font-bold text-slate-800 mb-2 flex items-center justify-center gap-2" id="thumbnail-downloader">
                <Download className="w-5 h-5 text-red-600" />
                {t('downloaderTitle')}
              </h2>
              <p className="text-sm text-slate-600 mb-3">
                {t('downloaderSubtitle')}
              </p>
            </div>
            
            <Card className="shadow-lg border-0 bg-white">
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
                  className="pl-12 pr-12 h-14 text-lg border-2 border-slate-200 focus:border-red-500 rounded-xl"
                />
                <Youtube className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-red-600" />
                <Button 
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-10 w-10 text-slate-500 hover:text-red-600"
                  onClick={async () => {
                    try {
                      const text = await navigator.clipboard.readText();
                      setUrl(text);
                      toast({
                        title: t('toastPasteSuccessTitle'),
                        description: t('toastPasteSuccessDescription'),
                      });
                    } catch (err) {
                      console.error('Failed to read clipboard contents: ', err);
                      toast({
                        title: t('toastPasteFailedTitle'),
                        description: t('toastPasteFailedDescription'),
                        variant: "destructive",
                      });
                    }
                  }}
                  aria-label={t('pasteFromClipboardAriaLabel')}
                >
                  <ClipboardPaste className="h-5 w-5" />
                </Button>
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
          <div className="mt-6">
            <h3 className="text-lg font-bold text-slate-800 mb-4 text-center">
              {t('resultsTitle')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(videoData.thumbnails).map(([quality, url]) => (
                <Card key={quality} className="shadow-md hover:shadow-lg transition-shadow duration-300 border-0 bg-white">
                  <CardContent className="p-4">
                    <div className="aspect-video mb-3 rounded-lg overflow-hidden bg-slate-100">
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
                        <h4 className="font-semibold text-slate-800 capitalize text-sm">
                          {t(`thumbnailQuality${quality === 'maxres' ? 'MaxRes' : quality.charAt(0).toUpperCase() + quality.slice(1)}`)}
                        </h4>
                        <p className="text-xs text-slate-600">
                          {t(`thumbnailResolution${quality === 'maxres' ? 'MaxRes' : quality.charAt(0).toUpperCase() + quality.slice(1)}`)}
                        </p>
                      </div>
                      <Button
                        onClick={() => downloadImage(url as string, quality)}
                        size="sm"
                        className="bg-red-600 hover:bg-red-700 rounded-lg"
                      >
                        <Download className="h-3 w-3 mr-1" />
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
          <div className="mt-6">
          <Card className="shadow-md border-0 bg-white">
            <CardHeader>
              <CardTitle className="text-center flex items-center justify-center space-x-2">
                <span>{t('historyTitle')}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {history.map((item) => (
                  <li key={item.id} 
                      className="p-2 hover:bg-slate-100 rounded-md cursor-pointer flex justify-between items-center group relative text-sm"
                      onClick={() => {
                        setUrl(item.url);
                      }}>
                    <span className="truncate text-slate-700" title={item.title}>{item.title}</span>
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
                    localStorage.removeItem('youtubeThumbnailHistory');
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
        </div>
        </div>

        {/* Features Section - Below the main content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
          <div className="text-center p-4">
            <div className="bg-red-100 p-3 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
              <Zap className="h-6 w-6 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-slate-800 mb-2">{t('featureFastEasyTitle')}</h3>
            <p className="text-slate-600 text-sm">
              {t('featureFastEasyDescription')}
            </p>
          </div>
          <div className="text-center p-4">
            <div className="bg-red-100 p-3 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
              <ImageIcon className="h-6 w-6 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-slate-800 mb-2">{t('featureMultipleSizesTitle')}</h3>
            <p className="text-slate-600 text-sm">
              {t('featureMultipleSizesDescription')}
            </p>
          </div>
          <div className="text-center p-4">
            <div className="bg-red-100 p-3 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
              <Download className="h-6 w-6 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-slate-800 mb-2">{t('featureOneClickDownloadTitle')}</h3>
            <p className="text-slate-600 text-sm">
              {t('featureOneClickDownloadDescription')}
            </p>
          </div>
        </div>

        {/* Comprehensive SEO Content Section */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="prose max-w-none">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('seoContentTitle')}</h2>
                <p className="text-xl text-gray-600 leading-relaxed max-w-4xl mx-auto">
                  {t('seoContentIntro')}
                </p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                <div className="bg-slate-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('seoContentWhyTitle')}</h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    {t('seoContentWhyPara1')}
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    {t('seoContentWhyPara2')}
                  </p>
                </div>
                
                <div className="bg-slate-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('seoContentFormatsTitle')}</h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    {t('seoContentFormatsPara1')}
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    {t('seoContentFormatsPara2')}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('seoContentOptimizationTitle')}</h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    {t('seoContentOptimizationPara1')}
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    {t('seoContentOptimizationPara2')}
                  </p>
                </div>
                
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('seoContentToolFeaturesTitle')}</h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    {t('seoContentToolFeaturesPara1')}
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    {t('seoContentToolFeaturesPara2')}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('seoContentUseCasesTitle')}</h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    {t('seoContentUseCasesPara1')}
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    {t('seoContentUseCasesPara2')}
                  </p>
                </div>
                
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('seoContentTechnicalTitle')}</h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    {t('seoContentTechnicalPara1')}
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    {t('seoContentTechnicalPara2')}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-purple-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('seoContentSEOTitle')}</h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    {t('seoContentSEOPara1')}
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    {t('seoContentSEOPara2')}
                  </p>
                </div>
                
                <div className="bg-purple-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('seoContentCreatorTitle')}</h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    {t('seoContentCreatorPara1')}
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    {t('seoContentCreatorPara2')}
                  </p>
                </div>
              </div>

              <div className="mt-12 text-center bg-gradient-to-r from-red-50 to-orange-50 p-8 rounded-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Start Using Our YouTube Thumbnail Tools Today</h3>
                <p className="text-lg text-gray-700 mb-6 max-w-3xl mx-auto">
                  Join thousands of content creators, marketers, and designers who trust our platform for professional YouTube thumbnail extraction and analysis. Get started instantly with no registration required.
                </p>
                <a href="#thumbnail-downloader" className="inline-flex items-center px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors duration-200">
                  <Download className="h-5 w-5 mr-2" />
                  Start Downloading Thumbnails
                </a>
              </div>
            </div>
          </div>
        </section>



        {/* User Reviews Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('userReviewsTitle')}</h2>
              <p className="text-lg text-gray-600">{t('userReviewsSubtitle')}</p>
            </div>
            
            <div className="w-full overflow-hidden">
              <style>
                {`
                  @keyframes scrollLeftUserReviews {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-2040px); } /* 6 cards * 320px + 5 gaps * 24px = 1920 + 120 = 2040px */
                  }
                  .animate-scroll-reviews {
                    animation: scrollLeftUserReviews 60s linear infinite;
                  }
                  .animate-scroll-reviews:hover {
                    animation-play-state: paused;
                  }
                `}
              </style>
              <div className="flex space-x-6 pb-4 animate-scroll-reviews">
                {[
                  {
                    name: t('userReview1Name'),
                    content: t('userReview1Content'),
                    avatar: (
                      <svg className="w-12 h-12" viewBox="0 0 100 100" fill="none">
                        <circle cx="50" cy="50" r="50" fill="#3B82F6"/>
                        <circle cx="50" cy="35" r="15" fill="white"/>
                        <path d="M25 75 Q25 60 50 60 Q75 60 75 75 L75 100 L25 100 Z" fill="white"/>
                      </svg>
                    )
                  },
                  {
                    name: t('userReview2Name'),
                    content: t('userReview2Content'),
                    avatar: (
                      <svg className="w-12 h-12" viewBox="0 0 100 100" fill="none">
                        <circle cx="50" cy="50" r="50" fill="#10B981"/>
                        <circle cx="50" cy="35" r="15" fill="white"/>
                        <path d="M25 75 Q25 60 50 60 Q75 60 75 75 L75 100 L25 100 Z" fill="white"/>
                      </svg>
                    )
                  },
                  {
                    name: t('userReview3Name'),
                    content: t('userReview3Content'),
                    avatar: (
                      <svg className="w-12 h-12" viewBox="0 0 100 100" fill="none">
                        <circle cx="50" cy="50" r="50" fill="#F59E0B"/>
                        <circle cx="50" cy="35" r="15" fill="white"/>
                        <path d="M25 75 Q25 60 50 60 Q75 60 75 75 L75 100 L25 100 Z" fill="white"/>
                      </svg>
                    )
                  },
                  {
                    name: t('userReview4Name'),
                    content: t('userReview4Content'),
                    avatar: (
                      <svg className="w-12 h-12" viewBox="0 0 100 100" fill="none">
                        <circle cx="50" cy="50" r="50" fill="#EF4444"/>
                        <circle cx="50" cy="35" r="15" fill="white"/>
                        <path d="M25 75 Q25 60 50 60 Q75 60 75 75 L75 100 L25 100 Z" fill="white"/>
                      </svg>
                    )
                  },
                  {
                    name: t('userReview5Name'),
                    content: t('userReview5Content'),
                    avatar: (
                      <svg className="w-12 h-12" viewBox="0 0 100 100" fill="none">
                        <circle cx="50" cy="50" r="50" fill="#8B5CF6"/>
                        <circle cx="50" cy="35" r="15" fill="white"/>
                        <path d="M25 75 Q25 60 50 60 Q75 60 75 75 L75 100 L25 100 Z" fill="white"/>
                      </svg>
                    )
                  },
                  {
                    name: t('userReview6Name'),
                    content: t('userReview6Content'),
                    avatar: (
                      <svg className="w-12 h-12" viewBox="0 0 100 100" fill="none">
                        <circle cx="50" cy="50" r="50" fill="#06B6D4"/>
                        <circle cx="50" cy="35" r="15" fill="white"/>
                        <path d="M25 75 Q25 60 50 60 Q75 60 75 75 L75 100 L25 100 Z" fill="white"/>
                      </svg>
                    )
                  }
                ].concat([
                  {
                    name: t('userReview1Name'),
                    content: t('userReview1Content'),
                    avatar: (
                      <svg className="w-12 h-12" viewBox="0 0 100 100" fill="none">
                        <circle cx="50" cy="50" r="50" fill="#3B82F6"/>
                        <circle cx="50" cy="35" r="15" fill="white"/>
                        <path d="M25 75 Q25 60 50 60 Q75 60 75 75 L75 100 L25 100 Z" fill="white"/>
                      </svg>
                    )
                  },
                  {
                    name: t('userReview2Name'),
                    content: t('userReview2Content'),
                    avatar: (
                      <svg className="w-12 h-12" viewBox="0 0 100 100" fill="none">
                        <circle cx="50" cy="50" r="50" fill="#10B981"/>
                        <circle cx="50" cy="35" r="15" fill="white"/>
                        <path d="M25 75 Q25 60 50 60 Q75 60 75 75 L75 100 L25 100 Z" fill="white"/>
                      </svg>
                    )
                  },
                  {
                    name: t('userReview3Name'),
                    content: t('userReview3Content'),
                    avatar: (
                      <svg className="w-12 h-12" viewBox="0 0 100 100" fill="none">
                        <circle cx="50" cy="50" r="50" fill="#F59E0B"/>
                        <circle cx="50" cy="35" r="15" fill="white"/>
                        <path d="M25 75 Q25 60 50 60 Q75 60 75 75 L75 100 L25 100 Z" fill="white"/>
                      </svg>
                    )
                  },
                  {
                    name: t('userReview4Name'),
                    content: t('userReview4Content'),
                    avatar: (
                      <svg className="w-12 h-12" viewBox="0 0 100 100" fill="none">
                        <circle cx="50" cy="50" r="50" fill="#EF4444"/>
                        <circle cx="50" cy="35" r="15" fill="white"/>
                        <path d="M25 75 Q25 60 50 60 Q75 60 75 75 L75 100 L25 100 Z" fill="white"/>
                      </svg>
                    )
                  },
                  {
                    name: t('userReview5Name'),
                    content: t('userReview5Content'),
                    avatar: (
                      <svg className="w-12 h-12" viewBox="0 0 100 100" fill="none">
                        <circle cx="50" cy="50" r="50" fill="#8B5CF6"/>
                        <circle cx="50" cy="35" r="15" fill="white"/>
                        <path d="M25 75 Q25 60 50 60 Q75 60 75 75 L75 100 L25 100 Z" fill="white"/>
                      </svg>
                    )
                  },
                  {
                    name: t('userReview6Name'),
                    content: t('userReview6Content'),
                    avatar: (
                      <svg className="w-12 h-12" viewBox="0 0 100 100" fill="none">
                        <circle cx="50" cy="50" r="50" fill="#06B6D4"/>
                        <circle cx="50" cy="35" r="15" fill="white"/>
                        <path d="M25 75 Q25 60 50 60 Q75 60 75 75 L75 100 L25 100 Z" fill="white"/>
                      </svg>
                    )
                  }
                ]).map((review, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 flex-shrink-0" style={{ minWidth: '320px', width: '320px' }}>
                    <div className="flex items-center mb-4">
                      <div className="mr-4">
                        {review.avatar}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{review.name}</h4>
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                            </svg>
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 leading-relaxed">{review.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>


      </div>
    </>
  );
};

export default Index;
