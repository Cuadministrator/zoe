---
category: Components
type: Data Display
title: Collapse
subtitle: 折叠面板
---

可以折叠/展开的内容区域。

## API

#### Collapse

属性 | 说明 | 类型 | 默认值 | 是否必填
----|-----|------|------| -----
| children   | 子节点 | React Element (Panel 组件) | 必填 | true
| style   | 折叠面板样式 | Object | 无 | false

#### Panel

属性 | 说明 | 类型 | 默认值 | 是否必填
----|-----|------|------| -----
| showArrow   | 是否显示箭头 | Boolean | false | false
| arrowPosition   | 箭头的位置（只支持左右） | Enum['left', 'right'] | left | false
| header   | 标题 | React Element/String | 无 | true
| headerViewStyle   | 标题View样式 | Object | 无 | false
| headerTextStyle   | 标题Text样式 | Object | 无 | false
| children   | 子节点 | React Element/String | 无 | false
| childrenViewStyle   | 子节点 view 的样式 | Object | 无 | false
| childrenTextStyle   | 当 children 传入字符串时 Text 样式 | Object | 无 | false
| active   | Panel 是否能够产生交互 | Boolean | 无 | false

## 提示

Collapse 只能传入 Panel 作为 Children