# AnyWP 锁屏杂志 H5 原型

**产品经理 / 设计用高保真原型**，演示 TCL 锁屏杂志相关界面与跳转关系。纯静态 HTML，无构建工具，**本地打开即可预览，无需部署上线**。

---

## 目录结构

```
pages/                          ← 手机 App 原型（390px）
├── wallpaper/
├── minus-one/
└── web-anyselected/

pages-pad/                      ← Pad App 原型（1280px，与 pages/ 平级）
├── wallpaper/
├── minus-one/
└── web-anyselected/
```

| 模块 | 手机（`pages/`） | Pad（`pages-pad/`） |
|------|------------------|---------------------|
| 壁纸 App | `wallpaper/index.html` | `wallpaper/index.html` |
| 详情页短剧入口 | `wallpaper/short-dramas.html` | `wallpaper/short-dramas.html` |
| 负一屏 v1 | `minus-one/news.html` | `minus-one/news.html` |
| 负一屏 v2 | `minus-one/discover.html` | `minus-one/discover.html` |
| 资讯网站 | `web-anyselected/index.html` | `web-anyselected/index.html` |

---

## 本地预览

**手机版（390px 居中）：**

```bash
open pages/wallpaper/index.html
open pages/minus-one/news.html
open pages/minus-one/discover.html
open pages/web-anyselected/index.html
open pages/wallpaper/short-dramas.html
```

**Pad 版（1280px 居中，对应独立 Pad App 原型）：**

```bash
open pages-pad/wallpaper/index.html
open pages-pad/minus-one/discover.html
open pages-pad/minus-one/news.html
open pages-pad/web-anyselected/index.html
open pages-pad/wallpaper/short-dramas.html
```

桌面预览：手机 **390px**、Pad **1280px** 居中；保存后刷新即可。

---

## 可选：复制到 dist/

若需打包发给他人，可运行（结构与 `pages/` 完全一致，链接无需改写）：

```bash
bash scripts/deploy.sh
```

日常开发直接改 `pages/` 即可，`dist/` 可随时重新生成。

---

## 文档

| 文档 | 用途 |
|------|------|
| [docs/pad-壁纸横竖屏内容策略.md](docs/pad-壁纸横竖屏内容策略.md) | Pad 壁纸横竖屏内容 / feed / 入库策略 |
| [docs/页面跳转关系图.md](docs/页面跳转关系图.md) | 跳转关系 |
| [docs/项目文档.md](docs/项目文档.md) | 设计规范 |
| [docs/h5-README.md](docs/h5-README.md) | web-anyselected 导读 |
| [历史/](历史/README.md) | 旧备份与废弃稿 |
