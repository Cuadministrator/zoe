import React, { useState, useRef, useEffect } from 'react'
import { View, Text, FlatList, Dimensions, TouchableOpacity, StyleSheet } from 'react-native'
import dayjs from 'dayjs'

// components
import { Icon, Calendar } from '../../components'
import { SafeAreaView, useSafeArea } from 'react-native-safe-area-context'
import storage from '../../storage'

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

const ScheduleHome = () => {
  const safeArea = useSafeArea()
  const [data, setData] = useState(null)

  useEffect(() => {
    initData()
    return () => {
    }
  }, [])

  const initData = async () => {
    const res = await getScheduleHomeData(dayjs('2020-04-29 00:00:00'))
    setData(res)
  }

  const getScheduleHomeData = async (date) => {
    const taskRes = await storage.get('taskList')
    const taskRecordRes = await storage.get('taskRecordList')
    let result = []
    let dateTime = dayjs(date)
    if (!(taskRes && taskRecordRes)) return
    const taskRecordData = taskRecordRes.map(recordItem => {
      let item = {}
      const taskItem = taskRes.find(item => item.id === recordItem.taskId)
      if (taskItem) item = {...recordItem, ...taskItem}
      return item
    })
    for (let i = 0; i< 24; i++) {
      const hourTime = dateTime.hour(i)
      const startTime = hourTime.minute(0).second(0)
      const endTime = hourTime.minute(59).second(59)
      const item = {
        id: i + 1,
        label: hourTime.format('HH:00'),
        taskData: taskRecordData.filter(trItem => {
          if (
            dayjs(startTime).isSameOrAfter(trItem.startTime) &&
            dayjs(startTime).isBefore(trItem.endTime)
          ) {
            return trItem
          }
        })
      }
      result.push(item)
    }
    return result
  }

  return (
    <View
      style={[
        styles.pageView,
      ]}
    >
      <Calendar
        style={[
          styles.calendar,
          {
            top: safeArea.top,
            position: 'absolute',
            left: 0,
            right: 0,
            height: Dimensions.get('window').height,
            zIndex: 9
          }
        ]}
      >
        <FlatList
          style={{flex: 1, paddingTop: 12}}
          data={data}
          renderItem={
            ({item, index}) => <RenderItem {...item} index={index} />
          }
        />
      </Calendar>
      <TouchableOpacity
        style={styles.stackNavigatorBottom}
      >
        <Icon
          name='clock'
          color='#666'
          size={56}
        />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  pageView: {
    flex: 1,
    paddingBottom: 30
  },
  calendar: {
  },
  taskRow: {
    height: 48,
    flexDirection: 'row',
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