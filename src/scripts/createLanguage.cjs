const fs = require('fs');
const path = require('path');

// 本地化文件目录
const LOCALES_DIR = path.resolve(__dirname, '../locales');

// 创建新语言文件
const createLanguageFile = (langCode) => {
  try {
    // 检查语言代码有效性
    if (!langCode || langCode.length < 2) {
      console.error('请提供有效的语言代码（例如: es, fr, ja）');
      process.exit(1);
    }
    
    // 检查语言文件是否已存在
    const targetFilePath = path.join(LOCALES_DIR, `${langCode}.json`);
    if (fs.existsSync(targetFilePath)) {
      console.error(`语言文件 "${langCode}.json" 已经存在`);
      process.exit(1);
    }
    
    // 读取基准语言文件（使用中文作为基准）
    const baseFilePath = path.join(LOCALES_DIR, 'zh.json');
    const baseContent = JSON.parse(fs.readFileSync(baseFilePath, 'utf8'));
    
    // 写入新语言文件（内容与基准相同，等待翻译）
    fs.writeFileSync(
      targetFilePath, 
      JSON.stringify(baseContent, null, 2) + '\n', 
      'utf8'
    );
    
    console.log(`成功创建语言文件: ${langCode}.json`);
    
    // 提示更新索引文件
    console.log('\n别忘了在 src/locales/index.ts 文件中更新支持的语言列表:');
    console.log(`1. 导入新语言文件: import ${langCode} from './${langCode}.json';`);
    console.log('2. 添加到 SUPPORTED_LOCALES 数组');
    console.log(`3. 添加到 messages 对象: ${langCode},`);
    
  } catch (error) {
    console.error('创建语言文件时发生错误:', error);
    process.exit(1);
  }
};

// 获取命令行参数
const langCode = process.argv[2];
createLanguageFile(langCode); 