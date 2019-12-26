---
category: Components
type: Data Display
title: Steps
subtitle: 步骤器
---

显示一个任务的进度；或者引导用户完成某个复杂任务。


### 注意:
- Steps children 只接受 Step组件作为子节点 或者 通过data数组传入对象数组

## API

### Steps

属性 | 说明 | 类型 | 默认值 | 是否必填
----|-----|------|------|------
| data   | 数据源 | Array | 无 | children/data 必填其一 |
| style   | 自定义样式  | Object |  无  | 否 |
| current   | 指定当前步骤，从 0 开始记数。  | Number |   无   | 否 |
| direction    | step 样式 |   Enum[vertical, horizontal]  | column | 否 |
| size    | 尺寸，支持设置小尺寸 |   Enum[normal, small]  | normal | 否 |
| children    | 只支持传入Step |   Step 组件(React.Element)  | 无 | children/data 必填其一 |

### Steps.Step

属性 | 说明 | 类型 | 默认值 | 是否必填
----|-----|------|------|------
| header   | 步骤的header | String/React.Element | 无 | 否 |
| title   | 标题  | String/React.Element |  无  | 必填 |
| description   | 描述 | String/React.Element |   无   | 否 |
| icon    | step 样式 | Object | 无 | 否 |
| status | 状态 | Enum['todo, doing', 'done'] | 无 | 否 |
| contentStyle | view 的样式 | Object | 无 | 否 |
