---
category: Components
type: Others
title: ResultPage
subtitle: 结果页
---

展示结果页。
之后可以支持自定义图片及样式


## API

属性 | 说明 | 类型 | 默认值
----|-----|------|------

| type   | 类型，可选值为`loading`、`no`、`404`、`408`、`500` | string | `500`|
| image   | 图片 | img | |
| text   | 文案 有则代替默认文案 | string | |
| children   | 出现在文案下方的元素 | JSX.Ele | |
| style   | 样式 | object（样式） | 无 |
| textStyle   | 文案样式 | object（样式） | 无 |
