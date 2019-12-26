import React, { Component } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
// utils
import funcs from '../../utils/funcs'
const { rem } = funcs

class Index extends Component {
  render () {
    return <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.textStyle}>上海悦易网络信息技术有限公司</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.textStyle}>沪ICP备10043802号 - 2</Text>
      </View>
      <View style={styles.row}>
        <Image
          style={{width: rem(11), height: rem(11), marginRight: rem(4)}}
          source={require('./image/icon-police2x.png')}
        />
        <Text style={styles.textStyle}>沪公网安备 31011002002333号</Text>
      </View>
    </View>
  }
}

const styles = StyleSheet.create({
  textStyle: {
    color: '#999',
    fontSize: rem(12),
    lineHeight: rem(14)
  },
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: rem(14)
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: rem(4)
  }
})

export default Index
