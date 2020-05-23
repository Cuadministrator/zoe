import React, { useRef, useEffect, useState } from 'react'
import { View, Text, Dimensions, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'

import {
  Input,
  Datepicker,
  SlideModal,
  Checkbox,
  Button,
  Tip
} from 'beeshell'

import { Icon } from '../../../components'

// utils
import { checkDecimal } from '../../../utils/func'
import dayjs from 'dayjs'
import { getTaskList, getTaskRecordList } from '../../../storage/task'

const screenHeight = Dimensions.get('window').height
const screenWidth = Dimensions.get('window').width

const formatDate = value => dayjs(value).format('YYYY-MM-DD 00:00:00')

const initDate = value => dayjs(value).hour(0).minute(0).second(0).millisecond(0)

const TaskCompleteModal = ({
  visible = true,
  onClose,
  onConfirm,
  userId
}) => {
  const ref = useRef(null)
  const [data, setData] = useState([])
  const [value, setValue] = useState([])

  useEffect(() => {
    initData()
  }, [])

  useEffect(() => {
    if (!(ref && ref.current)) return
    if (visible) {
      ref.current.open()
      initData()
    } else {
      ref.current.close()
    }
    return () => {
      onClose && typeof onClose === 'function' && onClose()
    }
  }, [visible])

  const initData = async () => {
    const taskRes = await getTaskList({userId})
    const taskRecordRes = await getTaskRecordList({userId})
    const formatTime = value => dayjs(value).format('YYYY-MM-DD 00:00:00')
    if (taskRes && taskRes.length > 0) {
      let result = []
      taskRes.forEach(taskItem => {
        const dateTime = taskItem.dateTime
        // 去除 过期任务
        if (taskItem.status === 3 || taskItem.status === 2) return
        // 处理 finished 判断任务是否已经完成
        if (
          taskRecordRes &&
          taskRecordRes.length > 0
        ) {
          const taskRecordResIndex = taskRecordRes.findIndex(
            trItem => (
              trItem.taskId === taskItem.id &&
              formatTime(trItem.startTime) === formatTime(dayjs())
            )
          )
          if (taskRecordResIndex >= 0) return
        }
        if (taskItem.repeatType === 1) { // 不重复任务
          if (
            formatDate(dateTime) === formatDate(dayjs())
          ) {
            result.push(taskItem)
          }
        } else if (taskItem.repeatType === 2) { // 每天重复任务
          result.push(taskItem)
        } else if (taskItem.repeatType === 3) { // 每周重复任务
          if (
            dayjs(dateTime).weekday === dayjs().weekday
          ) {
            result.push(taskItem)
          }
        } else if (taskItem.repeatType === 4) { // 每月重复任务
          const now = dayjs()
          const create = dayjs(dateTime)
          if (
            checkDecimal(
              now.diff(create, 'month', true)
            )
          ) {
            result.push(taskItem)
          }
        } else if (taskItem.repeatType === 5) { // 每年重复任务
          const now = initDate(dayjs())
          const create = initDate(dateTime)
          if (
            checkDecimal(
              now.diff(create, 'year', true)
            )
          ) {
            result.push(taskItem)
          }
        }
      })
      setData(result)
    }
  }

  const _onConfirm = () => {
    if (data && data.length > 0) {
      if (!(value && value.length > 0)) return Tip.show('请选择需要完成的任务!')
      onConfirm && typeof onConfirm === 'function' && onConfirm(value)
      closeModal()
    } else {
      closeModal('openAdd')
    }
  }

  const onCheckBoxChange = value => {
    setValue(value)
  }

  const closeModal = (type) => {
    if (ref && ref.current) {
      ref.current.close()
      onClose && typeof onClose === 'function' && onClose(type)
    }
  }

  const openAdd = () => {}

  return (
    <SlideModal
      ref={ref}
      offsetX={Math.floor(screenWidth / 10)}
      offsetY={Math.floor(screenHeight * 7 / 10)}
      direction='up'
      align='center'
      cancelable={true}
      fullScreenPatch={[true, true, true]}
    >
      <View
        style={{
          width: Math.floor(screenWidth * 4 / 5),
          height: Math.floor(screenHeight * 2 / 5),
          backgroundColor: '#fff',
          paddingTop: 40,
          paddingHorizontal: 40,
          paddingBottom: 20,
          borderTopLeftRadius: 40,
          borderBottomLeftRadius: 40,
          borderBottomRightRadius: 40,
          overflow: 'hidden'
        }}>
        <Text style={styles.modalTitle}>
          请选择需要完成的任务
        </Text>
        <View style={styles.modalContent}>
          {
            data && data.length > 0
              ? <ScrollView style={{flex: 1, width: '100%'}}>
                <Checkbox
                  style={{width: '100%'}}
                  value={value}
                  onChange={onCheckBoxChange}
                >
                  {
                    data.map((taskItem, taskIndex) =>
                      <Checkbox.Item
                        key={`taskItem_${taskIndex}`}
                        label={taskItem.name}
                        value={taskItem}
                      />
                    )
                  }
                </Checkbox>
              </ScrollView>
              : <Text style={styles.modalContentText}>暂无可选择的任务，请先添加任务</Text>
            }
        </View>
        <View style={styles.modalFooter}>
          {/* <TouchableOpacity
            style={{marginRight: 20}}
            onPress={openAdd}
          >
            <Icon
              name='plus-circle'
              size={40}
            />
          </TouchableOpacity> */}
          <Button
            style={styles.confirmBtn}
            type='primary'
            size='md'
            textColorInverse
            onPress={_onConfirm}
          >{data && data.length ? '完成' : '添加'}</Button>
        </View>
        <TouchableOpacity
          style={styles.modalIconClose}
          onPress={closeModal}
        >
          <Icon
            name='x-circle'
            size={36}
            color='#999'
          />
        </TouchableOpacity>
      </View>
    </SlideModal>
  )
}

const styles = StyleSheet.create({
  modalTitle: {
    fontSize: 16,
    color: '#222',
    fontWeight: '500'
  },
  modalContent: {
    flex: 1,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalContentText: {
    fontSize: 14,
    color: '#222'
  },
  modalFooter: {
    marginTop: 20,
    height: 40,
    flexDirection: 'row'
  },
  confirmBtn: {
    flex: 1,
    height: 40,
    borderRadius: 20,
  },
  modalIconClose: {
    position: 'absolute',
    top: 10,
    right: 10
  }
})

export default TaskCompleteModal
