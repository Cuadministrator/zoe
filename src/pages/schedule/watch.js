import React, { useState, useRef, useEffect, useCallback } from 'react'
import { View, Text, TouchableHighlight, StyleSheet, TouchableOpacity, FlatList, ScrollView, Dimensions } from 'react-native'
import { SafeAreaView, useSafeArea } from 'react-native-safe-area-context'
import dayjs from 'dayjs'
import storage from 'react-native-simple-store'

// components
import { Stopwatch } from 'react-native-stopwatch-timer'
import { Icon } from '../../components'
import TaskCompleteModal from './components/TaskCompleteModal'
import { Tip } from 'beeshell'

const ITEM_HEIGHT = 50
const ITEMS_HEIGHT = 150

const ScheduleWatch = ({
  route,
  navigation
}) => {
  const safeArea = useSafeArea()
  // ref
  const timeListRef = useRef(null)
  // 时间
  const [time, setTime] = useState(null)
  // 上一次时间
  const [proTime, setProTime] = useState(dayjs())
  // 时间记录列表
  const [timeList, setTimeList] = useState([])
  // 开始记时
  const [stopwatchStart, setStopwatchStart] = useState(false)
  // 重置记时
  const [stopwatchReset, setStopwatchReset] = useState(false)
  // 显示弹窗
  const [modalVisible, setModalVisible] = useState(false)

  // 根据是否开始记时来存储时间记录
  useEffect(() => {
    if (!time) return
    if (stopwatchStart) {
      // 记录上一次时间
      setProTime(dayjs())
    } else {
      // 记录本次时间段
      setTimeList(
        [
          ...timeList,
          {
            start: proTime,
            end: dayjs()
          }
        ]
      )
    }
  }, [stopwatchStart])

  // 列表过多触底滚动
  useEffect(() => {
    if (timeListRef.current) {
      timeListRef.current.scrollToEnd()
    }
  }, [timeList])

  // 开始记时
  const toggleStopwatch = () => {
    setStopwatchStart(!stopwatchStart)
    setStopwatchReset(false)
  }

  // 重置记时
  const resetStopwatch = () => {
    setStopwatchStart(false)
    setStopwatchReset(true)
    setTimeList([])
  }
  
  // 获取format后的时间
  const getFormattedTime = (time) => {
    setTime(time)
  }

  // 完成任务
  const taskComplete = async (taskList) => {
    // timeList taskList
    // 刷新上一个页面
    const { refresh } = route.params
    const taskRecordRes = await storage.get('taskRecordList')
    let index = taskRecordRes && taskRecordRes.length > 0
      ? taskRecordRes.length + 1
      : 1
    let result = []
    // 生成完成任务的记录
    timeList.forEach((timeItem, timeIndex) => {
      taskList.forEach((taskItem, taskIndex) => {
        result.push({
          id: index++,
          taskId: taskItem.id,
          startTime: formatTime(timeItem.start),
          endTime: formatTime(timeItem.endTime)
        })
      })
    })
    if (taskRecordRes && taskRecordRes.length > 0) {
      result = [...taskRecordRes, ...result]
    }
    storage.save('taskRecordList', result)
    // 重置时间表
    resetStopwatch()
    // 刷新上一个页面
    refresh && typeof refresh === 'function' && refresh()
    // 返回上一个页面
    navigation.goBack()
  }

  // 返回上一个页面
  const goSchedule = () => {
    navigation.goBack()
  }

  // 打开任务弹窗
  const openTaskCompleteModal = () => {
    if (!(timeList && timeList.length > 0)) return Tip.show('请先生成记录后再完成任务！')
    setModalVisible(true)
  }

  // 格式化时间数据
  const formatTime = value => dayjs(value).format('YYYY-MM-DD HH:mm:ss')

  return (
    <SafeAreaView
      style={{flex: 1}}
    >
      <ScrollView style={{flex: 1}}>
        <View style={[
          styles.pageView,
          { paddingBottom: 95 + safeArea.bottom }
        ]}>
          {/* 计时器组件 */}
          <Stopwatch
            laps
            msecs
            options={options}
            start={stopwatchStart}
            reset={stopwatchReset}
            getTime={getFormattedTime}
          />
          {/* 记时列表 */}
          <View style={styles.timeList}>
            <FlatList
              ref={timeListRef}
              data={timeList}
              getItemLayout={(data, index) => (
                {
                  length: ITEM_HEIGHT,
                  offset: ITEM_HEIGHT * index,
                  index
                }
              )}
              ListEmptyComponent={
                <View style={{height: ITEMS_HEIGHT, alignItems: 'center', justifyContent: 'center'}}>
                  <Text>点击开始后再次点击生成记录</Text>
                </View>
              }
              renderItem={
                ({item, index}) =>
                  <View
                    key={`timerItem_${index}`}
                    style={styles.timeItemView}
                  >
                    <Text style={styles.timeItemText}>记录{index}</Text>
                    <View>
                      <Text style={styles.timeItemText}>开始时间：{formatTime(item.start)}</Text>
                      <Text style={styles.timeItemText}>结束时间：{formatTime(item.end)}</Text>
                    </View>
                  </View>
              }
            />
          </View>
          {/* 操作按钮 */}
          <View style={styles.handleButtons}>
            <TouchableHighlight
              underlayColor='#e9e9e9'
              style={styles.handleButton}
              onPress={resetStopwatch}>
              <Text style={styles.handleButtonText}>Reset</Text>
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor='#e9e9e9'
              style={[
                styles.handleButton,
                {
                  backgroundColor: !stopwatchStart
                    ? 'rgba(0, 255, 0, 0.1)'
                    : 'rgba(255, 0, 0, 0.1)'
                }
              ]}
              onPress={toggleStopwatch}>
              <Text
                style={[
                  styles.handleButtonText,
                  { color: !stopwatchStart ? '#BCC152' : '#FC6E51' }
                ]}>{!stopwatchStart ? "Start" : "Stop"}</Text>
            </TouchableHighlight>
          </View>
      </View>
    </ScrollView>
    {/* 返回和打开完成任务弹窗按钮 */}
    <View
      style={[
        styles.footerView,
        { height: 65 + (safeArea.bottom || 16), }
      ]}
    >
      <TouchableOpacity
        style={[
          styles.stackNavigatorLeft,
          { bottom: safeArea.bottom || 16 }
        ]}
        onPress={goSchedule}
      >
        <Icon
          name='arrow-left'
          color='#999'
          size={36}
          style={{backgroundColor: '#fff'}}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.stackNavigatorBottom}
        onPress={openTaskCompleteModal}
      >
        <Icon
          name='check-circle'
          color={timeList.length > 0 ? '#F6BB42' : '#999'}
          size={56}
          style={{backgroundColor: '#fff', borderRadius: 28, overflow: 'hidden'}}
        />
      </TouchableOpacity>
    </View>
    {/* 完成任务弹窗 */}
    <TaskCompleteModal
      visible={modalVisible}
      onClose={() => setModalVisible(false)}
      onConfirm={taskComplete}
    />
  </SafeAreaView>
  )
}

const options = {
  container: {
    backgroundColor: '#fff',
    padding: 5,
    borderRadius: 5,
    width: 280,
    height: 280,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 140,
    borderWidth: 8,
    borderColor: '#e1e1e1'
  },
  text: {
    fontSize: 30,
    color: '#666',
  }
}

const styles = StyleSheet.create({
  pageView: {
    paddingVertical: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  handleButtons: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 20,
    paddingHorizontal: 80,
    justifyContent: 'center'
  },
  handleButton: {
    width: 100,
    height: 100,
    marginHorizontal: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    backgroundColor: '#e1e1e1',
    marginHorizontal: 40,
  },
  handleButtonText: {
    fontSize: 30,
    color: '#fff'
  },
  timeList: {
    width: '80%',
    height: ITEMS_HEIGHT,
    marginTop: 20,
    backgroundColor: '#fff',
    borderRadius: 8
  },
  timeItemView: {
    height: ITEM_HEIGHT,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  timeItemText: {
    fontSize: 14,
    color: '#222'
  },
  footerView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff'
  },
  stackNavigatorBottom: {
    position: 'absolute',
    left: '50%',
    top: -28,
    transform: [{translateX: -28}],
    backgroundColor: '#f0f0f0',
    borderRadius: 30,
  },
  stackNavigatorLeft: {
    position: 'absolute',
    left: 16,
  }
})

export default ScheduleWatch
