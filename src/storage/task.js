import storage from './index'

export const editTask = async ({id, ...resetProps}) => {
  const taskRes = await storage.get('taskList')
  if (taskRes && taskRes.length > 0) {
    let taskIndex = taskRes.findIndex(taskItem => taskItem.id === id)
    const keyProps = Object.keys(resetProps)
    const taskProps = ['name', 'taskType', 'repeatType', 'tags']
    if (
      !(
        [...new Set([...keyProps, ...taskProps])].length === taskProps.length &&
        taskIndex > 0
      )
    ) return false
    taskRes[taskIndex] = {
      ...taskRes[taskIndex],
      ...resetProps
    }
    storage.save('taskList', taskRes)
    return true
  }
}