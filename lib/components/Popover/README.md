---
category: Components
type: Layout
title: Popover
subtitle: 气泡
---

在点击控件或者某个区域后，浮出一个气泡菜单来做更多的操作。 如果设置了遮罩层，建议通过点击遮罩层的任一位置，进行退出。

## API

### Popover

属性 | 说明 | 类型 | 默认值 | 是否必填
----|-----|------|------ |------
| overlay   | 弹出层内容	 | Rract.Element / array | 无 | 必填 |
| children   | 子节点 | React.Element | 无 | 必填 |
| style | 组件View的样式 | object（样式） | 无 | 必填(固定主轴方向的长度) |
| onChange | 内部点击事件 | (item: {key, name, value}): void | 无 | 必填 |

### Popover.Item

属性 | 说明 | 类型 | 默认值 | 是否必填
----|-----|------|------ |-----
| key   | 组件的key值 | string | 无 | 是 |
| name  | 显示的文案 | string | 无 | 是 |
| value | 值 | any | 无 | 是 |
| icon  | 图片icon | object | 无 | 否 |
| itemViewStyle   | item 的 view 样式 | object(样式) | 无 | 否 |
| itemIconStyle   | 显示 icon 的 Image 样式 | object(样式) | 无 | 否 |
| itemTextStyle   | 显示 name 的Text的样式 | object(样式) | 无 | 否 |