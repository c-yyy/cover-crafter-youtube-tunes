import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Ruler, 
  Monitor, 
  Smartphone, 
  Tablet, 
  Download, 
  Info,
  CheckCircle,
  AlertCircle,
  Star
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface ThumbnailSize {
  name: string;
  width: number;
  height: number;
  aspectRatio: string;
  quality: string;
  usage: string;
  fileSize: string;
  isRecommended?: boolean;
  isOptimal?: boolean;
}

const ThumbnailSizeGuide: React.FC = () => {
  const { t } = useTranslation();
  const [selectedSize, setSelectedSize] = useState<ThumbnailSize | null>(null);
  const [comparisonMode, setComparisonMode] = useState(false);

  const thumbnailSizes: ThumbnailSize[] = [
    {
      name: t('sizeGuideMaxRes'),
      width: 1920,
      height: 1080,
      aspectRatio: '16:9',
      quality: t('sizeGuideQualityUHD'),
      usage: t('sizeGuideUsageMaxRes'),
      fileSize: '< 2MB',
      isRecommended: true,
      isOptimal: true
    },
    {
      name: t('sizeGuideHigh'),
      width: 1280,
      height: 720,
      aspectRatio: '16:9',
      quality: t('sizeGuideQualityHD'),
      usage: t('sizeGuideUsageHigh'),
      fileSize: '< 1MB',
      isRecommended: true
    },
    {
      name: t('sizeGuideMedium'),
      width: 640,
      height: 480,
      aspectRatio: '4:3',
      quality: t('sizeGuideQualitySD'),
      usage: t('sizeGuideUsageMedium'),
      fileSize: '< 500KB'
    },
    {
      name: t('sizeGuideStandard'),
      width: 480,
      height: 360,
      aspectRatio: '4:3',
      quality: t('sizeGuideQualitySD'),
      usage: t('sizeGuideUsageStandard'),
      fileSize: '< 200KB'
    },
    {
      name: t('sizeGuideSmall'),
      width: 320,
      height: 180,
      aspectRatio: '16:9',
      quality: t('sizeGuideQualityLD'),
      usage: t('sizeGuideUsageSmall'),
      fileSize: '< 100KB'
    },
    {
      name: t('sizeGuideMini'),
      width: 120,
      height: 90,
      aspectRatio: '4:3',
      quality: t('sizeGuideQualityLD'),
      usage: t('sizeGuideUsageMini'),
      fileSize: '< 50KB'
    }
  ];

  const getScaledDimensions = (width: number, height: number, maxSize: number = 200) => {
    const ratio = Math.min(maxSize / width, maxSize / height);
    return {
      width: Math.round(width * ratio),
      height: Math.round(height * ratio)
    };
  };

  const renderSizeCard = (size: ThumbnailSize, index: number) => {
    const scaled = getScaledDimensions(size.width, size.height);
    const isSelected = selectedSize?.name === size.name;

         return (
       <Card 
         key={index}
         className={`cursor-pointer transition-all duration-300 hover:shadow-lg border-2 ${
           isSelected 
             ? 'border-red-500 bg-red-50' 
             : size.isRecommended 
               ? 'border-green-200 bg-green-50' 
               : 'border-gray-200 hover:border-gray-300'
         }`}
         onClick={() => setSelectedSize(isSelected ? null : size)}
       >
         <CardHeader className="pb-2">
           <div className="flex items-center justify-between">
             <CardTitle className="text-sm font-semibold flex items-center gap-1">
               {size.name}
               {size.isOptimal && <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />}
               {size.isRecommended && <CheckCircle className="w-3 h-3 text-green-500" />}
             </CardTitle>
             <div className="flex gap-1">
               {size.isOptimal && <Badge variant="default" className="bg-yellow-100 text-yellow-800 text-xs px-1 py-0">{t('sizeGuideOptimal')}</Badge>}
               {size.isRecommended && !size.isOptimal && <Badge variant="default" className="bg-green-100 text-green-800 text-xs px-1 py-0">{t('sizeGuideRecommended')}</Badge>}
             </div>
           </div>
         </CardHeader>
         <CardContent className="space-y-3">
           {/* Visual Size Representation */}
           <div className="flex justify-center items-center bg-gray-100 rounded-lg p-3 min-h-[80px]">
             <div 
               className="bg-gradient-to-br from-red-500 to-red-600 rounded shadow-md flex items-center justify-center text-white text-xs font-medium"
               style={{
                 width: `${Math.min(scaled.width, 120)}px`,
                 height: `${Math.min(scaled.height, 80)}px`
               }}
             >
               {size.aspectRatio}
             </div>
           </div>

           {/* Size Information - Compact */}
           <div className="text-center space-y-1">
             <p className="font-medium text-gray-900 text-sm">{size.width} × {size.height}</p>
             <div className="flex justify-center gap-4 text-xs text-gray-600">
               <span>{size.quality}</span>
               <span>{size.fileSize}</span>
             </div>
           </div>

           {/* Usage Description - Truncated */}
           <div className="pt-1 border-t">
             <p className="text-xs text-gray-600 leading-relaxed line-clamp-2">
               {size.usage}
             </p>
           </div>

           {/* Device Icons */}
           <div className="flex justify-center gap-2 pt-1">
             {size.width >= 1280 && <Monitor className="w-3 h-3 text-gray-500" />}
             {size.width >= 640 && size.width < 1280 && <Tablet className="w-3 h-3 text-gray-500" />}
             {size.width < 640 && <Smartphone className="w-3 h-3 text-gray-500" />}
           </div>
         </CardContent>
       </Card>
     );
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-0">
             <Tabs defaultValue="guide" className="w-full">
         <TabsList className="grid w-full grid-cols-3 mb-4">
           <TabsTrigger value="sizes" className="text-xs sm:text-sm">{t('sizeGuideTabSizes')}</TabsTrigger>
           <TabsTrigger value="comparison" className="text-xs sm:text-sm">{t('sizeGuideTabComparison')}</TabsTrigger>
           <TabsTrigger value="guide" className="text-xs sm:text-sm">{t('sizeGuideTabGuide')}</TabsTrigger>
         </TabsList>

         <TabsContent value="sizes" className="space-y-4">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {thumbnailSizes.map((size, index) => renderSizeCard(size, index))}
          </div>

          {selectedSize && (
            <Card className="bg-gradient-to-r from-red-50 to-red-100 border-red-200">
              <CardHeader>
                <CardTitle className="text-xl text-red-900 flex items-center gap-2">
                  <Info className="w-5 h-5" />
                  {t('sizeGuideSelectedInfo', { name: selectedSize.name })}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-red-800 mb-2">{t('sizeGuideTechnicalSpecs')}</h4>
                    <ul className="space-y-1 text-sm text-red-700">
                      <li>• {t('sizeGuideResolution')}: {selectedSize.width} × {selectedSize.height}</li>
                      <li>• {t('sizeGuideRatio')}: {selectedSize.aspectRatio}</li>
                      <li>• {t('sizeGuideQuality')}: {selectedSize.quality}</li>
                      <li>• {t('sizeGuideEstimatedFileSize')}: {selectedSize.fileSize}</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-800 mb-2">{t('sizeGuideBestUsedFor')}</h4>
                    <p className="text-sm text-red-700 leading-relaxed">
                      {selectedSize.usage}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

                 <TabsContent value="comparison" className="space-y-4">
           <Card>
             <CardHeader className="pb-2">
               <CardTitle className="text-lg text-center">{t('sizeGuideComparisonTitle')}</CardTitle>
             </CardHeader>
             <CardContent>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                 {[thumbnailSizes[0], thumbnailSizes[1], thumbnailSizes[4]].map((size, index) => {
                   const scaled = getScaledDimensions(size.width, size.height, 100);
                   return (
                     <div key={index} className="text-center">
                       <div className="flex justify-center mb-2">
                         <div 
                           className="bg-gradient-to-br from-red-500 to-red-600 rounded shadow-md flex items-center justify-center text-white text-xs font-medium"
                           style={{
                             width: `${scaled.width}px`,
                             height: `${scaled.height}px`
                           }}
                         >
                           {size.aspectRatio}
                         </div>
                       </div>
                       <h3 className="font-semibold text-gray-900 text-sm">{size.name}</h3>
                       <p className="text-xs text-gray-600">{size.width} × {size.height}</p>
                       <p className="text-xs text-gray-500">{size.fileSize}</p>
                     </div>
                   );
                 })}
               </div>
             </CardContent>
           </Card>
         </TabsContent>

         <TabsContent value="guide" className="space-y-4">
           <div className="grid grid-cols-1 gap-4">
             <Card>
               <CardHeader className="pb-2">
                 <CardTitle className="text-lg text-green-800 flex items-center gap-2">
                   <CheckCircle className="w-4 h-4" />
                   {t('sizeGuideBestPractices')}
                 </CardTitle>
               </CardHeader>
               <CardContent>
                 <ul className="space-y-2 text-xs text-gray-700">
                   <li className="flex items-start gap-2">
                     <CheckCircle className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
                     <span>{t('sizeGuideTip1')}</span>
                   </li>
                   <li className="flex items-start gap-2">
                     <CheckCircle className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
                     <span>{t('sizeGuideTip2')}</span>
                   </li>
                   <li className="flex items-start gap-2">
                     <CheckCircle className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
                     <span>{t('sizeGuideTip3')}</span>
                   </li>
                   <li className="flex items-start gap-2">
                     <CheckCircle className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
                     <span>{t('sizeGuideTip4')}</span>
                   </li>
                 </ul>
               </CardContent>
             </Card>

             <Card>
               <CardHeader className="pb-2">
                 <CardTitle className="text-lg text-amber-800 flex items-center gap-2">
                   <AlertCircle className="w-4 h-4" />
                   {t('sizeGuideCommonMistakes')}
                 </CardTitle>
               </CardHeader>
               <CardContent>
                 <ul className="space-y-2 text-xs text-gray-700">
                   <li className="flex items-start gap-2">
                     <AlertCircle className="w-3 h-3 text-amber-500 mt-0.5 flex-shrink-0" />
                     <span>{t('sizeGuideMistake1')}</span>
                   </li>
                   <li className="flex items-start gap-2">
                     <AlertCircle className="w-3 h-3 text-amber-500 mt-0.5 flex-shrink-0" />
                     <span>{t('sizeGuideMistake2')}</span>
                   </li>
                   <li className="flex items-start gap-2">
                     <AlertCircle className="w-3 h-3 text-amber-500 mt-0.5 flex-shrink-0" />
                     <span>{t('sizeGuideMistake3')}</span>
                   </li>
                   <li className="flex items-start gap-2">
                     <AlertCircle className="w-3 h-3 text-amber-500 mt-0.5 flex-shrink-0" />
                     <span>{t('sizeGuideMistake4')}</span>
                   </li>
                 </ul>
               </CardContent>
             </Card>
           </div>
         </TabsContent>
      </Tabs>
    </div>
  );
};

export default ThumbnailSizeGuide; 