/**
 * Edge浏览器兼容性脚本
 * 
 * 这个脚本提供了针对Microsoft Edge浏览器的兼容性修复
 */

(function() {
  console.log('Edge兼容性脚本已加载');
  
  // 修复Edge中的一些已知问题
  
  // 修复可能的requestAnimationFrame问题
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function(callback) {
      return setTimeout(callback, 1000 / 60);
    };
  }
  
  // 修复可能的cancelAnimationFrame问题
  if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = function(id) {
      clearTimeout(id);
    };
  }
  
  // Edge有时不支持最新的Web API功能，在这里可以添加polyfills
  
  console.log('Edge兼容性修复已应用');
})(); 