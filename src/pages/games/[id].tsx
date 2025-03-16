import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function GamePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // 直接重定向到游戏HTML文件
    const gameUrl = `/games/${decodeURIComponent(id || '')}.html`;
    window.location.href = gameUrl;
  }, [id]);

  return null; // 这个组件不需要渲染任何内容，因为会直接重定向
} 