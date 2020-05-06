// 任务类型枚举
export const taskTypeEnum = [
  {id: 1, value: 1, label: '!!!!', placeholder: '重要且紧急（尽快做）', color: '#FC6E51', backgroundColor: 'rgba(255, 0, 0, 0.1)'},
  {id: 2, value: 2, label: '!!!', placeholder: '重要但不紧急（计划时间做）', color: '#F6BB42', backgroundColor: 'rgba(255, 255, 0, 0.1)'},
  {id: 3, value: 3, label: '!!', placeholder: '不重要但紧急（授权别人做）', color: '#00bfff', backgroundColor: 'rgba(30, 144, 255, 0.1)'},
  {id: 4, value: 4, label: '!', placeholder: '不重要且不紧急（有时间再做）', color: '#BCC152', backgroundColor: 'rgba(0, 255, 0, 0.1)'}
]

// 重复类型枚举
export const repeatTypeEnum = [
  {id: 1, value: 1, label: '不重复'},
  {id: 2, value: 2, label: '每天'},
  {id: 3, value: 3, label: '每周'},
  {id: 4, value: 4, label: '每月'},
  {id: 5, value: 5, label: '每年'},
]

// 任务状态枚举
export const taskStatusEnum = [
  {id: 1, value: 1, label: '未执行'},
  {id: 2, value: 2, label: '已完成'},
  {id: 3, value: 3, label: '已过期'},
]