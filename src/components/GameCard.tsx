import React from 'react';
import { Star } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useNavigate } from 'react-router-dom';

interface GameCardProps {
  title: string;
  image: string;
  rating: number;
  genre: string;
}

export default function GameCard({ title, image, rating, genre }: GameCardProps) {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/games/${encodeURIComponent(title)}`);
  };

  return (
    <div onClick={handleClick} className="cursor-pointer">
      <div className="group relative rounded-xl overflow-hidden backdrop-blur-sm bg-gray-100/50 dark:bg-[#1A1A24]/50 border border-[#7D3CFF]/10 hover:border-[#7D3CFF]/30 transition-all duration-300 hover:transform hover:scale-105">
        <img
          src={image}
          alt={title}
          className="w-full h-40 object-cover"
        />
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-gray-900 dark:text-white font-semibold">{title}</h3>
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-400 mr-1" />
              <span className="text-gray-600 dark:text-gray-300 text-sm">{rating}</span>
            </div>
          </div>
          <span className="text-sm text-[#00F3FF]">{genre}</span>
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F15] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-8">
          <button className="bg-[#00F3FF] text-[#0F0F15] px-6 py-2 rounded-lg font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            {t('playNow')}
          </button>
        </div>
      </div>
    </div>
  );
}