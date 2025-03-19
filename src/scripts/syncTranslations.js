import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current file's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 本地化文件目录
const LOCALES_DIR = path.resolve(__dirname, '../locales');

// 获取基准语言文件（通常是主要开发语言）
const getBaseLanguage = () => {
  const baseFile = path.join(LOCALES_DIR, 'zh.json');
  return JSON.parse(fs.readFileSync(baseFile, 'utf8'));
};

// 获取当前所有语言文件
const getLanguageFiles = () => {
  return fs.readdirSync(LOCALES_DIR)
    .filter(file => file.endsWith('.json'))
    .map(file => ({
      code: file.replace('.json', ''),
      path: path.join(LOCALES_DIR, file)
    }));
};

// 递归合并键，保留目标值，但确保所有键都存在
const mergeMissingKeys = (base, target, keyPath = '') => {
  const result = { ...target };
  
  Object.keys(base).forEach(key => {
    const currentKeyPath = keyPath ? `${keyPath}.${key}` : key;
    
    // 如果键不存在于目标中，添加它
    if (!(key in target)) {
      result[key] = base[key];
      console.log(`添加缺失的键: ${currentKeyPath}`);
      return;
    }
    
    // 如果两者都是对象，递归合并
    if (
      typeof base[key] === 'object' && 
      base[key] !== null &&
      typeof target[key] === 'object' && 
      target[key] !== null
    ) {
      result[key] = mergeMissingKeys(base[key], target[key], currentKeyPath);
    }
    // 保留目标值，即使类型不同（这允许各种语言有不同的格式）
  });
  
  return result;
};

// 主函数
const syncTranslations = () => {
  try {
    // 获取基准语言
    const baseLanguage = getBaseLanguage();
    
    // 获取所有语言文件
    const languageFiles = getLanguageFiles();
    
    // 为每个语言文件同步键
    languageFiles.forEach(({ code, path: filePath }) => {
      if (code === 'zh') return; // 跳过基准语言
      
      console.log(`正在处理: ${code}`);
      
      // 读取当前语言文件
      const currentLang = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      
      // 合并缺失的键
      const merged = mergeMissingKeys(baseLanguage, currentLang);
      
      // 写回文件，保持格式一致
      fs.writeFileSync(
        filePath, 
        JSON.stringify(merged, null, 2) + '\n', 
        'utf8'
      );
      
      console.log(`完成: ${code}`);
    });
    
    console.log('所有语言文件同步完成！');
  } catch (error) {
    console.error('同步过程中发生错误:', error);
  }
};

// 执行同步
syncTranslations(); 