const fs = require('fs');
const path = require('path');

// 语言文件目录
const localesDir = path.join(__dirname, '../locales');

// 读取目录下的所有JSON文件
const localeFiles = fs.readdirSync(localesDir)
  .filter(file => file.endsWith('.json'));

console.log(`发现 ${localeFiles.length} 个语言文件`);

// 游戏分类键
const gameCategories = [
  'all', 'action', 'adventure', 'strategy', 'rpg', 'racing',
  'puzzle', 'sports', 'multiplayer', 'fighting', 'anime',
  'casual', 'shooting', 'simulation', 'horror', 'arcade',
  '2d', '3d', 'fantasy'
];

// 更新每个语言文件
localeFiles.forEach(file => {
  const filePath = path.join(localesDir, file);
  
  try {
    // 读取现有翻译
    const content = fs.readFileSync(filePath, 'utf8');
    const json = JSON.parse(content);
    
    // 确保有 gameCategories 键
    if (!json.gameCategories) {
      // 根据语言自动生成标题翻译
      const language = path.basename(file, '.json');
      let categoriesTitle = "Game Categories";
      
      // 为一些常见语言提供默认翻译
      switch (language) {
        case 'zh':
        case 'zh-TW':
          categoriesTitle = "游戏分类";
          break;
        case 'es':
          categoriesTitle = "Categorías de Juegos";
          break;
        case 'fr':
          categoriesTitle = "Catégories de Jeux";
          break;
        case 'de':
          categoriesTitle = "Spielkategorien";
          break;
        case 'ja':
          categoriesTitle = "ゲームカテゴリ";
          break;
        case 'ru':
          categoriesTitle = "Категории игр";
          break;
        case 'pt':
        case 'pt-BR':
          categoriesTitle = "Categorias de Jogos";
          break;
        case 'it':
          categoriesTitle = "Categorie di Giochi";
          break;
        case 'ko':
          categoriesTitle = "게임 카테고리";
          break;
        case 'ar':
          categoriesTitle = "فئات الألعاب";
          break;
        // 其他语言可以继续添加
      }
      
      json.gameCategories = categoriesTitle;
    }
    
    // 确保有 categories 对象
    if (!json.categories) {
      json.categories = {};
    }
    
    // 确保所有游戏分类都存在
    let hasUpdates = false;
    gameCategories.forEach(category => {
      if (!json.categories[category]) {
        hasUpdates = true;
        
        // 如果没有翻译，使用英文文件中的翻译作为默认值
        const englishFile = path.join(localesDir, 'en.json');
        const englishContent = fs.readFileSync(englishFile, 'utf8');
        const englishJson = JSON.parse(englishContent);
        
        json.categories[category] = englishJson.categories[category] || category;
      }
    });
    
    if (hasUpdates) {
      // 将更新后的内容写回文件
      fs.writeFileSync(filePath, JSON.stringify(json, null, 2));
      console.log(`已更新 ${file}`);
    }
  } catch (error) {
    console.error(`处理 ${file} 时出错:`, error);
  }
});

console.log('所有语言文件更新完成！'); 