# 部署指南

这个文档提供了多种部署项目的方法，以应对不同网络环境和场景。

## 标准部署 (通过 gh-pages)

最简单的部署方式，适用于网络环境良好的场景：

```bash
npm run deploy
```

这个命令会使用 gh-pages 库将构建好的 dist 目录发布到 GitHub Pages。

## 增强型手动部署 (带重试机制)

适用于网络连接不稳定的环境，带有重试和超时优化：

```bash
npm run manual-deploy
```

这个脚本通过 `deploy.mjs` 实现，提供了更好的错误处理和重试机制。

## GitHub Actions 部署 (推荐)

通过 GitHub Actions 进行部署，完全避免本地网络问题：

```bash
npm run github-actions-deploy
```

这个命令会推送代码到 main 分支，触发 GitHub Actions 工作流程自动部署。

你也可以直接在 GitHub 仓库页面手动触发部署：
1. 打开 Actions 标签页
2. 选择 "Deploy to GitHub Pages" 工作流
3. 点击 "Run workflow"

## 备用方案：Netlify 部署

如果 GitHub Pages 不可用或网络问题严重，可以尝试部署到 Netlify：

```bash
npm run netlify-deploy
```

首次使用需要安装 netlify-cli 并登录：
```bash
npm install netlify-cli -g
netlify login
```

## 本地或自定义服务器部署

将构建内容部署到本地或指定服务器目录：

```bash
# 部署到默认路径 (./deploy)
npm run local-deploy

# 部署到指定路径
npm run local-deploy -- C:/xampp/htdocs/comeplay
```

## 网络问题排查

如果在部署过程中遇到 GitHub 连接问题，可尝试以下解决方法：

1. **配置 Git 代理**：
   ```bash
   git config --global http.proxy http://127.0.0.1:7890
   ```
   (请替换为您的代理地址和端口)

2. **增加 Git 超时时间**：
   ```bash
   git config --global http.lowSpeedLimit 1000
   git config --global http.lowSpeedTime 60
   ```

3. **使用 SSH 代替 HTTPS**：
   ```bash
   git remote set-url origin git@github.com:962900862/comeplay.git
   ```

4. **使用 GitHub Actions 或 Netlify 方案**：这些方法不依赖本地网络连接到 GitHub。 