---
category: Components
type: Data Entry
title: Button
subtitle: 按钮
---

点击后会触发一个操作。

### 注意:
- btnViewStyle 使用 `absolute` 定位时 必须将 `active` 设置为 `false`，否则ios手机定位出现问题


## API

属性 | 说明 | 类型 | 默认值
----|-----|------|------

| size   | 按钮大小，可选值为`large`、`small` | string | `large`|
| disabled   | 设置禁用  | boolean |    false  |
| active   | 点击反馈样式  | boolean |    true  |
| onPress    | 点击按钮的点击回调函数 | (e: Object): void |   无  |
| btnViewStyle    | 自定义样式 |   Object  | 无 |
| btnTextStyle    | 自定义样式 |   Object  | 无 |
| disabledViewStyle    | 自定义样式 |   Object  | 无 |
| disabledTextStyle    | 自定义样式 |   Object  | 无 |
| inline    | 是否设置为行内按钮, 使用该属性 建议将父元素设置为row布局  | boolean |   true  |
| loading 还未支持	   | 设置按钮载入状态	  | boolean	 | false |
| type    | 按钮类型，可选值为`primary`或者不设  |   string   |   -  |
