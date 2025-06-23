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
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <Header currentPage="cover-maker" />
        
        <main className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-200px)]">
            
            {/* Left Panel - Tools */}
            <div className="lg:col-span-1 space-y-4 overflow-y-auto">
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
              <Card className="h-full">
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
                <CardContent className="flex items-center justify-center h-full">
                  <div className="relative border-2 border-dashed border-gray-300 rounded-lg overflow-hidden">
                    <canvas
                      ref={canvasRef}
                      width={canvasSize.width}
                      height={canvasSize.height}
                      className="max-w-full max-h-full object-contain"
                      style={{
                        maxWidth: '100%',
                        maxHeight: 'calc(100vh - 300px)',
                        width: 'auto',
                        height: 'auto'
                      }}
                    />
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