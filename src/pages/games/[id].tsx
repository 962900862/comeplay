import { useParams, useNavigate } from 'react-router-dom';
import GamePlayer from '../../components/GamePlayer';
import { useEffect, useState } from 'react';

export default function GamePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 检查游戏文件是否存在
    fetch(`/games/${decodeURIComponent(id || '')}.html`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Game not found');
        }
        setIsLoading(false);
      })
      .catch(() => {
        navigate('/'); // 如果游戏不存在，返回首页
      });
  }, [id, navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // 根据路由参数获取对应的游戏信息
  const gameInfo = {
    title: decodeURIComponent(id || ''),
    gameUrl: `/games/${decodeURIComponent(id || '')}.html`
  };

  return <GamePlayer {...gameInfo} />;
} 