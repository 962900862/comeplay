import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useSearch } from '../context/SearchContext';
import GameCard from './GameCard';
import Sidebar from './Sidebar';
import AboutSidebar from './AboutSidebar';

// 定义游戏数据类型
interface GameData {
  title: string;
  description: string;
  image: string;
  rating: number;
  genre: string;
  categories: string[];
  isVideo?: boolean;
}

// 扩展游戏数据，增加更多游戏和类别
const games: GameData[] = [
  {
    title: "Block Blast",
    description: "A vibrant and addictive puzzle game that challenges players to strategically arrange blocks to form solid rows or columns.",
    image: "https://images.1games.io/cache/game/block-blast/block-blast-m200x130.webp",
    rating: 4.8,
    genre: "Puzzle",
    categories: ["puzzle", "strategy", "2d"]
  },
  {
    title: "wave-dash",
    description: "An addictive fast-paced reflex game that challenges players to navigate through obstacles with precision and speed.",
    image: "https://1games.io/data/file/game/wave-dash/wave-dash.mp4",
    rating: 4.7,
    genre: "Reflex",
    categories: ["action", "reflex", "2d"],
    isVideo: true // 标记为视频类型
  },
  {
    title: "slither.io",
    description: "A popular multiplayer online .io game where players control a snake to collect glowing orbs and compete to become the longest serpent.",
    image: "https://pic1.imgdb.cn/item/67d9257a88c538a9b5c0309f.png",
    rating: 4.9,
    genre: "Multiplayer",
    categories: ["io", "survival", "multiplayer"]
  },
  {
    title: "Sprunki Draw Save Incredibox",
    description: "A music creation game inspired by Incredibox, offering an intuitive platform for making music with a drag-and-drop interface.",
    image: "https://pic1.imgdb.cn/item/67d903f588c538a9b5c0210b.jpg",
    rating: 4.8,
    genre: "Music Creation",
    categories: ["music", "creative"]
  },
  {
    title: "Sprunki",
    description: "An interactive music creation experience inspired by Incredibox with unique sound loops and dynamic character interactions",
    image: "https://pic1.imgdb.cn/item/67d900cc88c538a9b5c01fe3.jpg",
    rating: 4.7,
    genre: "Music Creation",
    categories: ["puzzle", "casual", "2d"]
  },
  {
    title: "Coup Ahoo",
    description: "A strategic online game experience filled with wisdom and tactics",
    image: "https://pic1.imgdb.cn/item/67d3bc4688c538a9b5bcf0a9.png",
    rating: 4.8,
    genre: "Strategy",
    categories: ["strategy", "rpg", "multiplayer"]
  },
  {
    title: "Fireboy and Watergirl 5 Elements",
    description: "Explore different elements with two players in this cooperative puzzle game",
    image: "https://pic1.imgdb.cn/item/67d6ca8988c538a9b5bf43ea.jpg",
    rating: 4.5,
    genre: "Puzzle",
    categories: ["puzzle", "adventure",  "multiplayer"]
  },
  {
    title: "Bleach vs Naruto 3.3",
    description: "Epic anime fighting game featuring characters from Bleach and Naruto",
    image: "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/09/naruto-vs-bleach-thumb.jpg",
    rating: 4.7,
    genre: "Fighting",
    categories: ["fighting", "anime",  "multiplayer"]
  },
 
];

export default function FeaturedGames() {
  const { t } = useLanguage();
  const { searchTerm, isSearching } = useSearch();
  const [activeCategory, setActiveCategory] = useState('all');

  // 根据类别和搜索词过滤游戏
  const filteredGames = games.filter(game => {
    // 首先按搜索词过滤
    const matchesSearch = !searchTerm.trim() || 
      game.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      game.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      game.genre.toLowerCase().includes(searchTerm.toLowerCase());
      
    // 然后按类别过滤
    const matchesCategory = activeCategory === 'all' || game.categories.includes(activeCategory);
    
    return matchesSearch && matchesCategory;
  });

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
  };

  return (
    <section className="bg-gray-50 dark:bg-[#0F0F15] transition-colors duration-300">
      <div className="flex">
        {/* 左侧边栏 - 固定位置并支持滚动 */}
        <div className="flex-shrink-0 fixed left-4 top-20 bottom-4 z-40 w-[220px] overflow-y-auto custom-scrollbar">
          <div className="sticky top-0 pb-4 space-y-4">
            <Sidebar 
              activeCategory={activeCategory} 
              onCategoryChange={handleCategoryChange} 
            />
            <AboutSidebar />
          </div>
        </div>
        
        {/* 右侧内容 - 填充剩余空间，留出侧边栏宽度 */}
        <div className="flex-grow py-8 ml-[240px] px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#7D3CFF] to-[#00F3FF]">
              {isSearching ? t('searchResults') : t('featured')}
            </h2>
            {isSearching && (
              <div className="text-gray-600 dark:text-gray-400">
                {filteredGames.length} {t('resultsFound')}
              </div>
            )}
          </div>
          
          {filteredGames.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
              {filteredGames.map((game) => (
                <GameCard key={game.title} {...game} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white/90 dark:bg-[#1A1A24]/90 rounded-lg shadow backdrop-blur-lg">
              <p className="text-xl text-gray-600 dark:text-gray-400">
                {t('noGamesFound')}
              </p>
              <p className="mt-2 text-gray-500 dark:text-gray-500">
                {t('tryDifferentSearch')}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}