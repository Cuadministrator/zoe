import React, { useState, useRef, useCallback } from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'

// components
import { Button } from 'beeshell'
import { SwipeRow, SortableList, Icon } from '../../../components'
import { AutoDragSortableView } from 'react-native-drag-sort'

const { width:screenWidth } = Dimensions.get('window')
const parentWidth = (screenWidth - 10) / 2
const childrenWidth = screenWidth - 10
const childrenHeight = 48

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
    console.warn('id', id)
    onLeftAction && typeof onLeftAction === 'function' && onLeftAction(id, data)
  }, [id])

  const _onRightDelete = useCallback(() => {
    onRightDelete && typeof onRightDelete === 'function' && onRightDelete(id, data)
  }, [id])

  return (
    <View
      style={styles.swipeRow}
    >
      <SwipeRow
        style={{flex: 1}}
        rightOpenValue={-150}
        onLeftAction={_onLeftAction}
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
      <View style={styles.swipeRowRightView}>
        <Icon
          name='align-justify'
          size={20}
          color='#999'
        />
      </View>
    </View>
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
    console.warn(id)
    const newData = {...data}
    if (newData[id]) {
      newData[id].finished = !newData[id].finished
      setData(newData)
    }
  }

  if (!(data && data.length > 0)) return null

  return (
    <AutoDragSortableView
      keyExtractor={(item,index)=> item.id}
      dataSource={data}
      parentWidth={parentWidth}
      childrenWidth= {childrenWidth}
      marginChildrenBottom={10}
      marginChildrenRight={10}
      marginChildrenLeft = {10}
      marginChildrenTop={10}
      childrenHeight={childrenHeight}
      onDataChange={(value)=>{
        if (value.length != data.length) {
          setData(value)
        }
      }}
      renderItem={(item,index)=>{
        return (
          <Item
            onRightAdd={_add}
            onRightEdit={_edit}
            onRightDelete={_delete}
            onLeftAction={_finished}
            data={item}
          />
        )
      }}
    />
  )

  // return (
  //   <SortableList
  //     style={style}
  //     data={data}
  //     scrollEnabled
  //     manuallyActivateRows
  //     renderRow={
  //       props =>
  //       <Item
  //         onRightAdd={_add}
  //         onRightEdit={_edit}
  //         onRightDelete={_delete}
  //         onLeftAction={_finished}
  //         {...props}
  //       />
  //     }
  //     style={styles.sortableList}
  //     contentContainerStyle={styles.sortableListContainer}
  //   />
  // )
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
    flexDirection: 'row',
    width: childrenWidth,
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
  },
  swipeRowRightView: {
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
})

export default List
