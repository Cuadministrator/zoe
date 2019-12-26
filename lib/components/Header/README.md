---
category: Components
type: Layout
title: Header
subtitle: 顶部导航栏
---

适用于自定义顶部导航及全屏Modal时顶部返回键（内部处理ios状态栏）


## API

属性 | 说明 | 类型 | 默认值
----|-----|------|------
| visible   | 是否展示（处理小程序等特殊平台不展示导航） | boolean | true |
| showLeft   | 是否展示左侧返回按钮 | boolean | true |
| leftPress   | 左侧点击事件 | (e: Object): void | 无 |
| headerRight   | 右侧元素 | React.Element | 无 |
| children   | 子元素 | String/React.Element | 无 |
