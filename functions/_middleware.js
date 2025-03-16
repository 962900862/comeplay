export async function onRequest(context) {
  // 获取请求的 URL 路径
  const url = new URL(context.request.url);
  const path = url.pathname;
  
  // 处理 JavaScript 文件
  if (path.endsWith('.js')) {
    const response = await context.next();
    const newResponse = new Response(response.body, response);
    newResponse.headers.set('Content-Type', 'application/javascript; charset=utf-8');
    return newResponse;
  }
  
  // 处理 CSS 文件
  if (path.endsWith('.css')) {
    const response = await context.next();
    const newResponse = new Response(response.body, response);
    newResponse.headers.set('Content-Type', 'text/css; charset=utf-8');
    return newResponse;
  }
  
  // 处理 HTML 文件或目录路径
  if (path.endsWith('.html') || path === '/' || !path.includes('.')) {
    const response = await context.next();
    const newResponse = new Response(response.body, response);
    newResponse.headers.set('Content-Type', 'text/html; charset=utf-8');
    return newResponse;
  }
  
  // 继续处理其他请求
  return context.next();
} 