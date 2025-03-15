import React, { useState, useEffect } from 'react';
import GameCard from './GameCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const games = [
  {
    title: "Coup Ahoo",
    image: "https://pic1.imgdb.cn/item/67d3bc4688c538a9b5bcf0a9.png",
    rating: 4.8,
    genre: "Action RPG"
  },
  {
    title: "Space Warriors",
    image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f",
    rating: 4.5,
    genre: "Strategy"
  },
  {
    title: "Racing Elite",
    image: "https://images.unsplash.com/photo-1548438294-1ad5d5f4f063",
    rating: 4.7,
    genre: "Racing"
  },
  {
    title: "Fantasy Quest",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420",
    rating: 4.9,
    genre: "Adventure"
  },
  {
    title: "Cyber Legends",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e",
    rating: 4.8,
    genre: "Action RPG"
  },
  {
    title: "Space Warriors",
    image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f",
    rating: 4.5,
    genre: "Strategy"
  },
  {
    title: "Racing Elite",
    image: "https://images.unsplash.com/photo-1548438294-1ad5d5f4f063",
    rating: 4.7,
    genre: "Racing"
  },
  {
    title: "Fantasy Quest",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420",
    rating: 4.9,
    genre: "Adventure"
  },
  {
    title: "Cyber Legends",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e",
    rating: 4.8,
    genre: "Action RPG"
  },
  {
    title: "Space Warriors",
    image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f",
    rating: 4.5,
    genre: "Strategy"
  },
  {
    title: "Racing Elite",
    image: "https://images.unsplash.com/photo-1548438294-1ad5d5f4f063",
    rating: 4.7,
    genre: "Racing"
  },
  {
    title: "Fantasy Quest",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420",
    rating: 4.9,
    genre: "Adventure"
  },
  {
    title: "Cyber Legends",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e",
    rating: 4.8,
    genre: "Action RPG"
  },
  {
    title: "Space Warriors",
    image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f",
    rating: 4.5,
    genre: "Strategy"
  },
  {
    title: "Racing Elite",
    image: "https://images.unsplash.com/photo-1548438294-1ad5d5f4f063",
    rating: 4.7,
    genre: "Racing"
  },
  {
    title: "Fantasy Quest",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420",
    rating: 4.9,
    genre: "Adventure"
  },
  {
    title: "Cyber Legends",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e",
    rating: 4.8,
    genre: "Action RPG"
  },
  {
    title: "Space Warriors",
    image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f",
    rating: 4.5,
    genre: "Strategy"
  },
  {
    title: "Racing Elite",
    image: "https://images.unsplash.com/photo-1548438294-1ad5d5f4f063",
    rating: 4.7,
    genre: "Racing"
  },
  {
    title: "Fantasy Quest",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420",
    rating: 4.9,
    genre: "Adventure"
  },
  {
    title: "Racing Elite",
    image: "https://images.unsplash.com/photo-1548438294-1ad5d5f4f063",
    rating: 4.7,
    genre: "Racing"
  },
  {
    title: "Fantasy Quest",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420",
    rating: 4.9,
    genre: "Adventure"
  }
];

const GRID_COLUMNS = 4;
const GRID_ROWS = 5;
const GAMES_PER_PAGE = GRID_COLUMNS * GRID_ROWS; // 固定为 20

export default function FeaturedGames() {
  const [currentPage, setCurrentPage] = useState(0);
  const [inputPage, setInputPage] = useState('1');
  const { t } = useLanguage();
  const totalPages = Math.ceil(games.length / GAMES_PER_PAGE);

  const handlePageInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputPage(e.target.value);
  };

  const handlePageSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const pageNum = parseInt(inputPage) - 1;
      if (pageNum >= 0 && pageNum < totalPages) {
        setCurrentPage(pageNum);
      } else {
        setInputPage((currentPage + 1).toString());
      }
    }
  };

  useEffect(() => {
    setInputPage((currentPage + 1).toString());
  }, [currentPage]);

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const categories = ['all', 'action', 'strategy', 'rpg', 'racing'];

  return (
    <section className="py-16 bg-white dark:bg-[#0F0F15] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#7D3CFF] to-[#00F3FF]">
            {t('featured')}
          </h2>
          <div className="flex space-x-4">
            {categories.map((category) => (
              <button
                key={category}
                className="text-gray-600 dark:text-gray-400 hover:text-[#00F3FF] transition-colors"
              >
                {t(`categories.${category}`)}
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
          {games
            .slice(currentPage * GAMES_PER_PAGE, (currentPage + 1) * GAMES_PER_PAGE)
            .map((game, index) => (
              <GameCard key={`${game.title}-${currentPage}-${index}`} {...game} />
            ))}
        </div>

        <div className="flex justify-center items-center space-x-4">
          <button
            onClick={prevPage}
            className="p-2 rounded-full bg-gray-100 dark:bg-[#1A1A24] text-gray-600 dark:text-gray-400 hover:text-[#00F3FF] transition-colors"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <div className="flex items-center bg-gray-100 dark:bg-[#1A1A24] rounded-full px-3 h-10">
            <input
              type="text"
              value={inputPage}
              onChange={handlePageInput}
              onKeyDown={handlePageSubmit}
              className="w-8 bg-transparent text-center text-gray-600 dark:text-gray-400 focus:outline-none"
            />
            <span className="text-gray-600 dark:text-gray-400">/</span>
            <span className="w-8 text-center text-gray-600 dark:text-gray-400">
              {totalPages}
            </span>
          </div>

          <button
            onClick={nextPage}
            className="p-2 rounded-full bg-gray-100 dark:bg-[#1A1A24] text-gray-600 dark:text-gray-400 hover:text-[#00F3FF] transition-colors"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      </div>
    </section>
  );
}