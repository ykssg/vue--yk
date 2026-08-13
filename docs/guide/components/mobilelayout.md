---
sider_text="移动端布局 MobileLayout"
---
:::

# MobileLayout 移动端布局

上下两段式移动端布局：上方内容区占 90%，下方导航区占 10%，导航区顶部带 1px 边框。

## 基本用法

默认插槽为内容区，`footer` 插槽为底部导航区。

```vue
<template>
  <yk-mobile-layout>
    <div>内容区（90%）</div>
    <template #footer>
      <div>导航区（10%）</div>
    </template>
  </yk-mobile-layout>
</template>
```

## API

### Slots

| 插槽 | 说明 |
| --- | --- |
| 默认 | 上方内容区，占 90%，内容溢出可滚动 |
| `footer` | 下方导航区，占 10%，顶部带 1px 边框 |
