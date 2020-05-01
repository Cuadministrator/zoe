import store from 'react-native-simple-store'

export const checkStorages = [
  'userList', 'taskList', 'taskRecordList'
]

export const userListDefault = [
  {id: 1, name: '小华', phone: '18188881111', password: '123456', resignDate: '2020-04-26', pic: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588018407177&di=be2dc0bac343d615225a174d91e3650b&imgtype=0&src=http%3A%2F%2Fis1.mzstatic.com%2Fimage%2Fthumb%2FPurple122%2Fv4%2Faf%2Fb4%2F25%2Fafb425c6-6dc9-e263-c588-6a07c9c3e791%2Fsource%2F512x512bb.png', remark: ''},
  {id: 2, name: '小花', phone: '18188881112', password: '123456', resignDate: '2020-04-25', pic: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588018407177&di=be2dc0bac343d615225a174d91e3650b&imgtype=0&src=http%3A%2F%2Fis1.mzstatic.com%2Fimage%2Fthumb%2FPurple122%2Fv4%2Faf%2Fb4%2F25%2Fafb425c6-6dc9-e263-c588-6a07c9c3e791%2Fsource%2F512x512bb.png', remark: ''},
  {id: 3, name: '小王', phone: '18188881113', password: '123456', resignDate: '2020-04-24', pic: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588018407177&di=be2dc0bac343d615225a174d91e3650b&imgtype=0&src=http%3A%2F%2Fis1.mzstatic.com%2Fimage%2Fthumb%2FPurple122%2Fv4%2Faf%2Fb4%2F25%2Fafb425c6-6dc9-e263-c588-6a07c9c3e791%2Fsource%2F512x512bb.png', remark: ''},
  {id: 4, name: '小糖', phone: '18188881114', password: '123456', resignDate: '2020-04-23', pic: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588018407177&di=be2dc0bac343d615225a174d91e3650b&imgtype=0&src=http%3A%2F%2Fis1.mzstatic.com%2Fimage%2Fthumb%2FPurple122%2Fv4%2Faf%2Fb4%2F25%2Fafb425c6-6dc9-e263-c588-6a07c9c3e791%2Fsource%2F512x512bb.png', remark: ''},
  {id: 5, name: '小谭', phone: '18188881115', password: '123456', resignDate: '2020-04-22', pic: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588018407177&di=be2dc0bac343d615225a174d91e3650b&imgtype=0&src=http%3A%2F%2Fis1.mzstatic.com%2Fimage%2Fthumb%2FPurple122%2Fv4%2Faf%2Fb4%2F25%2Fafb425c6-6dc9-e263-c588-6a07c9c3e791%2Fsource%2F512x512bb.png', remark: ''},
  {id: 6, name: '小单', phone: '18188881116', password: '123456', resignDate: '2020-04-21', pic: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588018407177&di=be2dc0bac343d615225a174d91e3650b&imgtype=0&src=http%3A%2F%2Fis1.mzstatic.com%2Fimage%2Fthumb%2FPurple122%2Fv4%2Faf%2Fb4%2F25%2Fafb425c6-6dc9-e263-c588-6a07c9c3e791%2Fsource%2F512x512bb.png', remark: ''},
  {id: 7, name: '小鸟', phone: '18188881117', password: '123456', resignDate: '2020-04-20', pic: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588018407177&di=be2dc0bac343d615225a174d91e3650b&imgtype=0&src=http%3A%2F%2Fis1.mzstatic.com%2Fimage%2Fthumb%2FPurple122%2Fv4%2Faf%2Fb4%2F25%2Fafb425c6-6dc9-e263-c588-6a07c9c3e791%2Fsource%2F512x512bb.png', remark: ''},
  {id: 8, name: '小A', phone: '18188881118', password: '123456', resignDate: '2020-04-19', pic: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588018407177&di=be2dc0bac343d615225a174d91e3650b&imgtype=0&src=http%3A%2F%2Fis1.mzstatic.com%2Fimage%2Fthumb%2FPurple122%2Fv4%2Faf%2Fb4%2F25%2Fafb425c6-6dc9-e263-c588-6a07c9c3e791%2Fsource%2F512x512bb.png', remark: ''},
  {id: 9, name: '小小', phone: '18188881119', password: '123456', resignDate: '2020-04-18', pic: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588018407177&di=be2dc0bac343d615225a174d91e3650b&imgtype=0&src=http%3A%2F%2Fis1.mzstatic.com%2Fimage%2Fthumb%2FPurple122%2Fv4%2Faf%2Fb4%2F25%2Fafb425c6-6dc9-e263-c588-6a07c9c3e791%2Fsource%2F512x512bb.png', remark: ''},
]

export const taskListDefault = [
  {id: 1, name: '我是第一个任务', userId: 1, taskType: 1, repeatType: 1, date: '2020-04-26', status: 1},
  {id: 2, name: '我是第二个任务', userId: 1, taskType: 2, repeatType: 2, date: '2020-04-25', status: 2},
  {id: 3, name: '我是第三个任务', userId: 1, taskType: 3, repeatType: 3, date: '2020-04-24', status: 3},
  {id: 4, name: '我是第四个任务', userId: 1, taskType: 4, repeatType: 1, date: '2020-04-23', status: 1},
  {id: 5, name: '我是第五个任务', userId: 1, taskType: 1, repeatType: 2, date: '2020-04-22', status: 2},
  {id: 6, name: '我是第六个任务', userId: 1, taskType: 2, repeatType: 3, date: '2020-04-21', status: 3}
]

export const taskRecordListDefault = [
  {id: 1, taskId: 1, startTime: '2020-04-29 07:00', endTime: '2020-04-29 08:00'},
  {id: 2, taskId: 1, startTime: '2020-04-29 12:00', endTime: '2020-04-29 13:00'},
  {id: 3, taskId: 2, startTime: '2020-04-29 12:00', endTime: '2020-04-29 16:00'},
  {id: 4, taskId: 2, startTime: '2020-04-29 16:00', endTime: '2020-04-29 17:00'},
  {id: 5, taskId: 2, startTime: '2020-04-29 18:00', endTime: '2020-04-29 18:30'},
  {id: 6, taskId: 2, startTime: '2020-04-29 20:00', endTime: '2020-04-29 21:00'},
]

const dataDefault = {
  userListDefault,
  taskListDefault,
  taskRecordListDefault
}

export default dataDefault