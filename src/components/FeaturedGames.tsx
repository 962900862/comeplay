import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import GameCard from './GameCard';

const games = [
  {
    title: "Coup Ahoo",
    description: "一款充满策略与智慧的在线游戏体验",
    image: "https://pic1.imgdb.cn/item/67d3bc4688c538a9b5bcf0a9.png",
    rating: 4.8,
    genre: "Action RPG"
  },
  {
    title: "Space Warriors",
    description: "探索浩瀚宇宙的科幻战略游戏",
    image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f",
    rating: 4.5,
    genre: "Strategy"
  },
  {
    title: "Racing Elite",
    description: "极速竞技，体验赛车的激情与挑战",
    image: "https://images.unsplash.com/photo-1548438294-1ad5d5f4f063",
    rating: 4.7,
    genre: "Racing"
  },
  {
    title: "Fantasy Quest",
    description: "奇幻冒险，探索神秘的魔法世界",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420",
    rating: 4.9,
    genre: "Adventure"
  }
];

export default function FeaturedGames() {
  const { t } = useLanguage();

  return (
    <section className="py-16 bg-white dark:bg-[#0F0F15] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#7D3CFF] to-[#00F3FF]">
            {t('featured')}
          </h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {games.map((game) => (
            <GameCard key={game.title} {...game} />
          ))}
        </div>
      </div>
    </section>
  );
}