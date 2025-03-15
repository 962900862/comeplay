import React from 'react';

interface GamePlayerProps {
  gameUrl: string;
  title: string;
}

export default function GamePlayer({ gameUrl, title }: GamePlayerProps) {
  return (
    <div className="w-full min-h-screen bg-white dark:bg-[#0F0F15]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          {title}
        </h1>
        <div className="aspect-[16/9] w-full bg-gray-100 dark:bg-[#1A1A24] rounded-lg overflow-hidden">
          <iframe
            src={gameUrl}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
} 