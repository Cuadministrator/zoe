import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import ListItem from './components/listItem'

// component
import { SwipeRow } from '../../components'
import SortableList from 'react-native-sortable-list'

const treeData = [
  {
    id: 1,
    name: '第一个任务',
    children: [
      { id: 11, name: '第一个任务的第一个子任务', pId: 1 },
      { id: 12, name: '第一个任务的第二个子任务', pId: 1 },
      { id: 13, name: '第一个任务的第三个子任务', pId: 1 },
    ]
  }
]

const treeData1 = {
  0: {
    image: 'https://placekitten.com/200/240',
    label: 'Chloe',
    finished: true,
  },
  1: {
    image: 'https://placekitten.com/200/201',
    label: 'Jasper',
    finished: true,
  },
  2: {
    image: 'https://placekitten.com/200/202',
    label: 'Pepper',
    finished: true,
  },
  3: {
    image: 'https://placekitten.com/200/203',
    label: 'Oscar',
    finished: false,
  },
  4: {
    image: 'https://placekitten.com/200/204',
    label: 'Dusty',
    finished: false,
  },
  5: {
    image: 'https://placekitten.com/200/205',
    label: 'Spooky',
    finished: false,
  },
  6: {
    image: 'https://placekitten.com/200/210',
    label: 'Kiki',
    finished: false,
  },
  7: {
    image: 'https://placekitten.com/200/215',
    label: 'Smokey',
    finished: false,
  },
  8: {
    image: 'https://placekitten.com/200/220',
    label: 'Gizmo',
    finished: false,
  },
  9: {
    image: 'https://placekitten.com/220/239',
    label: 'Kitty',
    finished: false,
  },
};

const HomeScreen = ({navigation}) => {
  const [data, setData] = useState(treeData1)
  const [values, setValues] = useState([4, 5, 6])

  const _renderRow = ({}) => {
    return (
      <SwipeRow
        leftOpenValue={100}
        rightOpenValue={-100}
        style={styles.swipeRow}
      >
        <View style={styles.hiddenRow}>
          <Text>123</Text>
          <Text>456</Text>
        </View>
        <View style={styles.visibleRow}>
          <Text>asd</Text>
        </View>
      </SwipeRow>
    )
  }
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'red'}}>
      {/* <SortableList
        data={data}
        manuallyActivateRows
        renderRow={_renderRow}
        style={styles.sortableList}
        contentContainerStyle={styles.sortableListContainer}
      /> */}
      <ListItem
        data={data} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  sortableList: {
    flex: 1,
    paddingHorizontal: 10
  },
  sortableListContainer: {
    flex: 1,
  },
  swipeRow: {
    marginTop: 10,
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
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff'
  },
})

export default HomeScreen