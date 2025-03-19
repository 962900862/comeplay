#!/usr/bin/env node

/**
 * 备用部署脚本 - 使用 Netlify 作为GitHub Pages的替代方案
 * 
 * 安装依赖:
 * npm install netlify-cli -g
 * 
 * 首次使用需要登录:
 * netlify login
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

// 获取当前文件目录
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 颜色输出
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  blue: '\x1b[34m'
};

console.log(`${colors.blue}开始备用部署到 Netlify...${colors.reset}`);

try {
  // 1. 确保dist目录存在
  console.log(`${colors.yellow}1. 检查 dist 目录${colors.reset}`);
  if (!fs.existsSync(path.join(process.cwd(), 'dist'))) {
    console.log(`${colors.yellow}   dist目录不存在，开始构建项目...${colors.reset}`);
    execSync('npm run build', { stdio: 'inherit' });
  } else {
    console.log(`   dist目录已存在，继续部署`);
  }

  // 2. 使用netlify-cli部署
  console.log(`${colors.yellow}2. 部署到Netlify${colors.reset}`);
  console.log(`   检查是否安装netlify-cli...`);
  
  try {
    execSync('netlify --version', { stdio: 'ignore' });
    console.log(`   netlify-cli已安装`);
  } catch (e) {
    console.log(`${colors.yellow}   netlify-cli未安装，正在安装...${colors.reset}`);
    execSync('npm install netlify-cli -g', { stdio: 'inherit' });
  }

  // 3. 部署到Netlify
  console.log(`${colors.yellow}3. 上传并部署网站${colors.reset}`);
  console.log(`   开始部署...`);
  execSync('netlify deploy --dir=dist --prod', { stdio: 'inherit' });

  console.log(`${colors.green}部署成功!${colors.reset}`);
  console.log(`${colors.green}您的网站已成功部署到Netlify${colors.reset}`);
  
} catch (error) {
  console.error(`${colors.red}部署失败: ${error.message}${colors.reset}`);
  process.exit(1);
} 