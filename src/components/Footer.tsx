import React from 'react';
import { Github, Twitter, Disc as Discord } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0F0F15] border-t border-[#7D3CFF]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-[#00F3FF] text-xl font-bold mb-4">GameVerse</h3>
            <p className="text-gray-400">{t('join')}</p>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">{t('quickLinks')}</h4>
            <ul className="space-y-2">
              {['games', 'about', 'blog', 'support'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-400 hover:text-[#00F3FF] transition-colors">
                    {t(link)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">{t('legal')}</h4>
            <ul className="space-y-2">
              {['termsOfService', 'privacyPolicy', 'cookiePolicy'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-400 hover:text-[#00F3FF] transition-colors">
                    {t(link)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">{t('connect')}</h4>
            <div className="flex space-x-4">
              {[Discord, Twitter, Github].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="text-gray-400 hover:text-[#00F3FF] transition-colors"
                >
                  <Icon className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>

        </div>
        
        <div className="mt-8 pt-8 border-t border-[#7D3CFF]/10">
          <p className="text-center text-gray-400">
            © {currentYear} GameVerse. {t('allRightsReserved')}.
          </p>
        </div>
      </div>
    </footer>
  );
}