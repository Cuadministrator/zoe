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
  const [inputValue, setInputValue] = useState(nameValue || '')
  const [date, setDate] = useState(dateValue || Dayjs().format('YYYY-MM-DD'))
  const [time, setTime] = useState(timeValue || Dayjs().format('HH:mm:ss'))
  const [repeat, setRepeat] = useState(repeatTypeEnum.find(item => item.id === repeatValue) || repeatTypeEnum[0])
  // edit
  const [dateVisible, setDateVisible] = useState(false)
  const [timeVisible, setTimeVisible] = useState(false)
  const [repeatVisible, setRepeatVisible] = useState(false)

  const onPressDate = () => {
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
  useEffect(() => {setInputValue(nameValue)}, [nameValue])
  useEffect(() => {setDate(dateValue)}, [dateValue])
  useEffect(() => {setTime(timeValue)}, [timeValue])
  useEffect(() => {setRepeat(repeatTypeEnum.find(item => item.id === repeatValue))}, [repeatValue])

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
  data,
  visible,
  editable = false,
  onConfirm,
  onClose
}) => {
  const refModal = useRef(null)
  const [important, setImportant] = useState(taskTypeEnum[0].id)
  const [tagInputValue, setTagInputValue] = useState('')
  const [tagInputVisible, setTagInputVisible] = useState(true)
  const [formData, setFormData] = useState(
    {
      name: editable ? data.name : formDefaultData.name,
      date: editable ? Dayjs(data.dateTime).format('YYYY-MM-DD') : formDefaultData.date,
      time: editable ? Dayjs(data.dateTime).format('HH:mm:ss') : formDefaultData.time,
      repeatType: editable ? data.repeatType : formDefaultData.repeatType,
      tags: editable ? data.tags : formDefaultData.tags
    }
  )

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
    formData.tags.push(value)
    onFormDataChange('tags', formData.tags)
  }

  const onDelTagItem = index => {
    const delItem = formData.tags.splice(index, 1)
    if (delItem[0] === tagInputValue) {
      setTagInputValue('')
      setTagInputVisible(true)
    }
    onFormDataChange('tags', formData.tags)
  }

  const onTagInputBlur = () => {
    if (!tagInputValue) return
    setTagInputVisible(false)
    !formData.tags.includes(tagInputValue) && onAddTagItem(tagInputValue)
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
            <TaskItem
              editable={editable}
              name={formData.name}
              date={formData.date}
              time={formData.time}
              repeat={formData.repeatType}
            />
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
