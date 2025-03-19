import React from 'react';
import { useLanguage } from '../context/LanguageContext';

// 游戏类型数据
const gameCategories = [
  {
    id: 'all',
    icon: '🎮'
  },
  {
    id: 'action',
    icon: '💥'
  },
  {
    id: 'adventure',
    icon: '🗺️'
  },
  {
    id: 'racing',
    icon: '🏎️'
  },
  {
    id: 'strategy',
    icon: '🧩'
  },
  {
    id: 'puzzle',
    icon: '🧠'
  },
  {
    id: 'sports',
    icon: '⚽'
  },
  {
    id: 'rpg',
    icon: '⚔️'
  },
  {
    id: 'multiplayer',
    icon: '👥'
  },
  {
    id: 'shooting',
    icon: '🎯'
  },
  {
    id: 'casual',
    icon: '🎪'
  },
  {
    id: 'fighting',
    icon: '👊'
  },
  {
    id: 'simulation',
    icon: '🏙️'
  },
  {
    id: 'anime',
    icon: '🌸'
  },
  {
    id: 'horror',
    icon: '👻'
  },
  {
    id: '2d',
    icon: '📊'
  },
  {
    id: '3d',
    icon: '🧊'
  },
  {
    id: 'fantasy',
    icon: '🧙‍♂️'
  }
];

interface SidebarProps {
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

export default function Sidebar({ activeCategory, onCategoryChange }: SidebarProps) {
  const { language, t } = useLanguage();

  return (
    <div 
      className="w-[220px] bg-gradient-to-b from-white/95 to-white/85 dark:from-[#131320]/95 dark:to-[#0F0F15]/85 rounded-[16px] shadow-lg border border-[#00F3FF]/10 relative block backdrop-blur-xl"
      style={{
        fontFamily: 'Roboto, "Helvetica Neue", Arial, sans-serif',
        WebkitFontSmoothing: 'antialiased',
        backdropFilter: 'blur(16px)',
      }}
    >
      <div className="p-5 border-b border-[#00F3FF]/10 flex items-center">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7D3CFF] to-[#00F3FF] flex items-center justify-center mr-3">
          <span className="text-white text-lg">🎮</span>
        </div>
        <h2 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#7D3CFF] to-[#00F3FF]">
          {t('gameCategories', '游戏分类')}
        </h2>
      </div>
      <nav className="overflow-y-auto max-h-[calc(100vh-220px)] py-3 px-3">
        <ul className="space-y-1">
          {gameCategories.map((category) => (
            <li key={category.id}>
              <button
                onClick={() => onCategoryChange(category.id)}
                className={`flex items-center w-full px-4 py-2 rounded-xl transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-gradient-to-r from-[#7D3CFF] to-[#00F3FF] text-white font-medium shadow-md shadow-[#7D3CFF]/20'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-white/5 hover:shadow-sm'
                }`}
              >
                <div className={`flex items-center justify-center w-8 h-8 rounded-lg ${
                  activeCategory === category.id 
                    ? 'bg-white/20 text-white' 
                    : 'bg-gray-100/80 dark:bg-gray-800/50 text-[#7D3CFF]'
                } mr-3`}>
                  <span className="text-lg">{category.icon}</span>
                </div>
                <span className={`${activeCategory === category.id ? 'font-medium' : ''}`}>
                  {t(`categories.${category.id}`, category.id)}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
} 