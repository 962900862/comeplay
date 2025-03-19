#!/usr/bin/env node

/**
 * 本地部署脚本 - 将构建内容复制到指定文件夹或服务器目录
 * 
 * 使用方法:
 * npm run local-deploy -- [目标路径]
 * 
 * 例如:
 * npm run local-deploy -- C:/xampp/htdocs/comeplay
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

// 获取目标目录，默认为当前目录下的deploy文件夹
const targetDir = process.argv[2] || path.join(process.cwd(), 'deploy');

console.log(`${colors.blue}开始本地部署到: ${targetDir}${colors.reset}`);

try {
  // 1. 确保dist目录存在
  console.log(`${colors.yellow}1. 检查 dist 目录${colors.reset}`);
  if (!fs.existsSync(path.join(process.cwd(), 'dist'))) {
    console.log(`${colors.yellow}   dist目录不存在，开始构建项目...${colors.reset}`);
    execSync('npm run build', { stdio: 'inherit' });
  } else {
    console.log(`   dist目录已存在，继续部署`);
  }

  // 2. 确保目标目录存在
  console.log(`${colors.yellow}2. 准备目标目录${colors.reset}`);
  if (!fs.existsSync(targetDir)) {
    console.log(`   目标目录不存在，创建目录: ${targetDir}`);
    fs.mkdirSync(targetDir, { recursive: true });
  } else {
    console.log(`   清空目标目录...`);
    // 保留.git目录
    const files = fs.readdirSync(targetDir);
    for (const file of files) {
      if (file !== '.git') {
        const filePath = path.join(targetDir, file);
        if (fs.lstatSync(filePath).isDirectory()) {
          fs.rmSync(filePath, { recursive: true, force: true });
        } else {
          fs.unlinkSync(filePath);
        }
      }
    }
  }

  // 3. 复制dist内容到目标目录
  console.log(`${colors.yellow}3. 复制文件${colors.reset}`);
  
  // Windows和Unix系统的兼容处理
  if (process.platform === 'win32') {
    execSync(`xcopy .\\dist\\* "${targetDir}" /E /H /C /I /Y`, { stdio: 'inherit' });
  } else {
    execSync(`cp -R ./dist/* "${targetDir}"`, { stdio: 'inherit' });
  }

  console.log(`${colors.green}部署成功!${colors.reset}`);
  console.log(`${colors.green}网站已部署到: ${targetDir}${colors.reset}`);
  
} catch (error) {
  console.error(`${colors.red}部署失败: ${error.message}${colors.reset}`);
  process.exit(1);
} 