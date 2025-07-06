import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Header } from "@/components/Header";
import ThumbnailSizeGuide from "@/components/ThumbnailSizeGuide";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Ruler, 
  Download, 
  CheckCircle, 
  AlertTriangle, 
  Info,
  BookOpen,
  Target,
  Lightbulb
} from 'lucide-react';
import { Link } from 'react-router-dom';

const ThumbnailSizeGuidePage: React.FC = () => {
  const { t } = useTranslation();

  const sizeSpecifications = [
    {
      name: "Maximum Resolution",
      dimensions: "1920 × 1080",
      aspectRatio: "16:9",
      fileSize: "< 2MB",
      usage: "Professional marketing materials, channel art, highest quality displays",
      recommended: true,
      optimal: true
    },
    {
      name: "High Definition",
      dimensions: "1280 × 720",
      aspectRatio: "16:9", 
      fileSize: "< 1MB",
      usage: "Most YouTube videos, social media sharing, general content creation",
      recommended: true
    },
    {
      name: "Standard Definition",
      dimensions: "640 × 480",
      aspectRatio: "4:3",
      fileSize: "< 500KB",
      usage: "Website embedding, blog posts, mobile applications"
    },
    {
      name: "Medium Quality",
      dimensions: "480 × 360",
      aspectRatio: "4:3",
      fileSize: "< 200KB",
      usage: "Video previews, thumbnail lists, quick loading scenarios"
    },
    {
      name: "Small Size",
      dimensions: "320 × 180",
      aspectRatio: "16:9",
      fileSize: "< 100KB",
      usage: "Mobile apps, email newsletters, limited bandwidth situations"
    },
    {
      name: "Mini Thumbnail",
      dimensions: "120 × 90",
      aspectRatio: "4:3",
      fileSize: "< 50KB",
      usage: "Tiny previews, video histories, minimal UI elements"
    }
  ];

  const bestPractices = [
    {
      title: "Use Optimal Resolution",
      description: "Always use 1920×1080 for new uploads to ensure future compatibility and best quality across all platforms.",
      icon: <Target className="w-5 h-5 text-green-600" />
    },
    {
      title: "Maintain Aspect Ratio",
      description: "Stick to 16:9 aspect ratio for modern YouTube display. Avoid stretching or distorting images.",
      icon: <Ruler className="w-5 h-5 text-blue-600" />
    },
    {
      title: "Optimize File Size",
      description: "Keep thumbnails under 2MB for fast loading. Use JPEG format for photographs and PNG for graphics with transparency.",
      icon: <Download className="w-5 h-5 text-purple-600" />
    },
    {
      title: "Design for Mobile",
      description: "Ensure text and important elements are visible on small screens where most YouTube viewing happens.",
      icon: <Lightbulb className="w-5 h-5 text-yellow-600" />
    }
  ];

  const commonMistakes = [
    {
      title: "Using Low Resolution",
      description: "Uploading thumbnails smaller than 1280×720 results in poor quality on modern displays.",
      severity: "high"
    },
    {
      title: "Wrong Aspect Ratio",
      description: "Using non-standard aspect ratios causes cropping and distortion on different devices.",
      severity: "high"
    },
    {
      title: "Overcrowded Design",
      description: "Too much text or elements make thumbnails confusing and hard to read, especially on mobile.",
      severity: "medium"
    },
    {
      title: "Poor Mobile Optimization",
      description: "Not considering how thumbnails appear on mobile devices where most users watch.",
      severity: "medium"
    }
  ];

  return (
    <>
      <Helmet>
        <title>{t('sizeGuidePageTitle')}</title>
        <meta name="description" content={t('sizeGuidePageDescription')} />
        <meta name="keywords" content="youtube thumbnail size, youtube thumbnail dimensions, 1920x1080, 1280x720, thumbnail specifications, youtube thumbnail guide" />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <Header currentPage="size-guide" />

        <main className="container mx-auto px-4 py-8">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-6 flex items-center justify-center gap-4">
              <Ruler className="w-12 h-12 text-red-600" />
              {t('sizeGuidePageTitle')}
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              {t('sizeGuidePageDescription')}
            </p>
          </div>

          {/* Quick Reference Table */}
          <Card className="mb-12 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-center flex items-center justify-center gap-3">
                <BookOpen className="w-6 h-6 text-red-600" />
                YouTube Thumbnail Size Quick Reference
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Quality</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Dimensions</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Aspect Ratio</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">File Size</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Best For</th>
                      <th className="border border-gray-300 px-4 py-3 text-center font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sizeSpecifications.map((spec, index) => (
                      <tr key={index} className={spec.optimal ? "bg-yellow-50" : spec.recommended ? "bg-green-50" : ""}>
                        <td className="border border-gray-300 px-4 py-3 font-medium">{spec.name}</td>
                        <td className="border border-gray-300 px-4 py-3 font-mono">{spec.dimensions}</td>
                        <td className="border border-gray-300 px-4 py-3">{spec.aspectRatio}</td>
                        <td className="border border-gray-300 px-4 py-3">{spec.fileSize}</td>
                        <td className="border border-gray-300 px-4 py-3 text-sm">{spec.usage}</td>
                        <td className="border border-gray-300 px-4 py-3 text-center">
                          {spec.optimal && <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">Optimal</span>}
                          {spec.recommended && !spec.optimal && <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">Recommended</span>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Interactive Size Guide Component */}
          <div className="mb-12">
            <ThumbnailSizeGuide />
          </div>

          {/* Best Practices Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-green-800 flex items-center gap-3">
                  <CheckCircle className="w-6 h-6" />
                  Best Practices
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {bestPractices.map((practice, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
                      {practice.icon}
                      <div>
                        <h4 className="font-semibold text-green-900 mb-1">{practice.title}</h4>
                        <p className="text-green-700 text-sm">{practice.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-red-800 flex items-center gap-3">
                  <AlertTriangle className="w-6 h-6" />
                  Common Mistakes to Avoid
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {commonMistakes.map((mistake, index) => (
                    <div key={index} className={`flex items-start gap-3 p-4 rounded-lg ${
                      mistake.severity === 'high' ? 'bg-red-50' : 'bg-orange-50'
                    }`}>
                      <AlertTriangle className={`w-5 h-5 ${
                        mistake.severity === 'high' ? 'text-red-600' : 'text-orange-600'
                      }`} />
                      <div>
                        <h4 className={`font-semibold mb-1 ${
                          mistake.severity === 'high' ? 'text-red-900' : 'text-orange-900'
                        }`}>{mistake.title}</h4>
                        <p className={`text-sm ${
                          mistake.severity === 'high' ? 'text-red-700' : 'text-orange-700'
                        }`}>{mistake.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Additional Resources */}
          <Card className="mb-12 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-center flex items-center justify-center gap-3">
                <Info className="w-6 h-6 text-blue-600" />
                YouTube Thumbnail Size FAQ
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">What is the standard YouTube thumbnail size?</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    The standard YouTube thumbnail size is 1920×1080 pixels (16:9 aspect ratio). This ensures optimal display across all devices and platforms.
                  </p>

                  <h3 className="font-semibold text-gray-900 mb-2">What's the minimum thumbnail size for YouTube?</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    The minimum resolution is 640×360 pixels, but we recommend using at least 1280×720 for better quality and future-proofing.
                  </p>

                  <h3 className="font-semibold text-gray-900 mb-2">Can I upload vertical thumbnails?</h3>
                  <p className="text-gray-600 text-sm">
                    While you can upload vertical images, YouTube will crop them to fit the 16:9 aspect ratio, potentially cutting off important content.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">What file formats are supported?</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    YouTube supports JPG, GIF, and PNG formats. JPG is recommended for photographs, PNG for graphics with transparency.
                  </p>

                  <h3 className="font-semibold text-gray-900 mb-2">How do I create thumbnails for YouTube Shorts?</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    YouTube Shorts use vertical 9:16 aspect ratio thumbnails. The recommended size is 1080×1920 pixels.
                  </p>

                  <h3 className="font-semibold text-gray-900 mb-2">Why is my thumbnail blurry?</h3>
                  <p className="text-gray-600 text-sm">
                    Blurry thumbnails usually result from uploading low-resolution images or using the wrong aspect ratio. Always use high-resolution images in 16:9 format.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Call to Action */}
          <Card className="bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Ready to Download YouTube Thumbnails?</h3>
              <p className="text-red-100 mb-6 max-w-2xl mx-auto">
                Now that you understand YouTube thumbnail sizes, use our professional downloader to extract high-quality thumbnails in any resolution you need.
              </p>
              <Link to="/">
                <Button size="lg" className="bg-white text-red-600 hover:bg-red-50">
                  <Download className="w-5 h-5 mr-2" />
                  Start Downloading Thumbnails
                </Button>
              </Link>
            </CardContent>
          </Card>
        </main>
      </div>
    </>
  );
};

export default ThumbnailSizeGuidePage; 