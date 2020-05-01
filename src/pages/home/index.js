import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

// component
import List from './components/listItem'
import { ModalEdit } from '../../components'

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
    id: 1,
    image: 'https://placekitten.com/200/240',
    label: 'Chloe',
    finished: true,
  },
  1: {
    id: 2,
    image: 'https://placekitten.com/200/201',
    label: 'Jasper',
    finished: true,
  },
  2: {
    id: 3,
    image: 'https://placekitten.com/200/202',
    label: 'Pepper',
    finished: true,
  },
  3: {
    id: 4,
    image: 'https://placekitten.com/200/203',
    label: 'Oscar',
    finished: false,
  },
  4: {
    id: 5,
    image: 'https://placekitten.com/200/204',
    label: 'Dusty',
    finished: false,
  },
  5: {
    id: 6,
    image: 'https://placekitten.com/200/205',
    label: 'Spooky',
    finished: false,
  },
  6: {
    id: 7,
    image: 'https://placekitten.com/200/210',
    label: 'Kiki',
    finished: false,
  },
  7: {
    id: 8,
    image: 'https://placekitten.com/200/215',
    label: 'Smokey',
    finished: false,
  },
  8: {
    id: 9,
    image: 'https://placekitten.com/200/220',
    label: 'Gizmo',
    finished: true,
  },
  9: {
    id: 10,
    image: 'https://placekitten.com/220/239',
    label: 'Kitty',
    finished: false,
  },
  10: {
    id: 10,
    image: 'https://placekitten.com/220/239',
    label: 'Kitty',
    finished: false,
  },
  11: {
    id: 10,
    image: 'https://placekitten.com/220/239',
    label: 'Kitty',
    finished: false,
  },
  12: {
    id: 10,
    image: 'https://placekitten.com/220/239',
    label: 'Kitty',
    finished: false,
  },
  13: {
    id: 10,
    image: 'https://placekitten.com/220/239',
    label: 'Kitty',
    finished: false,
  },
  14: {
    id: 10,
    image: 'https://placekitten.com/220/239',
    label: 'Kitty',
    finished: false,
  },
  15: {
    id: 10,
    image: 'https://placekitten.com/220/239',
    label: 'Kitty',
    finished: false,
  },
}

const HomeScreen = ({navigation}) => {
  const [data, setData] = useState(treeData1)
  const [values, setValues] = useState([4, 5, 6])
  const [visible, setVisible] = useState(false)

  const _onChange = (value, item) => {
  }
  const openModal = () => setVisible(true)
  const closeModal = () => setVisible(false)
  return (
    <SafeAreaView
      style={{flex: 1}}
    >
      <List
        data={data}
        style={{flex: 1}}
        onChange={_onChange}
      />
      <ModalEdit
        visible={visible}
        onRequestClose={closeModal}
      />
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