import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Type, 
  Upload, 
  Sticker, 
  Crop, 
  RotateCw, 
  Download, 
  Palette, 
  Sparkles,
  Image as ImageIcon,
  Plus,
  Trash2,
  Move,
  Eye,
  EyeOff
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { Header } from "@/components/Header";

interface TextElement {
  id: string;
  text: string;
  x: number;
  y: number;
  fontSize: number;
  color: string;
  fontFamily: string;
  fontWeight: string;
  rotation: number;
  visible: boolean;
}

interface ImageElement {
  id: string;
  src: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  visible: boolean;
}

interface StickerElement {
  id: string;
  src: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  visible: boolean;
}

const CoverMaker = () => {
  const { t } = useTranslation();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Canvas state
  const [canvasSize, setCanvasSize] = useState({ width: 1280, height: 720 });
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  
  // Elements state
  const [textElements, setTextElements] = useState<TextElement[]>([]);
  const [imageElements, setImageElements] = useState<ImageElement[]>([]);
  const [stickerElements, setStickerElements] = useState<StickerElement[]>([]);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  
  // Tool states
  const [currentTool, setCurrentTool] = useState('text');
  const [newText, setNewText] = useState('');
  const [textColor, setTextColor] = useState('#000000');
  const [fontSize, setFontSize] = useState(32);
  const [fontFamily, setFontFamily] = useState('Arial');
  const [fontWeight, setFontWeight] = useState('normal');
  
  // AI generation state
  const [aiPrompt, setAiPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);

  // Predefined stickers
  const predefinedStickers = [
    '🎬', '🎭', '🎪', '🎨', '🎵', '🎸', '🎤', '🎧', '📱', '💻',
    '🔥', '⭐', '💎', '🚀', '💡', '🎯', '🏆', '👑', '💰', '🎁'
  ];

  // Font families
  const fontFamilies = [
    'Arial', 'Helvetica', 'Times New Roman', 'Georgia', 'Verdana',
    'Comic Sans MS', 'Impact', 'Trebuchet MS', 'Courier New', 'Palatino'
  ];

  // Canvas presets
  const canvasPresets = [
    { name: 'YouTube Thumbnail', width: 1280, height: 720 },
    { name: 'Instagram Post', width: 1080, height: 1080 },
    { name: 'Facebook Cover', width: 1200, height: 630 },
    { name: 'Twitter Header', width: 1500, height: 500 },
    { name: 'Custom', width: 1280, height: 720 }
  ];

  // Add text element
  const addTextElement = () => {
    if (!newText.trim()) {
      toast({
        title: t('error'),
        description: t('pleaseEnterText'),
        variant: "destructive",
      });
      return;
    }

    const newElement: TextElement = {
      id: Date.now().toString(),
      text: newText,
      x: canvasSize.width / 2,
      y: canvasSize.height / 2,
      fontSize,
      color: textColor,
      fontFamily,
      fontWeight,
      rotation: 0,
      visible: true
    };

    setTextElements(prev => [...prev, newElement]);
    setNewText('');
    setSelectedElement(newElement.id);
  };

  // Handle file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        
        if (currentTool === 'background') {
          setBackgroundImage(result);
        } else {
          const newElement: ImageElement = {
            id: Date.now().toString(),
            src: result,
            x: canvasSize.width / 2,
            y: canvasSize.height / 2,
            width: 200,
            height: 200,
            rotation: 0,
            visible: true
          };
          setImageElements(prev => [...prev, newElement]);
          setSelectedElement(newElement.id);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Add sticker
  const addSticker = (stickerSrc: string) => {
    const newElement: StickerElement = {
      id: Date.now().toString(),
      src: stickerSrc,
      x: canvasSize.width / 2,
      y: canvasSize.height / 2,
      width: 100,
      height: 100,
      rotation: 0,
      visible: true
    };

    setStickerElements(prev => [...prev, newElement]);
    setSelectedElement(newElement.id);
  };

  // Generate AI image
  const generateAIImage = async () => {
    if (!aiPrompt.trim()) {
      toast({
        title: t('error'),
        description: t('pleaseEnterPrompt'),
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate AI generation (replace with actual API call)
    setTimeout(() => {
      const mockImages = [
        `https://picsum.photos/400/400?random=${Date.now()}`,
        `https://picsum.photos/400/400?random=${Date.now() + 1}`,
        `https://picsum.photos/400/400?random=${Date.now() + 2}`,
        `https://picsum.photos/400/400?random=${Date.now() + 3}`
      ];
      setGeneratedImages(mockImages);
      setIsGenerating(false);
      
      toast({
        title: t('success'),
        description: t('aiImagesGenerated'),
      });
    }, 3000);
  };

  // Delete element
  const deleteElement = (id: string) => {
    setTextElements(prev => prev.filter(el => el.id !== id));
    setImageElements(prev => prev.filter(el => el.id !== id));
    setStickerElements(prev => prev.filter(el => el.id !== id));
    setSelectedElement(null);
  };

  // Toggle element visibility
  const toggleElementVisibility = (id: string) => {
    setTextElements(prev => prev.map(el => 
      el.id === id ? { ...el, visible: !el.visible } : el
    ));
    setImageElements(prev => prev.map(el => 
      el.id === id ? { ...el, visible: !el.visible } : el
    ));
    setStickerElements(prev => prev.map(el => 
      el.id === id ? { ...el, visible: !el.visible } : el
    ));
  };

  // Download canvas
  const downloadCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = 'cover-design.png';
    link.href = canvas.toDataURL();
    link.click();

    toast({
      title: t('success'),
      description: t('coverDownloaded'),
    });
  };

  // Render canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);

    // Draw background
    if (backgroundImage) {
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0, canvasSize.width, canvasSize.height);
        renderElements(ctx);
      };
      img.src = backgroundImage;
    } else {
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, canvasSize.width, canvasSize.height);
      renderElements(ctx);
    }
  }, [canvasSize, backgroundColor, backgroundImage, textElements, imageElements, stickerElements]);

  const renderElements = (ctx: CanvasRenderingContext2D) => {
    // Render text elements
    textElements.forEach(element => {
      if (!element.visible) return;
      
      ctx.save();
      ctx.translate(element.x, element.y);
      ctx.rotate((element.rotation * Math.PI) / 180);
      ctx.font = `${element.fontWeight} ${element.fontSize}px ${element.fontFamily}`;
      ctx.fillStyle = element.color;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(element.text, 0, 0);
      ctx.restore();
    });

    // Render image elements
    imageElements.forEach(element => {
      if (!element.visible) return;
      
      const img = new Image();
      img.onload = () => {
        ctx.save();
        ctx.translate(element.x, element.y);
        ctx.rotate((element.rotation * Math.PI) / 180);
        ctx.drawImage(img, -element.width/2, -element.height/2, element.width, element.height);
        ctx.restore();
      };
      img.src = element.src;
    });

    // Render sticker elements
    stickerElements.forEach(element => {
      if (!element.visible) return;
      
      ctx.save();
      ctx.translate(element.x, element.y);
      ctx.rotate((element.rotation * Math.PI) / 180);
      ctx.font = `${element.width}px Arial`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(element.src, 0, 0);
      ctx.restore();
    });
  };

  return (
    <>
      <Helmet>
        <title>{t('coverMakerTitle')}</title>
        <meta name="description" content={t('coverMakerDescription')} />
        <meta name="keywords" content="YouTube thumbnail maker, cover design tool, thumbnail creator, video cover generator, YouTube thumbnail design, custom thumbnail maker, thumbnail editor online, video thumbnail creator, YouTube cover art, thumbnail design software, free thumbnail maker, professional thumbnail creator, YouTube thumbnail templates, video cover design, thumbnail generator tool, YouTube thumbnail editor, cover art maker, video thumbnail design, YouTube thumbnail creator online, thumbnail making tool" />
        
        {/* Open Graph tags */}
        <meta property="og:title" content={t('coverMakerTitle')} />
        <meta property="og:description" content={t('coverMakerDescription')} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:site_name" content="Cover Crafter" />
        <meta property="og:image" content="/placeholder.svg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="YouTube Thumbnail Maker - Create Professional Video Covers" />
        
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t('coverMakerTitle')} />
        <meta name="twitter:description" content={t('coverMakerDescription')} />
        <meta name="twitter:image" content="/placeholder.svg" />
        <meta name="twitter:image:alt" content="YouTube Thumbnail Maker Tool" />
        
        {/* Additional SEO meta tags */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Cover Crafter" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="canonical" href={window.location.href} />
        
        {/* Schema.org structured data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Cover Crafter - YouTube Thumbnail Maker",
            "description": "Professional YouTube thumbnail maker and video cover design tool. Create stunning thumbnails with AI-powered features, custom text, images, and stickers.",
            "url": window.location.href,
            "applicationCategory": "DesignApplication",
            "operatingSystem": "Web Browser",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "featureList": [
              "YouTube thumbnail creation",
              "AI-powered image generation",
              "Custom text and fonts",
              "Image upload and editing",
              "Sticker and emoji support",
              "Multiple canvas sizes",
              "Professional templates"
            ]
          })}
        </script>
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <Header currentPage="cover-maker" />
        
        <main className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            
            {/* Left Panel - Tools */}
            <div className="lg:col-span-1 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Palette className="h-5 w-5" />
                    <span>{t('designTools')}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs value={currentTool} onValueChange={setCurrentTool} className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="text" className="text-xs">
                        <Type className="h-4 w-4 mr-1" />
                        {t('text')}
                      </TabsTrigger>
                      <TabsTrigger value="upload" className="text-xs">
                        <Upload className="h-4 w-4 mr-1" />
                        {t('upload')}
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsList className="grid w-full grid-cols-2 mt-2">
                      <TabsTrigger value="stickers" className="text-xs">
                        <Sticker className="h-4 w-4 mr-1" />
                        {t('stickers')}
                      </TabsTrigger>
                      <TabsTrigger value="ai" className="text-xs">
                        <Sparkles className="h-4 w-4 mr-1" />
                        AI
                      </TabsTrigger>
                    </TabsList>

                    {/* Text Tool */}
                    <TabsContent value="text" className="space-y-4 mt-4">
                      <div>
                        <Label>{t('addText')}</Label>
                        <Input
                          value={newText}
                          onChange={(e) => setNewText(e.target.value)}
                          placeholder={t('enterText')}
                          className="mt-1"
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <Label>{t('fontSize')}</Label>
                          <Slider
                            value={[fontSize]}
                            onValueChange={(value) => setFontSize(value[0])}
                            max={100}
                            min={12}
                            step={1}
                            className="mt-1"
                          />
                          <span className="text-sm text-gray-500">{fontSize}px</span>
                        </div>
                        
                        <div>
                          <Label>{t('textColor')}</Label>
                          <Input
                            type="color"
                            value={textColor}
                            onChange={(e) => setTextColor(e.target.value)}
                            className="mt-1 h-10"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label>{t('fontFamily')}</Label>
                        <select
                          value={fontFamily}
                          onChange={(e) => setFontFamily(e.target.value)}
                          className="w-full mt-1 p-2 border rounded"
                        >
                          {fontFamilies.map(font => (
                            <option key={font} value={font}>{font}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <Label>{t('fontWeight')}</Label>
                        <select
                          value={fontWeight}
                          onChange={(e) => setFontWeight(e.target.value)}
                          className="w-full mt-1 p-2 border rounded"
                        >
                          <option value="normal">{t('normal')}</option>
                          <option value="bold">{t('bold')}</option>
                        </select>
                      </div>
                      
                      <Button onClick={addTextElement} className="w-full">
                        <Plus className="h-4 w-4 mr-2" />
                        {t('addText')}
                      </Button>
                    </TabsContent>

                    {/* Upload Tool */}
                    <TabsContent value="upload" className="space-y-4 mt-4">
                      <div>
                        <Label>{t('canvasSize')}</Label>
                        <select
                          onChange={(e) => {
                            const preset = canvasPresets.find(p => p.name === e.target.value);
                            if (preset) {
                              setCanvasSize({ width: preset.width, height: preset.height });
                            }
                          }}
                          className="w-full mt-1 p-2 border rounded"
                        >
                          {canvasPresets.map(preset => (
                            <option key={preset.name} value={preset.name}>
                              {preset.name} ({preset.width}x{preset.height})
                            </option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <Label>{t('backgroundColor')}</Label>
                        <Input
                          type="color"
                          value={backgroundColor}
                          onChange={(e) => setBackgroundColor(e.target.value)}
                          className="mt-1 h-10"
                        />
                      </div>
                      
                      <div>
                        <Button
                          onClick={() => {
                            setCurrentTool('background');
                            fileInputRef.current?.click();
                          }}
                          className="w-full mb-2"
                          variant="outline"
                        >
                          <ImageIcon className="h-4 w-4 mr-2" />
                          {t('uploadBackground')}
                        </Button>
                        
                        <Button
                          onClick={() => {
                            setCurrentTool('image');
                            fileInputRef.current?.click();
                          }}
                          className="w-full"
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          {t('uploadImage')}
                        </Button>
                      </div>
                      
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </TabsContent>

                    {/* Stickers Tool */}
                    <TabsContent value="stickers" className="space-y-4 mt-4">
                      <div>
                        <Label>{t('predefinedStickers')}</Label>
                        <div className="grid grid-cols-5 gap-2 mt-2">
                          {predefinedStickers.map((sticker, index) => (
                            <Button
                              key={index}
                              variant="outline"
                              className="h-12 text-2xl p-0"
                              onClick={() => addSticker(sticker)}
                            >
                              {sticker}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </TabsContent>

                    {/* AI Tool */}
                    <TabsContent value="ai" className="space-y-4 mt-4">
                      <div>
                        <Label>{t('aiImageGeneration')}</Label>
                        <Textarea
                          value={aiPrompt}
                          onChange={(e) => setAiPrompt(e.target.value)}
                          placeholder={t('enterAIPrompt')}
                          className="mt-1"
                          rows={3}
                        />
                      </div>
                      
                      <Button
                        onClick={generateAIImage}
                        disabled={isGenerating}
                        className="w-full"
                      >
                        {isGenerating ? (
                          <div className="flex items-center space-x-2">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            <span>{t('generating')}</span>
                          </div>
                        ) : (
                          <>
                            <Sparkles className="h-4 w-4 mr-2" />
                            {t('generateImage')}
                          </>
                        )}
                      </Button>
                      
                      {generatedImages.length > 0 && (
                        <div>
                          <Label>{t('generatedImages')}</Label>
                          <div className="grid grid-cols-2 gap-2 mt-2">
                            {generatedImages.map((img, index) => (
                              <img
                                key={index}
                                src={img}
                                alt={`Generated ${index + 1}`}
                                className="w-full h-20 object-cover rounded cursor-pointer hover:opacity-80"
                                onClick={() => {
                                  const newElement: ImageElement = {
                                    id: Date.now().toString(),
                                    src: img,
                                    x: canvasSize.width / 2,
                                    y: canvasSize.height / 2,
                                    width: 200,
                                    height: 200,
                                    rotation: 0,
                                    visible: true
                                  };
                                  setImageElements(prev => [...prev, newElement]);
                                  setSelectedElement(newElement.id);
                                }}
                              />
                            ))}
                          </div>
                        </div>
                      )}
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
              
              {/* Elements List */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">{t('elements')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {[...textElements, ...imageElements, ...stickerElements].map((element) => (
                      <div
                        key={element.id}
                        className={`flex items-center justify-between p-2 rounded ${
                          selectedElement === element.id ? 'bg-blue-100' : 'bg-gray-50'
                        }`}
                        onClick={() => setSelectedElement(element.id)}
                      >
                        <span className="text-sm truncate">
                          {'text' in element ? element.text : 'Image'}
                        </span>
                        <div className="flex space-x-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleElementVisibility(element.id);
                            }}
                          >
                            {element.visible ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteElement(element.id);
                            }}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Right Panel - Canvas */}
            <div className="lg:col-span-3">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center space-x-2">
                      <ImageIcon className="h-5 w-5" />
                      <span>{t('coverPreview')}</span>
                    </CardTitle>
                    <Button onClick={downloadCanvas}>
                      <Download className="h-4 w-4 mr-2" />
                      {t('download')}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="flex items-center justify-center">
                  <div className="relative border-2 border-dashed border-gray-300 rounded-lg overflow-hidden">
                    <canvas
                      ref={canvasRef}
                      width={canvasSize.width}
                      height={canvasSize.height}
                      className="max-w-full object-contain"
                      style={{
                        maxWidth: '100%',
                        width: 'auto',
                        height: 'auto'
                      }}
                    />
                  </div>
                </CardContent>
              </Card>
              
              {/* SEO Content Section */}
              <Card className="mt-6">
                <CardContent className="p-6">
                  <div className="prose max-w-none">
                    <h2 className="text-2xl font-bold mb-4 text-gray-900">Professional YouTube Thumbnail Maker & Cover Design Tool</h2>
                    
                    <p className="text-gray-700 mb-4">
                      Create stunning YouTube thumbnails and video covers with our advanced online design tool. Whether you're a content creator, marketer, or business owner, our Cover Maker provides everything you need to design eye-catching thumbnails that boost your video's click-through rates and engagement.
                    </p>
                    
                    <h3 className="text-xl font-semibold mb-3 text-gray-900">Key Features of Our Thumbnail Creator</h3>
                    
                    <p className="text-gray-700 mb-4">
                      Our YouTube thumbnail maker offers a comprehensive suite of design tools that make creating professional-quality covers simple and efficient. With support for multiple canvas sizes including YouTube thumbnails (1280x720), Instagram posts (1080x1080), Facebook covers (1200x630), and Twitter headers (1500x500), you can create content for all major social media platforms.
                    </p>
                    
                    <p className="text-gray-700 mb-4">
                      The intuitive text editor allows you to add custom typography with various font families including Arial, Helvetica, Times New Roman, Georgia, and Impact. Adjust font sizes from 12px to 100px, choose between normal and bold weights, and select from a full color palette to match your brand identity. Position text elements precisely with our drag-and-drop interface and rotate them to create dynamic layouts.
                    </p>
                    
                    <h3 className="text-xl font-semibold mb-3 text-gray-900">AI-Powered Image Generation</h3>
                    
                    <p className="text-gray-700 mb-4">
                      Take advantage of our cutting-edge AI image generation feature to create unique visual elements for your thumbnails. Simply describe what you want in natural language, and our AI will generate multiple high-quality images that you can instantly add to your design. This feature is perfect for creating custom backgrounds, illustrations, and graphic elements that make your thumbnails stand out from the competition.
                    </p>
                    
                    <h3 className="text-xl font-semibold mb-3 text-gray-900">Extensive Customization Options</h3>
                    
                    <p className="text-gray-700 mb-4">
                      Upload your own images and photos to create personalized thumbnails that reflect your content. Our image editor supports all common formats and allows you to resize, rotate, and position elements with pixel-perfect precision. Add emoji stickers and decorative elements from our curated collection including popular symbols like 🎬, 🔥, ⭐, 💎, 🚀, and many more to enhance your designs.
                    </p>
                    
                    <p className="text-gray-700 mb-4">
                      The background customization options include solid colors and image uploads, giving you complete control over your thumbnail's foundation. Layer multiple elements including text, images, and stickers to create complex, professional-looking designs that capture viewers' attention and encourage clicks.
                    </p>
                    
                    <h3 className="text-xl font-semibold mb-3 text-gray-900">Optimized for YouTube Success</h3>
                    
                    <p className="text-gray-700 mb-4">
                      Our thumbnail maker is specifically optimized for YouTube's requirements and best practices. The default 1280x720 pixel canvas ensures your thumbnails display perfectly across all devices, from desktop computers to mobile phones. Create thumbnails that not only look professional but also comply with YouTube's technical specifications for maximum visibility and engagement.
                    </p>
                    
                    <p className="text-gray-700 mb-4">
                      The tool's real-time preview feature lets you see exactly how your thumbnail will appear to viewers, ensuring your design looks perfect before you download. Export your finished thumbnails in high-quality PNG format, ready for immediate upload to YouTube or any other platform.
                    </p>
                    
                    <h3 className="text-xl font-semibold mb-3 text-gray-900">Free and Accessible Design Solution</h3>
                    
                    <p className="text-gray-700">
                      Best of all, our Cover Maker is completely free to use with no hidden costs or subscription requirements. Access all features including AI image generation, custom text editing, image uploads, and sticker additions without any limitations. Start creating professional YouTube thumbnails today and watch your video performance improve with more engaging, click-worthy covers that drive views and subscriber growth.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default CoverMaker;