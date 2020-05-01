import React, { useState, useRef, useCallback } from 'react'
import { View, Text, StyleSheet } from 'react-native'

// components
import { Button } from 'beeshell'
import { SwipeRow, SortableList, Icon } from '../../../components'

// utils
import { usePanResponder } from '../../../utils/hooks'

const Item = ({
  id,
  index,
  data,
  onLeftAction,
  onRightDelete,
  onRightEdit,
  onRightAdd,
  disabled,
  ...resetProps
}) => {
  if (!data) return null
  const { finished, label } = data
  const _onLeftAction = useCallback(() => {
    onLeftAction && typeof onLeftAction === 'function' && onLeftAction(id, data)
  }, [id])

  const _onRightDelete = useCallback(() => {
    onRightDelete && typeof onRightDelete === 'function' && onRightDelete(id, data)
  }, [id])

  return (
    <SwipeRow
      rightOpenValue={-150}
      // leftActivationValue={20}
      onLeftAction={_onLeftAction}
      style={styles.swipeRow}
      textStyle={styles.swipeRowText}
      {...resetProps}
    >
      <View style={styles.hiddenRow}>
        <Button
          type="danger"
          size="sm"
          onPress={_onRightDelete}
          style={styles.swipeRowBtn}
        >删除</Button>
        <Button
          type="warning"
          size="sm"
          onPress={onRightEdit}
          style={styles.swipeRowBtn}
        >编辑</Button>
      </View>
      <View style={styles.visibleRow}>
        <Icon
          name={finished ? 'check-square' : 'square'}
          size={16}
          color={finished ? '#999' : '#222'}
        />
        <Text
          style={[
            styles.rowItemText,
            finished && styles.rowItemTextLine
          ]}>{label}</Text>
      </View>
    </SwipeRow>
  )
}

const List = ({
  data: defaultData,
  style,
  onChange
}) => {
  const [data, setData] = useState(defaultData)
  const [value, setValue] = useState(0)

  const _delete = (id, item) => {
    const newData = {...data}
    delete newData[id]
    setData(newData)
  }

  const _edit = () => {}

  const _add = () => {}

  const _finished = (id, item) => {
    const newData = {...data}
    if (newData[id]) {
      newData[id].finished = !newData[id].finished
      setData(newData)
    }
  }

  return (
    <SortableList
      style={style}
      data={data}
      scrollEnabled
      manuallyActivateRows
      renderRow={
        props =>
        <Item
          onRightAdd={_add}
          onRightEdit={_edit}
          onRightDelete={_delete}
          onLeftAction={_finished}
          {...props}
        />
      }
      style={styles.sortableList}
      contentContainerStyle={styles.sortableListContainer}
    />
  )
}

List.Item = Item

const styles = StyleSheet.create({
  rowItemText: {
    fontSize: 16,
    color: '#222',
    marginLeft: 8
  },
  rowItemTextLine: {
    color: '#999',
    textDecorationLine: 'line-through',
    textDecorationColor: '#999'
  },
  // sortableList
  sortableList: {
    flex: 1,
    paddingHorizontal: 10
  },
  sortableListContainer: {
    flex: 1,
  },
  swipeRow: {
    marginTop: 10,
    borderRadius: 4,
    overflow: 'hidden'
  },
  visibleRow: {
    width: '100%',
    height: 48,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  hiddenRow: {
    width: '100%',
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: '#fff'
  },
  swipeRowBtn: {
    width: 50,
    height: '100%',
    paddingHorizontal: 10,
    borderWidth: 0,
    borderRadius: 0
  },
  swipeRowText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '500'
  }
})

export default List
