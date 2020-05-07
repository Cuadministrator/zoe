import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, StyleSheet, FlatList } from 'react-native'
import { inject, observer } from 'mobx-react'

// components
import { useSafeArea } from 'react-native-safe-area-context'
import { Icon } from '../../components'
import { TouchableOpacity } from 'react-native-gesture-handler'

// utils
import storage from '../../storage'
import { getTaskList } from '../../storage/task'

const QuadrantList = ({
  data,
  navigation,
  initData,
}) => {
  // 跳转任务完成页
  const onQuadrantItemPress = () => {
    navigation.push('ScheduleStopWatchScreen', { refresh: initData })
  }
  return (
    <FlatList
      style={{flex: 1}}
      data={data}
      renderItem={
        ({item, index}) => {
          const { finished, label } = item
          return (
            <TouchableOpacity
              style={styles.quadrantItemRow}
              onPress={() => onQuadrantItemPress(item)}
            >
              <Icon
                name={finished ? 'check-square' : 'square'}
                size={16}
                color={finished ? '#999' : '#222'}
              />
              <Text
                style={[
                  styles.quadrantItemRowText,
                  finished && styles.quadrantItemRowTextLine
                ]}>{label}</Text>
            </TouchableOpacity>
          )
        }
      }
    />
  )
}

const QuadrantScreen = ({
  navigation,
  globalStore
}) => {
  const safeArea = useSafeArea()
  // 各个象限的数据存储
  const [importUrgent, setImportUrgent] = useState([])
  const [importNotUrgent, setImportNotUrgent] = useState([])
  const [notImportUrgent, setNotImportUrgent] = useState([])
  const [notImportNotUrgent, setNotImportNotUrgent] = useState([])

  // 初始化数据
  useEffect(() => {
    initData()
  }, [])

  const initData = async () => {
    const res = await getTaskList({userId: globalStore.user && globalStore.user.id})
    if (res && res.length > 0) {
      let iu = []
      let inu = []
      let niu = []
      let nInu = []
      res.forEach((resItem, resIndex) => {
        resItem = {
          ...resItem,
          label: resItem.name,
          finished: resItem.status === 2
        }
        if (resItem.status !== 3) { // 非失效任务
          if (resItem.taskType === 1) { // 一象限
            iu.push(resItem)
          } else if (resItem.taskType === 2) { // 二象限
            inu.push(resItem)
          } else if (resItem.taskType === 3) { // 三象限
            niu.push(resItem)
          } else if (resItem.taskType === 4) { // 四象限
            nInu.push(resItem)
          }
        }
      })
      // 设置数据
      setImportUrgent(iu)
      setImportNotUrgent(inu)
      setNotImportUrgent(niu)
      setNotImportNotUrgent(nInu)
    }
  }

  return (
    <View
      style={[
        styles.pageView,
        { paddingTop: safeArea.top }
      ]}
    >
      <View style={styles.qsRowView}>
        <View
          style={[
            styles.qsItemView,
          ]}
        >
          <QuadrantList
            navigation={navigation}
            initData={initData}
            data={importUrgent}
          />
          <View style={styles.qsItemDescView}>
            <Text
              style={[
                styles.qsItemDescNum,
                styles.left4
              ]}>{importUrgent.length}</Text>
            <Text style={styles.qsItemDescText}>重要且紧急</Text>
            <Text
              style={[
                styles.qsItemDescIndex,
                styles.right4
              ]}>1</Text>
          </View>
        </View>
        <View style={{width: 1, height: '100%', backgroundColor: '#e9e9e9'}} />
        <View
          style={[
            styles.qsItemView,
          ]}
        >
          <QuadrantList
            navigation={navigation}
            initData={initData}
            data={importNotUrgent}
          />
          <View style={styles.qsItemDescView}>
            <Text
              style={[
                styles.qsItemDescNum,
                styles.right4
              ]}>{importNotUrgent.length}</Text>
            <Text style={styles.qsItemDescText}>重要不紧急</Text>
            <Text
              style={[
                styles.qsItemDescIndex,
                styles.left4
              ]}>2</Text>
          </View>
        </View>
      </View>
      <View style={{width: '100%', height: 1, backgroundColor: '#e9e9e9'}} />
      <View style={styles.qsRowView}>
        <View style={styles.qsItemView}>
          <View style={styles.qsItemDescView}>
            <Text
              style={[
                styles.qsItemDescNum,
                styles.left4
              ]}>{notImportUrgent.length}</Text>
            <Text style={styles.qsItemDescText}>不重要紧急</Text>
            <Text
              style={[
                styles.qsItemDescIndex,
                styles.right4
              ]}>3</Text>
            </View>
          <QuadrantList
            navigation={navigation}
            initData={initData}
            data={notImportUrgent}
          />
        </View>
        <View style={{width: 1, height: '100%', backgroundColor: '#e9e9e9'}} />
        <View style={styles.qsItemView}>
          <View style={styles.qsItemDescView}>
            <Text
              style={[
                styles.qsItemDescNum,
                styles.right4
              ]}>{notImportNotUrgent.length}</Text>
            <Text style={styles.qsItemDescText}>不重要且不紧急</Text>
            <Text
              style={[
                styles.qsItemDescIndex,
                styles.left4
              ]}>4</Text>
          </View>
          <QuadrantList
            navigation={navigation}
            initData={initData}
            data={notImportNotUrgent}
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  pageView: {
    flex: 1,
    backgroundColor: '#fff'
  },
  quadrantItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 16,
  },
  quadrantItemRowText: {
    fontSize: 16,
    color: '#222',
    marginLeft: 8
  },
  quadrantItemRowTextLine: {
    color: '#999',
    textDecorationLine: 'line-through',
    textDecorationColor: '#999'
  },
  qsRowView: {
    flexDirection: 'row',
    flex: 1
  },
  qsItemView: {
    width: '50%',
  },
  scrollView: {
    flex: 1,
  },
  qsItemDescView: {
    height: 36,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  qsItemDescText: {
    fontSize: 14,
    color: '#999'
  },
  qsItemDescIndex: {
    position: 'absolute',
    fontSize: 14,
    color: '#222'
  },
  qsItemDescNum: {
    position: 'absolute',
    fontSize: 14,
    color: '#999'
  },
  right4: {
    right: 16
  },
  left4: {
    left: 16
  }
})

export default inject('globalStore')(observer(QuadrantScreen))