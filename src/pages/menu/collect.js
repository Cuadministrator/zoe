import React, { useState } from 'react'
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native'
import { inject, observer } from 'mobx-react'

import { useSafeArea } from 'react-native-safe-area-context'

const CollectScreen = ({
  globalStore
}) => {
  const safeArea = useSafeArea()
  const [total, setTotal] = useState(0)
  const [pending, setPending] = useState(0)
  const [expired, setExpired] = useState(0)
  return (
    <ScrollView style={{flex: 1}}>
      <View
        style={[
          styles.userView
        ]}
      >
        {
          globalStore.user &&
          <View style={{alignItems: 'center'}}>
            <Image
              style={styles.headerImg}
              source={require('../../image/headerImg.jpeg')}
            />
            <Text style={styles.headerText}>{globalStore.user.name}</Text>
          </View>
        }
      </View>
      <View>
        <View style={styles.headerView}>
          <View style={styles.headerItem}>
            <Text style={styles.headerValue}>{total}</Text>
            <Text style={styles.headerKey}>任务总数</Text>
          </View>
          <View style={styles.headerItem}>
            <Text style={[styles.headerValue, { color: '#F6BB42' }]}>{pending}</Text>
            <Text style={[styles.headerKey, , { color: '#F6BB42' }]}>待完成数</Text>
          </View>
          <View style={styles.headerItem}>
            <Text style={[styles.headerValue, { color: '#FC6E51' }]}>{expired}</Text>
            <Text style={[styles.headerKey, { color: '#FC6E51' }]}>未完成数</Text>
          </View>
        </View>
        <Text style={styles.finishText}>完成率: 60%</Text>
        <View style={styles.chartItem}>
          <Text style={styles.chartText}>本周高效工作时间</Text>
        </View>
        <View style={styles.chartItem}>
          <Text style={styles.chartText}>本周成就图</Text>
        </View>
        <View style={styles.chartItem}>
          <Text style={styles.chartText}>今日象限分布图</Text>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  userView: {
    height: 260,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#656d78'
  },
  headerImg: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20
  },
  headerText: {
    fontSize: 22,
    color: '#e9e9e9',
    fontWeight: '500'
  },
  headerView: {
    marginTop: 60,
    flexDirection: 'row'
  },
  headerItem: {
    flex: 1,
    alignItems: 'center'
  },
  headerKey: {
    fontSize: 16,
    color: '#222',
    fontWeight: '500',
    marginTop: 30
  },
  headerValue: {
    fontSize: 16,
    color: '#222',
    fontWeight: '500'
  },
  finishText: {
    fontSize: 16,
    color: '#222',
    fontWeight: '500',
    marginTop: 40,
    paddingRight: 16,
    textAlign: 'center'
  },
  chartText: {
    fontSize: 16,
    color: '#222',
    fontWeight: '500',
    marginLeft: 16,
    marginTop: 40,
  },
})

export default inject('globalStore')(observer(CollectScreen))