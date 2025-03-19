import en from './en.json';
import zh from './zh.json';
import es from './es.json';
import fr from './fr.json';
import ja from './ja.json';
import ru from './ru.json';
import de from './de.json';
import ar from './ar.json';
import pt from './pt.json';
import it from './it.json';
import ko from './ko.json';
import tr from './tr.json';
import hi from './hi.json';
import vi from './vi.json';
import th from './th.json';
import id from './id.json';
import uk from './uk.json';
// 这里要特殊处理，因为文件名包含连字符
import ptBR from './pt-BR.json';
import zhTW from './zh-TW.json';

// 定义语言包类型
export type LocaleMessages = {
  [key: string]: string | { [key: string]: string };
};

// 支持的语言列表
export const SUPPORTED_LOCALES = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'zh', name: '简体中文', flag: '🇨🇳' },
  { code: 'zh-TW', name: '繁體中文', flag: '🇹🇼' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'pt-BR', name: 'Português do Brasil', flag: '🇧🇷' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
  { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
  { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
  { code: 'th', name: 'ไทย', flag: '🇹🇭' },
  { code: 'id', name: 'Bahasa Indonesia', flag: '🇮🇩' },
  { code: 'uk', name: 'Українська', flag: '🇺🇦' }
];

// 导出所有语言包
export const messages: { [locale: string]: any } = {
  en,
  zh,
  'zh-TW': zhTW,
  es,
  fr,
  ja,
  ru,
  de,
  ar,
  pt,
  'pt-BR': ptBR,
  it,
  ko,
  tr,
  hi,
  vi,
  th,
  id,
  uk
};

// 根据浏览器语言获取最合适的语言代码
export function getBrowserLocale(ignoreStoredLocale = false): string {
  // 如果不忽略存储的语言设置，检查localStorage
  if (!ignoreStoredLocale) {
    const storedLocale = localStorage.getItem('gameverse-language');
    if (storedLocale) {
      return storedLocale;
    }
  }
  
  const browserLang = navigator.language || (navigator as any).userLanguage;
  
  // 首先尝试完全匹配
  const exactMatch = SUPPORTED_LOCALES.find(locale => locale.code === browserLang);
  if (exactMatch) {
    return exactMatch.code;
  }
  
  // 尝试匹配语言前缀
  const langPrefix = browserLang.split('-')[0];
  const prefixMatch = SUPPORTED_LOCALES.find(locale => locale.code === langPrefix);
  if (prefixMatch) {
    return prefixMatch.code;
  }
  
  // 默认返回英语
  return 'en';
}

// 获取当前语言的翻译
export function getLocaleMessages(locale: string): any {
  return messages[locale] || messages.en;
}

// 翻译缓存
const translationCache: Record<string, Record<string, string>> = {};

// 方便的翻译函数
export function translate(locale: string, key: string, fallback?: string): string {
  // 检查缓存
  if (translationCache[locale]?.[key]) {
    return translationCache[locale][key];
  }

  const keys = key.split('.');
  let result: any = messages[locale] || messages.en;
  
  for (const k of keys) {
    result = result?.[k];
    if (!result) break;
  }
  
  const translation = result || fallback || key;
  
  // 缓存结果
  if (!translationCache[locale]) {
    translationCache[locale] = {};
  }
  translationCache[locale][key] = translation;
  
  return translation;
} 