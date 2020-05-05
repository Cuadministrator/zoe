import React, { useState } from 'react'
import { View, Text, Image, Dimensions, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

// components
import { AutoDragSortableView } from 'react-native-drag-sort'
// route

// config
const { width:screenWidth } = Dimensions.get('window')

const parentWidth = screenWidth
const childrenWidth = screenWidth - 20
const childrenHeight = 48

export const AUTO_TEST_DATA = [
  {icon: require('../image/arrow-lift.png'),txt: 1},
  {icon: require('../image/arrow-lift.png'),txt: 2},
  {icon: require('../image/arrow-lift.png'),txt: 3},
  {icon: require('../image/arrow-lift.png'),txt: 4},
  {icon: require('../image/arrow-lift.png'),txt: 5},
  {icon: require('../image/arrow-lift.png'),txt: 6},
  {icon: require('../image/arrow-lift.png'),txt: 7},
  {icon: require('../image/arrow-lift.png'),txt: 8},
  {icon: require('../image/arrow-lift.png'),txt: 9},
  {icon: require('../image/arrow-lift.png'),txt: 10},
  {icon: require('../image/arrow-lift.png'),txt: 11},
  {icon: require('../image/arrow-lift.png'),txt: 12},
  {icon: require('../image/arrow-lift.png'),txt: 13},
  {icon: require('../image/arrow-lift.png'),txt: 14},
  {icon: require('../image/arrow-lift.png'),txt: 15},
  {icon: require('../image/arrow-lift.png'),txt: 16},
  {icon: require('../image/arrow-lift.png'),txt: 17},
  {icon: require('../image/arrow-lift.png'),txt: 18},
  {icon: require('../image/arrow-lift.png'),txt: 19},
  {icon: require('../image/arrow-lift.png'),txt: 20},
  {icon: require('../image/arrow-lift.png'),txt: 21},
  {icon: require('../image/arrow-lift.png'),txt: 22},
  {icon: require('../image/arrow-lift.png'),txt: 23},
  {icon: require('../image/arrow-lift.png'),txt: 24},
]

const Test = () => {
  const [data, setData] = useState(AUTO_TEST_DATA)

  const renderItem = (item,index) => {
    return (
        <View style={styles.item}>
            <View style={styles.item_icon_swipe}>
                <Image style={styles.item_icon} source={item.icon}/>
            </View>
            <Text style={styles.item_text}>{item.txt}</Text>
        </View>
    )
  }
  return (
    <SafeAreaView
      style={{flex: 1}}
    >
      <AutoDragSortableView
        keyExtractor={(item,index)=> item.txt}
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
          return renderItem(item,index)
        }}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  header: {
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#2ecc71',
    borderBottomWidth: 2,
  },
  header_title: {
    color: '#333',
    fontSize: 24,
    fontWeight: 'bold',
  },
  item: {
    width: childrenWidth,
    height: childrenHeight,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2ecc71',
    borderRadius: 4,
  },
  item_icon_swipe: {
    width: childrenHeight-10,
    height: childrenHeight-10,
    backgroundColor: '#fff',
    borderRadius: (childrenHeight - 10) / 2,
    marginLeft: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item_icon: {
    width: childrenHeight-20,
    height: childrenHeight-20,
    resizeMode: 'contain',
  },
  item_text: {
    color: '#fff',
    fontSize: 20,
    marginRight: 20,
    fontWeight: 'bold',
  }
})

export default Test