---
category: Components
type: Feedback
title: Modal
subtitle: 对话框
---

Modal 组件是一种简单的覆盖在其他视图之上显示内容的方式

### 注意:
- web端依赖 modal-enhanced-react-native-web
- native端依赖 react-native


## API

属性 | 说明 | 类型 | 默认值
----|-----|------|------

| type   | 弹出位置 | Enum[`center` `top` `bottom` `left` `right`] | 'center' |
| visible   | 是否显示  | boolean |  false  |
| onRequestClose   | 隐藏事件 | (e: Object): void | 必填  |

其他属性 参考：https://reactnative.cn/docs/modal/（不建议使用其他属性）
