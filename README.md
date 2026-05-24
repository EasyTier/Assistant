# EasyTier Assistant

EasyTier 配置助手 —— 一个向导式的 EasyTier TOML 配置文件生成器。

## 功能

- 🧙 **向导模式**：分步引导，新手友好
- 🔧 **专家模式**：所有参数平铺展示，自由编辑
- 🖥️ **多平台**：支持 Linux / Windows / macOS 默认路径
- 🌐 **多语言**：中文 / English
- 📄 **TOML 预览与下载**：实时预览生成的配置，一键下载

## 使用

```bash
# 安装依赖
pnpm install

# 开发
pnpm dev

# 构建
pnpm build
```

构建产物输出到 `dist/` 目录，可直接部署到任意静态托管服务（Cloudflare Pages、Vercel、GitHub Pages 等）。

## 技术栈

- React 19 + TypeScript
- Vite
- Tailwind CSS
- i18next
- smol-toml

## License

MIT
