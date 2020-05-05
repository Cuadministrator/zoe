import storage from './index'
import dayjs from 'dayjs'

const STORAGE_KEY = 'taskList'

export const getTaskList = async ({userId}) => {
  let result = []
  const taskRes = await storage.get(STORAGE_KEY)
  if (taskRes && taskRes.length > 0) {
    taskRes.forEach(taskItem => {
      if (taskItem.status !== 3) {
        if (taskItem.userId === userId || !userId) {
          result.push(taskItem)
        }
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
  const res = await storage.push(STORAGE_KEY, taskParams)
  console.warn('addTask', res)
  return true
}

export const editTask = async ({id, ...resetProps}) => {
  const taskRes = await storage.get(STORAGE_KEY)
  if (taskRes && taskRes.length > 0) {
    let taskIndex = taskRes.findIndex(taskItem => taskItem.id === id)
    const keyProps = Object.keys(resetProps)
    const taskProps = ['name', 'taskType', 'repeatType', 'tags', 'dateTime']
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
    await storage.set(STORAGE_KEY, taskRes)
    return true
  }
  return false
}

export const completeTask = async ({id}) => {
  const taskRes = await storage.get(STORAGE_KEY)
  if (taskRes && taskRes.length > 0) {
    let taskIndex = taskRes.findIndex(taskItem => taskItem.id === id)
    if (taskIndex >= 0) {
      console.warn('status', taskRes[taskIndex].status)
      taskRes[taskIndex] = {
        ...taskRes[taskIndex],
        status: taskRes[taskIndex].status === 2 ? 1 : 2
      }
      await storage.set(STORAGE_KEY, taskRes)
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
      await storage.set(STORAGE_KEY, taskRes)
      return true
    }
  }
  return false
}