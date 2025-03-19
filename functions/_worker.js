export default {
  async fetch(request, env, ctx) {
    // 获取请求的 URL 和路径
    const url = new URL(request.url);
    const path = url.pathname;
    
    // 1. 首先尝试让 Cloudflare 提供请求的资源
    let response = await env.ASSETS.fetch(request);
    
    // 2. 检查资源类型，设置正确的 Content-Type
    if (path.endsWith('.js')) {
      // 读取原始响应内容
      const originalBody = await response.arrayBuffer();
      // 创建新的响应，复制原始响应的状态和头信息
      response = new Response(originalBody, {
        status: response.status,
        statusText: response.statusText,
        headers: response.headers
      });
      
      // 强制设置 JavaScript MIME 类型
      response.headers.set('Content-Type', 'application/javascript; charset=utf-8');
    } 
    else if (path.endsWith('.css')) {
      const originalBody = await response.arrayBuffer();
      response = new Response(originalBody, {
        status: response.status,
        statusText: response.statusText,
        headers: response.headers
      });
      
      // 强制设置 CSS MIME 类型
      response.headers.set('Content-Type', 'text/css; charset=utf-8');
    }
    else if (path === '/' || !path.includes('.') || path.endsWith('.html')) {
      // 对于根路径、无扩展名路径或 HTML 文件，返回 index.html
      const originalBody = await response.arrayBuffer();
      response = new Response(originalBody, {
        status: response.status,
        statusText: response.statusText,
        headers: response.headers
      });
      
      response.headers.set('Content-Type', 'text/html; charset=utf-8');
    }
    
    // 设置通用头信息
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('Access-Control-Allow-Origin', '*');
    
    return response;
  }
}; 