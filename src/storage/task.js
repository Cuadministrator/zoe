import storage from './index' // https://github.com/jasonmerino/react-native-simple-store/blob/master/docs/index.md
import dayjs from 'dayjs'

const STORAGE_KEY = 'taskList'
const STORAGE_RECORD_KEY = 'taskRecordList'

export const getTaskList = async ({userId}) => {
  let result = []
  const taskRes = await storage.get(STORAGE_KEY)
  if (taskRes && taskRes.length > 0) {
    taskRes.forEach(taskItem => {
      // 过滤失效项
      if (taskItem.status !== 3) {
        // 过滤非用户项
        if (taskItem.userId === userId || !taskItem.userId) {
          result.push(taskItem)
        }
      }
    })
  }
  result.sort((pre, next) => pre.status - next.status)
  return result
}

export const getTaskRecordList = async({userId}) => {
  let result = []
  const taskRes = await getTaskList({userId})
  const taskRecordRes = await storage.get(STORAGE_RECORD_KEY)
  if (
    taskRes && taskRes.length > 0 &&
    taskRecordRes && taskRecordRes.length > 0
  ) {
    taskRecordRes.forEach(trItem => {
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
  const res = await storage.push(STORAGE_KEY, taskParams)
  return true
}

export const editTask = async ({id, ...resetProps}) => {
  const taskRes = await storage.get(STORAGE_KEY)
  if (taskRes && taskRes.length > 0) {
    let taskIndex = taskRes.findIndex(taskItem => taskItem.id === id)
    const keyProps = Object.keys(resetProps)
    const taskProps = ['name', 'taskType', 'repeatType', 'tags', 'dateTime']
    // 数据校验
    if (
      !(
        [...new Set([...keyProps, ...taskProps])].length === taskProps.length &&
        taskIndex >= 0
      )
    ) return false
    taskRes[taskIndex] = {
      ...taskRes[taskIndex],
      name: resetProps['name'],
      taskType: resetProps['taskType'],
      repeatType: resetProps['repeatType'],
      tags: resetProps['tags'],
      dateTime: resetProps['dateTime']
    }
    // 数据存储
    await storage.save(STORAGE_KEY, taskRes)
    return true
  }
  return false
}

export const completeTask = async ({id}) => {
  const taskRes = await storage.get(STORAGE_KEY)
  if (taskRes && taskRes.length > 0) {
    let taskIndex = taskRes.findIndex(taskItem => taskItem.id === id)
    if (taskIndex >= 0) {
      // 修改数据状态
      taskRes[taskIndex] = {
        ...taskRes[taskIndex],
        status: taskRes[taskIndex].status === 2 ? 1 : 2
      }
      await storage.save(STORAGE_KEY, taskRes)
      return true
    }
  }
  return false
}

export const deleteTask = async ({id}) => {
  const taskRes = await storage.get(STORAGE_KEY)
  if (taskRes && taskRes.length > 0) {
    let taskIndex = taskRes.findIndex(taskItem => taskItem.id === id)
    if (taskIndex >= 0) {
      taskRes[taskIndex] = {
        ...taskRes[taskIndex],
        status: 3
      }
      await storage.save(STORAGE_KEY, taskRes)
      return true
    }
  }
  return false
}