---
category: Components
type: Data Entry
title: QRCode
subtitle: 二维码
---

生成二维码

### 注意:
- web端依赖 https://github.com/zpao/qrcode.react
- native端依赖 https://www.npmjs.com/package/react-native-qrcode
- size 属性 一定不能加rem
- 使用时必须在外层添加 overflow 属性


## API

属性 | 说明 | 类型 | 默认值
----|-----|------|------

| value   | 二维码值 | string | 必填 |
| size   | 二维码大小  | Number（注意不能添加rem） |  128  |
| bgColor   | 背景色  | string | #000  |
| fgColor    | 字体颜色 | string |  #fff  |
