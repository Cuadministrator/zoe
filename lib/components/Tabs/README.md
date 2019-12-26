---
category: Components
type: Layout
title: Tabs
subtitle: Tabs 标签页
---

用于让用户在不同的视图中进行切换。

标签数量，一般 2-5 个；其中，标签中的文案需要精简，一般 2-4 个字。

### 注意
type=default为支持一行、均分；type=scroll为支持一行、可滚动。


## API

属性 | 说明 | 类型 | 默认值
----|-----|------|------
| type   | type类型 | Enum['default', 'scroll'] | 'default'|
| tabs   | tab数据 | Array | []|
| page   | 当前选中 Index  | Number |   0   |
| onChange   | tab变化时触发  | (tab: Models.TabData, index: number) => void |      |

```javascript
const tabs = [
  { title: 'First Tab' },
  { title: 'Second Tab' },
  { title: 'Third Tab' },
]
```
