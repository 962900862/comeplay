import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function GamePage() {
  const { id } = useParams();
  const [gameUrl, setGameUrl] = useState('');

  useEffect(() => {
    if (id) {
      // 构建游戏URL
      const baseUrl = import.meta.env.BASE_URL || '/';
      const url = `${baseUrl}games/${decodeURIComponent(id)}.html`;
      setGameUrl(url);
    }
  }, [id]);

  return (
    <div className="container mx-auto px-4 py-8 pt-20">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white">
        {id ? decodeURIComponent(id) : '游戏'} 
      </h1>
      
      {gameUrl && (
        <div className="aspect-[16/9] w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <iframe
            src={gameUrl}
            className="w-full h-full border-0"
            title={`${id} 游戏界面`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
} 