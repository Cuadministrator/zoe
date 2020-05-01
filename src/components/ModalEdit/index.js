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

const data = [
  {name: '小花', date: '2020-12-12', time: '20:59:00', repeat: 1},
  {name: '小华', date: '2020-12-13', time: '19:59:23', repeat: 1},
  {name: '小唐', date: '2020-12-14', time: '18:59:12', repeat: 2},
  {name: '小姐', date: '2020-12-15', time: '17:59:11', repeat: 3},
  {name: '笑笑', date: '2020-12-16', time: '16:59:22', repeat: 2},
  {name: '大丁', date: '2020-12-17', time: '15:59:33', repeat: 1}
]

const TaskItem = ({
  name: nameValue,
  date: dateValue,
  time: timeValue,
  repeat: repeatValue,
  editable,
  onChange
}) => {
  const [inputValue, setInputValue] = useState(nameValue || '')
  const [date, setDate] = useState(dateValue || Dayjs().format('YYYY-MM-DD'))
  const [time, setTime] = useState(timeValue || Dayjs().format('HH:mm:ss'))
  const [repeat, setRepeat] = useState(repeatTypeEnum.find(item => item.value === repeatValue) || repeatTypeEnum[0])
  // edit
  const [dateVisible, setDateVisible] = useState(false)
  const [timeVisible, setTimeVisible] = useState(false)
  const [repeatVisible, setRepeatVisible] = useState(false)

  const onPressDate = () => {
    console.warn(1)
    setDateVisible(!dateVisible)
    setTimeVisible(false)
    setRepeatVisible(false)
  }
  const onPressTime = () => {
    setTimeVisible(!timeVisible)
    setDateVisible(false)
    setRepeatVisible(false)
  }
  const onPressRepeat = () => {
    setRepeatVisible(!repeatVisible)
    setTimeVisible(false)
    setDateVisible(false)
  }

  // useEffect
  useEffect(() => {setDate(dateValue)}, [dateValue])
  useEffect(() => {setTime(timeValue)}, [timeValue])
  useEffect(() => {setRepeat(repeatTypeEnum.find(item => item.value === repeatValue))}, [repeatValue])

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
        // editable={editable}
        textAlign='left'
        value={inputValue}
        placeholder='请输入任务名称'
        onChange={setInputValue}
      />
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
          timeVisible &&
          <Timepicker
            proportion={[1, 1, 1]}
            offsetCount={1}
            value={time}
            onChange={value => _onChange('time', value)}
          />
        }
        {
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
  visible,
  editable = true,
  onConfirm,
  onClose
}) => {
  const refModal = useRef(null)
  const [important, setImportant] = useState(taskTypeEnum[0])
  const [tagInputValue, setTagInputValue] = useState('')
  const [tagInputVisible, setTagInputVisible] = useState(!editable)
  const [formData, setFormData] = useState({
    name: '',
    date: Dayjs().format('YYYY-MM-DD'),
    time: Dayjs().format('HH:mm:ss'),
    repeat: 1,
    tag: ['工作', '生活', '开会', '上课', '旅行'],
    children: data
  })

  useEffect(() => {
    if (!(refModal && refModal.current)) return
    if (visible) {
      refModal.current.open && refModal.current.open()
    } else {
      refModal.current.open && refModal.current.close()
    }
  }, [visible])

  const onPressImportantItem = value => setImportant(value)

  const onAddTagItem = value => {
    formData.tag.push(value)
    onFormDataChange('tag', formData.tag)
  }

  const onDelTagItem = index => {
    const delItem = formData.tag.splice(index, 1)
    if (delItem[0] === tagInputValue) {
      setTagInputValue('')
      setTagInputVisible(true)
    }
    onFormDataChange('tag', formData.tag)
  }

  const onTagInputBlur = () => {
    if (!tagInputValue) return
    setTagInputVisible(false)
    !formData.tag.includes(tagInputValue) && onAddTagItem(tagInputValue)
  }

  const onFormDataChange = (type, value) => {
    setFormData({
      ...formData,
      [type]: value
    })
  }

  const _onClose = () => {
    onClose && typeof onClose === 'function' && onClose()
  }

  const _onConfirm = async () => {
    // 需要打接口添加数据 TODO:
    onConfirm && typeof onConfirm === 'function' && onConfirm(formData)
  }
  
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
          <View style={styles.importantView}>
            {
              taskTypeEnum.map((importantItem, importantIndex) => {
                return (
                  <TouchableOpacity
                    key={`importantItem_${importantIndex}`}
                    onPress={() => onPressImportantItem(importantItem)}
                    style={styles.importantItemView}
                  >
                    <Text style={styles.importantText}>{importantItem.label}</Text>
                    {
                      (important && important.value) === importantItem.value &&
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
              ]}>{important.placeholder}</Text>
          </View>
          <ScrollView style={styles.formView}>
            <TaskItem
              editable={editable}
              name={formData.name}
              date={formData.date}
              time={formData.time}
              repeat={formData.repeat}
            />
            <View>
              <View style={styles.row}>
                {
                  formData.tag &&
                  formData.tag.length > 0 &&
                  formData.tag.map((tagItem, tagIndex) =>
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
