addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const url = new URL(request.url);
  const path = url.pathname;
  
  // 识别浏览器类型
  const userAgent = request.headers.get('User-Agent') || '';
  const isEdge = userAgent.includes('Edg/') || userAgent.includes('Edge/');
  
  // 处理 CSS 文件，对 Edge 浏览器特别关注
  if (path.endsWith('.css')) {
    console.log('处理 CSS 文件:', path, '是否 Edge 浏览器:', isEdge);
    // 获取原始响应
    const originalResponse = await fetch(request);
    
    // 无论内容类型是什么，都强制设置为 text/css
    const originalContent = await originalResponse.arrayBuffer();
    const headers = new Headers(originalResponse.headers);
    
    // 设置多个必要的 MIME 相关头
    headers.set('Content-Type', 'text/css; charset=utf-8');
    headers.set('X-Content-Type-Options', 'nosniff');
    if (isEdge) {
      // Edge 浏览器可能需要额外的跨域支持
      headers.set('Access-Control-Allow-Origin', '*');
      headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
    }
    
    return new Response(originalContent, {
      status: 200,
      headers: headers
    });
  }
  
  // 处理 JavaScript 文件
  if (path.endsWith('.js')) {
    console.log('处理 JS 文件:', path, '是否 Edge 浏览器:', isEdge);
    // 获取原始响应
    const originalResponse = await fetch(request);
    
    // 无论内容类型是什么，都强制设置为 application/javascript
    const originalContent = await originalResponse.arrayBuffer();
    const headers = new Headers(originalResponse.headers);
    
    // 设置多个必要的 MIME 相关头
    headers.set('Content-Type', 'application/javascript; charset=utf-8');
    headers.set('X-Content-Type-Options', 'nosniff');
    if (isEdge) {
      // Edge 浏览器可能需要额外的跨域支持
      headers.set('Access-Control-Allow-Origin', '*');
      headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
    }
    
    return new Response(originalContent, {
      status: 200,
      headers: headers
    });
  }
  
  // 处理 HTML 文件 - 确保正确的 MIME 类型和编码
  if (path.endsWith('.html') || path === '/' || !path.includes('.')) {
    console.log('处理 HTML 请求:', path);
    const response = await fetch(request);
    
    // 确保正确的内容类型
    const headers = new Headers(response.headers);
    headers.set('Content-Type', 'text/html; charset=utf-8');
    headers.set('X-Content-Type-Options', 'nosniff');
    
    // 创建新响应
    return new Response(response.body, {
      status: response.status,
      headers: headers
    });
  }
  
  // 处理其他类型的请求
  return fetch(request);
} 