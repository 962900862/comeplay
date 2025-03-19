import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { FileText, Shield } from 'lucide-react';

// 关于部分项目
const aboutItems = [
  {
    id: 'privacy-policy',
    name: 'Privacy Policy',
    nameZh: '隐私政策',
    icon: <FileText className="w-5 h-5" />,
    path: '/privacy-policy'
  },
  {
    id: 'terms-of-service',
    name: 'Terms of Service',
    nameZh: '服务条款',
    icon: <Shield className="w-5 h-5" />,
    path: '/terms-of-service'
  }
];

export default function AboutSidebar() {
  const { language } = useLanguage();

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
          <span className="text-white text-lg">ℹ️</span>
        </div>
        <h2 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#7D3CFF] to-[#00F3FF]">
          {language === 'en' ? 'About' : '关于'}
        </h2>
      </div>
      <nav className="p-4">
        <ul className="space-y-1.5">
          {aboutItems.map((item) => (
            <li key={item.id}>
              <Link
                to={item.path}
                className="flex items-center w-full px-4 py-2.5 rounded-xl transition-all duration-300 text-gray-700 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-white/5 hover:shadow-sm"
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-100/80 dark:bg-gray-800/50 text-[#7D3CFF] mr-3">
                  {item.icon}
                </div>
                <span>{language === 'en' ? item.name : item.nameZh}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
} 