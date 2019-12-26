---
category: Utils
type: Other
title: CountDown
subtitle: 倒计时
---
倒计时

- API

属性 | 说明 | 类型 | 默认值 | 是否必填
----|-----|------|------|-----
| navigator | react-navigation 的navigation对象 | object | 无 | true
| endDate | 结束时间 | string/number | 无 | true
| milliseconds | 重复执行或调用间隔时间（毫秒） | string/number | 1000 | true
| callBack | 重复执行或调用的回调方法 | string | 无 | true

#### 方法

方法签名 | 释义
:---|:---
`initTimer(String/Number endDate, Number milliseconds, function callBack)` | 初始化定时器

使用方法：
```$xslt
const timer = new CountDown({navigator})
timer.initTimer(endDate, milliseconds, callBack)
// 推荐直接使用constructor的方式初始化定时器, native端需要挂载 页面获取或丢失焦点 钩子
const timer = new CountDown({navigator, endDate, milliseconds, callBack})
```

方法签名 | 释义
:---|:---
`deleteTimer()` | 删除定时器

使用方法：
```$xslt
const timer = new CountDown({navigator, endDate, milliseconds, callBack})
timer.deleteTimer()
```

- 提示

1. native
在实例化 CountDown 后在 constructor 中监听 didFocus 和 didBlur，进入或离开页面 会 获得或丢失页面焦点，触发对应的函数。
具体实现是通过 react-navigation 提供的 获得或丢失页面焦点 的API实现离开页面后暂停倒计时，回到页面之后重新开启倒计时。

2. web
web需要在离开页面时在 componentWillUnmount 中手动停止倒计时。
