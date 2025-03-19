module.exports = {
  // 提取源文件中的中文文案
  extract: {
    // 源码位置
    input: ['src/**/*.{ts,tsx}'],
    // 排除的文件
    exclude: ['node_modules', 'src/locales'],
    // 输出语言包的位置
    output: 'src/locales',
    // 语言包的模块类型
    moduleType: 'es6',
    // 是否提取带注释
    extractComments: true,
    // 是否提取该注释之前的中文，默认 true
    commentParsing: true,
    // 是否跳过汉字检查，默认 false
    skipChineseCheck: false,
    // 是否使用简短路径
    shortPath: false,
    // 使用的前缀，默认为 ''
    prefix: '',
    // 自定义前缀处理
    prefixFunc: ({ file }) => file.name,
    // 是否使用prettier格式化输出文件
    prettier: {
      // 是否格式化输出文件
      enable: true,
      // prettier配置项
      config: {
        printWidth: 100,
        tabWidth: 2,
        trailingComma: 'all',
        parser: 'typescript'
      }
    }
  },
  // 翻译相关配置
  translate: {
    // 翻译的语言包
    input: 'src/locales/zh.json',
    // 输出的语言包目录
    output: 'src/locales',
    // 是否匹配已翻译的文案
    matchAlreadyTranslated: false,
    // 翻译源语言
    from: 'zh',
    // 目标语言
    to: [
      'en',
      'ja',
      'ko',
      'fr',
      'es',
      'pt',
      'de',
      'ru',
      'ar',
      'tr'
    ],
    // 翻译服务配置
    translator: 'baidu', // 可选：google、baidu、youdao
    // 请在执行翻译命令前，设置对应翻译服务的环境变量
    // 百度翻译服务的APP ID和密钥
    // 请在运行翻译命令前设置以下环境变量：
    // BAIDU_APP_ID、BAIDU_APP_KEY
    // 或者直接在这里填写
    // baidu: {
    //   appid: process.env.BAIDU_APP_ID,
    //   key: process.env.BAIDU_APP_KEY
    // }
  },
  // 导入导出功能配置
  import: {
    // 导入的Excel文件地址
    input: './i18n-messages.xlsx',
    // 导出的目录
    output: 'src/locales'
  },
  export: {
    // 待导出的语言包目录
    input: 'src/locales',
    // 导出的文件地址
    output: './i18n-messages.xlsx'
  }
}; 