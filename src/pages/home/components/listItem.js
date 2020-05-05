import React, { useState, useEffect, useCallback } from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'

// components
import { Button } from 'beeshell'
import { SwipeRow, Icon } from '../../../components'
import { AutoDragSortableView } from 'react-native-drag-sort'

const { width:screenWidth } = Dimensions.get('window')
const parentWidth = screenWidth
const childrenWidth = screenWidth - 20
const childrenHeight = 48

const Item = ({
  id,
  index,
  label,
  finished,
  onLeftAction,
  onRightDelete,
  onRightEdit,
  disabled,
  ...resetProps
}) => {
  const _onLeftAction = useCallback(() => {
    onLeftAction && typeof onLeftAction === 'function' && onLeftAction(id, index)
  }, [id, index])

  const _onRightDelete = useCallback(() => {
    onRightDelete && typeof onRightDelete === 'function' && onRightDelete(id, index)
  }, [id, index])

  const _onRightEdit = useCallback(() => {
    onRightEdit && typeof onRightEdit === 'function' && onRightEdit(id, index)
  }, [id, index])

  if (!id) return null
  return (
    <View
      style={styles.swipeRow}
    >
      <SwipeRow
        style={{flex: 1}}
        leftActivationValue={50}
        rightOpenValue={-150}
        swipeToClosePercent={1}
        onLeftAction={_onLeftAction}
        textStyle={styles.swipeRowText}
        {...resetProps}
      >
        <View style={styles.hiddenRow}>
          <Button
            size="sm"
            onPress={_onRightDelete}
            style={styles.swipeRowBtn}
          >
            <Icon
              name='trash-2'
              size={16}
              color='#222'
            />
          </Button>
          <Button
            size="sm"
            onPress={_onRightEdit}
            style={styles.swipeRowBtn}
          >
            <Icon
              name='edit'
              size={16}
              color='#222'
            />
          </Button>
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
  data,
  onItemEdit,
  onItemDelete,
  onItemComplete,
  onDataChange,
}) => {
  const _delete = (id, index) => {
    onItemDelete && typeof onItemDelete === 'function' && onItemDelete(id, index)
  }

  const _edit = (id, index) => {
    onItemEdit && typeof onItemEdit === 'function' && onItemEdit(id, index)
  }

  const _finished = (id, index) => {
    onItemComplete && typeof onItemComplete === 'function' && onItemComplete(id, index)
  }

  const _onDataChange = nextData => {
    onDataChange && typeof onDataChange === 'function' && onDataChange(nextData)
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
      onDataChange={_onDataChange}
      renderItem={(item,index)=>{
        return (
          <Item
            index={index}
            onRightEdit={_edit}
            onRightDelete={_delete}
            onLeftAction={_finished}
            {...item}
          />
        )
      }}
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
    borderRadius: 0,
    backgroundColor: '#f5f7fa',
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
