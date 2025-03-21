#!/usr/bin/env node

// 手动部署脚本 (ES 模块版本)
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

console.log(`${colors.blue}开始手动部署到 GitHub Pages...${colors.reset}`);

try {
  // 1. 保存当前分支
  console.log(`${colors.yellow}1. 保存当前分支${colors.reset}`);
  const currentBranch = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
  console.log(`   当前分支: ${currentBranch}`);

  // 2. 确保 dist 目录存在
  console.log(`${colors.yellow}2. 检查 dist 目录${colors.reset}`);
  if (!fs.existsSync(path.join(process.cwd(), 'dist'))) {
    console.log(`${colors.red}   错误: dist 目录不存在，请先运行 npm run build${colors.reset}`);
    process.exit(1);
  }
  console.log(`   dist 目录存在，继续部署...`);

  // 3. 创建临时目录
  console.log(`${colors.yellow}3. 创建临时目录${colors.reset}`);
  const tempDir = path.join(process.cwd(), 'temp-deploy');
  if (fs.existsSync(tempDir)) {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
  fs.mkdirSync(tempDir);
  console.log(`   临时目录已创建: ${tempDir}`);

  // 4. 复制 dist 目录内容到临时目录
  console.log(`${colors.yellow}4. 复制 dist 目录内容到临时目录${colors.reset}`);
  execSync(`xcopy .\\dist\\* ${tempDir} /E /H /C /I`);
  console.log(`   dist 内容已复制到临时目录`);

  // 5. 初始化 Git 仓库
  console.log(`${colors.yellow}5. 初始化临时 Git 仓库${colors.reset}`);
  process.chdir(tempDir);
  execSync('git init');
  execSync('git config user.name "GitHub Pages Bot"');
  execSync('git config user.email "github-pages-bot@users.noreply.github.com"');
  console.log(`   Git 仓库已初始化`);

  // 6. 创建提交
  console.log(`${colors.yellow}6. 创建提交${colors.reset}`);
  execSync('git add .');
  execSync('git commit -m "Deploy to GitHub Pages"');
  console.log(`   提交已创建`);

  // 7. 切换到 gh-pages 分支
  console.log(`${colors.yellow}7. 推送到 gh-pages 分支${colors.reset}`);
  const remoteUrl = execSync('git config --get remote.origin.url', { cwd: process.cwd() }).toString().trim();
  
  // 设置 Git 配置以提高连接稳定性
  execSync('git config --global http.postBuffer 524288000');  // 增加缓冲区大小
  execSync('git config --global http.lowSpeedLimit 1000');    // 低速限制
  execSync('git config --global http.lowSpeedTime 60');       // 低速时间
  
  // 尝试推送，带有重试机制
  let pushSuccess = false;
  let attempts = 0;
  const maxAttempts = 3;
  
  while (!pushSuccess && attempts < maxAttempts) {
    attempts++;
    try {
      console.log(`   尝试推送到 gh-pages 分支 (尝试 ${attempts}/${maxAttempts})...`);
      execSync(`git push -f ${remoteUrl} HEAD:gh-pages`, { timeout: 120000 });  // 设置超时时间为120秒
      pushSuccess = true;
      console.log(`   推送成功!`);
    } catch (err) {
      console.log(`${colors.red}   推送失败: ${err.message}${colors.reset}`);
      if (attempts < maxAttempts) {
        console.log(`   等待 10 秒后重试...`);
        execSync('sleep 10 || ping -n 10 127.0.0.1 > nul');  // 适用于 Windows 和 Unix
      }
    }
  }
  
  if (!pushSuccess) {
    throw new Error('推送到 GitHub 失败，请检查网络连接或尝试使用代理');
  }

  // 8. 清理
  console.log(`${colors.yellow}8. 清理临时目录${colors.reset}`);
  process.chdir('..');
  fs.rmSync(tempDir, { recursive: true, force: true });
  console.log(`   临时目录已删除`);

  console.log(`${colors.green}部署成功!${colors.reset}`);
  console.log(`${colors.green}网站将在几分钟后可访问: https://962900862.github.io/comeplay/${colors.reset}`);
} catch (error) {
  console.error(`${colors.red}部署失败: ${error.message}${colors.reset}`);
  process.exit(1);
} 