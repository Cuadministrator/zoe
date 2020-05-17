import React, { useState, useEffect } from 'react'
import { View, Text, Image, StyleSheet, ScrollView, processColor } from 'react-native'
import { inject, observer } from 'mobx-react'
import { useSafeArea } from 'react-native-safe-area-context'
import dayjs from 'dayjs'

// components
import { LineChart, PieChart, BarChart } from 'react-native-charts-wrapper'

// storage
import { getTaskList, getTaskRecordList } from '../../storage/task'
import { taskTypeEnum } from '../../common/config'

const pieDefaultConfig = {
  color: '#fff',
  colors: [processColor('#FFD08C'), processColor('#FFF78C'), processColor('#8CEAFF'), processColor('#C0FF8C')],
  valueTextSize: 16,
  valueTextColor: processColor('#666'),
  sliceSpace: 10,
  selectionShift: 12,
  // xValuePosition: "OUTSIDE_SLICE",
  // yValuePosition: "OUTSIDE_SLICE",
  valueFormatter: "#.#'%'",
  valueLineColor: processColor('green'),
  valueLinePart1Length: 0.5
}

const barDefaultConfig = {
  color: processColor('teal'),
  barShadowColor: processColor('lightgrey'),
  highlightAlpha: 90,
  highlightColor: processColor('red'),
}

const getPercentage = values => {
  let total = 0
  values.forEach(vItem => { total += vItem })
  return values.map(vItem => Math.floor(vItem / total * 100))
}

const CollectScreen = ({
  globalStore
}) => {
  const safeArea = useSafeArea()
  const [total, setTotal] = useState(0)
  const [done, setDone] = useState(0)
  const [expired, setExpired] = useState(0)
  const [legend, setLegend] = useState({
    enabled: true,
    textSize: 16,
    form: 'CIRCLE',
    horizontalAlignment: "RIGHT",
    verticalAlignment: "CENTER",
    orientation: "VERTICAL",
    wordWrapEnabled: true
  })
  const [barData, setBarData] = useState(null)
  const [weekLineData, setWeekLineData] = useState({
    dataSets: [
      {label: '本周高效工作时间', values: [{x: 0, y: 0}]}
    ]
  })
  const [pieData, setPieData] = useState(null)

  useEffect(() => {
    initData()
  }, [])

  const initData = async () => {
    const taskRes = await getTaskList({userId: globalStore.user && globalStore.user.id})
    // 饼状图
    if (taskRes && taskRes.length > 0) {
      let done = 0
      let expired = 0
      let importUrgent = 0
      let importNotUrgent = 0
      let notImportUrgent = 0
      let notImportNotUrgent = 0
      taskRes.forEach(trItem => {
        // 任务统计
        if (trItem.status === 1) {
          expired++
        } else if (trItem.status === 2) {
          done++
        }
        // 四象限
        if (trItem.taskType === 1) {
          importUrgent++
        } else if (trItem.taskType === 2) {
          importNotUrgent++
        } else if (trItem.taskType === 3) {
          notImportUrgent++
        } else if (trItem.taskType === 4) {
          notImportNotUrgent++
        }
      })
      const pieDataValues = getPercentage([importUrgent, importNotUrgent, notImportUrgent, notImportNotUrgent])
      let pieDataSetValues = []
      taskTypeEnum.forEach((ttItem, ttIndex) => {
        if (pieDataValues[ttIndex] > 0) {
          pieDataSetValues.push({value: pieDataValues[ttIndex], label: ttItem.name})
        }
      }
      )
      const pieData = {
        dataSets: [{
          values: pieDataSetValues,
          config: pieDefaultConfig
        }],
      }
      setTotal(taskRes.length)
      setDone(done)
      setExpired(expired)
      setPieData(pieData)
    }
    // 本周成就图
    const taskRecordRes = await getTaskRecordList({userId: globalStore.user && globalStore.user.id})
    if (taskRecordRes && taskRecordRes.length > 0) {
      let now = dayjs()
      let weekData = [0, 0, 0, 0, 0, 0, 0]
      taskRecordRes.forEach(trItem => {
        weekData = weekData.map((wdItem, wdIndex) => {
          let count = 0
          const date = now.day(wdIndex - 6)
          const startTime = date.hour(0).minute(0).second(0)
          const endTime = date.hour(23).minute(59).second(59)
          if (
            (
              dayjs(trItem.startTime).isSameOrAfter(startTime) &&
              dayjs(trItem.startTime).isBefore(endTime)
            ) ||
            (
              dayjs(trItem.endTime).isSameOrAfter(startTime) &&
              dayjs(trItem.endTime).isBefore(endTime)
            )
          ) {
            count++
          }
          return count
        })
      })
      setWeekLineData({
        dataSets: [
          {label: '本周高效工作时间', values: weekData.map((twdItem, twdIndex) => ({x: twdIndex, y: twdItem}))}
        ]
      })
    }
  }
  return (
    <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
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
      <View style={styles.chartView}>
        <View style={styles.finishView}>
        <Text style={styles.finishText}>完成率: {done / total * 100}%</Text>
        </View>
        <View style={styles.headerView}>
          <View style={styles.headerItem}>
            <Text style={styles.headerValue}>{total}</Text>
            <Text style={styles.headerKey}>任务总数</Text>
          </View>
          <View style={styles.headerItem}>
            <Text style={[styles.headerValue, { color: '#F6BB42' }]}>{expired}</Text>
            <Text style={[styles.headerKey, , { color: '#F6BB42' }]}>未执行数</Text>
          </View>
          <View style={styles.headerItem}>
            <Text style={[styles.headerValue, { color: '#FC6E51' }]}>{done}</Text>
            <Text style={[styles.headerKey, { color: '#FC6E51' }]}>已完成数</Text>
          </View>
        </View>
        {
          // 饼状图
          pieData &&
          <View style={styles.chartItem}>
            <Text style={styles.chartText}>今日象限分布图</Text>
            <View style={styles.chartItemView}>
              <PieChart
                style={styles.workEfficientTime}
                logEnabled={true}
                chartBackgroundColor={processColor('#fff')}
                data={pieData}
                entryLabelColor={processColor('#666')}
                entryLabelTextSize={16}
                drawEntryLabels={true}
                rotationEnabled={true}
                rotationAngle={45}
                usePercentValues={true}
                holeRadius={40}
                transparentCircleRadius={45}
                transparentCircleColor={processColor('#f0f0f088')}
                onChange={(event) => console.log(event.nativeEvent)}
              />
            </View>
          </View>
        }
        {
          // 暂时移除
          // barData &&
          // <View style={styles.chartItem}>
          //   <Text style={styles.chartText}>本周高效工作时间</Text>
          //   <View style={styles.chartItemView}>
          //     <BarChart
          //       style={styles.workEfficientTime}
          //       data={barData}
          //       animation={{durationX: 2000}}
          //       gridBackgroundColor={processColor('#ffffff')}
          //       visibleRange={{x: { min: 5, max: 5 }}}
          //       drawBarShadow={false}
          //       drawValueAboveBar={true}
          //       drawHighlightArrow={true}
          //       onChange={(event) => console.log(event.nativeEvent)}
          //     />
          //   </View>
          // </View>
        }
        {
          // 折线图
          weekLineData &&
          <View style={styles.chartItem}>
            <Text style={styles.chartText}>本周成就图</Text>
            <View style={styles.chartItemView}>
              <LineChart style={styles.workEfficientTime}
                data={weekLineData}
                scaleEnabled={false}
                doubleTapToZoomEnabled={false}
                style={styles.workEfficientTime}
              />
            </View>
          </View>
        }
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
    paddingVertical: 36,
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
  finishView: {
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e1e1e1',
  },
  finishText: {
    fontSize: 16,
    color: '#222',
    fontWeight: '500',
    textAlign: 'center',
  },
  chartText: {
    fontSize: 16,
    color: '#222',
    fontWeight: '500',
    marginLeft: 16,
    marginTop: 40,
  },
  // charts
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  },
  workEfficientTime: {
    height: 375
  },
  chartView: {
    paddingBottom: 100
  },
  chartItemView: {
    marginTop: 20,
    marginHorizontal: 16,
  },
})

export default inject('globalStore')(observer(CollectScreen))