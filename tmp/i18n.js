"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.supportedLanguages = void 0;
var i18next_1 = __importDefault(require("i18next"));
var react_i18next_1 = require("react-i18next");
var i18next_browser_languagedetector_1 = __importDefault(require("i18next-browser-languagedetector"));
var i18next_http_backend_1 = __importDefault(require("i18next-http-backend"));
// 支持的语言列表
exports.supportedLanguages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'zh', name: '简体中文', flag: '🇨🇳' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'pt', name: 'Português', flag: '🇵🇹' },
    { code: 'it', name: 'Italiano', flag: '🇮🇹' },
    { code: 'ko', name: '한국어', flag: '🇰🇷' }
];
i18next_1.default
    // 加载翻译文件的模块
    .use(i18next_http_backend_1.default)
    // 自动检测用户语言
    .use(i18next_browser_languagedetector_1.default)
    // 将i18n实例传递给react-i18next
    .use(react_i18next_1.initReactI18next)
    // 初始化i18next
    .init({
    fallbackLng: 'en',
    debug: true, // 开启调试便于查看加载情况
    // 设置检测用户语言的选项
    detection: {
        order: ['localStorage', 'navigator'],
        lookupLocalStorage: 'gameverse-language',
        caches: ['localStorage'],
    },
    // 设置可用的语言
    supportedLngs: exports.supportedLanguages.map(function (lang) { return lang.code; }),
    // 设置翻译文件的路径
    backend: {
        loadPath: '/locales/{{lng}}/translation.json',
    },
    interpolation: {
        escapeValue: false, // 不转义React已经处理的值
    },
    react: {
        useSuspense: false, // 禁用Suspense以避免一些问题
    }
});
// 导出i18n实例以便在应用中使用
exports.default = i18next_1.default;
