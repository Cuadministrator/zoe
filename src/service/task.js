import request from './index'
import dayjs from 'dayjs'

export const getAllTaskList = () => request({
  url: 'jobs',
  method: 'GET'
})

export const getAllTaskRecord = () => request({
  url: 'record',
  method: 'GET'
})

export const addTaskItem = ({userId, name, taskType, dateTime, repeatType, tags, status}) => request({
  url: 'jobs/add',
  method: 'POST',
  data: {
    jobs: {
      userId,
	    name,
	    taskType,
	    dateTime,
	    repeatType,
	    tags,
	    status
    }
  }
})

export const addTaskRecord = (timeList, taskIdList) => request({
  url: `record/updateFinished`,
  method: 'POST',
  data: {
    timeList,
    taskIdList
  }
})

export const resetTask = (taskId) => request({
  url: `record/cancelFinished`,
  method: 'POST',
  data: {
    taskId,
    time: dayjs().format('YYYY-MM-DD')
  }
})

export const updateTask = ({id, userId, name, taskType, dateTime, repeatType, tags, status}) => request({
  url: `jobs/update`,
  method: 'POST',
  data: {
    jobs: {
      id,
      userId,
      name,
      taskType,
      dateTime,
      repeatType,
      tags,
      status
    }
  }
})

export const searchTaskById = (id) => request({
  url: 'jobs/search',
  method: 'GET',
  params: {
    id
  }
})
