import React, { useState, useRef } from 'react';
import { Star } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface GameCardProps {
  title: string;
  description: string;
  image: string;
  rating: number;
  genre: string;
  categories: string[];
  isVideo?: boolean; // 新增标记，用于区分图片和视频
}

export default function GameCard({ title, image, rating, genre, description, categories, isVideo = false }: GameCardProps) {
  const { t } = useLanguage();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isHovering, setIsHovering] = useState(false);

  const handlePlayClick = () => {
    // 使用游戏标题构建HTML文件路径，添加基础路径
    const baseUrl = import.meta.env.BASE_URL || '/';
    const gameUrl = `${baseUrl}games/${title}.html`;
    // 使用window.open在新标签页中打开游戏
    window.open(gameUrl, '_blank');
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
    if (isVideo && videoRef.current) {
      videoRef.current.play().catch(err => {
        console.warn('Auto-play failed:', err);
      });
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    if (isVideo && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div className="block">
      <div 
        className="group relative rounded-xl overflow-hidden backdrop-blur-sm bg-white dark:bg-[#1A1A24] border border-gray-200 dark:border-gray-800 hover:border-[#7D3CFF]/30 transition-all duration-300 hover:transform hover:scale-[1.02] shadow-sm hover:shadow-md"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div 
          className="relative cursor-pointer" 
          onClick={handlePlayClick}
          title={`Play ${title}`}
        >
          {isVideo ? (
            <video
              ref={videoRef}
              src={image}
              className="w-full h-40 object-cover"
              muted
              playsInline
              loop
              preload="metadata"
            />
          ) : (
            <img
              src={image}
              alt={title}
              className="w-full h-40 object-cover"
            />
          )}
          <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
            <div className="flex items-center">
              <Star className="h-3 w-3 text-yellow-400 mr-1" fill="#FBBF24" />
              <span>{rating}</span>
            </div>
          </div>
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        <div className="p-4">
          <h3 
            className="text-gray-900 dark:text-white font-semibold mb-1 truncate cursor-pointer hover:text-[#7D3CFF] transition-colors duration-200" 
            onClick={handlePlayClick}
          >
            {title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">{description}</p>
          <div className="flex flex-wrap gap-1 mb-2">
            {categories.map((category) => (
              <span key={category} className="text-xs px-2 py-0.5 bg-[#7D3CFF]/10 text-[#7D3CFF] rounded-full">{category}</span>
            ))}
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs px-2 py-1 bg-[#00F3FF]/10 text-[#00F3FF] rounded-full">{genre}</span>
            <button 
              onClick={handlePlayClick}
              className="bg-[#00F3FF] hover:bg-[#00D8E0] text-[#0F0F15] text-sm px-3 py-1 rounded-lg font-medium transition-colors duration-200"
            >
              {t('playNow')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}