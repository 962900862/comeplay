module.exports = {
  // 基本路径
  publicPath: '/',
  
  // 输出目录
  outputDir: 'dist',
  
  // 开发服务器配置
  devServer: {
    // 添加 MIME 类型配置
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'text/html; charset=utf-8',
    },
    contentBase: './dist',
    historyApiFallback: true,
  },
  
  // 构建配置
  configureWebpack: {
    output: {
      filename: 'js/[name].[hash].js',
      chunkFilename: 'js/[name].[hash].js'
    }
  },
  
  // 添加 chain webpack 配置
  chainWebpack: config => {
    // 修改 CSS 资源的输出配置
    config.plugin('extract-css').tap(args => {
      args[0].filename = 'css/[name].[hash].css';
      args[0].chunkFilename = 'css/[name].[hash].css';
      return args;
    });
  }
} 