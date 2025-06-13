
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Youtube, Image as ImageIcon, Zap } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const [url, setUrl] = useState("");
  const [videoData, setVideoData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const extractVideoId = (url: string) => {
    const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) {
      toast({
        title: "Error",
        description: "Please enter a YouTube URL",
        variant: "destructive",
      });
      return;
    }

    const videoId = extractVideoId(url);
    if (!videoId) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid YouTube URL",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    // Simulate API call - in real implementation, you'd call YouTube API
    setTimeout(() => {
      setVideoData({
        id: videoId,
        title: "Sample Video Title",
        thumbnails: {
          maxres: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
          high: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
          medium: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
          default: `https://img.youtube.com/vi/${videoId}/default.jpg`,
        }
      });
      setLoading(false);
      toast({
        title: "Success!",
        description: "Thumbnails loaded successfully",
      });
    }, 1500);
  };

  const downloadImage = (url: string, quality: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = `youtube-thumbnail-${quality}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Download Started",
      description: `${quality} quality thumbnail is downloading`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-center space-x-3">
            <div className="bg-red-600 p-2 rounded-lg">
              <Youtube className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-slate-800">
              YouTube Cover Download
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-slate-800 mb-4">
            Download YouTube Thumbnails
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Extract high-quality cover images from any YouTube video. Simply paste the URL and download thumbnails in multiple resolutions.
          </p>
        </div>

        {/* Input Form */}
        <Card className="max-w-2xl mx-auto mb-12 shadow-lg border-0 bg-white">
          <CardHeader>
            <CardTitle className="text-center flex items-center justify-center space-x-2">
              <ImageIcon className="h-6 w-6 text-red-600" />
              <span>Enter YouTube URL</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <Input
                  type="url"
                  placeholder="https://www.youtube.com/watch?v=..."
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
                    <span>Processing...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Zap className="h-5 w-5" />
                    <span>Get Thumbnails</span>
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
              Available Thumbnails
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
                          {quality === 'maxres' ? 'Max Resolution' : quality} Quality
                        </h4>
                        <p className="text-sm text-slate-600">
                          {quality === 'maxres' && '1920x1080'}
                          {quality === 'high' && '480x360'}
                          {quality === 'medium' && '320x180'}
                          {quality === 'default' && '120x90'}
                        </p>
                      </div>
                      <Button
                        onClick={() => downloadImage(url as string, quality)}
                        className="bg-red-600 hover:bg-red-700 rounded-lg"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Features Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center p-6">
            <div className="bg-red-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Zap className="h-8 w-8 text-red-600" />
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">Fast & Easy</h3>
            <p className="text-slate-600">
              Simply paste your YouTube URL and get instant access to all thumbnail sizes
            </p>
          </div>
          <div className="text-center p-6">
            <div className="bg-red-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <ImageIcon className="h-8 w-8 text-red-600" />
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">Multiple Sizes</h3>
            <p className="text-slate-600">
              Download thumbnails in various resolutions from 120x90 to 1920x1080
            </p>
          </div>
          <div className="text-center p-6">
            <div className="bg-red-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Download className="h-8 w-8 text-red-600" />
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">One-Click Download</h3>
            <p className="text-slate-600">
              Direct download links for all thumbnail qualities with a single click
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-800 text-white py-8 mt-20">
        <div className="container mx-auto px-4 text-center">
          <p className="text-slate-300">
            © 2024 YouTube Cover Download. A simple tool to extract YouTube thumbnails.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
