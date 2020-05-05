import React, { useState, useRef, useEffect, useCallback } from 'react'
import { View, Text, TouchableHighlight, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
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
  const timeListRef = useRef(null)
  const [time, setTime] = useState(null)
  const [proTime, setProTime] = useState(dayjs())
  const [timeList, setTimeList] = useState([])
  const [stopwatchStart, setStopwatchStart] = useState(false)
  const [stopwatchReset, setStopwatchReset] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)

  useEffect(() => {
    if (!time) return
    if (stopwatchStart) {
      setProTime(dayjs())
    } else {
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

  useEffect(() => {
    if (timeListRef.current) {
      timeListRef.current.scrollToEnd()
    }
  }, [timeList])

  const toggleStopwatch = () => {
    setStopwatchStart(!stopwatchStart)
    setStopwatchReset(false)
  }

  const resetStopwatch = () => {
    setStopwatchStart(false)
    setStopwatchReset(true)
    setTimeList([])
  }
  
  const getFormattedTime = (time) => {
    setTime(time)
  }

  const taskComplete = async (taskList) => {
    // timeList
    // taskList
    const { refresh } = route.params
    const taskRecordRes = await storage.get('taskRecordList')
    let index = taskRecordRes && taskRecordRes.length > 0
      ? taskRecordRes.length + 1
      : 1
    let result = []
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
    resetStopwatch()
    refresh && typeof refresh === 'function' && refresh()
    navigation.goBack()
  }

  const goSchedule = () => {
    navigation.goBack()
  }

  const openTaskCompleteModal = () => {
    if (!(timeList && timeList.length > 0)) return Tip.show('请先生成记录后再完成任务！')
    setModalVisible(true)
  }

  const formatTime = value => dayjs(value).format('YYYY-MM-DD HH:mm:ss')

  return (
    <SafeAreaView
      style={[
        styles.pageView
      ]}
    >
      <Stopwatch
        laps
        msecs
        options={options}
        start={stopwatchStart}
        reset={stopwatchReset}
        getTime={getFormattedTime}
        // getMsecs={value => console.warn(1, value)}
      />
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
      <View
        style={[
          styles.footerView,
        ]}
      >
        <TouchableOpacity
          style={styles.stackNavigatorLeft}
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
    flex: 1,
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
    height: 115,
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
    left: 18,
    top: '50%',
    transform: [{translateY: -18}],
  }
})

export default ScheduleWatch
