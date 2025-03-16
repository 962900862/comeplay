export async function onRequest(context) {
  // 获取请求的 URL 路径
  const url = new URL(context.request.url);
  const path = url.pathname;
  
  // 继续处理请求
  const response = await context.next();
  
  // 根据文件扩展名设置正确的 Content-Type
  if (path.endsWith('.css')) {
    response.headers.set('Content-Type', 'text/css');
  } else if (path.endsWith('.js')) {
    response.headers.set('Content-Type', 'application/javascript');
  } else if (path.endsWith('.mjs')) {
    response.headers.set('Content-Type', 'application/javascript');
  } else if (path.endsWith('.html')) {
    response.headers.set('Content-Type', 'text/html');
  } else if (path.endsWith('.svg')) {
    response.headers.set('Content-Type', 'image/svg+xml');
  } else if (path.endsWith('.jpg') || path.endsWith('.jpeg')) {
    response.headers.set('Content-Type', 'image/jpeg');
  } else if (path.endsWith('.png')) {
    response.headers.set('Content-Type', 'image/png');
  } else if (path.endsWith('.gif')) {
    response.headers.set('Content-Type', 'image/gif');
  } else if (path.endsWith('.woff')) {
    response.headers.set('Content-Type', 'font/woff');
  } else if (path.endsWith('.woff2')) {
    response.headers.set('Content-Type', 'font/woff2');
  } else if (path.endsWith('.ttf')) {
    response.headers.set('Content-Type', 'font/ttf');
  } else if (path.endsWith('.json')) {
    response.headers.set('Content-Type', 'application/json');
  }
  
  // 添加 CORS 头
  response.headers.set('Access-Control-Allow-Origin', '*');
  
  return response;
} 