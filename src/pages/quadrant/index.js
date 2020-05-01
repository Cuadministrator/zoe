import React, { useState } from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'

// components
import { SafeAreaView } from 'react-native-safe-area-context'
import List from '../home/components/listItem'

const treeData = {
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

const QuadrantScreen = () => {
  const [importUrgent, setImportUrgent] = useState(treeData)
  const [importNotUrgent, setImportNotUrgent] = useState(treeData)
  const [notImportUrgent, setNotImportUrgent] = useState(treeData)
  const [notImportNotUrgent, setNotImportNotUrgent] = useState(treeData)
  return (
    <SafeAreaView style={styles.pageView}>
      <View style={styles.qsItemView}>
        <List
          style={styles.scrollView}
          data={importUrgent}
        />
        <View style={styles.qsItemDescView}>
          <Text style={styles.qsItemDescText}>重要且紧急</Text>
          <Text
            style={[
              styles.qsItemDescIndex,
              styles.right4
            ]}>1</Text>
        </View>
      </View>
      <View style={styles.qsItemView}>
        <List
          style={styles.scrollView}
          data={importNotUrgent}
        />
        <View style={styles.qsItemDescView}>
          <Text style={styles.qsItemDescText}>重要不紧急</Text>
          <Text
            style={[
              styles.qsItemDescIndex,
              styles.left4
            ]}>2</Text>
        </View>
      </View>
      <View style={styles.qsItemView}>
        <View style={styles.qsItemDescView}>
          <Text style={styles.qsItemDescText}>不重要紧急</Text>
          <Text
            style={[
              styles.qsItemDescIndex,
              styles.right4
            ]}>3</Text>
        </View>
        <List
          style={styles.scrollView}
          data={notImportUrgent}
        />
      </View>
      <View style={styles.qsItemView}>
        <View style={styles.qsItemDescView}>
          <Text style={styles.qsItemDescText}>不重要且不紧急</Text>
          <Text
            style={[
              styles.qsItemDescIndex,
              styles.left4
            ]}>4</Text>
        </View>
        <List
          style={styles.scrollView}
          data={notImportNotUrgent}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  pageView: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  qsItemView: {
    width: '50%',
    height: '50%'
  },
  scrollView: {
    flex: 1,
  },
  qsItemDescView: {
    height: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  qsItemDescText: {
    fontSize: 14,
    color: '#222'
  },
  qsItemDescIndex: {
    position: 'absolute',
    fontSize: 14,
    color: '#222'
  },
  right4: {
    right: 4
  },
  left4: {
    left: 4
  }
})

export default QuadrantScreen