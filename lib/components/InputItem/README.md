---
category: Components
type: Data Entry
title: InputItem
subtitle: 输入框
---

带有左侧标题的用于接受输入文本。

### 注意:
- value onChangeText 必传（一定是受控组件）


## API

属性 | 说明 | 类型 | 默认值
----|-----|------|------
| value   | 值 | string | 必传|
| onChangeText   | 文本框内容变化时调用此回调函数。改变后的文字内容会作为参数传递  | function |    必传  |
| placeholder   | 如果没有任何文字输入，会显示此字符串  | string |      |
| inputItemStyle    | 自定义样式 |   Object  | 无 |
| textInputStyle    | 自定义样式 |   Object  | 无 |
| children    | 左侧文案 |   string/React.Element  | 无 |
| titleStyle    | 左侧自定义样式 |   Object  | 无 |

更多属性请参考： https://reactnative.cn/docs/textinput/#docsNav
