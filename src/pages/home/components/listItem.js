import React, { useState, useRef, useCallback } from 'react'
import { View, Text, StyleSheet } from 'react-native'

// components
import { Icon } from '../../../components'
import { SwipeRow } from '../../../components'
import SortableList from 'react-native-sortable-list'

const Item = ({
  data: { finished, label },
  disabled
}) => {
  return (
    <SwipeRow
      rightOpenValue={-50}
      leftActivationValue={20}
      onLeftAction={() => console.warn(1)}
      style={styles.swipeRow}
    >
      <View style={styles.hiddenRow}>
        <View style={{backgroundColor: '#7f70d8', height: '100%', width: 50, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{color: '#fff'}}>删除</Text>
        </View>
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
  values
}) => {
  const [data, setData] = useState(defaultData)

  return (
    <SortableList
      data={data}
      manuallyActivateRows
      renderRow={Item}
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
    height: 40,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  hiddenRow: {
    width: '100%',
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: '#fff'
  },
})

export default List
