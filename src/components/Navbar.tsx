import React, { useState } from 'react';
import { Search, User, Globe, Moon, Sun, Gamepad2, X, ChevronDown } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { useSearch } from '../context/SearchContext';
import { Link } from 'react-router-dom';

// 支持的语言列表
const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'zh', name: '简体中文', flag: '🇨🇳' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'pt-BR', name: 'Português do Brasil', flag: '🇧🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
  { code: 'th', name: 'ไทย', flag: '🇹🇭' },
  { code: 'bn', name: 'বাংলা', flag: '🇧🇩' },
  { code: 'id', name: 'Bahasa Indonesia', flag: '🇮🇩' },
  { code: 'zh-TW', name: '繁體中文', flag: '🇹🇼' },
  { code: 'uk', name: 'Українська', flag: '🇺🇦' }
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const { searchTerm, setSearchTerm, setIsSearching } = useSearch();
  const [isFocused, setIsFocused] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const langMenuRef = React.useRef<HTMLDivElement>(null);

  // 点击外部关闭语言菜单
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setIsLangMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setIsSearching(value.trim().length > 0);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setIsSearching(false);
  };

  // 获取当前语言信息
  const currentLang = languages.find(lang => lang.code === language) || languages[0];
  
  const toggleLangMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLangMenuOpen(prev => !prev);
  };

  return (
    <nav className="fixed top-0 w-full bg-white/90 dark:bg-[#0F0F15]/90 backdrop-blur-lg z-50 border-b border-[#00F3FF]/10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Gamepad2 className="h-6 w-6 text-[#7D3CFF]" />
            <div className="text-transparent bg-clip-text bg-gradient-to-r from-[#7D3CFF] to-[#00F3FF] text-2xl font-bold">
              GameVerse
            </div>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <div className={`relative ${isFocused ? 'w-64 transition-all duration-300' : 'w-48'}`}>
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder={t('search')}
                className="w-full bg-gray-100 dark:bg-[#1A1A24] text-gray-900 dark:text-white pl-10 pr-10 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00F3FF]/50 transition-colors duration-300"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400 h-5 w-5" />
              {searchTerm && (
                <button 
                  onClick={clearSearch}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
            
            <div className="flex items-center space-x-4">
              {/* 语言选择器 */}
              <div className="relative" ref={langMenuRef}>
                <button 
                  onClick={toggleLangMenu}
                  className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-[#00F3FF] transition-colors px-3 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800/40 focus:outline-none"
                >
                  <Globe className="h-5 w-5 mr-1" />
                  <span>{currentLang.flag} {currentLang.name}</span>
                  <ChevronDown className="h-4 w-4 ml-1 transition-transform duration-200" 
                    style={{ transform: isLangMenuOpen ? 'rotate(180deg)' : 'rotate(0)' }}
                  />
                </button>
                
                {isLangMenuOpen && (
                  <div className="absolute top-full right-0 mt-2 w-56 bg-white dark:bg-[#1A1A24] rounded-lg shadow-lg z-50 border border-gray-200 dark:border-gray-800 max-h-[70vh] overflow-y-auto custom-scrollbar grid grid-cols-2 p-2 gap-1">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setLanguage(lang.code);
                          setIsLangMenuOpen(false);
                        }}
                        className={`px-3 py-2 text-left hover:bg-[#7D3CFF]/10 rounded-md flex items-center ${
                          language === lang.code
                            ? 'bg-[#7D3CFF]/10 text-[#7D3CFF] font-medium'
                            : 'text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        <span className="mr-2">{lang.flag}</span>
                        <span className="truncate">{lang.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={toggleTheme}
                className="text-gray-700 dark:text-gray-300 hover:text-[#00F3FF] transition-colors p-2 hover:bg-gray-100 dark:hover:bg-gray-800/40 rounded-lg"
              >
                {theme === 'dark' ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}