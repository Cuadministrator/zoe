---
category: Components
type: Data Entry
title: Radio
subtitle: 单选框
---
单选框

## API

### Radio

属性 | 说明 | 类型 | 默认值
----|-----|------|------
| data    |   显示值、真实值  | Object{text, value, icon} |   无  |
| type    |   选中图标位置  | Enum['left', 'right']: String |   'right'  |
| isChecked    |   指定当前是否选中  | Boolean  | 无  |
| checkIcon    |   选择时的图片  | Object/File  | doneIcon  |
| unCheckIcon    |   未选中时的图片  | Object/File  | todoIcon  |
| onChange    | change 事件触发的回调函数 | (value: any, data: Object): void |   无  |

### RadioGroup

属性 | 说明 | 类型 | 默认值
----|-----|------|------
| col    | 列数(支持多列并排) | Enum[1, 2]:Number | 1 |
| value   |   根据 value 进行比较，判断是否选中  | Object/String |  无  |
| data    |   显示值、真实值  | Array[Object{text, value, icon}] |  无  |
| type    |   选中图标位置  | Enum['left', 'right']: String |  'right'  |
| checkIcon    |   选择时的图片  | Object/File  | doneIcon |
| unCheckIcon    |   未选中时的图片  | Object/File  | todoIcon |
| style    |   样式  | Object  |  无  |
| itemStyle   | radio 的样式 | Object | 无 |
| onChange    | change 事件触发的回调函数 | (value: any, data: Object): void |   无  |