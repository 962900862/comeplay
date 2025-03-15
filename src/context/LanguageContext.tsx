import React, { createContext, useContext, useState } from 'react';

interface Translations {
  [key: string]: {
    [key: string]: string | {
      [key: string]: string;
    };
  };
}

const translations: Translations = {
  en: {
    featured: 'Featured Games',
    playNow: 'Play Now',
    search: 'Search games...',
    discover: 'Discover Your Next Gaming Adventure',
    join: 'Join millions of players worldwide',
    startPlaying: 'Start Playing',
    cyberLegends: 'Cyber Legends 2077',
    epicFantasy: 'Epic Fantasy Realm',
    speedMasters: 'Speed Masters',
    quickLinks: 'Quick Links',
    games: 'Games',
    about: 'About',
    blog: 'Blog',
    support: 'Support',
    legal: 'Legal',
    termsOfService: 'Terms of Service',
    privacyPolicy: 'Privacy Policy',
    cookiePolicy: 'Cookie Policy',
    connect: 'Connect',
    allRightsReserved: 'All rights reserved',
    categories: {
      all: 'All',
      action: 'Action',
      strategy: 'Strategy',
      rpg: 'RPG',
      racing: 'Racing'
    }
  },
  zh: {
    featured: '精选游戏',
    playNow: '立即开始',
    search: '搜索游戏...',
    discover: '发现你的下一个游戏冒险',
    join: '加入全球数百万玩家',
    startPlaying: '开始游戏',
    cyberLegends: '赛博传说 2077',
    epicFantasy: '史诗奇幻领域',
    speedMasters: '极速大师',
    quickLinks: '快速链接',
    games: '游戏',
    about: '关于我们',
    blog: '博客',
    support: '支持',
    legal: '法律条款',
    termsOfService: '服务条款',
    privacyPolicy: '隐私政策',
    cookiePolicy: 'Cookie 政策',
    connect: '关注我们',
    allRightsReserved: '版权所有',
    categories: {
      all: '全部',
      action: '动作',
      strategy: '策略',
      rpg: '角色扮演',
      racing: '竞速'
    }
  }
};

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState('en');

  const t = (key: string) => {
    const keys = key.split('.');
    let translation: any = translations[language];
    
    for (const k of keys) {
      translation = translation?.[k];
      if (!translation) break;
    }
    
    return translation || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}