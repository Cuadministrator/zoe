import storage from './index' // https://github.com/jasonmerino/react-native-simple-store/blob/master/docs/index.md
import dayjs from 'dayjs'
// service
import {
  getAllTaskList,
  getAllTaskRecord,
  addTaskItem,
  addTaskRecord,
  updateTask,
  searchTaskById
} from '../service/task'


import { checkDecimal } from '../utils/func'

const STORAGE_KEY = 'taskList'
const STORAGE_RECORD_KEY = 'taskRecordList'

export const getTaskList = async ({userId}) => {
  let result = []
  // const taskRes = await storage.get(STORAGE_KEY)
  const taskRes = await getAllTaskList()
  if (taskRes && taskRes.data && taskRes.data.length > 0) {
    taskRes.data.forEach(taskItem => {
      // 过滤失效项
      if (taskItem.status !== 3) {
        // 过滤非用户项
        if (taskItem.userId === userId) { // || !taskItem.userId) {
          result.push(taskItem)
        }
      }
    })
  }
  result.sort((pre, next) => pre.status - next.status)
  return result
}

export const getTodayTaskList = async ({userId = null}) => {
  let result = []
  const taskRes = await getAllTaskList()
  // const taskRes = await storage.get(STORAGE_KEY)
  // const taskRecordRes = await storage.get(STORAGE_RECORD_KEY)
  const taskRecordRes = await getAllTaskRecord()
  const formatTime = value => dayjs(value).format('YYYY-MM-DD 00:00:00')
  if (taskRes && taskRes.data && taskRes.data.length > 0) {
    taskRes.data.forEach((taskItem, taskIndex) => {
      // 过滤失效项 非用户项
      if (taskItem.status === 3 || taskItem.userId !== userId) return console.warn('del', taskItem)
      taskRes.data[taskIndex].label = taskRes.data[taskIndex].name
      // 处理 finished 判断任务是否已经完成
      if (taskItem.repeatType === 1) {
        taskItem.finished = taskItem.status === 2
      } else {
        if (
          taskRecordRes &&
          taskRecordRes.data &&
          taskRecordRes.data.length > 0
        ) {
          const taskRecordResIndex = taskRecordRes.data.findIndex(
            trItem => (
              trItem.taskId === taskItem.id &&
              formatTime(trItem.startTime) === formatTime(dayjs())
            )
          )
          taskItem.finished = taskRecordResIndex >= 0
        }
      }
      // 是否添加
      const dateTime = taskItem.dateTime
      taskItem.tags = taskItem.tags && typeof taskItem.tags === 'string' && taskItem.tags.split('-')
      if (taskItem.repeatType === 1) { // 不重复任务
        if (
          formatTime(dateTime) === formatTime(dayjs())
        ) {
          taskItem.finished === taskItem.status === 2
          result.push(taskItem)
        }
      } else if (taskItem.repeatType === 2) { // 每天重复任务
        if (
          dayjs().diff(dayjs(taskItem.dateTime)) > 0
        ) {
          result.push(taskItem)
        }
      } else if (taskItem.repeatType === 3) { // 每周重复任务
        if (
          dayjs(dateTime).weekday() === dayjs().weekday()
        ) {
          result.push(taskItem)
        }
      } else if (taskItem.repeatType === 4) { // 每月重复任务
        const now = dayjs(formatTime(dayjs()))
        const create = dayjs(formatTime(dateTime))
        if (
          !checkDecimal(
            now.diff(create, 'month', true)
          )
        ) {
          result.push(taskItem)
        }
      } else if (taskItem.repeatType === 5) { // 每年重复任务
        const now = dayjs(formatTime(dayjs()))
        const create = dayjs(formatTime(dateTime))
        if (
          !checkDecimal(
            now.diff(create, 'year', true)
          )
        ) {
          result.push(taskItem)
        }
      }
    })
  }
  result.sort((pre, next) => pre.finished - next.finished)
  return result
}

export const getTaskRecordList = async({userId}) => {
  let result = []
  const taskRes = await getTaskList({userId})
  // const taskRecordRes = await storage.get(STORAGE_RECORD_KEY)
  const taskRecordRes = await getAllTaskRecord()
  if (
    taskRes && taskRes.length > 0 &&
    taskRecordRes && taskRecordRes.data && taskRecordRes.data.length > 0
  ) {
    let taskIds = []
    taskRecordRes.data.forEach(trItem => {
      const taskItem = taskRes.find(tItem => tItem.id === trItem.taskId)
      if (taskItem) {
        result.push(trItem)
      }
    })
  }
  return result
}

export const addTask = async (params) => {
  const taskRes = await storage.get(STORAGE_KEY)
  const keyProps = Object.keys(params)
  const taskProps = ['name', 'taskType', 'repeatType', 'tags', 'dateTime']
  const taskUserProps = ['name', 'taskType', 'repeatType', 'tags', 'dateTime', 'userId']
  // 数据校验
  if (
    !(
      [...new Set([...keyProps, ...taskProps])].length === taskProps.length ||
      [...new Set([...keyProps, ...taskUserProps])].length === taskUserProps.length
    )
  ) return false
  let taskParams = {
    ...params,
    id: (taskRes && taskRes.length) || 0,
    createDate: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    status: 1
  }
  // 添加数据
  // const res = await storage.push(STORAGE_KEY, taskParams)
  // 接口
  params.tags = params.tags.join('-')
  const res = await addTaskItem(params)
  return true
}

export const editTask = async ({id, ...resetProps}) => {
  // const taskRes = await storage.get(STORAGE_KEY)
  const taskRes = await getAllTaskList()
  if (taskRes && taskRes.data && taskRes.data.length > 0) {
    let taskIndex = taskRes.data.findIndex(taskItem => taskItem.id === id)
    const keyProps = Object.keys(resetProps)
    const taskProps = ['name', 'taskType', 'repeatType', 'tags', 'dateTime']
    // 数据校验
    if (
      !(
        [...new Set([...keyProps, ...taskProps])].length === taskProps.length &&
        taskIndex >= 0
      )
    ) return false
    taskRes.data[taskIndex] = {
      ...taskRes.data[taskIndex],
      name: resetProps['name'],
      taskType: resetProps['taskType'],
      repeatType: resetProps['repeatType'],
      tags: resetProps['tags'],
      dateTime: resetProps['dateTime']
    }
    // 数据存储
    // await storage.save(STORAGE_KEY, taskRes)
    // tags
    taskRes.data[taskIndex].tags = taskRes.data[taskIndex].tags.join('-')
    await updateTask(taskRes.data[taskIndex])
    return true
  }
  return false
}

export const completeTask = async ({taskIdList, timeList}) => {
  const res = await addTaskRecord(timeList, taskIdList)
  return res
}

// export const completeTask = async ({taskIdList, timeList}) => {
//   let result = [] // 生成任务记录
//   const formatTime = value => dayjs(value).format('YYYY-MM-DD HH:mm:ss')
//   const taskRes = await storage.get(STORAGE_KEY)
//   const taskRecordRes = await storage.get(STORAGE_RECORD_KEY)
//   // 如果无任务列表
//   if (!(taskRes && taskRes.length > 0)) return false
//   let index = taskRecordRes && taskRecordRes.length > 0
//       ? taskRecordRes.length + 1
//       : 1
//   // TODO: 暂时不写任务校验 默认都为taskRes中的任务
//   // 生成完成任务的记录
//   taskIdList.forEach((taskIdItem, taskIndex) => {
//     timeList.forEach((timeItem, timeIndex) => {
//       result.push({
//         id: index++,
//         taskId: taskIdItem,
//         startTime: formatTime(timeItem.start),
//         endTime: formatTime(timeItem.endTime)
//       })
//     })
//     const taskResIndex = taskRes.findIndex(trItem => trItem.id === taskIdItem)
//     // 无重复任务有完成态 
//     // 重复任务无完成态 通过今日是否添加记录判断是否完成。
//     if (
//       taskResIndex >= 0 &&
//       taskRes[taskResIndex] &&
//       taskRes[taskResIndex].repeatType === 1
//     ) {
//       taskRes[trIndex].status = 2
//     }
//   })
//   // 如果有任务记录
//   if (taskRecordRes && taskRecordRes.length > 0) {
//     result = [...taskRecordRes, ...result]
//   }
//   await storage.save(STORAGE_KEY, taskRes)
//   await storage.save(STORAGE_RECORD_KEY, result)
//   return true
// }

export const restoreTask = async({id}) => {
  let flag = false // 判断是否进行过修改
  const taskRes = await storage.get(STORAGE_KEY)
  const taskRecordRes = await storage.get(STORAGE_RECORD_KEY)
  const formatTime = value => dayjs(value).format('YYYY-MM-DD')
  const taskIndex = taskRes.findIndex(tItem => tItem.id === id)
  if (taskIndex === -1) return false
  if (
    taskRes[taskIndex] &&
    taskRes[taskIndex].repeatType === 1
  ) {
    taskRes[taskIndex].status = 1  
  } else {
    taskRecordRes.forEach((trItem, trIndex) => {
      if (
        trItem.taskId === id &&
        formatTime(trItem.startTime) === formatTime(dayjs())
      ) {
        flag = true // 进行过修改
        taskRecordRes.splice(trIndex, 1)
      }
    })
  }
  if (flag) {
    await storage.save(STORAGE_RECORD_KEY, taskRecordRes)
    return true
  }
  return false
}

export const deleteTask = async ({id}) => {
  // const taskRes = await storage.get(STORAGE_KEY)
  // if (taskRes && taskRes.length > 0) {
  //   let taskIndex = taskRes.findIndex(taskItem => taskItem.id === id)
  //   if (taskIndex >= 0) {
  //     taskRes[taskIndex] = {
  //       ...taskRes[taskIndex],
  //       status: 3
  //     }
  //     await storage.save(STORAGE_KEY, taskRes)
  //     return true
  //   }
  // }
  // return false
  const taskRes = await searchTaskById(id)
  if (taskRes && taskRes.success && taskRes.data && taskRes.data.length > 0) {
    const taskItem = taskRes.data[0]
    const res = await updateTask({...taskItem, status: 3} )
    return res
  }
}