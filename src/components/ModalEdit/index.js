import React, { useState, useRef, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native'
import Dayjs from 'dayjs'

import {
  Input,
  Datepicker,
  Timepicker,
  BottomModal,
  Scrollpicker
} from 'beeshell'

// config
import {
  taskTypeEnum,
  repeatTypeEnum
} from '../../common/config'

// 添加功能下默认的的数据
const formDefaultData = {
  name: '',
  date: Dayjs().format('YYYY-MM-DD'),
  time: Dayjs().format('HH:mm:ss'),
  repeatType: repeatTypeEnum[0].id,
  tags: ['工作', '生活', '开会', '上课', '旅行']
}

const TaskItem = ({
  name: nameValue,
  date: dateValue,
  time: timeValue,
  repeat: repeatValue,
  editable,
  onChange
}) => {
  // 任务名称
  const [inputValue, setInputValue] = useState(nameValue || '')
  // 日期选择
  const [date, setDate] = useState(dateValue || Dayjs().format('YYYY-MM-DD'))
  // 时间选择
  const [time, setTime] = useState(timeValue || Dayjs().format('HH:mm:ss'))
  // 重复类型选择
  const [repeat, setRepeat] = useState(repeatTypeEnum.find(item => item.id === repeatValue) || repeatTypeEnum[0])
  // 日期滚轮是否现实
  const [dateVisible, setDateVisible] = useState(false)
  // 时间滚轮是否显示
  const [timeVisible, setTimeVisible] = useState(false)
  // 重复类型滚轮是否显示
  const [repeatVisible, setRepeatVisible] = useState(false)

  // 点击日期选择弹出或者隐藏
  const onPressDate = () => {
    setDateVisible(!dateVisible)
    setTimeVisible(false)
    setRepeatVisible(false)
  }
  // 点击时间选择弹出或隐藏
  const onPressTime = () => {
    setTimeVisible(!timeVisible)
    setDateVisible(false)
    setRepeatVisible(false)
  }
  // 点击重复类型弹出或隐藏
  const onPressRepeat = () => {
    setRepeatVisible(!repeatVisible)
    setTimeVisible(false)
    setDateVisible(false)
  }

  // useEffect 用于刷新外部传入数据
  useEffect(() => {setInputValue(nameValue)}, [nameValue])
  useEffect(() => {setDate(dateValue)}, [dateValue])
  useEffect(() => {setTime(timeValue)}, [timeValue])
  useEffect(() => {setRepeat(repeatTypeEnum.find(item => item.id === repeatValue))}, [repeatValue])

  // 内部产生变化后告诉父组件变化
  const _onChange = (type, value) => {
    if (type === 'name') {
      setInputValue(value)
    } else if (type === 'date') {
      setDate(value)
    } else if (type === 'time') {
      setTime(value)
    } else if (type === 'repeat') {
      setRepeat(value)
    }
    onChange && typeof onChange === 'function' && onChange(type, value)
  }
  const TouchableComponent = editable ? TouchableOpacity : TouchableOpacity
  return (
    <View>
      <Input
        style={styles.inputStyle}
        autoCapitalize='none'
        textAlign='left'
        value={inputValue}
        placeholder='请输入任务名称'
        onChange={value => _onChange('name', value)}
      />
      {/* 时间 */}
      <View
        style={[
          styles.rowItem,
          { paddingHorizontal: 0, justifyContent: 'space-between' }
        ]}>
        <View style={styles.row}>
          <TouchableComponent
            onPress={onPressDate}
            style={styles.rowItemTimeView}
          >
            <Text
              style={[
                styles.rowItemText
              ]}>{date}</Text>
          </TouchableComponent>
          <View style={styles.rowItemTimeTag} />
          <TouchableComponent
            onPress={onPressTime}
            style={styles.rowItemTimeView}
          >
            <Text
              style={[
                styles.rowItemText
              ]}>{time}</Text>
          </TouchableComponent>
        </View>
        <TouchableComponent
          onPress={onPressRepeat}
          style={styles.rowItemTimeView}
        >
          <Text
            style={[
              styles.rowItemText
            ]}>{repeat && repeat.label}</Text>
        </TouchableComponent>
      </View>
      <View>
        {
          // 日期选择器
          dateVisible &&
          <Datepicker
            proportion={[1, 1, 1]}
            offsetCount={1}
            startYear={Dayjs().get('year')}
            numberOfYears={10}
            date={date}
            onChange={value => _onChange('date', value)}
          />
        }
        {
          // 时间选择器
          timeVisible &&
          <Timepicker
            proportion={[1, 1, 1]}
            offsetCount={1}
            value={time}
            onChange={value => _onChange('time', value)}
          />
        }
        {
          // 重复类型选择器
          repeatVisible && <Scrollpicker
            proportion={[1]}
            offsetCount={1}
            list={[repeatTypeEnum]}
            value={[repeatTypeEnum.findIndex(reItem => reItem.id === repeat.id)]}
            onChange={(columnIndex, rowIndex) => {
              _onChange('repeat', repeatTypeEnum[rowIndex])
            }}
          />
        }
      </View>
    </View>
  )
}

const ModalEdit = ({
  defaultData,
  visible,
  editable = false,
  onModalEdit,
  onModalAdd,
  onClose
}) => {
  // ref
  const refModal = useRef(null)
  // 重要程度类型
  const [important, setImportant] = useState(taskTypeEnum[0].id)
  // 标签输入栏
  const [tagInputValue, setTagInputValue] = useState('')
  // 标签输入栏是否显示
  const [tagInputVisible, setTagInputVisible] = useState(true)
  // 需要提交的数据
  const [formData, setFormData] = useState(
    {
      name: editable ? defaultData.name : formDefaultData.name,
      date: editable ? Dayjs(defaultData.dateTime).format('YYYY-MM-DD') : formDefaultData.date,
      time: editable ? Dayjs(defaultData.dateTime).format('HH:mm:ss') : formDefaultData.time,
      repeatType: editable ? defaultData.repeatType : formDefaultData.repeatType,
      tags: editable ? defaultData.tags : formDefaultData.tags
    }
  )

  // 监听外部传入visible是否变化来打开或者关闭弹窗
  useEffect(() => {
    if (!(refModal && refModal.current)) return
    if (visible) {
      refModal.current.open && refModal.current.open()
    } else {
      refModal.current.open && refModal.current.close()
    }
  }, [visible])

  // 选择的任务类型
  const onPressImportantItem = value => setImportant(value)

  // 添加tag的某一项
  const onAddTagItem = value => {
    formData.tags.push(value)
    onFormDataChange('tags', formData.tags)
  }

  // 删除tag的某一项
  const onDelTagItem = index => {
    const delItem = formData.tags.splice(index, 1)
    if (delItem[0] === tagInputValue) {
      setTagInputValue('')
      setTagInputVisible(true)
    }
    onFormDataChange('tags', formData.tags)
  }

  // tag的输入栏失去焦点 添加数据
  const onTagInputBlur = () => {
    if (!tagInputValue) return
    setTagInputVisible(false)
    !formData.tags.includes(tagInputValue) && onAddTagItem(tagInputValue)
  }

  // 内部 TaskItem 发生变化后合并数据
  const onFormDataChange = (type, value) => {
    setFormData({
      ...formData,
      [type]: value
    })
  }

  // 当弹窗关闭的时候调用
  const _onClose = () => {
    onClose && typeof onClose === 'function' && onClose()
  }

  // 当点击提交按钮的时候调用
  const _onConfirm = async () => {
    const { date, time, ...resetProps } = formData
    const params = {
      taskType: important,
      dateTime: Dayjs(`${date} ${time}`).format('YYYY-MM-DD HH:mm:ss'),
      ...resetProps
    }
    if (editable) { // 如果是编辑态调用编辑方法
      params.id = defaultData.id,
      onModalEdit && typeof onModalEdit === 'function' && onModalEdit(params)
    } else { // 添加态调用添加方法
      onModalAdd && typeof onModalAdd === 'function' && onModalAdd(params)
    }
  }

  const importantItem = taskTypeEnum.find(item => item.id === important)
  
  return (
    <View>
      <BottomModal
        ref={refModal}
        title={editable ? '编辑' : '添加'}
        cancelable={true}
        leftLabel={null}
        leftCallback={_onClose}
        rightCallback={_onConfirm}
        onClose={_onClose}
      >
        <View
          style={styles.contextContainer}
        >
          {/* 重要程度选择 */}
          <View style={styles.importantView}>
            {
              taskTypeEnum.map((importantItem, importantIndex) => {
                return (
                  <TouchableOpacity
                    key={`importantItem_${importantIndex}`}
                    onPress={() => onPressImportantItem(importantItem.id)}
                    style={styles.importantItemView}
                  >
                    <Text style={styles.importantText}>{importantItem.label}</Text>
                    {
                      important === importantItem.id &&
                      <View style={styles.importantTag} />
                    }
                  </TouchableOpacity>
                )
              })
            }
          </View>
          <View style={styles.rowItem}>
            <Text
              style={[
                styles.rowItemText,
                { color: '#1E90FF' }
              ]}>{
                importantItem && importantItem.placeholder
              }</Text>
          </View>
          <ScrollView style={styles.formView}>
            {/* 任务详情 */}
            <TaskItem
              editable={editable}
              name={formData.name}
              date={formData.date}
              time={formData.time}
              repeat={formData.repeatType}
              onChange={onFormDataChange}
            />
            {/* tags 标签 */}
            <View>
              <View style={styles.row}>
                {
                  formData.tags &&
                  formData.tags.length > 0 &&
                  formData.tags.map((tagItem, tagIndex) =>
                    <TouchableOpacity
                      key={`tagItem_${tagIndex}`}
                      style={styles.tagItemView}
                      onPress={() => onDelTagItem(tagIndex)}
                    >
                      <Text style={styles.tagText}>#{tagItem}</Text>
                    </TouchableOpacity>
                  )
                }  
              </View>
              {
                tagInputVisible &&
                  <Input
                    style={styles.tagItemInput}
                    autoCapitalize='none'
                    autoCorrect={false}
                    textAlign='left'
                    value={tagInputValue}
                    placeholder='#添加标签'
                    onChange={setTagInputValue}
                    onBlur={onTagInputBlur}
                    onSubmitEditing={onTagInputBlur}
                  />
              }
            </View>
          </ScrollView>
        </View>
      </BottomModal>
    </View>
    
  )
}

const styles = StyleSheet.create({
  contextContainer: {
    width: '100%',
    height: Dimensions.get('window').height * 4 / 5,
    backgroundColor: '#fff'
  },
  importantView: {
    flexDirection: 'row',
    height: 48
  },
  importantItemView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  importantText: {
    fontSize: 14,
    color: '#222'
  },
  importantTag: {
    height: 1,
    backgroundColor: 'blue',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0
  },
  inputStyle: {
    height: 48
  },
  row: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  rowItem: {
    height: 48,
    flexDirection: 'row',
    paddingHorizontal: 14,
    alignItems: 'center',
  },
  rowItemText: {
    fontSize: 14,
    color: '#222'
  },
  rowItemTimeView: {
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#1E90FF'
  },
  rowItemTimeTag: {
    width: 8,
    height: 1,
    marginHorizontal: 4,
    backgroundColor: '#1E90FF'
  },
  formView: {
    flex: 1,
    paddingHorizontal: 14
  },
  dateTimeHidden: {
    marginTop: 10,
    paddingVertical: 4,
    backgroundColor: '#e8e8e8',
    borderRadius: 4
  },
  fontSize14: {
    fontSize: 14,
    color: '#222'
  },
  tagItemInput: {
    marginTop: 10,
    height: 30,
    fontSize: 12,
    color: '#f0f0f0'
  },
  tagItemView: {
    paddingVertical: 12,
    marginRight: 4
  },
  tagText: {
    fontSize: 12,
    color: '#1E90FF'
  }
})

export default ModalEdit
