import React, { createContext, useContext, useState, useEffect } from 'react';
import { SUPPORTED_LOCALES, getBrowserLocale, getLocaleMessages, translate } from '../locales';

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string, fallback?: string) => string;
  locales: typeof SUPPORTED_LOCALES;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // 从localStorage或浏览器语言中获取初始语言设置
  const [language, setLanguage] = useState(() => {
    // 检查是否首次访问
    const hasVisited = localStorage.getItem('gameverse-has-visited');
    const savedLanguage = localStorage.getItem('gameverse-language');
    
    // 如果是首次访问，根据浏览器语言自动设置，并记录访问标记
    if (!hasVisited) {
      const detectedLanguage = getBrowserLocale(true); // 传入true表示忽略localStorage中的值
      localStorage.setItem('gameverse-has-visited', 'true');
      localStorage.setItem('gameverse-language', detectedLanguage);
      return detectedLanguage;
    }
    
    // 非首次访问，优先使用用户已保存的语言设置
    return savedLanguage || 'en';
  });

  // 当语言变化时更新文档语言和方向
  useEffect(() => {
    document.documentElement.lang = language;
    
    // 如果是RTL语言（如阿拉伯语），设置文档方向
    if (language === 'ar') {
      document.documentElement.dir = 'rtl';
    } else {
      document.documentElement.dir = 'ltr';
    }
  }, [language]); // 添加language作为依赖项

  // 更新语言
  const handleLanguageChange = (lang: string) => {
    if (lang === language) return; // 如果语言相同，不做任何操作
    
    setLanguage(lang);
    localStorage.setItem('gameverse-language', lang);
  };

  // 翻译函数
  const t = (key: string, fallback?: string) => {
    return translate(language, key, fallback);
  };

  return (
    <LanguageContext.Provider 
      value={{ 
        language, 
        setLanguage: handleLanguageChange, 
        t,
        locales: SUPPORTED_LOCALES
      }}
    >
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