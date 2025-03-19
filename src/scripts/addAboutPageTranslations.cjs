const fs = require('fs');
const path = require('path');

// 语言文件目录
const LOCALES_DIR = path.resolve(__dirname, '../locales');

// 获取英文翻译文件作为基准
const getEnglishTranslations = () => {
  const enFile = path.join(LOCALES_DIR, 'en.json');
  return JSON.parse(fs.readFileSync(enFile, 'utf8'));
};

// 主函数
const addAboutPageTranslations = () => {
  try {
    // 获取英文翻译文件
    const enTranslations = getEnglishTranslations();
    const aboutPageTranslations = enTranslations.aboutPage;
    
    if (!aboutPageTranslations) {
      console.error('在英文翻译文件中未找到 aboutPage 部分');
      return;
    }

    // 获取所有语言文件
    const languageFiles = fs.readdirSync(LOCALES_DIR)
      .filter(file => file.endsWith('.json') && file !== 'en.json' && file !== 'zh.json' && file !== 'es.json')
      .map(file => ({
        code: file.replace('.json', ''),
        path: path.join(LOCALES_DIR, file)
      }));

    // 为每个语言文件添加 aboutPage 部分
    languageFiles.forEach(({ code, path: filePath }) => {
      console.log(`正在处理: ${code}`);
      
      // 读取当前语言文件
      const currentLang = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      
      // 如果还没有 aboutPage 部分，则添加
      if (!currentLang.aboutPage) {
        // 创建一个新对象，包括所有现有的键和新的 aboutPage 部分
        const updatedLang = {
          ...currentLang,
          aboutPage: aboutPageTranslations
        };
        
        // 写回文件，保持格式一致
        fs.writeFileSync(
          filePath, 
          JSON.stringify(updatedLang, null, 2) + '\n', 
          'utf8'
        );
        
        console.log(`完成: ${code} - 已添加 aboutPage 部分`);
      } else {
        console.log(`跳过: ${code} - 已存在 aboutPage 部分`);
      }
    });
    
    console.log('所有语言文件处理完成！');
    console.log('注意: 这些是英文默认值，建议手动翻译每个语言文件中的 aboutPage 部分。');
  } catch (error) {
    console.error('处理过程中发生错误:', error);
  }
};

// 执行
addAboutPageTranslations(); 