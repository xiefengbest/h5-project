# 历史归档

本目录存放**与 `pages/` 重复或已废弃**的 HTML 及旧资源，不参与日常开发。确认无用后可整目录删除：

```bash
rm -rf 历史
```

---

## 清单

### `dist/`（旧扁平结构备份）

早期 deploy 产物（`news-index.html`、`anyselected.html` 等旧文件名），已废弃。现行源码在 `pages/`，根目录 `dist/` 由 `scripts/deploy.sh` 按相同结构复制生成。

### `deprecated/`（1 个 HTML）

| 文件 | 说明 |
|------|------|
| `news-tailwind.html` | Tailwind UI 稿，已废弃 |

> **负一屏 v1** 现行源码：`pages/minus-one/news-list.html`

### `backup/`（5 个 HTML）

`index.html` 的历史快照，功能已并入 `pages/wallpaper/index.html`。

### `design/`（3 个 HTML）

早期独立设计稿（详情 / 预览 / 推荐），已合并进壁纸 App 主文件。

### `design-assets/`（设计切图，非 HTML）

早期设计稿截图与切图资源。

### `misc/`（非 HTML）

误放入仓库的无关安装脚本，与本项目无关。

---

## 当前有效页面（在 `pages/`）

```
pages/wallpaper/index.html
pages/wallpaper/short-dramas.html
pages/minus-one/news-list.html
pages/minus-one/discover.html
pages/minus-one/discover-skeleton.html
pages/web-anyselected/index.html
```
