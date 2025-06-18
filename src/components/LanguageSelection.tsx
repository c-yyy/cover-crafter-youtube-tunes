import React from 'react';
import { Link } from 'react-router-dom';
import { supportedLngs } from '../i18n';

const LanguageSelection: React.FC = () => {
  const getLanguageFlag = (lng: string) => {
    switch (lng) {
      case 'en': return '🇺🇸';
      case 'zh': return '🇨🇳';
      case 'ja': return '🇯🇵';
      case 'km': return '🇰🇭';
      case 'si': return '🇱🇰';
      case 'bn': return '🇧🇩';
      case 'ur': return '🇵🇰';
      default: return '🌐';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Cover Crafter</h1>
          <p className="text-gray-600">Choose your language / 选择语言</p>
        </div>
        
        <div className="space-y-3">
          {Object.entries(supportedLngs).map(([code, name]) => (
            <Link
              key={code}
              to={`/${code}`}
              className="flex items-center p-4 rounded-lg border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 group"
            >
              <span className="text-2xl mr-3">{getLanguageFlag(code)}</span>
              <span className="text-lg font-medium text-gray-700 group-hover:text-blue-600">
                {name}
              </span>
            </Link>
          ))}
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            YouTube Thumbnail Generator
          </p>
        </div>
      </div>
    </div>
  );
};

export default LanguageSelection;