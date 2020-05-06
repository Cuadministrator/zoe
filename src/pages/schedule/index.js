import React, { useState, useRef, useEffect } from 'react'
import { View, Text, FlatList, Dimensions, TouchableOpacity, StyleSheet } from 'react-native'
import dayjs from 'dayjs'

// components
import { Icon } from '../../components'
import { SafeAreaView, useSafeArea } from 'react-native-safe-area-context'
import storage from '../../storage'
import { Agenda } from 'react-native-calendars'

// config
import { taskTypeEnum } from '../../common/config'

const RenderItem = ({
  label,
  taskData,
}) => {
  return (
    <View style={styles.taskRow}>
      <View style={styles.taskLabel}>
        <Text style={styles.taskLabelText}>{label}</Text>
      </View>
      <View style={styles.taskView}>
        {
          taskData && taskData.length > 0 &&
          taskData.map((taskItem, taskIndex) => {
            const taskTypeItem = taskTypeEnum.find(item => item.id === taskItem.taskType)
            return (
              <View
                key={`taskItem_${taskIndex}`}
                style={[
                  styles.taskItem,
                  {
                    borderLeftColor: taskTypeItem.color,
                    backgroundColor: taskTypeItem.backgroundColor
                  }
                ]}
              >
                <Text
                  numberOfLines={2}
                  ellipsizeMode='tail'
                  style={[
                    styles.taskItemText,
                    { color: taskTypeItem.color }
                  ]}
                >{taskItem.name}</Text>
              </View>
            )
          })
        }
      </View>
    </View>
  )
}

const ScheduleHome = ({navigation}) => {
  const safeArea = useSafeArea()
  // 选择的时间 默认当天
  const [date, setDate] = useState(dayjs())
  // 数据列表
  const [data, setData] = useState(null)

  // 初始化数据
  useEffect(() => {
    initData()
  }, [date])

  const initData = async () => {
    const res = await getScheduleHomeData(date)
    if (res) {
      setData(res)
    }
  }

  const getScheduleHomeData = async (date) => {
    const taskRes = await storage.get('taskList')
    const taskRecordRes = await storage.get('taskRecordList')
    let result = []
    let dateTime = dayjs(date)
    if (!(taskRes && taskRecordRes)) return console.warn(taskRes, taskRecordRes)
    // 任务数据和任务记录数据组合
    const taskRecordData = taskRecordRes.map(recordItem => {
      let item = {}
      const taskItem = taskRes.find(item => item.id === recordItem.taskId)
      if (taskItem) item = {...recordItem, ...taskItem}
      return item
    })
    // 任务数据记录 和 时间表组合
    for (let i = 0; i <= 24; i++) {
      const hourTime = dateTime.hour(i)
      const startTime = hourTime.minute(0).second(0)
      const endTime = hourTime.minute(59).second(59)
      let taskData = []
      taskRecordData.forEach(trItem => {
        if (
          dayjs(trItem.startTime).isSameOrAfter(startTime) &&
          dayjs(trItem.endTime).isBefore(endTime) &&
          !taskData.find(taskItem => taskItem.taskId === trItem.taskId)
        ) {
          taskData.push(trItem)
        }
      })
      const item = {
        id: i + 1,
        label: i === 24 ? '24:00' : hourTime.format('HH:00'),
        taskData
      }
      result.push(item)
    }
    return result
  }

  const onDayChange = value => {
    if (!value) return
    setDate(value.timestamp)
  }

  // 跳转任务完成页
  const goWatch = () => {
    navigation.push('ScheduleStopWatchScreen', { refresh: initData })
  }

  return (
    <View
      style={[
        styles.pageView,
        { paddingTop: safeArea.top }
      ]}
    >
      {/* 日历选择 */}
      <Agenda
        onDayPress={onDayChange}
      >
        {/* 时间表 */}
        <FlatList
          style={{flex: 1, paddingTop: 12}}
          data={data}
          renderItem={
            ({item, index}) => <RenderItem {...item} index={index} />
          }
        />
      </Agenda>
      {/* 跳转按钮 */}
      <View style={styles.footerView}>
        <TouchableOpacity
          style={styles.stackNavigatorBottom}
          onPress={goWatch}
        >
          <Icon
            name='clock'
            color='#999'
            size={56}
            style={{backgroundColor: '#fff', borderRadius: 28, overflow: 'hidden'}}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  pageView: {
    flex: 1,
    backgroundColor: '#fff'
  },
  footerView: {
    height: 30,
    backgroundColor: '#fff'
  },
  taskRow: {
    height: 48,
    flexDirection: 'row',
    // backgroundColor: 'blue'
  },
  taskLabel: {
    width: 56,
    alignItems: 'center',
    // justifyContent: 'center'
  },
  taskLabelText: {
    fontSize: 12,
    color: '#000',
    marginTop: -6
  },
  taskView: {
    flexDirection: 'row',
    flex: 1,
    height: '100%',
    borderTopColor: '#eee',
    borderTopWidth: 1
  },
  taskItem: {
    flex: 1,
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 14,
    borderLeftWidth: 1,
    borderLeftColor: '#00bfff',
    backgroundColor: 'rgba(30, 144, 255, 0.1)'
  },
  taskItemText: {
    fontSize: 12,
    color: '#00bfff',
    fontWeight: '600',
  },
  stackNavigatorBottom: {
    position: 'absolute',
    left: '50%',
    bottom: 0,
    transform: [{translateX: -28}],
    backgroundColor: '#f0f0f0',
    borderRadius: 30,
  }
})

export default ScheduleHome