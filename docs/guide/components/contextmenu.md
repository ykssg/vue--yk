---
sider_text="右键菜单 ContextMenu"
---
:::

# ContextMenu 右键菜单

自定义网页右键菜单组件。将组件放入某个盒子内，右键该盒子区域即弹出自定义菜单（替代浏览器默认右键菜单），菜单显示在鼠标位置，点击菜单内容或点击其它区域自动关闭。通过默认插槽传入菜单内容，`backgroundimage` / `backgroundcolor` 设置菜单背景。

::: warning ⚠️ 免责声明
本组件为纯 UI 展示组件，不涉及任何外部数据接口。二次开发中若添加数据请求，请自行配置鉴权与加密，相关责任与本组件开发者无关。
:::

## 基本用法

将组件放入一个「有尺寸的盒子」（父盒子建议设置 `position: relative` 与宽高），右键该盒子区域弹出菜单。

<div class="group">
  <div class="ctx-box">
    <span class="ctx-hint">在此区域右键</span>
    <yk-context-menu>
      <div class="ctx-item">复制</div>
      <div class="ctx-item">粘贴</div>
      <div class="ctx-item">删除</div>
    </yk-context-menu>
  </div>
</div>

::: details Show Code

```vue
<template>
  <div class="box">
    <yk-context-menu>
      <div>复制</div>
      <div>粘贴</div>
      <div>删除</div>
    </yk-context-menu>
  </div>
</template>

<style>
.box {
  position: relative;
  width: 300px;
  height: 180px;
}
</style>
```

:::

## 自定义背景

通过 `backgroundcolor` 设置背景色，或 `backgroundimage` 设置背景图。

<div class="group">
  <div class="ctx-box">
    <span class="ctx-hint">背景色菜单</span>
    <yk-context-menu backgroundcolor="#f0f9ff">
      <div class="ctx-item">选项 A</div>
      <div class="ctx-item">选项 B</div>
    </yk-context-menu>
  </div>

  <div class="ctx-box">
    <span class="ctx-hint">背景图菜单</span>
    <yk-context-menu backgroundimage="linear-gradient(135deg, #667eea, #764ba2)">
      <div class="ctx-item ctx-item--light">选项 A</div>
      <div class="ctx-item ctx-item--light">选项 B</div>
    </yk-context-menu>
  </div>
</div>

::: details Show Code

```vue
<template>
  <yk-context-menu backgroundcolor="#f0f9ff">
    <div>选项 A</div>
    <div>选项 B</div>
  </yk-context-menu>

  <yk-context-menu backgroundimage="linear-gradient(135deg, #667eea, #764ba2)">
    <div>选项 A</div>
    <div>选项 B</div>
  </yk-context-menu>
</template>
```

:::

## API

### Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `backgroundimage` | `string` | `''` | 背景图（CSS 值，如 `url('...')` 或渐变） |
| `backgroundcolor` | `string` | `'#ffffff'` | 背景色 |

### Slots

| 插槽 | 说明 |
| --- | --- |
| 默认 | 菜单内容（自定义列表或内容） |

### Events

| 事件名 | 参数 | 说明 |
| --- | --- | --- |
| `open` | `-` | 菜单打开时触发 |
| `close` | `-` | 菜单关闭时触发 |

### ContextMenuProps 类型

```ts
interface ContextMenuProps {
  backgroundimage?: string   // 背景图（CSS 值，如 url('...') 或渐变）
  backgroundcolor?: string   // 背景色
}
```

<style>
.ctx-box {
  position: relative;
  width: 300px;
  height: 180px;
  background: #f5f7fa;
  border: 1px dashed #dcdfe6;
  border-radius: 8px;
}
.ctx-hint {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #909399;
  font-size: 14px;
  pointer-events: none;
}
.ctx-item {
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 14px;
  color: #303133;
  cursor: pointer;
}
.ctx-item:hover {
  background: #f5f7fa;
}
.ctx-item--light {
  color: #ffffff;
}
.ctx-item--light:hover {
  background: rgba(255, 255, 255, 0.2);
}
</style>
