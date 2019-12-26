import React, {Component} from 'react'
import { Image, View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native'

import storage from '../../utils/storage'
import funcs from '../../utils/funcs'

const { getNativeData } = storage
const { rem } = funcs

class Header extends Component {
  state = {
    iosStatusBarHeight: 0
  }

  async componentDidMount () {
    // 使用 SafeAreaView 来兼容 iphone X 会和react-navigation 产生冲突，故不适应
    if (Platform.OS === 'ios') {
      this.setState({
        iosStatusBarHeight: await this.getIosStatusBarHeight()
      })
    }
  }

  getIosStatusBarHeight = async () => {
    const height = await getNativeData('statusBarHeight') || '20'
    return parseInt(height)
  }

  leftAction = async (e) => {
    // 优先执行 leftPress
    const { navigator, leftPress } = this.props
    if (leftPress && typeof leftPress === 'function') {
      e.preventDefault() // 事件未被显示处理，阻止默认动作
      leftPress()
    } else {
      if (!navigator) return
      navigator.goBack()
    }
  }

  render () {
    const { visible = true, showLeft = true, headerRight, children } = this.props
    if (!visible) return null // 是否展示
    const { iosStatusBarHeight } = this.state

    // 安卓手机兼容性 99999 是最大的显示层级
    return <View style={{zIndex: 99999}}>
      {Platform.OS === 'ios' && <View style={[{backgroundColor: '#fff'}, {height: iosStatusBarHeight}]} />}
      <View style={styles.header}>
        {
          !!showLeft && <TouchableOpacity style={styles.left} onPress={this.leftAction}>
            <Image
              style={{width: rem(12), height: rem(20)}}
              source={require('../../image/icon-back.png')}
            />
          </TouchableOpacity>
        }
        <View style={styles.body}>
          {
            !!children && (typeof children === 'object')
              ? children
              : <Text style={styles.titleText} numberOfLines={1}>{children}</Text>
          }
        </View>
        <View style={styles.right}>
          {headerRight}
        </View>
      </View>
    </View>
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'center',
    height: rem(44),
    alignItems: 'center'
  },
  left: {
    zIndex: 3,
    position: 'absolute',
    top: 0,
    left: 0,
    height: rem(44),
    width: rem(50),
    alignItems: 'center',
    justifyContent: 'center'
  },
  body: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: rem(50),
  },
  titleText: {
    color: '#333',
    fontSize: rem(18)
  },
  right: {
    zIndex: 3,
    position: 'absolute',
    top: 0,
    right: 0,
    height: rem(44),
    width: rem(50),
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default Header
