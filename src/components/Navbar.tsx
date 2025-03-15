import React from 'react';
import { Search, User, Globe, Moon, Sun, Gamepad2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();

  return (
    <nav className="fixed top-0 w-full bg-white/90 dark:bg-[#0F0F15]/90 backdrop-blur-lg z-50 border-b border-[#00F3FF]/10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Gamepad2 className="h-6 w-6 text-[#7D3CFF]" />
            <div className="text-transparent bg-clip-text bg-gradient-to-r from-[#7D3CFF] to-[#00F3FF] text-2xl font-bold">
              GameVerse
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <div className="relative">
              <input
                type="text"
                placeholder={t('search')}
                className="bg-gray-100 dark:bg-[#1A1A24] text-gray-900 dark:text-white pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00F3FF]/50 transition-colors duration-300"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400 h-5 w-5" />
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative group">
                <button className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-[#00F3FF] transition-colors">
                  <Globe className="h-5 w-5" />
                  <span>{language === 'en' ? '🇺🇸 EN' : '🇨🇳 中文'}</span>
                </button>
                <div className="absolute top-full right-0 mt-2 w-32 bg-white dark:bg-[#1A1A24] rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <button
                    onClick={() => setLanguage('en')}
                    className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-[#2A2A34] text-gray-700 dark:text-gray-300"
                  >
                    🇺🇸 English
                  </button>
                  <button
                    onClick={() => setLanguage('zh')}
                    className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-[#2A2A34] text-gray-700 dark:text-gray-300"
                  >
                    🇨🇳 简体中文
                  </button>
                </div>
              </div>

              <button
                onClick={toggleTheme}
                className="text-gray-700 dark:text-gray-300 hover:text-[#00F3FF] transition-colors"
              >
                {theme === 'dark' ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </button>

              <button className="text-gray-700 dark:text-gray-300 hover:text-[#00F3FF] transition-colors">
                <User className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}