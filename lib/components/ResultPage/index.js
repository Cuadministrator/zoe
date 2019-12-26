import React, { Component } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import funcs from '../../utils/funcs'
const { rem } = funcs

class ResultPage extends Component {
  trans = (type) => {
    switch (type) {
      case 'loading':
        return {
          text: 'loading...',
          image: null
        }
      case 'no':
        return {
          text: '没有数据',
          image: require('./image/no.png')
        }
      case '404':
        return {
          text: '页面飞走了，请返回上一页',
          image: require('./image/404.png')
        }
      case '408': // 超时
        return {
          text: '连接不到网',
          image: require('./image/408.png')
        }
      case '500':
        return {
          text: '服务器异常，请稍后再试',
          image: require('./image/500.png')
        }
      default:
        return {
          text: '未知错误',
          image: require('./image/500.png')
        }
    }
  }
  render () {
    const { type, image, text, children, style, textStyle } = this.props
    const info = this.trans(type)
    return <View style={[styles.page, style]}>
      <Image
        style={{width: rem(180), height: rem(160)}}
        source={image || info.image}
        resizeMode={'contain'}
      />
      <Text style={[{color: '#999', fontSize: rem(12)}, textStyle]}>{(text && typeof text === 'string') ? text : info.text}</Text>
      {children}
    </View>
  }
}

const styles = StyleSheet.create({
  page: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default ResultPage
